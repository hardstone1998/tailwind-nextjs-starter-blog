export type LifeText = { zh: string; en?: string } | { zh?: string; en: string }
export type JournalCategory = 'fitness' | 'cycling' | 'life' | 'creative'
export type LifeIcon =
  | 'strength'
  | 'bike'
  | 'book'
  | 'spark'
  | 'compass'
  | 'film'
  | 'game'
  | 'trophy'
  | 'save'
export interface Metric {
  label: LifeText
  value: string
  unit?: string
}
export interface JournalEntry {
  id: string
  date: string
  category: JournalCategory
  title: LifeText
  text: LifeText
  image?: { src: string; alt: LifeText }
  metrics?: Metric[]
  exploration?: boolean
}
export interface PersonalRecord {
  id: string
  category: 'fitness' | 'cycling'
  title: LifeText
  value: string
  unit: string
  date: string
  note?: LifeText
}
interface CollectionBase {
  id: string
  title: LifeText
  date: string
  cover?: string
  note?: LifeText
}
export type CollectionItem = CollectionBase &
  (
    | { kind: 'film'; status: 'want' | 'watched' }
    | { kind: 'game'; status: 'want' | 'playing' | 'completed' | 'paused' }
  )
interface AchievementBase {
  id: string
  title: LifeText
  description: LifeText
  icon: LifeIcon
}
export type Achievement = AchievementBase &
  ({ status: 'achieved'; date: string } | { status: 'goal'; date?: never })
