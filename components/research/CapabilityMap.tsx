'use client'
import Link from '@/components/Link'
import { localizeDomain } from '@/data/siteConfig'
import { useLanguage } from '@/components/LanguageProvider'
import type { CapabilitySummary } from '@/lib/capability-view'
export default function CapabilityMap({ summaries }: { summaries: CapabilitySummary[] }) {
  const { language, t } = useLanguage()
  return (
    <ol className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {summaries.map(({ domain: source, evidenceCount, coverage }, index) => {
        const domain = localizeDomain(source, language)
        return (
          <li key={domain.id}>
            <Link
              href={domain.route}
              className="notebook-card block h-full transition-colors hover:border-[var(--accent)]"
            >
              <span className="font-mono text-xs text-[var(--muted)]">0{index + 1}</span>
              <h3 className="mt-3 text-lg font-bold text-[var(--ink)]">{domain.label}</h3>
              <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{domain.description}</p>
              <p className="mt-5 text-sm font-semibold text-[var(--accent)]">
                {evidenceCount} {t('evidenceCount')} · {t('evidenceCoverage')} {coverage}%
              </p>
              <p className="mt-2 text-xs leading-5 text-[var(--muted)]">{t('pendingReview')}</p>
              <span className="mt-4 block text-sm font-semibold">{t('viewCapability')} →</span>
            </Link>
          </li>
        )
      })}
    </ol>
  )
}
