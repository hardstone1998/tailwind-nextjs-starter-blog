'use client'
import Link from '@/components/Link'
import ResearchMeta from './ResearchMeta'
import { useLanguage } from '@/components/LanguageProvider'
interface Props {
  path: string
  date: string
  title: string
  summary?: string
  language?: string
  domains?: string[]
  lab?: string
  status?: string
  methods?: string[]
  outcome?: string
}
export default function NotebookCard(post: Props) {
  const { language, t } = useLanguage()
  const contentLanguage = post.language === 'en' ? 'en' : 'zh-CN'
  return (
    <article className="notebook-card group">
      <div className="flex flex-wrap gap-3 text-xs text-[var(--muted)]">
        <time dateTime={post.date}>
          {new Date(post.date).toLocaleDateString(language === 'zh' ? 'zh-CN' : 'en-US', {
            timeZone: 'UTC',
          })}
        </time>
        <span>
          {t('originalLanguage')}: {post.language === 'en' ? 'English' : '中文'}
        </span>
      </div>
      <h3 lang={contentLanguage} className="mt-3 text-xl font-bold tracking-tight sm:text-2xl">
        <Link href={`/${post.path}`} className="group-hover:text-[var(--accent)]">
          {post.title}
        </Link>
      </h3>
      {post.summary && (
        <p lang={contentLanguage} className="mt-3 leading-7 text-[var(--muted)]">
          {post.summary}
        </p>
      )}
      <div className="mt-4">
        <ResearchMeta domains={post.domains} status={post.status} compact />
      </div>
    </article>
  )
}
