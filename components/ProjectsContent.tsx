'use client'
import { useLanguage } from './LanguageProvider'
import Card from './Card'
import type { Project } from '@/data/projectsData'
export default function ProjectsContent({ projects }: { projects: Project[] }) {
  const { language, t } = useLanguage()
  return (
    <div className="py-10 sm:py-14">
      <p className="section-label">{t('publicLabs')}</p>
      <h1 className="mt-3 text-4xl font-extrabold">{t('projectsTitle')}</h1>
      <p className="mt-5 text-lg leading-8 text-[var(--muted)]">{t('projectsIntro')}</p>
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {projects.map((p) => (
          <Card key={p.title} {...(language === 'en' ? { ...p, ...p.en } : p)} />
        ))}
      </div>
    </div>
  )
}
