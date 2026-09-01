import { orderedProfessionalProjects } from '@/data/professionalProjects'
import { localizeProject } from '@/data/professionalProjects.en'
import { ProjectTimeline } from './ProfessionalProjectContent'
export default function ProfessionalProjectTimeline() {
  return (
    <ProjectTimeline
      projects={orderedProfessionalProjects.map((p) => ({ zh: p, en: localizeProject(p, 'en') }))}
    />
  )
}
