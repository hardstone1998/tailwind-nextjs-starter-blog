'use client'

import { useState } from 'react'
import Image from '@/components/Image'
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
  const { say, text } = useAdventure()
  return (
    <div className="quest-journal-list">
      {entries.map((entry) => {
        const category = categories.find(([id]) => id === entry.category)!
        return (
          <article key={entry.id} className="quest-journal-entry">
            <div className="quest-entry-meta">
              <time dateTime={entry.date}>{entry.date}</time>
              <span className="quest-chip">{say(category[1], category[2])}</span>
            </div>
            <div>
              <h3>{text(entry.title)}</h3>
              <details>
                <summary>
                  {say('展开这次存档', 'Read this entry')} <span aria-hidden="true">＋</span>
                </summary>
                <div className="quest-entry-body">
                  <p>{text(entry.text)}</p>
                  {entry.image && (
                    <Image
                      src={entry.image.src}
                      alt={text(entry.image.alt)}
                      width={960}
                      height={640}
                      sizes="(max-width: 700px) 90vw, 800px"
                    />
                  )}
                  {!!entry.metrics?.length && (
                    <dl className="quest-metrics">
                      {entry.metrics.map((metric, index) => (
                        <div key={index}>
                          <dt>{text(metric.label)}</dt>
                          <dd>
                            {metric.value} {metric.unit}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  )}
                  {entry.images?.map((image) => (
                    <Image
                      key={image.src}
                      src={image.src}
                      alt={text(image.alt)}
                      width={image.width}
                      height={image.height}
                      sizes="(max-width: 700px) 90vw, 800px"
                    />
                  ))}
                </div>
              </details>
            </div>
          </article>
        )
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
