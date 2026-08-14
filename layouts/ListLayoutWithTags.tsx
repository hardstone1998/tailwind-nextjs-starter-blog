'use client'

import { usePathname } from 'next/navigation'
import { slug } from 'github-slugger'
import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import ResearchMeta from '@/components/research/ResearchMeta'
import { useLanguage } from '@/components/LanguageProvider'
import { getVisiblePosts, getVisibleTagCounts } from '@/lib/blog-language'

interface PaginationProps {
  totalPages: number
  currentPage: number
}
interface ListLayoutProps {
  posts: CoreContent<Blog>[]
  title: string
  initialDisplayPosts?: CoreContent<Blog>[]
  pagination?: PaginationProps
  tag?: string
}

function Pagination({ totalPages, currentPage }: PaginationProps) {
  const pathname = usePathname()
  const segments = pathname.split('/')
  const lastSegment = segments[segments.length - 1]
  const basePath = pathname
    .replace(/^\//, '') // Remove leading slash
    .replace(/\/page\/\d+\/?$/, '') // Remove any trailing /page
    .replace(/\/$/, '') // Remove trailing slash
  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= totalPages

  return (
    <div className="space-y-2 pt-6 pb-8 md:space-y-5">
      <nav className="flex justify-between">
        {!prevPage && (
          <button className="cursor-auto disabled:opacity-50" disabled={!prevPage}>
            Previous
          </button>
        )}
        {prevPage && (
          <Link
            href={currentPage - 1 === 1 ? `/${basePath}/` : `/${basePath}/page/${currentPage - 1}`}
            rel="prev"
          >
            Previous
          </Link>
        )}
        <span>
          {currentPage} of {totalPages}
        </span>
        {!nextPage && (
          <button className="cursor-auto disabled:opacity-50" disabled={!nextPage}>
            Next
          </button>
        )}
        {nextPage && (
          <Link href={`/${basePath}/page/${currentPage + 1}`} rel="next">
            Next
          </Link>
        )}
      </nav>
    </div>
  )
}

export default function ListLayoutWithTags({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
  tag,
}: ListLayoutProps) {
  const { language, t } = useLanguage()
  const pathname = usePathname()
  const tagCounts = getVisibleTagCounts(posts, language)
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])
  const visiblePosts = getVisiblePosts(posts, language)
  const matchingPosts = tag
    ? visiblePosts.filter((post) => post.tags?.map((item) => slug(item)).includes(tag))
    : visiblePosts
  const pageMatch = pathname.match(/\/page\/(\d+)/)
  const currentPage = pageMatch ? Number(pageMatch[1]) : 1
  const pageSize = 5
  const displayPosts = pagination
    ? matchingPosts.slice(pageSize * (currentPage - 1), pageSize * currentPage)
    : initialDisplayPosts.length > 0
      ? initialDisplayPosts
      : matchingPosts
  const totalPages = pagination ? Math.ceil(matchingPosts.length / pageSize) : 0

  return (
    <>
      <div className="py-10 sm:py-14">
        <div className="pb-8">
          <p className="section-label">{t('researchArchive')}</p>
          <h1 className="mt-3 text-4xl leading-tight font-extrabold tracking-tight text-[var(--ink)] sm:hidden sm:text-5xl">
            {t('blogTitle')}
          </h1>
        </div>
        <div className="flex gap-8 lg:gap-16">
          <div className="hidden h-full max-h-screen max-w-[280px] min-w-[220px] flex-wrap overflow-auto rounded-lg border border-[var(--rule)] bg-[var(--surface-raised)] pt-3 sm:flex">
            <div className="px-6 py-4">
              {pathname.startsWith('/blog') ? (
                <h3 className="font-bold text-[var(--accent)]">{t('allNotes')}</h3>
              ) : (
                <Link
                  href={`/blog`}
                  className="font-bold text-[var(--ink)] hover:text-[var(--accent)]"
                >
                  {t('allNotes')}
                </Link>
              )}
              <ul>
                {sortedTags.map((t) => {
                  return (
                    <li key={t} className="my-3">
                      {decodeURI(pathname.split('/tags/')[1]) === slug(t) ? (
                        <h3 className="inline px-3 py-2 text-sm font-bold text-[var(--accent)]">
                          {`${t} (${tagCounts[t]})`}
                        </h3>
                      ) : (
                        <Link
                          href={`/tags/${slug(t)}`}
                          className="px-3 py-2 text-sm font-medium text-[var(--muted)] hover:text-[var(--accent)]"
                          aria-label={`View posts tagged ${t}`}
                        >
                          {`${t} (${tagCounts[t]})`}
                        </Link>
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
          <div className="min-w-0 flex-1">
            <ul>
              {displayPosts.map((post) => {
                const { path, date, title, summary, tags } = post
                const postLanguage = post.language === 'en' ? 'en' : 'zh'
                return (
                  <li key={path} className="py-3">
                    <article className="notebook-card flex flex-col space-y-3">
                      <dl>
                        <dt className="sr-only">Published on</dt>
                        <dd className="text-xs font-semibold tracking-[0.14em] text-[var(--muted)] uppercase">
                          <time dateTime={date} suppressHydrationWarning>
                            {formatDate(date, siteMetadata.locale)}
                          </time>
                        </dd>
                      </dl>
                      <div className="space-y-3">
                        <div>
                          <h2 className="text-2xl leading-8 font-bold tracking-tight">
                            <Link
                              href={`/${path}`}
                              className="text-[var(--ink)] hover:text-[var(--accent)]"
                            >
                              {title}
                            </Link>
                          </h2>
                          <div className="mt-3 flex flex-wrap gap-1">
                            <span className="rounded-full border border-[var(--rule)] px-2 py-0.5 text-xs font-semibold text-[var(--muted)]">
                              {t('language')}: {postLanguage === 'en' ? 'English' : '中文'}
                            </span>
                            {tags?.map((tag) => {
                              return <Tag key={tag} text={tag} />
                            })}
                          </div>
                        </div>
                        {summary && <p className="leading-7 text-[var(--muted)]">{summary}</p>}
                        <ResearchMeta
                          domains={post.domains}
                          lab={post.lab}
                          status={post.status}
                          methods={post.methods}
                          outcome={post.outcome}
                          compact
                        />
                      </div>
                    </article>
                  </li>
                )
              })}
            </ul>
            {displayPosts.length === 0 && (
              <p className="py-8 text-[var(--muted)]">{t('noContent')}</p>
            )}
            {pagination && totalPages > 1 && (
              <Pagination currentPage={currentPage} totalPages={totalPages} />
            )}
          </div>
        </div>
      </div>
    </>
  )
}
