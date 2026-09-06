'use client'

import type { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import Link from '@/components/Link'
import LanguageSwitch from '@/components/LanguageSwitch'
import ThemeSwitch from '@/components/ThemeSwitch'
import SkipContent from '@/components/SkipContent'
import Icon from './Icon'
import { useAdventure } from './useAdventure'

export default function AdventureShell({ children }: { children: ReactNode }) {
  const path = usePathname()
  const { say } = useAdventure()
  const navigation = [
    ['/', '角色主页', 'Character'],
    ['/journal', '冒险日志', 'Journal'],
    ['/collection', '收藏室', 'Collection'],
    ['/achievements', '成就墙', 'Achievements'],
    ['/research', '技术档案', 'Research'],
  ]
  return (
    <div className="adventure-shell">
      <SkipContent />
      <div className="quest-container">
        <header className="quest-header">
          <Link
            href="/"
            className="quest-brand"
            aria-label={say('qiaoshilei 个人冒险存档', 'qiaoshilei personal adventure archive')}
          >
            <span className="quest-brand-mark">
              <Icon name="save" />
            </span>
            <span>
              QSL<span className="quest-brand-sub">PERSONAL ARCHIVE</span>
            </span>
          </Link>
          <nav aria-label={say('主导航', 'Main navigation')} className="quest-nav">
            {navigation.map(([href, zh, en]) => (
              <Link key={href} href={href} aria-current={path === href ? 'page' : undefined}>
                {say(zh, en)}
                {href === '/research' && <span aria-hidden="true"> ↗</span>}
              </Link>
            ))}
          </nav>
          <div className="quest-controls">
            <LanguageSwitch />
            <ThemeSwitch />
          </div>
        </header>
        <main id="main-content" tabIndex={-1} className="quest-main">
          {children}
        </main>
        <footer className="quest-footer">
          <span className="quest-kicker">
            <span aria-hidden="true">✦</span> QIAOSHILEI / PERSONAL ARCHIVE
          </span>
          <span>
            {say('人生是开放世界，记得享受支线。', 'Life is an open world. Enjoy the side quests.')}
          </span>
          <Link href="/research">{say('进入技术档案', 'Enter research archive')} ↗</Link>
        </footer>
      </div>
    </div>
  )
}
