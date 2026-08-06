'use client'

import { useLanguage } from './LanguageProvider'

export default function LanguageSwitch() {
  const { language, setLanguage, t } = useLanguage()
  const nextLanguage = language === 'zh' ? 'en' : 'zh'

  return (
    <button
      type="button"
      onClick={() => setLanguage(nextLanguage)}
      className="rounded border border-[var(--rule)] px-2 py-1 text-xs font-semibold text-[var(--muted)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
      aria-label={t('switchLanguage')}
    >
      {language === 'zh' ? 'EN' : '中文'}
    </button>
  )
}
