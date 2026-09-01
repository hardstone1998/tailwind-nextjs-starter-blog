'use client'
import Link from '@/components/Link'
import NotebookCard from '@/components/research/NotebookCard'
import { type CapabilityDomain, getAssessmentRoute, localizeDomain } from '@/data/siteConfig'
import { useLanguage } from './LanguageProvider'
import { getVisiblePosts } from '@/lib/blog-language'
import type { Blog } from 'contentlayer/generated'
import type { CoreContent } from 'pliny/utils/contentlayer'
import type { AssessmentView } from '@/lib/capability-view'
export default function SkillDomainPageClient({
  domain: source,
  relatedPosts,
  view,
}: {
  domain: CapabilityDomain
  relatedPosts: CoreContent<Blog>[]
  view: Pick<AssessmentView, 'evidence' | 'result'>
}) {
  const { t, language } = useLanguage()
  const domain = localizeDomain(source, language)
  const visiblePosts = getVisiblePosts(relatedPosts, language).slice(0, 10)
  return (
    <div className="py-10 sm:py-14">
      <p className="section-label">{t('capabilityDomain')}</p>
      <h1 className="mt-4 text-4xl font-extrabold tracking-tight">{domain.label}</h1>
      <p className="mt-5 max-w-3xl text-lg leading-8 text-[var(--muted)]">{domain.description}</p>
      <Link
        href={getAssessmentRoute(domain)}
        className="mt-5 inline-block font-semibold text-[var(--accent)]"
      >
        {t('assessmentDetails')} →
      </Link>
      <section className="mt-10 max-w-3xl border-t border-[var(--rule)] pt-8">
        <h2 className="text-2xl font-bold">{t('profile')}</h2>
        {domain.introduction.map((p) => (
          <p className="mt-4 leading-8 text-[var(--muted)]" key={p}>
            {p}
          </p>
        ))}
      </section>
      <section className="mt-10 max-w-3xl">
        <h2 className="text-2xl font-bold">{t('capabilityClaim')}</h2>
        <p className="mt-4 leading-8 text-[var(--muted)]">{domain.claim}</p>
      </section>
      <section className="mt-10">
        <h2 className="text-2xl font-bold">{t('evidence')}</h2>
        <ol className="mt-6 grid gap-4 md:grid-cols-2">
          {view.evidence.map((e) => (
            <li className="notebook-card" key={e.id}>
              <Link href={e.href} className="font-semibold text-[var(--accent)]">
                {e.title[language]} →
              </Link>
              <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{e.limitation[language]}</p>
            </li>
          ))}
        </ol>
      </section>
      <section className="notebook-card mt-10">
        <h2 className="text-2xl font-bold">{t('assessment')}</h2>
        <p className="mt-3 font-semibold">{t('pendingReview')}</p>
        <p className="mt-3">
          {t('provisionalScore')}:{' '}
          {view.result.total === null ? t('pendingAssessment') : `${view.result.total}/100`} ·{' '}
          {t('evidenceCoverage')}: {view.result.coverage}%
        </p>
        <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{t('reviewScope')}</p>
        <Link
          href={getAssessmentRoute(domain)}
          className="mt-4 inline-block font-semibold text-[var(--accent)]"
        >
          {t('assessmentDetails')} →
        </Link>
      </section>
      <section className="mt-10 max-w-3xl">
        <h2 className="text-2xl font-bold">
          {t('nextAction')} · {domain.nextAction.title}
        </h2>
        <p className="mt-4 leading-7 text-[var(--muted)]">{domain.nextAction.description}</p>
      </section>
      <section className="mt-12">
        <h2 className="text-2xl font-bold">{t('relatedPublicContent')}</h2>
        <div className="mt-6 grid gap-4">
          {visiblePosts.map((post) => (
            <NotebookCard key={post.path} {...post} />
          ))}
          {visiblePosts.length === 0 && <p>{t('noContent')}</p>}
        </div>
      </section>
    </div>
  )
}
