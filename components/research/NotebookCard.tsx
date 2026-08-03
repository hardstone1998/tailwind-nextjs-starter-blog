import { formatDate } from 'pliny/utils/formatDate'
import Link from '@/components/Link'
import ResearchMeta from './ResearchMeta'
import siteMetadata from '@/data/siteMetadata'

interface NotebookCardProps {
  path: string
  date: string
  title: string
  summary?: string
  domains?: string[]
  lab?: string
  status?: string
  methods?: string[]
  outcome?: string
}

export default function NotebookCard({
  path,
  date,
  title,
  summary,
  domains,
  lab,
  status,
  methods,
  outcome,
}: NotebookCardProps) {
  return (
    <article className="notebook-card group">
      <time
        className="text-xs font-semibold tracking-[0.14em] text-[var(--muted)] uppercase"
        dateTime={date}
      >
        {formatDate(date, siteMetadata.locale)}
      </time>
      <h3 className="mt-3 text-xl font-bold tracking-tight text-[var(--ink)] sm:text-2xl">
        <Link href={`/${path}`} className="transition-colors group-hover:text-[var(--accent)]">
          {title}
        </Link>
      </h3>
      {summary && <p className="mt-3 leading-7 text-[var(--muted)]">{summary}</p>}
      <div className="mt-4">
        <ResearchMeta
          domains={domains}
          lab={lab}
          status={status}
          methods={methods}
          outcome={outcome}
          compact
        />
      </div>
    </article>
  )
}
