'use client'

import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Logo from '@/data/logo.svg'
import Link from './Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import SearchButton from './SearchButton'
import LanguageSwitch from './LanguageSwitch'
import { useLanguage } from './LanguageProvider'

const Header = () => {
  const { language } = useLanguage()
  let headerClass =
    'flex w-full items-center justify-between gap-4 border-b border-[var(--rule)] py-5 sm:py-6'
  if (siteMetadata.stickyNav) {
    headerClass += ' sticky top-0 z-50'
  }

  return (
    <header className={headerClass}>
      <Link href="/" aria-label={siteMetadata.headerTitle}>
        <div className="flex items-center justify-between">
          <div className="mr-2 shrink-0">
            <Logo />
          </div>
          {typeof siteMetadata.headerTitle === 'string' ? (
            <div className="hidden max-w-48 text-base leading-5 font-bold tracking-tight text-[var(--ink)] sm:block">
              {siteMetadata.headerTitle}
            </div>
          ) : (
            siteMetadata.headerTitle
          )}
        </div>
      </Link>
      <div className="flex shrink-0 items-center gap-1 leading-5 lg:gap-3">
        <nav
          aria-label={language === 'zh' ? '主导航' : 'Main navigation'}
          className="hidden items-center gap-3 xl:flex"
        >
          {headerNavLinks
            .filter((link) => link.href !== '/')
            .map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-1 py-3 text-sm font-medium whitespace-nowrap text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
              >
                {link.title[language]}
              </Link>
            ))}
        </nav>
        <SearchButton />
        <LanguageSwitch />
        <ThemeSwitch />
        <MobileNav />
      </div>
    </header>
  )
}

export default Header
