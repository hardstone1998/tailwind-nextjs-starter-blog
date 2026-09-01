import { allCoreContent } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import { notFound } from 'next/navigation'
import { maxPageCount } from '@/lib/blog-language'
import ListLayout from '@/layouts/ListLayoutWithTags'
import { genPageMetadata } from 'app/seo'
export const dynamicParams = false
export function generateStaticParams() {
  return Array.from({ length: maxPageCount(allBlogs) }, (_, i) => ({ page: String(i + 1) }))
}
export async function generateMetadata({ params }: { params: Promise<{ page: string }> }) {
  const { page } = await params
  return genPageMetadata({
    title: `研究笔记 · ${page}`,
    path: page === '1' ? '/blog' : `/blog/page/${page}`,
  })
}
export default async function Page({ params }: { params: Promise<{ page: string }> }) {
  const { page } = await params
  const n = Number(page)
  if (!/^[1-9]\d*$/.test(page) || n > maxPageCount(allBlogs)) notFound()
  return <ListLayout posts={allCoreContent(allBlogs.filter((p) => !p.draft))} title="研究笔记" />
}
