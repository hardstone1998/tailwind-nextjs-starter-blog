'use client'

import type { Achievement } from '@/data/adventure/types'
import { useAdventure } from './useAdventure'
import Icon from './Icon'
import { EmptyState, PageHeading, SectionHeading } from './Primitives'

export default function Achievements({ items }: { items: Achievement[] }) {
  const { say, text } = useAdventure()
  return (
    <>
      <PageHeading
        code="MILESTONES / 04"
        title={say('成就墙', 'Small victories')}
        description={say(
          '不是排行榜。只是给那些「我做到了」的瞬间，留一个位置。',
          'Not a leaderboard. Just a place for the moments when you said: I did it.'
        )}
      />
      {!items.length ? (
        <section className="quest-panel quest-achievement-empty">
          <div className="quest-medallion" aria-hidden="true">
            <Icon name="trophy" />
          </div>
          <EmptyState
            icon="spark"
            title={say(
              '属于你的第一个成就，还没有被记录',
              'Your first achievement is yet to be recorded'
            )}
          >
            {say(
              '每一次出发，都有自己的意义。徽章可以晚一点再来。',
              'Every beginning matters. The badge can come later.'
            )}
          </EmptyState>
        </section>
      ) : (
        (['achieved', 'goal'] as const).map((status) => {
          const group = items
            .filter((item) => item.status === status)
            .sort((a, b) => (b.date || '').localeCompare(a.date || ''))
          return (
            <section key={status} className="quest-section">
              <SectionHeading
                code={status === 'achieved' ? 'UNLOCKED' : 'ON THE HORIZON'}
                title={say(
                  status === 'achieved' ? '已达成' : '待挑战',
                  status === 'achieved' ? 'Unlocked' : 'On the horizon'
                )}
              />
              {group.length ? (
                <div className="quest-achievement-grid">
                  {group.map((item) => (
                    <article key={item.id} className="quest-panel quest-achievement-card">
                      <span className="quest-medallion">
                        <Icon name={item.icon} />
                      </span>
                      <span className="quest-kicker">
                        {say(
                          item.status === 'achieved' ? '已达成' : '待挑战目标',
                          item.status === 'achieved' ? 'UNLOCKED' : 'A PERSONAL GOAL'
                        )}
                      </span>
                      <h3>{text(item.title)}</h3>
                      <p>{text(item.description)}</p>
                      {item.date && <time dateTime={item.date}>{item.date}</time>}
                    </article>
                  ))}
                </div>
              ) : (
                <p className="quest-muted">
                  {say('这里暂时没有记录。', 'Nothing recorded here yet.')}
                </p>
              )}
            </section>
          )
        })
      )}
    </>
  )
}
