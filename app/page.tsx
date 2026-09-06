import { allBlogs } from 'contentlayer/generated'
import projectsData from '@/data/projectsData'
import { getVisiblePosts } from '@/lib/blog-language'
import AdventureHome from '@/components/adventure/Home'
import { adventureMetadata } from '@/lib/adventure-metadata'

export const metadata = adventureMetadata(
  '角色主页',
  '/',
  '记录生活，研究技术，制造一点有趣的东西。qiaoshilei 的个人冒险存档。'
)

export default function Page() {
  return (
    <AdventureHome
      noteCount={getVisiblePosts(allBlogs, 'zh').length}
      labCount={projectsData.length}
    />
  )
}
