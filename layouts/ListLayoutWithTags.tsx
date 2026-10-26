'use client'
import { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import type { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Link from '@/components/Link'
import NotebookCard from '@/components/research/NotebookCard'
import { useLanguage } from '@/components/LanguageProvider'
import { getCollectionPage, getVisibleTagCounts } from '@/lib/blog-language'
interface Props {
  posts: CoreContent<Blog>[]
  title: string
  initialDisplayPosts?: CoreContent<Blog>[]
  pagination?: { totalPages: number; currentPage: number }
  tag?: string
}
export default function ListLayoutWithTags({ posts, title, tag }: Props) {
  const { t, language, isLanguageReady } = useLanguage()
  const pathname = usePathname()
  const router = useRouter()
  const pageMatch = pathname.match(/\/page\/(\d+)\/?$/)
  const page = pageMatch ? Number(pageMatch[1]) : 1
  const collection = getCollectionPage(posts, language, tag, page)
  const counts = getVisibleTagCounts(posts, language)
  const tags = Object.keys(counts).sort((a, b) => counts[b] - counts[a] || a.localeCompare(b))
  const leadingTags = tags.slice(0, 6)
  if (tag && !leadingTags.includes(tag)) leadingTags[leadingTags.length - 1] = tag
  const base = tag ? `/tags/${tag}` : '/blog'
  useEffect(() => {
    if (isLanguageReady && collection.outOfRange) router.replace(base)
  }, [isLanguageReady, collection.outOfRange, base, router])
  return (
    <div className="py-10 sm:py-14">
      <h1 className="text-4xl font-medium tracking-tight sm:text-5xl">
        {tag ? title : t('blogTitle')}
      </h1>
      <div className="mt-8 grid min-w-0 grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-[220px_minmax(0,1fr)]">
        <aside className="min-w-0">
          <details className="topic-index min-w-0 lg:hidden">
            <summary className="cursor-pointer font-medium">{t('allTopics')}</summary>
            <Link href="/blog" className="mt-4 block font-semibold text-[var(--accent)]">
              {t('allNotes')}
            </Link>
            <ul className="mt-3 flex max-w-full min-w-0 gap-3 overflow-x-auto pb-2 lg:block lg:max-h-[70vh] lg:overflow-y-auto lg:pb-0">
              {tags.map((key) => (
                <li key={key} className="shrink-0 lg:shrink">
                  <Link
                    href={`/tags/${key}`}
                    className="inline-block py-2 text-sm text-[var(--muted)] hover:text-[var(--accent)]"
                    aria-current={tag === key ? 'page' : undefined}
                  >
                    {key} ({counts[key]})
                  </Link>
                </li>
              ))}
            </ul>
          </details>
          <nav aria-label={t('allTopics')} className="topic-index hidden lg:block">
            <p className="font-medium">{t('allTopics')}</p>
            <Link href="/blog" className="mt-4 block text-sm font-semibold text-[var(--accent)]">
              {t('allNotes')}
            </Link>
            <ul className="mt-3">
              {leadingTags.map((key) => (
                <li key={key}>
                  <Link
                    href={`/tags/${key}`}
                    className="block py-1.5 text-sm text-[var(--muted)] hover:text-[var(--accent)]"
                    aria-current={tag === key ? 'page' : undefined}
                  >
                    {key} ({counts[key]})
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/tags" className="console-link mt-4 inline-block text-sm">
              {language === 'zh' ? '浏览全部主题' : 'Browse all topics'}
            </Link>
          </nav>
        </aside>
        <div className="min-w-0">
          <div className="grid">
            {collection.posts.map((post) => (
              <NotebookCard key={post.path} {...post} />
            ))}
            {collection.posts.length === 0 && <p>{t('noContent')}</p>}
          </div>
          {collection.totalPages > 1 && (
            <nav
              aria-label={language === 'zh' ? '文章分页' : 'Article pagination'}
              className="mt-8 flex items-center justify-between gap-3 text-sm"
            >
              {collection.currentPage > 1 ? (
                <Link
                  className="py-3"
                  rel="prev"
                  href={
                    collection.currentPage === 2
                      ? base
                      : `${base}/page/${collection.currentPage - 1}`
                  }
                >
                  {t('previous')}
                </Link>
              ) : (
                <span className="text-[var(--muted)]">{t('previous')}</span>
              )}
              <span>
                {collection.currentPage} {t('of')} {collection.totalPages}
              </span>
              {collection.currentPage < collection.totalPages ? (
                <Link
                  className="py-3"
                  rel="next"
                  href={`${base}/page/${collection.currentPage + 1}`}
                >
                  {t('next')}
                </Link>
              ) : (
                <span className="text-[var(--muted)]">{t('next')}</span>
              )}
            </nav>
          )}
        </div>
      </div>
    </div>
  )
}
