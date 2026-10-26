'use client'

import { LabStatus, labStatusLabels } from '@/data/siteConfig'
import { useLanguage } from '@/components/LanguageProvider'

const statusClasses: Record<LabStatus, string> = {
  active: 'lab-status--active',
  iterating: 'lab-status--iterating',
  archived: 'lab-status--archived',
}

const englishLabels: Record<LabStatus, string> = {
  active: 'Active',
  iterating: 'Iterating',
  archived: 'Archived',
}

export default function LabStatusBadge({ status }: { status?: string }) {
  const { language } = useLanguage()
  if (!status || !(status in labStatusLabels)) return null
  const knownStatus = status as LabStatus
  return (
    <span
      className={`lab-status inline-flex border px-2.5 py-1 text-xs font-medium ${statusClasses[knownStatus]}`}
    >
      {language === 'en' ? englishLabels[knownStatus] : labStatusLabels[knownStatus]}
    </span>
  )
}
