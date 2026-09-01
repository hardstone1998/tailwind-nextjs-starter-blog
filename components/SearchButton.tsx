'use client'
import { useLanguage } from './LanguageProvider'
import { useLocalSearch } from './SearchProvider'
export default function SearchButton() {
  const { t } = useLanguage()
  const { openSearch } = useLocalSearch()
  return (
    <button
      type="button"
      onClick={openSearch}
      aria-label={t('search')}
      className="flex h-11 w-11 items-center justify-center rounded text-[var(--muted)]"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className="h-5 w-5"
      >
        <circle cx="10" cy="10" r="6" />
        <path d="m15 15 6 6" />
      </svg>
    </button>
  )
}
