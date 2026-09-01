import assert from 'node:assert/strict'
import { readFile, access, readdir } from 'node:fs/promises'
import { loadReviewSources } from './load-review-sources.mjs'

const read = (file) => readFile(file, 'utf8')
const source = await loadReviewSources()
const clientManifest = await read('.next/server/app/page_client-reference-manifest.js')
assert.ok(!/recharts/i.test(clientManifest), 'Homepage references Recharts')
async function rscRoutes(directory, prefix = '') {
  const entries = await readdir(directory, { withFileTypes: true })
  return (
    await Promise.all(
      entries.map((e) =>
        e.isDirectory()
          ? rscRoutes(`${directory}/${e.name}`, `${prefix}${e.name}/`)
          : e.name.endsWith('.rsc')
            ? [`${prefix}${e.name.slice(0, -4)}`]
            : []
      )
    )
  ).flat()
}
const lists = (await rscRoutes('.next/server/app')).filter((route) =>
  /^(index|blog|blog\/page\/\d+|tags(?:\/.*)?|skills\/[^/]+)$/.test(route)
)
for (const route of lists) {
  const rsc = await read(`.next/server/app/${route}.rsc`)
  assert.ok(
    !/"body"\s*:\s*\{|"raw"\s*:|"code"\s*:/.test(rsc),
    `${route} sends MDX body or compiled code`
  )
}
const sitemap = await read('.next/server/app/sitemap.xml.body')
for (const d of source.capabilityDomains) {
  assert.ok(sitemap.includes(`${d.route}</loc>`), `Missing capability sitemap entry: ${d.id}`)
  assert.ok(
    sitemap.includes(`${d.route}/assessment</loc>`),
    `Missing assessment sitemap entry: ${d.id}`
  )
}
const zh = await read('.next/server/app/blog/2026-08-04-production-llm-subtitle-translation.html')
const en = await read(
  '.next/server/app/blog/2026-08-06-production-llm-subtitle-translation-en.html'
)
for (const html of [zh, en]) {
  assert.match(html, /hrefLang="zh-CN"/)
  assert.match(html, /hrefLang="en"/)
}
assert.match(en, /property="og:locale" content="en_US"/)
const unpaired = await read('.next/server/app/blog/python-multiprocessing-multi-model-deploy.html')
assert.ok(!/hrefLang=/.test(unpaired), 'Untranslated article claims a translation')
assert.match(
  unpaired,
  /rel="canonical" href="[^"]+\/blog\/python-multiprocessing-multi-model-deploy"/
)
const search = JSON.parse(await read('public/search.json'))
assert.ok(
  search.every((p) => !p.body && !p.draft),
  'Search index contains full body or drafts'
)
if (process.argv.includes('--export')) {
  const prefix = process.argv.find((a) => a.startsWith('--base-path='))?.split('=')[1] ?? ''
  for (const route of [
    'index',
    'blog',
    'projects',
    'about',
    ...source.capabilityDomains.flatMap((d) => [
      d.route.slice(1),
      `${d.route.slice(1)}/assessment`,
    ]),
  ])
    await access(`out/${route}.html`)
  await access('out/feed.xml')
  await access('out/search.json')
  const html = await read('out/index.html')
  assert.ok(html.includes(`${prefix}/_next/static/`), 'Export asset base path mismatch')
  assert.ok(
    html.includes(`${prefix}/static/favicons/site.webmanifest`),
    'Manifest base path mismatch'
  )
}
console.log(
  `Build checks passed: no Recharts homepage reference, ${lists.length} summary-only payloads, translation metadata and 12 capability sitemap entries${process.argv.includes('--export') ? ', static export assets' : ''}.`
)
