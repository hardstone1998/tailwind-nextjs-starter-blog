'use client'
import { useLanguage } from './LanguageProvider'
export interface TocItem {
  value: string
  url: string
  depth: number
}
export default function ArticleReadingTools({ toc, minutes }: { toc: TocItem[]; minutes: number }) {
  const { t } = useLanguage()
  return (
    <div className="mt-5">
      <p className="text-sm text-[var(--muted)]">
        {Math.max(1, Math.ceil(minutes))} {t('readingMinutes')}
      </p>
      {toc.length > 0 && (
        <details className="mt-4 rounded border border-[var(--rule)] p-4 xl:hidden">
          <summary className="cursor-pointer font-semibold">{t('toc')}</summary>
          <TocList toc={toc} />
        </details>
      )}
    </div>
  )
}
export function TocList({ toc }: { toc: TocItem[] }) {
  return (
    <ol className="mt-3 space-y-2 text-sm">
      {toc.map((item) => (
        <li key={item.url} className={item.depth > 2 ? 'ml-3' : ''}>
          <a
            className="block py-1 leading-6 text-[var(--muted)] hover:text-[var(--accent)]"
            href={item.url}
          >
            {item.value}
          </a>
        </li>
      ))}
    </ol>
  )
}
export function DesktopToc({ toc }: { toc: TocItem[] }) {
  const { t } = useLanguage()
  return toc.length ? (
    <nav
      aria-label={t('toc')}
      className="hidden max-h-[75vh] overflow-y-auto xl:sticky xl:top-6 xl:block"
    >
      <h2 className="text-sm font-bold">{t('toc')}</h2>
      <TocList toc={toc} />
    </nav>
  ) : null
}
