import { allCoreContent } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import { genPageMetadata } from 'app/seo'
import ListLayout from '@/layouts/ListLayoutWithTags'
export const metadata = genPageMetadata({ title: '研究笔记', path: '/blog' })
export default function BlogPage() {
  return <ListLayout posts={allCoreContent(allBlogs.filter((p) => !p.draft))} title="研究笔记" />
}
