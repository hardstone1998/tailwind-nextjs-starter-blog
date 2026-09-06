'use client'

import { useState } from 'react'
import Image from '@/components/Image'
import type { CollectionItem } from '@/data/adventure/types'
import { latestFirst } from '@/lib/adventure'
import Icon from './Icon'
import { useAdventure } from './useAdventure'
import { EmptyState, PageHeading } from './Primitives'

export function CollectionCards({ items }: { items: CollectionItem[] }) {
  const { say, text } = useAdventure()
  const statuses = {
    want: [say('想看', 'Watchlist'), say('想玩', 'Wishlist')],
    watched: [say('看过', 'Watched')],
    playing: [say('在玩', 'Playing')],
    completed: [say('通关', 'Completed')],
    paused: [say('暂时搁置', 'On hold')],
  }
  return (
    <div className="quest-collection-grid">
      {items.map((item) => (
        <article key={item.id} className="quest-collection-card">
          <div className="quest-cover">
            {item.cover ? (
              <Image
                src={item.cover}
                alt={text(item.title)}
                width={360}
                height={480}
                sizes="(max-width: 600px) 80vw, 300px"
              />
            ) : (
              <div className="quest-cover-art">
                <Icon name={item.kind} />
                <span>{item.kind === 'film' ? 'MOVING PICTURES' : 'ANOTHER WORLD'}</span>
              </div>
            )}
          </div>
          <div className="quest-collection-copy">
            <span className="quest-chip">
              {item.status === 'want'
                ? statuses.want[item.kind === 'film' ? 0 : 1]
                : statuses[item.status][0]}
            </span>
            <h3>{text(item.title)}</h3>
            {item.note && <p>{text(item.note)}</p>}
            <time dateTime={item.date}>{item.date}</time>
          </div>
        </article>
      ))}
    </div>
  )
}

export function EmptyShelf({ kind }: { kind: 'film' | 'game' }) {
  const { say } = useAdventure()
  return (
    <div className="quest-shelf">
      <div className="quest-shelf-spines" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
        <i />
      </div>
      <EmptyState
        compact
        icon={kind}
        title={say(
          kind === 'film' ? '下一部，值得记住的电影' : '下一段，值得投入的冒险',
          kind === 'film' ? 'The next film to remember' : 'The next world to get lost in'
        )}
      >
        {say('书架空着，故事会慢慢填满。', 'An empty shelf. Plenty of stories to come.')}
      </EmptyState>
    </div>
  )
}

export default function Collection({ items }: { items: CollectionItem[] }) {
  const [kind, setKind] = useState<'film' | 'game'>('film')
  const { say } = useAdventure()
  const visible = latestFirst(items.filter((item) => item.kind === kind))
  return (
    <>
      <PageHeading
        code="PERSONAL COLLECTION / 03"
        title={say('收藏室', 'The collection')}
        description={say(
          '有些故事结束以后，还会在脑海里继续。这里留给它们。',
          'Some stories stay long after the credits. This is a place for them.'
        )}
      />
      <div className="quest-filters" role="group" aria-label={say('收藏类型', 'Collection type')}>
        <button type="button" aria-pressed={kind === 'film'} onClick={() => setKind('film')}>
          <Icon name="film" />
          {say('电影', 'Films')}
        </button>
        <button type="button" aria-pressed={kind === 'game'} onClick={() => setKind('game')}>
          <Icon name="game" />
          {say('游戏', 'Games')}
        </button>
      </div>
      <section className="quest-panel quest-collection-panel" aria-live="polite">
        {visible.length ? <CollectionCards items={visible} /> : <EmptyShelf kind={kind} />}
      </section>
    </>
  )
}
