'use client'

import { useLanguage } from './LanguageProvider'
import { useRouter } from 'next/navigation'

export default function LanguageSwitch() {
  const { language, setLanguage, t, articlePaths } = useLanguage()
  const router = useRouter()
  const nextLanguage = language === 'zh' ? 'en' : 'zh'

  const switchLanguage = () => {
    setLanguage(nextLanguage)
    const translationPath = articlePaths[nextLanguage]
    if (translationPath) {
      router.push(`/${translationPath}`)
    }
  }

  return (
    <button
      type="button"
      onClick={switchLanguage}
      className="min-h-11 min-w-11 rounded border border-[var(--rule)] px-2 py-1 text-xs font-semibold text-[var(--muted)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
      aria-label={t('switchLanguage')}
    >
      {language === 'zh' ? 'EN' : '中文'}
    </button>
  )
}
