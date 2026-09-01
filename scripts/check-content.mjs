import { readFile, writeFile, readdir, access } from 'node:fs/promises'
import path from 'node:path'
import { createHash } from 'node:crypto'
import matter from 'gray-matter'
import { remark } from 'remark'
import { visit } from 'unist-util-visit'
import GithubSlugger from 'github-slugger'
import { loadReviewSources } from './load-review-sources.mjs'

const root = process.cwd()
const errors = []
const fail = (where, message) => errors.push(`${where}: ${message}`)
const source = await loadReviewSources()
const domains = Object.values(source.capabilityDomains)
const domainIds = new Set(domains.map((d) => d.id))
const routes = new Map(
  ['/', '/blog', '/tags', '/projects', '/about'].map((route) => [route, new Set()])
)
for (const domain of domains) {
  routes.set(domain.route, new Set())
  routes.set(`${domain.route}/assessment`, new Set())
}
for (const project of source.professionalProjects) {
  routes.set(
    `/about/projects/${project.id}`,
    new Set([
      ...(project.architecture ? ['architecture'] : []),
      'responsibilities',
      ...(project.outcomes ? ['outcomes'] : []),
      ...(project.detailSections ?? []).map((_, i) => `detail-${i}`),
    ])
  )
  const english = source.professionalProjectEnglish[project.id]
  for (const field of [
    'title',
    'role',
    'summary',
    'responsibilities',
    'methods',
    'background',
    'architecture',
    'detailSections',
    'outcomes',
  ]) {
    if (project[field] && !english?.[field])
      fail(project.id, `Missing English project field: ${field}`)
  }
}
async function filesAt(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  return (
    await Promise.all(
      entries.map((e) =>
        e.isDirectory() ? filesAt(path.join(dir, e.name)) : path.join(dir, e.name)
      )
    )
  ).flat()
}
const textOf = (node) => node.value ?? node.children?.map(textOf).join('') ?? ''
const articles = []
for (const filename of await filesAt(path.join(root, 'data/blog'))) {
  if (!filename.endsWith('.mdx')) continue
  const { data, content } = matter(await readFile(filename, 'utf8'))
  if (data.draft) continue
  const slug = path
    .relative(path.join(root, 'data/blog'), filename)
    .replaceAll('\\', '/')
    .replace(/\.mdx$/, '')
  const route = `/blog/${slug}`
  const tree = remark().parse(content)
  const headings = new Set()
  const slugger = new GithubSlugger()
  visit(tree, 'heading', (node) => {
    if (node.depth === 1) fail(filename, 'Body H1 duplicates the page heading; use H2–H6')
    headings.add(slugger.slug(textOf(node)))
  })
  routes.set(route, headings)
  articles.push({ ...data, slug, path: route.slice(1), filename, route, tree, content })
  for (const id of data.domains ?? [])
    if (!domainIds.has(id)) fail(filename, `Undefined domain ${id}`)
}
for (const language of ['zh', 'en']) {
  const counts = source.getVisibleTagCounts(articles, language)
  for (const tag of Object.keys(counts)) {
    routes.set(`/tags/${tag}`, new Set())
    for (let page = 1; page <= source.maxPageCount(articles, tag); page++)
      routes.set(`/tags/${tag}/page/${page}`, new Set())
  }
}
for (let page = 1; page <= source.maxPageCount(articles); page++)
  routes.set(`/blog/page/${page}`, new Set())
