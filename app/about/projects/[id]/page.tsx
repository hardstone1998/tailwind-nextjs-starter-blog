import { notFound } from 'next/navigation'
import { orderedProfessionalProjects, professionalProjectsById } from '@/data/professionalProjects'
import { localizeProject } from '@/data/professionalProjects.en'
import { ProjectDetail } from '@/components/ProfessionalProjectContent'
import { genPageMetadata } from 'app/seo'
export function generateStaticParams() {
  return orderedProfessionalProjects.map((p) => ({ id: p.id }))
}
export const dynamicParams = false
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const project = professionalProjectsById[id]
  return genPageMetadata({
    title: project?.title ?? '页面未找到',
    description: project?.summary,
    path: `/about/projects/${id}`,
  })
}
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const project = professionalProjectsById[id]
  if (!project) notFound()
  return <ProjectDetail project={{ zh: project, en: localizeProject(project, 'en') }} />
}
