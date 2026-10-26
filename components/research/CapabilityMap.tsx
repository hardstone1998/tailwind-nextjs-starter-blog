'use client'
import Link from '@/components/Link'
import { localizeDomain } from '@/data/siteConfig'
import { useLanguage } from '@/components/LanguageProvider'
import type { CapabilitySummary } from '@/lib/capability-view'
export default function CapabilityMap({ summaries }: { summaries: CapabilitySummary[] }) {
  const { language, t } = useLanguage()
  return (
    <ol className="grid gap-x-10 md:grid-cols-2">
      {summaries.map(({ domain: source, evidenceCount, coverage }) => {
        const domain = localizeDomain(source, language)
        return (
          <li key={domain.id}>
            <Link href={domain.route} className="notebook-card capability-row block h-full">
              <h3 className="text-xl font-medium text-[var(--ink)]">{domain.label}</h3>
              <p className="mt-3 leading-7 text-[var(--muted)]">{domain.description}</p>
              <div className="mt-5 flex flex-wrap gap-x-6 gap-y-1 text-sm font-semibold text-[var(--accent)]">
                <span>
                  {evidenceCount} {t('evidenceCount')}
                </span>
                <span>
                  {t('evidenceCoverage')} {coverage}%
                </span>
              </div>
              <p className="mt-2 text-xs leading-5 text-[var(--muted)]">{t('pendingReview')}</p>
              <span className="mt-4 block text-sm font-semibold underline underline-offset-4">
                {t('viewCapability')}
              </span>
            </Link>
          </li>
        )
      })}
    </ol>
  )
}
