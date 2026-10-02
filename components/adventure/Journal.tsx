'use client'

import { useState } from 'react'
import JournalCard from './JournalCard'
import type { JournalCategory, JournalEntry } from '@/data/adventure/types'
import { filterJournal } from '@/lib/adventure'
import { useAdventure } from './useAdventure'
import { EmptyState, PageHeading } from './Primitives'

const categories = [
  ['all', '全部', 'All'],
  ['fitness', '健身', 'Fitness'],
  ['cycling', '骑行', 'Cycling'],
  ['life', '生活', 'Life'],
  ['creative', '创造', 'Making'],
] as const

export function JournalList({ entries }: { entries: JournalEntry[] }) {
  const { say } = useAdventure()
  return (
    <div className="quest-journal-list">
      {entries.map((entry) => {
        const category = categories.find(([id]) => id === entry.category)!
        return <JournalCard key={entry.id} entry={entry} category={say(category[1], category[2])} />
      })}
    </div>
  )
}
export default function Journal({ entries }: { entries: JournalEntry[] }) {
  const [category, setCategory] = useState<JournalCategory | 'all'>('all')
  const { say } = useAdventure()
  const visible = filterJournal(entries, category)
  return (
    <>
      <PageHeading
        code="ADVENTURE LOG / 02"
        title={say('冒险日志', 'Adventure journal')}
        description={say(
          '训练、骑行、灵光一现。小事也值得占据一个存档位。',
          'Training, a ride, a small spark of an idea. Every moment has a save slot.'
        )}
      />
      <div
        className="quest-filters"
        role="group"
        aria-label={say('日志分类', 'Journal categories')}
      >
        {categories.map(([id, zh, en]) => (
          <button
            key={id}
            type="button"
            aria-pressed={category === id}
            onClick={() => setCategory(id)}
          >
            {say(zh, en)}
          </button>
        ))}
      </div>
      <section className="quest-panel" aria-live="polite">
        {visible.length ? (
          <JournalList entries={visible} />
        ) : (
          <EmptyState
            icon="save"
            title={say(
              category === 'all' ? '等待第一次存档' : '这个支线，还没有留下记录',
              category === 'all'
                ? 'Waiting for the first save'
                : 'No entries on this side quest yet'
            )}
          >
            {say(
              '不必等到发生大事。一段路、一次训练、一个想法，都算数。',
              'No milestone required. A short ride, a workout, an idea — they all count.'
            )}
          </EmptyState>
        )}
      </section>
    </>
  )
}
