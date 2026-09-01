'use client'
import { useLanguage } from './LanguageProvider'
import Link from './Link'
import type { ProfessionalProject } from '@/data/professionalProjects'
export type ProjectPair = { zh: ProfessionalProject; en: ProfessionalProject }
const statuses = {
  completed: 'completed',
  iterating: 'iterating',
  'in-progress': 'inProgress',
  exploring: 'exploring',
} as const
export function ProjectTimeline({ projects }: { projects: ProjectPair[] }) {
  const { t, language } = useLanguage()
  return (
    <section
      className="mt-12 border-t border-[var(--rule)] pt-10"
      aria-labelledby="career-projects-title"
    >
      <h2 id="career-projects-title" className="text-3xl font-bold">
        {t('careerArchive')}
      </h2>
      <p className="mt-4 leading-7 text-[var(--muted)]">{t('careerIntro')}</p>
      <ol className="mt-8 space-y-5">
        {projects.map((pair) => {
          const p = pair[language]
          return (
            <li key={p.id} id={p.id} className="notebook-card">
              <div className="flex flex-wrap justify-between gap-3 text-sm">
                <span>{p.period}</span>
                <span className="font-semibold text-[var(--accent)]">{t(statuses[p.status])}</span>
              </div>
              <h3 className="mt-4 text-2xl font-bold">
                <Link href={`/about/projects/${p.id}`}>{p.title}</Link>
              </h3>
              <p className="mt-3 text-sm font-semibold">{p.role}</p>
              <p className="mt-3 leading-7 text-[var(--muted)]">{p.summary}</p>
              <details className="mt-5">
                <summary className="cursor-pointer py-2 font-semibold">
                  {t('responsibilities')}
                </summary>
                <ul className="mt-3 list-disc space-y-2 pl-5">
                  {p.responsibilities.map((r) => (
                    <li key={r}>{r}</li>
                  ))}
                </ul>
              </details>
              <Link
                href={`/about/projects/${p.id}`}
                className="mt-4 inline-block font-semibold text-[var(--accent)]"
              >
                {t('viewProject')} →
              </Link>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
export function ProjectDetail({ project }: { project: ProjectPair }) {
  const { t, language } = useLanguage()
  const p = project[language]
  return (
    <article className="py-10 sm:py-14">
      <Link href="/about" className="font-semibold text-[var(--accent)]">
        ← {t('backToAbout')}
      </Link>
      <header className="mt-8 border-b border-[var(--rule)] pb-8">
        <p className="section-label">
          {p.period} · {t(statuses[p.status])}
        </p>
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight">{p.title}</h1>
        <p className="mt-4 text-lg font-semibold text-[var(--accent)]">{p.role}</p>
        <p className="mt-5 max-w-3xl leading-8 text-[var(--muted)]">{p.summary}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {p.methods.map((m) => (
            <span className="rounded border border-[var(--rule)] px-2 py-1 text-xs" key={m}>
              {m}
            </span>
          ))}
        </div>
      </header>
      <p className="mt-6 text-sm leading-6 text-[var(--muted)]">{t('projectAccount')}</p>
      {p.background && (
        <section className="mt-10">
          <h2 className="text-2xl font-bold">{t('projectBackground')}</h2>
          <p className="mt-4 max-w-3xl leading-8 text-[var(--muted)]">{p.background}</p>
        </section>
      )}
      {p.architecture && (
        <section id="architecture" className="mt-10 scroll-mt-8">
          <h2 className="text-2xl font-bold">{t('architecture')}</h2>
          <ol className="mt-4 list-decimal space-y-3 pl-5 leading-7 text-[var(--muted)]">
            {p.architecture.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ol>
        </section>
      )}
      <section id="responsibilities" className="mt-10 scroll-mt-8">
        <h2 className="text-2xl font-bold">{t('responsibilityScope')}</h2>
        <ul className="mt-4 list-disc space-y-3 pl-5 leading-7 text-[var(--muted)]">
          {p.responsibilities.map((a) => (
            <li key={a}>{a}</li>
          ))}
        </ul>
      </section>
      {p.detailSections?.map((s, i) => (
        <section className="mt-10 scroll-mt-8" id={`detail-${i}`} key={i}>
          <h2 className="text-2xl font-bold">{s.title}</h2>
          {s.paragraphs.map((a) => (
            <p key={a} className="mt-4 max-w-3xl leading-8 text-[var(--muted)]">
              {a}
            </p>
          ))}
        </section>
      ))}
      {p.outcomes && (
        <section id="outcomes" className="mt-10 scroll-mt-8">
          <h2 className="text-2xl font-bold">{t('publicOutcomes')}</h2>
          <ul className="mt-4 list-disc space-y-3 pl-5 leading-7 text-[var(--muted)]">
            {p.outcomes.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </section>
      )}
      <section className="mt-10">
        <h2 className="text-2xl font-bold">{t('relatedPublicContent')}</h2>
        <ul className="mt-4 space-y-3">
          {[...(p.relatedBlogs ?? []), ...(p.relatedLabs ?? [])].map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="font-semibold text-[var(--accent)]">
                {l.title} →
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <aside className="notebook-card mt-10 text-sm leading-6 text-[var(--muted)]">
        {p.confidentialityNotice}
      </aside>
    </article>
  )
}
