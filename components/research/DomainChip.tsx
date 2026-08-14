'use client'

import Link from '@/components/Link'
import { domainById, DomainId } from '@/data/siteConfig'
import { useLanguage } from '@/components/LanguageProvider'

const accentClasses = {
  blue: 'border-blue-500/30 bg-blue-500/10 text-blue-700 dark:text-blue-300',
  emerald: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300',
  violet: 'border-violet-500/30 bg-violet-500/10 text-violet-700 dark:text-violet-300',
  amber: 'border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300',
  rose: 'border-rose-500/30 bg-rose-500/10 text-rose-700 dark:text-rose-300',
  cyan: 'border-cyan-500/30 bg-cyan-500/10 text-cyan-700 dark:text-cyan-300',
}

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
  const domain = domainById[domainId]
  return (
    <Link
      href={domain.route}
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold tracking-wide transition-colors hover:brightness-90 dark:hover:brightness-125 ${accentClasses[domain.accent]}`}
    >
      {language === 'en' ? (englishLabels[domainId] ?? domain.shortLabel) : domain.shortLabel}
    </Link>
  )
}
