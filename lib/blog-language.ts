import type { Blog } from 'contentlayer/generated'

export type ContentLanguage = 'zh' | 'en'

type LanguageAwarePost = Pick<
  Blog,
  | 'path'
  | 'slug'
  | 'date'
  | 'title'
  | 'summary'
  | 'domains'
  | 'lab'
  | 'status'
  | 'methods'
  | 'outcome'
  | 'language'
  | 'translationKey'
  | 'tags'
>

function languageOf(post: LanguageAwarePost): ContentLanguage {
  return post.language === 'en' ? 'en' : 'zh'
}

/**
 * A translated article is shown once in the visitor's selected language. Posts without a
 * complete translation pair remain visible in both languages.
 */
export function getVisiblePosts<T extends LanguageAwarePost>(
  posts: T[],
  language: ContentLanguage
) {
  const groups = new Map<string, T[]>()
  posts.forEach((post) => {
    if (!post.translationKey) return
    const group = groups.get(post.translationKey) ?? []
    group.push(post)
    groups.set(post.translationKey, group)
  })

  return posts.filter((post) => {
    if (!post.translationKey) return true
    const group = groups.get(post.translationKey) ?? []
    const hasBothLanguages =
      group.some((item) => languageOf(item) === 'zh') &&
      group.some((item) => languageOf(item) === 'en')
    return !hasBothLanguages || languageOf(post) === language
  })
}

export function getTranslationPath<T extends LanguageAwarePost>(
  posts: T[],
  post: T,
  language: ContentLanguage
) {
  if (!post.translationKey) return undefined
  const translation = posts.find(
    (candidate) =>
      candidate.translationKey === post.translationKey && languageOf(candidate) === language
  )
  return translation?.path
}

export function getVisibleTagCounts<T extends LanguageAwarePost>(
  posts: T[],
  language: ContentLanguage
) {
  return getVisiblePosts(posts, language).reduce<Record<string, number>>((counts, post) => {
    post.tags?.forEach((tag) => {
      counts[tag] = (counts[tag] ?? 0) + 1
    })
    return counts
  }, {})
}
