'use client'

import type { ReactNode } from 'react'
import Link from '@/components/Link'
import Icon from './Icon'
import { useAdventure } from './useAdventure'
import type { LifeIcon } from '@/data/adventure/types'

export function SectionHeading({
  code,
  title,
  href,
  action,
}: {
  code: string
  title: string
  href?: string
  action?: string
}) {
  return (
    <div className="quest-section-heading">
      <div>
        <span className="quest-kicker">{code}</span>
        <h2>{title}</h2>
      </div>
      {href && (
        <Link href={href} className="quest-text-link">
          {action}
          <span aria-hidden="true"> ↗</span>
        </Link>
      )}
    </div>
  )
}
export function EmptyState({
  icon,
  title,
  children,
  compact = false,
}: {
  icon: LifeIcon
  title: string
  children?: ReactNode
  compact?: boolean
}) {
  return (
    <div className={`quest-empty ${compact ? 'quest-empty-compact' : ''}`}>
      <span className="quest-empty-icon">
        <Icon name={icon} />
      </span>
      <h3>{title}</h3>
      {children && <p>{children}</p>}
    </div>
  )
}
export function PageHeading({
  code,
  title,
  description,
}: {
  code: string
  title: string
  description: string
}) {
  const { say } = useAdventure()
  return (
    <header className="quest-page-heading">
      <Link href="/" className="quest-text-link">
        ← {say('返回角色主页', 'Back to character')}
      </Link>
      <p className="quest-kicker">{code}</p>
      <h1>{title}</h1>
      <p>{description}</p>
    </header>
  )
}
