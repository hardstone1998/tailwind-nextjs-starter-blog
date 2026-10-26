'use client'
import Link from '@/components/Link'
import CapabilityMap from '@/components/research/CapabilityMap'
import LabStatusBadge from '@/components/research/LabStatusBadge'
import NotebookCard from '@/components/research/NotebookCard'
import { useLanguage } from '@/components/LanguageProvider'
import { getVisiblePosts } from '@/lib/blog-language'
import type { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import type { CapabilitySummary } from '@/lib/capability-view'
import type { Project } from '@/data/projectsData'
import type { ProfessionalProject } from '@/data/professionalProjects'
type Featured = Pick<ProfessionalProject, 'id' | 'title' | 'summary' | 'role' | 'status'>
export default function Home({
  posts,
  summaries,
  labs,
  featured,
}: {
  posts: CoreContent<Blog>[]
  summaries: CapabilitySummary[]
  labs: Project[]
  featured: { zh: Featured; en: Featured }[]
}) {
  const { t, language } = useLanguage()
  const leadProject = featured[0]?.[language]
  const statusKey = {
    completed: 'completed',
    iterating: 'iterating',
    'in-progress': 'inProgress',
    exploring: 'exploring',
  } as const
  return (
    <div className="pb-12">
      <section className="home-hero" aria-labelledby="home-title">
        <div className="min-w-0">
          <h1 id="home-title">{t('homeHero')}</h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-[var(--muted)]">{t('homeIntro')}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/projects" className="console-button console-button--primary">
              {t('activeLabs')}
            </Link>
            <Link href="/blog" className="console-button">
              {t('readNotes')}
            </Link>
          </div>
        </div>
        {leadProject && (
          <article className="hero-record" aria-label={leadProject.title}>
            <div className="hero-record__top">
              <span className="console-status">{t(statusKey[leadProject.status])}</span>
              <span className="text-sm text-[var(--muted)]">{t('featuredProjects')}</span>
            </div>
            <div className="hero-record__main">
              <h2>{leadProject.title}</h2>
              <p className="mt-5 max-w-lg leading-7 text-[var(--muted)]">{leadProject.summary}</p>
            </div>
            <div className="hero-record__foot">
              <span className="text-sm text-[var(--muted)]">{leadProject.role}</span>
              <Link href={`/about/projects/${leadProject.id}`} className="console-link text-sm">
                {t('viewProject')}
              </Link>
            </div>
          </article>
        )}
      </section>
      <section className="home-section">
        <h2>{t('featuredProjects')}</h2>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-[var(--muted)]">{t('featuredIntro')}</p>
        <div className="featured-grid mt-9">
          {featured.slice(1).map((pair) => {
            const project = pair[language]
            return (
              <article key={project.id} className="featured-card">
                <p className="console-status">{t(statusKey[project.status])}</p>
                <h3 className="mt-6">
                  <Link href={`/about/projects/${project.id}`}>{project.title}</Link>
                </h3>
                <p className="mt-4 leading-7 text-[var(--muted)]">{project.summary}</p>
                <Link
                  href={`/about/projects/${project.id}`}
                  className="console-link mt-auto self-start pt-6 text-sm"
                >
                  {t('viewProject')}
                </Link>
              </article>
            )
          })}
        </div>
      </section>
      <section className="home-section">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2>{t('currentLabs')}</h2>
          <Link href="/projects" className="console-link">
            {t('allLabs')}
          </Link>
        </div>
        <div className="mt-9 grid gap-4 md:grid-cols-2">
          {labs.map((source) => {
            const project = language === 'en' ? { ...source, ...source.en } : source
            return (
              <Link
                href={project.href ?? '/projects'}
                key={project.title}
                className="notebook-card lab-card"
              >
                <div className="flex items-center justify-between">
                  <span className="console-measure text-sm text-[var(--muted)]">{project.lab}</span>
                  <LabStatusBadge status={project.status} />
                </div>
                <h3 className="mt-8">{project.title}</h3>
                <p className="mt-4 leading-7 text-[var(--muted)]">{project.outcome}</p>
              </Link>
            )
          })}
        </div>
      </section>
      <section className="home-section">
        <h2>{t('evidenceOverview')}</h2>
        <p className="mt-4 max-w-3xl leading-7 text-[var(--muted)]">{t('evidenceOverviewIntro')}</p>
        <div className="mt-9">
          <CapabilityMap summaries={summaries} />
        </div>
      </section>
      <section className="home-section">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2>{t('latestNotes')}</h2>
          <Link href="/blog" className="console-link">
            {t('archive')}
          </Link>
        </div>
        <div className="mt-9 grid">
          {getVisiblePosts(posts, language)
            .slice(0, 5)
            .map((post) => (
              <NotebookCard key={post.slug} {...post} />
            ))}
        </div>
      </section>
    </div>
  )
}
