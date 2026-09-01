import { slug as slugify } from 'github-slugger'
export type ContentLanguage = 'zh' | 'en'
export interface LanguageAwarePost {
  path: string
  slug: string
  date: string
  language?: string
  translationKey?: string
  tags?: string[]
  draft?: boolean
}
export const languageOf = (post: LanguageAwarePost): ContentLanguage =>
  post.language === 'en' ? 'en' : 'zh'
export function getVisiblePosts<T extends LanguageAwarePost>(
  posts: T[],
  language: ContentLanguage
): T[] {
  const published = posts
    .filter((p) => !p.draft)
    .sort((a, b) => Date.parse(b.date) - Date.parse(a.date) || a.path.localeCompare(b.path))
  const groups = new Map<string, T[]>()
  for (const p of published) {
    if (p.translationKey) {
      const group = groups.get(p.translationKey) ?? []
      group.push(p)
      groups.set(p.translationKey, group)
    }
  }
  return published.filter((p) => {
    if (!p.translationKey) return true
    const group = groups.get(p.translationKey)!
    const preferred = group.find((item) => languageOf(item) === language) ?? group[0]
    return p === preferred
  })
}
export function getTranslationPath<T extends LanguageAwarePost>(
  posts: T[],
  post: T,
  language: ContentLanguage
) {
  if (!post.translationKey) return undefined
  return posts.find(
    (p) => !p.draft && p.translationKey === post.translationKey && languageOf(p) === language
  )?.path
}
export function getVisibleTagCounts<T extends LanguageAwarePost>(
  posts: T[],
  language: ContentLanguage
) {
  return getVisiblePosts(posts, language).reduce<Record<string, number>>((counts, post) => {
    for (const tag of new Set(post.tags?.map((tag) => slugify(tag)) ?? []))
      counts[tag] = (counts[tag] ?? 0) + 1
    return counts
  }, {})
}
export const POSTS_PER_PAGE = 5
export function getCollectionPage<T extends LanguageAwarePost>(
  posts: T[],
  language: ContentLanguage,
  tag?: string,
  page = 1
) {
  const visible = getVisiblePosts(posts, language).filter(
    (p) => !tag || p.tags?.some((t) => slugify(t) === tag)
  )
  const totalPages = Math.ceil(visible.length / POSTS_PER_PAGE)
  const valid = Number.isInteger(page) && page >= 1 && page <= Math.max(1, totalPages)
  const currentPage = valid ? page : 1
  return {
    posts: visible.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE),
    totalPages,
    currentPage,
    outOfRange: !valid,
    total: visible.length,
  }
}
export function maxPageCount<T extends LanguageAwarePost>(posts: T[], tag?: string) {
  return Math.max(
    getCollectionPage(posts, 'zh', tag).totalPages,
    getCollectionPage(posts, 'en', tag).totalPages
  )
}
