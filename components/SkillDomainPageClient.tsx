'use client'

import Link from '@/components/Link'
import NotebookCard from '@/components/research/NotebookCard'
import ResearchMeta from '@/components/research/ResearchMeta'
import SectionLabel from '@/components/research/SectionLabel'
import { type CapabilityDomain, getAssessmentRoute } from '@/data/siteConfig'
import { useLanguage } from './LanguageProvider'
import { getVisiblePosts } from '@/lib/blog-language'
import type { Blog } from 'contentlayer/generated'

export default function SkillDomainPageClient({
  domain,
  relatedPosts,
}: {
  domain: CapabilityDomain
  relatedPosts: Blog[]
}) {
  const { t, language } = useLanguage()
  const visiblePosts = getVisiblePosts(relatedPosts, language)

  return (
    <div className="py-10 sm:py-14">
      <SectionLabel>{t('capabilityDomain')}</SectionLabel>
      <div className="mt-4 max-w-3xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h1 className="text-4xl font-extrabold tracking-tight text-[var(--ink)] sm:text-5xl">
            {domain.label}
          </h1>
          <div className="shrink-0 text-right">
            <span className="block font-mono text-2xl font-semibold text-[var(--accent)]">
              {domain.score}/100
            </span>
            <Link
              href={getAssessmentRoute(domain)}
              className="mt-2 inline-block text-sm font-semibold text-[var(--accent)] hover:underline"
            >
              {t('assessmentDetails')} →
            </Link>
          </div>
        </div>
        <p className="mt-5 text-lg leading-8 text-[var(--muted)]">{domain.description}</p>
        <div className="mt-6">
          <ResearchMeta domains={[domain.id]} compact />
        </div>
      </div>
      <section className="mt-12 border-t border-[var(--rule)] pt-8">
        <SectionLabel>{t('profile')}</SectionLabel>
        <h2 className="mt-2 text-2xl font-bold text-[var(--ink)]">{t('profile')}</h2>
        <div className="mt-4 max-w-3xl space-y-4 text-lg leading-8 text-[var(--muted)]">
          {domain.introduction.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>
      <section className="mt-14 border-t border-[var(--rule)] pt-8">
        <SectionLabel>{t('capabilityClaim')}</SectionLabel>
        <h2 className="mt-2 text-2xl font-bold text-[var(--ink)]">{t('capabilityClaim')}</h2>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-[var(--muted)]">{domain.claim}</p>
      </section>
      <section className="mt-14 border-t border-[var(--rule)] pt-8">
        <SectionLabel>{t('evidence')}</SectionLabel>
        <h2 className="mt-2 text-2xl font-bold text-[var(--ink)]">{t('evidence')}</h2>
        {domain.evidence.length ? (
          <ol className="mt-6 grid gap-4 md:grid-cols-2">
            {domain.evidence.map((item) => (
              <li key={item.title}>
                <Link href={item.href} className="notebook-card block h-full">
                  <h3 className="font-bold">{item.title}</h3>
                  <p className="mt-3 text-[var(--muted)]">{item.summary}</p>
                </Link>
              </li>
            ))}
          </ol>
        ) : (
          <p className="mt-5 text-[var(--muted)]">{domain.nextAction.description}</p>
        )}
      </section>
      <section className="mt-14 border-t border-[var(--rule)] pt-8">
        <SectionLabel>{t('assessment')}</SectionLabel>
        <h2 className="mt-2 text-2xl font-bold text-[var(--ink)]">{t('assessment')}</h2>
        <div className="notebook-card mt-6 max-w-3xl">
          <p className="font-semibold">{domain.scoreRationale.disclosure}</p>
          <p className="mt-4 text-[var(--muted)]">{domain.scoreRationale.evidenceBasis}</p>
        </div>
      </section>
      <section className="mt-14 border-t border-[var(--rule)] pt-8">
        <SectionLabel>{t('blogTitle')}</SectionLabel>
        <h2 className="mt-2 text-2xl font-bold text-[var(--ink)]">{t('relatedPublicContent')}</h2>
        <div className="mt-6 grid gap-4">
          {visiblePosts.map((post) => (
            <NotebookCard
              key={post.path}
              path={post.path}
              date={post.date}
              title={post.title}
              summary={post.summary}
              domains={post.domains}
              lab={post.lab}
              status={post.status}
              methods={post.methods}
              outcome={post.outcome}
            />
          ))}
        </div>
      </section>
    </div>
  )
}
