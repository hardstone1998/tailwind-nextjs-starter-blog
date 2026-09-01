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
  const base = tag ? `/tags/${tag}` : '/blog'
  useEffect(() => {
    if (isLanguageReady && collection.outOfRange) router.replace(base)
  }, [isLanguageReady, collection.outOfRange, base, router])
  return (
    <div className="py-10 sm:py-14">
      <p className="section-label">{t('researchArchive')}</p>
      <h1 className="mt-3 text-4xl font-extrabold">{tag ? title : t('blogTitle')}</h1>
      <div className="mt-8 grid gap-8 lg:grid-cols-[220px_minmax(0,1fr)]">
        <aside>
          <details className="notebook-card" open>
            <summary className="cursor-pointer font-semibold">{t('allTopics')}</summary>
            <Link href="/blog" className="mt-4 block font-semibold text-[var(--accent)]">
              {t('allNotes')}
            </Link>
            <ul className="mt-3 flex max-h-72 flex-wrap gap-2 overflow-y-auto lg:block lg:max-h-[70vh]">
              {tags.map((key) => (
                <li key={key}>
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
        </aside>
        <div className="min-w-0">
          <div className="grid gap-4">
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
