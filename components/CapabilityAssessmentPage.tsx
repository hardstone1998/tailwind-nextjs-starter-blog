'use client'
import Link from '@/components/Link'
import { useLanguage } from './LanguageProvider'
import { localizeDomain, type CapabilityDomain } from '@/data/siteConfig'
import type { AssessmentView } from '@/lib/capability-view'
export default function CapabilityAssessmentPage({
  domain: source,
  view,
}: {
  domain: CapabilityDomain
  view: AssessmentView
}) {
  const { language, t } = useLanguage()
  const domain = localizeDomain(source, language)
  const { rubric, assessment, evidence, result } = view
  return (
    <div className="py-10 sm:py-14">
      <Link href={domain.route} className="text-sm font-semibold text-[var(--accent)]">
        ← {t('backTo')} {domain.label}
      </Link>
      <header className="mt-8 max-w-3xl">
        <p className="section-label">Rubric · {rubric.version}</p>
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
          {domain.label} · {t('assessmentDetails')}
        </h1>
        <p className="mt-5 font-semibold text-[var(--accent)]">{t('pendingReview')}</p>
        <p className="mt-4 leading-7 text-[var(--muted)]">{t('reviewScope')}</p>
        <dl className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="notebook-card">
            <dt>{t('provisionalScore')}</dt>
            <dd className="mt-2 font-mono text-3xl">
              {result.total === null ? t('pendingAssessment') : `${result.total}/100`}
            </dd>
          </div>
          <div className="notebook-card">
            <dt>{t('evidenceCoverage')}</dt>
            <dd className="mt-2 font-mono text-3xl">{result.coverage}%</dd>
          </div>
        </dl>
        <p className="mt-4 text-sm text-[var(--muted)]">
          {t('materialCutoff')}: {assessment.materialCutoff}
        </p>
        <p className="mt-5 leading-7 text-[var(--muted)]">{t('scoringFormula')}</p>
        <p className="mt-2 leading-7 text-[var(--muted)]">{t('levelZero')}</p>
      </header>
      <section className="mt-12 space-y-6" aria-label={t('assessment')}>
        {rubric.dimensions.map((d) => {
          const rating = assessment.ratings.find((r) => r.dimensionId === d.id)!
          return (
            <article className="notebook-card" key={d.id}>
              <h2 className="text-xl font-bold">
                {d.label[language]}{' '}
                <span className="font-mono text-[var(--accent)]">{d.weight}%</span>
              </h2>
              <p className="mt-4 font-semibold">
                {t('ratingRationale')} ·{' '}
                {rating.level === null ? t('pendingAssessment') : `L${rating.level}`}
              </p>
              <p className="mt-2 leading-7 text-[var(--muted)]">{rating.rationale[language]}</p>
              <ul className="mt-3 flex flex-wrap gap-3 text-sm">
                {rating.evidenceIds.map((id) => (
                  <li key={id}>
                    <a href={`#evidence-${id}`} className="text-[var(--accent)] underline">
                      {evidence.find((e) => e.id === id)!.title[language]}
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm leading-6">
                <strong>{t('nextLevelGap')}: </strong>
                {rating.nextLevelGap[language]}
              </p>
              <ol className="mt-6 grid gap-3 md:grid-cols-2">
                {d.levels.map((level, index) => (
                  <li
                    key={index}
                    className={`rounded-md border p-4 text-sm leading-6 ${rating.level === index + 1 ? 'border-[var(--accent)] bg-[var(--surface)]' : 'border-[var(--rule)]'}`}
                  >
                    <strong className="mr-2 font-mono">L{index + 1}</strong>
                    {level[language]}
                  </li>
                ))}
              </ol>
            </article>
          )
        })}
      </section>
      <section className="mt-12" aria-labelledby="assessment-evidence">
        <h2 id="assessment-evidence" className="text-2xl font-bold">
          {t('evidence')}
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {evidence.map((e) => (
            <article key={e.id} id={`evidence-${e.id}`} className="notebook-card scroll-mt-8">
              <h3 className="font-bold">
                <Link href={e.href} className="text-[var(--accent)] underline">
                  {e.title[language]} →
                </Link>
              </h3>
              <p className="mt-3 text-sm">{e.section[language]}</p>
              <p className="mt-3 text-sm font-semibold">
                {t('evidenceType')}:{' '}
                {t(
                  e.kind === 'author-account'
                    ? 'authorAccount'
                    : e.kind === 'code-and-experiment'
                      ? 'codeExperiment'
                      : 'independentlyVerified'
                )}
              </p>
              <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                {e.responsibility[language]}
              </p>
              <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                <strong>{t('evidenceLimit')}: </strong>
                {e.limitation[language]}
              </p>
              <p className="mt-3 font-mono text-xs text-[var(--muted)]">{e.sourceVersion}</p>
            </article>
          ))}
        </div>
      </section>
      <aside className="mt-10 space-y-3 border-t border-[var(--rule)] pt-6 text-sm leading-6 text-[var(--muted)]">
        <p>{t('reviewNext')}</p>
        <p>{t('assessmentHistory')}</p>
      </aside>
    </div>
  )
}
