import { allBlogs } from 'contentlayer/generated'
import { allCoreContent } from 'pliny/utils/contentlayer'
import { getVisibleTagCounts, maxPageCount } from '@/lib/blog-language'
import ListLayout from '@/layouts/ListLayoutWithTags'
import { notFound } from 'next/navigation'
import { genPageMetadata } from 'app/seo'
export const dynamicParams = false
export function generateStaticParams() {
  return Object.keys({
    ...getVisibleTagCounts(allBlogs, 'zh'),
    ...getVisibleTagCounts(allBlogs, 'en'),
  }).flatMap((tag) =>
    Array.from({ length: maxPageCount(allBlogs, tag) }, (_, i) => ({ tag, page: String(i + 1) }))
  )
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string; page: string }>
}) {
  const { tag, page } = await params
  return genPageMetadata({
    title: `${decodeURIComponent(tag)} · ${page}`,
    path: page === '1' ? `/tags/${tag}` : `/tags/${tag}/page/${page}`,
  })
}
export default async function Page({ params }: { params: Promise<{ tag: string; page: string }> }) {
  const { tag: raw, page } = await params
  const tag = decodeURIComponent(raw)
  const n = Number(page)
  if (!/^[1-9]\d*$/.test(page) || n > maxPageCount(allBlogs, tag)) notFound()
  return (
    <ListLayout posts={allCoreContent(allBlogs.filter((p) => !p.draft))} title={tag} tag={tag} />
  )
}
