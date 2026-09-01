import { allBlogs } from 'contentlayer/generated'
import { allCoreContent } from 'pliny/utils/contentlayer'
import { getVisibleTagCounts } from '@/lib/blog-language'
import ListLayout from '@/layouts/ListLayoutWithTags'
import { notFound } from 'next/navigation'
import { genPageMetadata } from 'app/seo'
const tags = () =>
  Object.keys({ ...getVisibleTagCounts(allBlogs, 'zh'), ...getVisibleTagCounts(allBlogs, 'en') })
export const dynamicParams = false
export function generateStaticParams() {
  return tags().map((tag) => ({ tag }))
}
export async function generateMetadata({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params
  return genPageMetadata({ title: decodeURIComponent(tag), path: `/tags/${tag}` })
}
export default async function Page({ params }: { params: Promise<{ tag: string }> }) {
  const { tag: raw } = await params
  const tag = decodeURIComponent(raw)
  if (!tags().includes(tag)) notFound()
  return (
    <ListLayout posts={allCoreContent(allBlogs.filter((p) => !p.draft))} title={tag} tag={tag} />
  )
}
