'use client'
import { useLanguage } from './LanguageProvider'
import Link from './Link'
import { getVisibleTagCounts, type LanguageAwarePost } from '@/lib/blog-language'
export default function TopicsContent({ posts }: { posts: LanguageAwarePost[] }) {
  const { language, t } = useLanguage()
  const counts = getVisibleTagCounts(posts, language)
  const tags = Object.keys(counts).sort((a, b) => counts[b] - counts[a] || a.localeCompare(b))
  return (
    <div className="py-12">
      <p className="section-label">{t('researchArchive')}</p>
      <h1 className="mt-3 text-4xl font-extrabold">{t('allTopics')}</h1>
      <ul className="mt-8 flex flex-wrap gap-3">
        {tags.map((tag) => (
          <li key={tag}>
            <Link
              href={`/tags/${tag}`}
              className="inline-block rounded border border-[var(--rule)] px-4 py-3 text-[var(--accent)]"
            >
              {tag} ({counts[tag]})
            </Link>
          </li>
        ))}
      </ul>
      {!tags.length && <p>{t('noTopics')}</p>}
    </div>
  )
}
