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
  const statusKey = {
    completed: 'completed',
    iterating: 'iterating',
    'in-progress': 'inProgress',
    exploring: 'exploring',
  } as const
  return (
    <div className="pb-12">
      <section className="notebook-grid border-b border-[var(--rule)] py-14 sm:py-20">
        <p className="section-label">Public research notebook</p>
        <h1 className="mt-5 max-w-4xl text-4xl leading-tight font-extrabold tracking-tight sm:text-5xl xl:text-6xl">
          {t('homeHero')}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--muted)]">{t('homeIntro')}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/projects"
            className="rounded-md bg-[var(--ink)] px-4 py-3 text-sm font-semibold text-[var(--surface)]"
          >
            {t('activeLabs')}
          </Link>
          <Link
            href="/blog"
            className="rounded-md border border-[var(--rule)] bg-[var(--surface-raised)] px-4 py-3 text-sm font-semibold"
          >
            {t('readNotes')}
          </Link>
        </div>
      </section>
      <section className="py-12 sm:py-16">
        <p className="section-label">{t('featuredProjects')}</p>
        <h2 className="mt-3 text-3xl font-bold">{t('featuredIntro')}</h2>
        <div className="mt-7 grid gap-4 lg:grid-cols-3">
          {featured.map((pair) => {
            const project = pair[language]
            return (
              <article key={project.id} className="notebook-card flex flex-col">
                <p className="text-xs font-semibold text-[var(--accent)]">
                  {t(statusKey[project.status])}
                </p>
                <h3 className="mt-4 text-xl font-bold">
                  <Link href={`/about/projects/${project.id}`}>{project.title}</Link>
                </h3>
                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{project.summary}</p>
                <Link
                  href={`/about/projects/${project.id}`}
                  className="mt-auto pt-5 text-sm font-semibold text-[var(--accent)]"
                >
                  {t('viewProject')} →
                </Link>
              </article>
            )
          })}
        </div>
      </section>
      <section className="border-t border-[var(--rule)] py-12">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-3xl font-bold">{t('currentLabs')}</h2>
          <Link href="/projects" className="font-semibold text-[var(--accent)]">
            {t('allLabs')}
          </Link>
        </div>
        <div className="mt-7 grid gap-4 md:grid-cols-2">
          {labs.map((source) => {
            const project = language === 'en' ? { ...source, ...source.en } : source
            return (
              <Link
                href={project.href ?? '/projects'}
                key={project.title}
                className="notebook-card block"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs">{project.lab}</span>
                  <LabStatusBadge status={project.status} />
                </div>
                <h3 className="mt-4 text-xl font-bold">{project.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{project.outcome}</p>
              </Link>
            )
          })}
        </div>
      </section>
      <section className="border-y border-[var(--rule)] py-12">
        <p className="section-label">{t('capabilityDomain')}</p>
        <h2 className="mt-3 text-3xl font-bold">{t('evidenceOverview')}</h2>
        <p className="mt-4 max-w-3xl leading-7 text-[var(--muted)]">{t('evidenceOverviewIntro')}</p>
        <div className="mt-7">
          <CapabilityMap summaries={summaries} />
        </div>
      </section>
      <section className="py-12">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-3xl font-bold">{t('latestNotes')}</h2>
          <Link href="/blog" className="font-semibold text-[var(--accent)]">
            {t('archive')}
          </Link>
        </div>
        <div className="mt-7 grid gap-4">
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
