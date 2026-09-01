'use client'
import Link from '@/components/Link'
import { useLanguage } from '@/components/LanguageProvider'
export default function NotFound() {
  const { t } = useLanguage()
  return (
    <div className="py-24">
      <p className="section-label">404</p>
      <h1 className="mt-4 text-4xl font-bold">{t('notFoundTitle')}</h1>
      <p className="mt-5 text-[var(--muted)]">{t('notFoundBody')}</p>
      <Link href="/" className="mt-6 inline-block font-semibold text-[var(--accent)]">
        {t('backHome')} →
      </Link>
    </div>
  )
}
