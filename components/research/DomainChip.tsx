'use client'

import Link from '@/components/Link'
import { domainById, DomainId, localizeDomain } from '@/data/siteConfig'
import { useLanguage } from '@/components/LanguageProvider'

const englishLabels: Partial<Record<DomainId, string>> = {
  'model-research': 'Model Research',
  'systems-engineering': 'Systems',
  'multimodal-intelligence': 'Multimodal',
  'learning-practice': 'Learning',
  'product-thinking': 'Product',
  'open-source-writing': 'Open Source',
}

export function isDomainId(value: string): value is DomainId {
  return value in domainById
}

export default function DomainChip({ domainId }: { domainId: string }) {
  const { language } = useLanguage()
  if (!isDomainId(domainId)) return null
  const domain = localizeDomain(domainById[domainId], language)
  return (
    <Link
      href={domain.route}
      className="topic-chip inline-flex items-center border px-2.5 py-1 text-xs font-medium transition-colors"
    >
      {language === 'en' ? (englishLabels[domainId] ?? domain.shortLabel) : domain.shortLabel}
    </Link>
  )
}
