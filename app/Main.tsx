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
type Featured = Pick<ProfessionalProject, 'id' | 'title' | 'summary' | 'status' | 'period'>
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
          <p className="mt-6 max-w-xl text-lg leading-8 text-[var(--muted)]">{t('homeIntro')}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={`/about/projects/${leadProject?.id ?? 'translation-quality-system'}`}
              className="console-button console-button--primary"
            >
              {t('viewProject')}
            </Link>
            <Link href="/blog" className="console-button">
              {t('readNotes')}
            </Link>
          </div>
        </div>
        {leadProject && (
          <article className="hero-record" aria-labelledby="lead-project-title">
            <div className="hero-record__top">
              <span>{t('featuredProjects')}</span>
              <span className="console-status">{t(statusKey[leadProject.status])}</span>
            </div>
            <div className="hero-record__main">
              <h2 id="lead-project-title">{leadProject.title}</h2>
              <p className="mt-3 max-w-lg leading-7">{leadProject.summary}</p>
            </div>
            <div className="hero-record__evidence">
              <p>
                {language === 'zh'
                  ? '项目记录的剧名推荐采用率'
                  : 'Project-reported title recommendation adoption'}
              </p>
              <div className="hero-record__readings">
                <div>
                  <strong>42%</strong>
                  <span>{language === 'zh' ? '初版多候选评估' : 'Initial candidate ranking'}</span>
                </div>
                <div>
                  <strong>70%</strong>
                  <span>{language === 'zh' ? '引入奖励模型后' : 'After reward model'}</span>
                </div>
              </div>
            </div>
            <div className="hero-record__foot">
              <span>
                {leadProject.period} /{' '}
                {language === 'zh'
                  ? '统计口径与样本范围待公开'
                  : 'Sample scope and methodology not yet public'}
              </span>
              <Link href={`/about/projects/${leadProject.id}`} className="hero-record__link">
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
