import DomainChip from './DomainChip'
import LabStatusBadge from './LabStatusBadge'

interface ResearchMetaProps {
  domains?: string[]
  lab?: string
  status?: string
  methods?: string[]
  outcome?: string
  compact?: boolean
}

export default function ResearchMeta({
  domains = [],
  lab,
  status,
  methods = [],
  outcome,
  compact = false,
}: ResearchMetaProps) {
  const hasContext = domains.length || lab || status || methods.length || outcome
  if (!hasContext) return null

  return (
    <div className={compact ? 'flex flex-wrap items-center gap-2' : 'space-y-3'}>
      {(lab || status || domains.length > 0) && (
        <div className="flex flex-wrap items-center gap-2">
          {lab && (
            <span className="font-mono text-xs font-semibold tracking-wide text-[var(--muted)]">
              {lab}
            </span>
          )}
          <LabStatusBadge status={status} />
          {domains.map((domain) => (
            <DomainChip key={domain} domainId={domain} />
          ))}
        </div>
      )}
      {!compact && methods.length > 0 && (
        <p className="text-sm leading-6 text-[var(--muted)]">方法：{methods.join(' · ')}</p>
      )}
      {!compact && outcome && (
        <p className="text-sm leading-6 text-[var(--muted)]">结果：{outcome}</p>
      )}
    </div>
  )
}
