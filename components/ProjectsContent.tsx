'use client'
import { useLanguage } from './LanguageProvider'
import Card from './Card'
import type { Project } from '@/data/projectsData'
export default function ProjectsContent({ projects }: { projects: Project[] }) {
  const { language, t } = useLanguage()
  return (
    <div className="py-10 sm:py-14">
      <h1 className="text-4xl font-medium tracking-tight sm:text-5xl">{t('projectsTitle')}</h1>
      <p className="mt-5 max-w-3xl text-lg leading-8 text-[var(--muted)]">{t('projectsIntro')}</p>
      <div className="mt-10 grid gap-0 border-t border-[var(--rule)]">
        {projects.map((p) => (
          <Card key={p.title} {...(language === 'en' ? { ...p, ...p.en } : p)} />
        ))}
      </div>
    </div>
  )
}
