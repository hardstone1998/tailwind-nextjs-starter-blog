import { LabStatus, labStatusLabels } from '@/data/siteConfig'

const statusClasses: Record<LabStatus, string> = {
  active: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300',
  iterating: 'border-blue-500/30 bg-blue-500/10 text-blue-700 dark:text-blue-300',
  archived: 'border-gray-400/30 bg-gray-500/10 text-gray-600 dark:text-gray-300',
}

export default function LabStatusBadge({ status }: { status?: string }) {
  if (!status || !(status in labStatusLabels)) return null
  const knownStatus = status as LabStatus
  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${statusClasses[knownStatus]}`}
    >
      {labStatusLabels[knownStatus]}
    </span>
  )
}
