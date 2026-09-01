import { allBlogs } from 'contentlayer/generated'
import TopicsContent from '@/components/TopicsContent'
import { genPageMetadata } from 'app/seo'
export const metadata = genPageMetadata({ title: '主题索引', path: '/tags' })
export default function Page() {
  return (
    <TopicsContent
      posts={allBlogs
        .filter((p) => !p.draft)
        .map(({ path, slug, date, language, translationKey, tags }) => ({
          path,
          slug,
          date,
          language,
          translationKey,
          tags,
        }))}
    />
  )
}
