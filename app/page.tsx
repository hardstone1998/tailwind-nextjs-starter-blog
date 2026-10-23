import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import Main from './Main'
import { getCapabilitySummaries } from '@/lib/capability-view'
import projectsData from '@/data/projectsData'
import { professionalProjectsById } from '@/data/professionalProjects'
import { localizeProject } from '@/data/professionalProjects.en'

export default async function Page() {
  const sortedPosts = sortPosts(allBlogs)
  const posts = allCoreContent(sortedPosts)
  const featured = [
    'video-redraw-pipeline',
    'translation-quality-system',
    'asr-platform-engineering',
  ].map((id) => {
    const p = professionalProjectsById[id]
    const en = localizeProject(p, 'en')
    const pick = ({ id, title, summary, role, status }: typeof p) => ({
      id,
      title,
      summary,
      role,
      status,
    })
    return { zh: pick(p), en: pick(en) }
  })
  return (
    <Main
      posts={posts}
      summaries={getCapabilitySummaries()}
      labs={projectsData}
      featured={featured}
    />
  )
}
