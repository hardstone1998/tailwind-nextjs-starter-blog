import type { JournalCategory, JournalEntry, LifeText } from '@/data/adventure/types'

export function lifeText(value: LifeText, language: 'zh' | 'en') {
  return value[language] || value.zh || value.en || ''
}

export function latestFirst<T extends { id: string; date: string }>(items: readonly T[]): T[] {
  return [...items].sort((a, b) => b.date.localeCompare(a.date) || a.id.localeCompare(b.id))
}

export function filterJournal(entries: readonly JournalEntry[], category: JournalCategory | 'all') {
  return latestFirst(entries.filter((entry) => category === 'all' || entry.category === category))
}

export const adventureRoutes = ['/', '/journal', '/collection', '/achievements'] as const
export function isAdventureRoute(pathname: string) {
  // usePathname normally strips basePath; also support explicit prefixed paths in exports.
  const basePath = process.env.BASE_PATH || ''
  const path =
    basePath && (pathname === basePath || pathname.startsWith(`${basePath}/`))
      ? pathname.slice(basePath.length) || '/'
      : pathname
  return (adventureRoutes as readonly string[]).includes(path.replace(/\/$/, '') || '/')
}
