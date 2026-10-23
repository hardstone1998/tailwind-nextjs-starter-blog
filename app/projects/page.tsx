import projectsData from '@/data/projectsData'
import ProjectsContent from '@/components/ProjectsContent'
import ProfessionalProjectTimeline from '@/components/ProfessionalProjectTimeline'
import { genPageMetadata } from 'app/seo'
export const metadata = genPageMetadata({ title: '实验室', path: '/projects' })
export default function Projects() {
  return (
    <>
      <ProjectsContent projects={projectsData} />
      <ProfessionalProjectTimeline />
    </>
  )
}