const translations = new Map()
for (const article of articles) {
  if (!['zh', 'en'].includes(article.language ?? 'zh'))
    fail(article.filename, 'Invalid article language')
  if (article.translationKey) {
    const group = translations.get(article.translationKey) ?? []
    group.push(article)
    translations.set(article.translationKey, group)
  }
}
for (const [key, group] of translations) {
  if (group.length !== 2 || new Set(group.map((a) => a.language ?? 'zh')).size !== 2)
    fail(key, 'Translation key must identify exactly one published zh/en pair')
  if (new Set(group.map((a) => [...(a.domains ?? [])].sort().join(','))).size !== 1)
    fail(key, 'Translation domains do not match')
}
async function checkLink(url, where, currentRoute = '/') {
  if (!url || /^(https?:|mailto:|tel:|data:|\/\/)/i.test(url)) return
  let parsed
  try {
    parsed = new URL(url, `https://local.invalid${currentRoute}`)
  } catch {
    fail(where, `Malformed link ${url}`)
    return
  }
  const pathname = decodeURIComponent(parsed.pathname).replace(/\/$/, '') || '/'
  const file = path.resolve(root, 'public', `.${pathname}`)
  if (routes.has(pathname)) {
    if (parsed.hash && !routes.get(pathname).has(decodeURIComponent(parsed.hash.slice(1))))
      fail(where, `Missing heading ${url}`)
  } else if (file.startsWith(path.join(root, 'public') + path.sep)) {
    try {
      await access(file)
    } catch {
      fail(where, `Missing local page/image ${url}`)
    }
  } else fail(where, `Invalid local path ${url}`)
}
for (const article of articles) {
  const definitions = new Map()
  visit(article.tree, 'definition', (node) => definitions.set(node.identifier, node.url))
  const links = []
  visit(article.tree, (node) => {
    if (node.type === 'link' || node.type === 'image') links.push(node.url)
    if (node.type === 'linkReference' || node.type === 'imageReference') {
      const url = definitions.get(node.identifier)
      if (!url) fail(article.filename, `Missing reference ${node.identifier}`)
      else links.push(url)
    }
    // Raw JSX/HTML attributes are inspected, while fenced code is deliberately ignored.
    if (node.type === 'html')
      for (const match of node.value.matchAll(/(?:src|href)=["']([^"']+)["']/g))
        links.push(match[1])
  })
  links.push(...(article.images ?? []))
  for (const url of links) await checkLink(url, article.filename, article.route)
}
for (const project of [...source.projectsData, ...source.professionalProjects]) {
  for (const id of project.domains ?? [])
    if (!domainIds.has(id)) fail(project.id ?? project.title, `Undefined domain ${id}`)
  if (project.imgSrc) await checkLink(project.imgSrc, project.title)
  if (project.href) await checkLink(project.href, project.title)
  for (const link of [...(project.relatedBlogs ?? []), ...(project.relatedLabs ?? [])])
    await checkLink(link.href, project.title)
}
for (const domain of domains) {
  const assessment = source.assessments[domain.id]
  try {
    source.calculateAssessment(source.rubrics[domain.id], assessment, source.evidenceRecords)
  } catch (error) {
    fail(domain.id, error.message)
  }
  if (domain.assessmentId !== assessment?.id) fail(domain.id, 'Broken assessment association')
}
const manifestPath = path.join(root, 'data/evidence-source-snapshots.json')
const snapshots = {}
for (const evidence of source.evidenceRecords) {
  await checkLink(evidence.href, evidence.id)
  try {
    const material = await readFile(path.join(root, evidence.sourceFile), 'utf8')
    snapshots[`${evidence.sourceVersion}:${evidence.sourceFile}`] = createHash('sha256')
      .update(material.replaceAll('\r\n', '\n'))
      .digest('hex')
  } catch {
    fail(evidence.id, `Missing source ${evidence.sourceFile}`)
  }
}
if (process.argv.includes('--snapshot')) {
  if (errors.length) throw new Error(`Cannot record invalid evidence:\n${errors.join('\n')}`)
  await writeFile(manifestPath, JSON.stringify(snapshots, null, 2) + '\n')
} else {
  let saved = {}
  try {
    saved = JSON.parse(await readFile(manifestPath, 'utf8'))
  } catch {
    fail('evidence', 'Missing source snapshot manifest')
  }
  for (const [key, hash] of Object.entries(snapshots))
    if (saved[key] !== hash)
      fail(key, 'Evidence source changed: review ratings before updating the snapshot')
}
if (errors.length) {
  console.error(errors.join('\n'))
  process.exitCode = 1
} else
  console.log(
    `Content checks passed: ${articles.length} published articles, ${translations.size} translation pairs, ${domains.length} rubrics, ${source.evidenceRecords.length} evidence records. External links were not fetched.`
  )
