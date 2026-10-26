'use client'

import Link from './Link'
import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'
import { useLanguage } from './LanguageProvider'

export default function Footer() {
  const { t } = useLanguage()
  return (
    <footer className="mt-16 border-t border-[var(--rule)]">
      <div className="grid gap-8 py-12 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start">
        <div>
          <Link href="/" className="text-xl font-semibold tracking-tight">
            {siteMetadata.title}
          </Link>
          <p className="mt-3 max-w-md text-sm leading-6 text-[var(--muted)]">{t('publicNotes')}</p>
        </div>
        <div className="flex gap-4">
          <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} size={6} />
          <SocialIcon kind="github" href={siteMetadata.github} size={6} />
        </div>
        <p className="border-t border-[var(--rule)] pt-5 text-sm text-[var(--muted)] sm:col-span-2">
          {siteMetadata.author} · © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  )
}
