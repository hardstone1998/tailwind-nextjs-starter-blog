'use client'
import { useLanguage } from './LanguageProvider'
export default function SkipContent() {
  const { t } = useLanguage()
  return (
    <a
      href="#main-content"
      className="sr-only z-80 rounded bg-[var(--surface-raised)] p-4 text-[var(--accent)] focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
    >
      {t('skipContent')}
    </a>
  )
}
