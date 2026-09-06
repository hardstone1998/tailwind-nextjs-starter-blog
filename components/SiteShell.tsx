'use client'

import type { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { isAdventureRoute } from '@/lib/adventure'
import AdventureShell from './adventure/AdventureShell'

export default function SiteShell({
  children,
  legacy,
}: {
  children: ReactNode
  legacy: ReactNode
}) {
  const pathname = usePathname()
  return isAdventureRoute(pathname) ? <AdventureShell>{children}</AdventureShell> : legacy
}
