'use client'

import { useState } from 'react'
import Link from '@/components/Link'
import { profile } from '@/data/adventure/profile'
import { journalEntries } from '@/data/adventure/journal'
import { personalRecords } from '@/data/adventure/records'
import { collectionItems } from '@/data/adventure/collection'
import { latestFirst } from '@/lib/adventure'
import type { LifeIcon } from '@/data/adventure/types'
import { useAdventure } from './useAdventure'
import PixelPortrait from './PixelPortrait'
import StrengthGym from './StrengthGym'
import Icon from './Icon'
import { EmptyState, SectionHeading } from './Primitives'
import { JournalList } from './Journal'
import { CollectionCards, EmptyShelf } from './Collection'

export default function AdventureHome({
  noteCount,
  labCount,
}: {
  noteCount: number
  labCount: number
}) {
  const { say, text } = useAdventure()
  const [dialogue, setDialogue] = useState(0)
  const unknown = say('等待记录', 'Not recorded')
  const fitnessRecords = latestFirst(personalRecords.filter((r) => r.category === 'fitness'))
  const cyclingRecords = latestFirst(personalRecords.filter((r) => r.category === 'cycling'))
  const explorationCount = journalEntries.filter((entry) => entry.exploration).length
  const attributes: {
    icon: LifeIcon
    code: string
    title: string
    value: string
    detail: string
    href: string
  }[] = [
    {
      icon: 'strength',
      code: 'STR',
      title: say('力量', 'Strength'),
      value: `${fitnessRecords.length} ${say('项动作已存档', 'moves saved')}`,
      detail: say('进入训练馆 →', 'Enter the training room →'),
      href: '#strength-gym',
    },
    {
      icon: 'bike',
      code: 'END',
      title: say('耐力', 'Endurance'),
      value: cyclingRecords[0] ? `${cyclingRecords[0].value} ${cyclingRecords[0].unit}` : unknown,
      detail: cyclingRecords[0]
        ? text(cyclingRecords[0].title)
        : say('每一公里，都算数', 'Every kilometer counts'),
      href: '#personal-records',
    },
    {
      icon: 'book',
      code: 'INT',
      title: say('智识', 'Intellect'),
      value: `${noteCount} ${say('篇笔记', 'notes')}`,
      detail: say('知识，慢慢积累', 'Knowledge, one note at a time'),
      href: '/blog',
    },
    {
      icon: 'spark',
      code: 'CRE',
      title: say('创造', 'Creativity'),
      value: `${labCount} ${say('个公开实验', 'public labs')}`,
      detail: say('持续探索，不代表已完成', 'Experiments, not finished quests'),
      href: '/projects',
    },
    {
      icon: 'compass',
      code: 'EXP',
      title: say('探索', 'Exploration'),
      value: explorationCount
        ? `${explorationCount} ${say('次新体验', 'new experiences')}`
        : unknown,
      detail: say('走一些没走过的路', 'Take the unfamiliar path'),
      href: '/journal',
    },
    {
      icon: 'film',
      code: 'SEN',
      title: say('感知', 'Perception'),
      value: collectionItems.length
        ? `${collectionItems.length} ${say('个收藏', 'favorites')}`
        : unknown,
      detail: say('收藏故事，也收藏感受', 'Keep stories. Keep feelings.'),
      href: '/collection',
    },
  ]
  return (
    <>
      <div className="quest-home-intro">
        <p className="quest-kicker">
          <span className="quest-dot" /> PERSONAL ADVENTURE ARCHIVE
        </p>
        <span>{say('生活的主线，由自己定义', 'A main quest of my own')}</span>
      </div>
      <section className="quest-hero quest-panel" aria-labelledby="character-name">
        <div className="quest-character">
          <div className="quest-character-caption">
            <span>CHARACTER / 01</span>
            <Icon name="spark" />
          </div>
          <button
            type="button"
            className="quest-portrait-button"
            onClick={() => setDialogue((current) => (current + 1) % profile.dialogue.length)}
            aria-label={say('与像素角色对话', 'Talk to the pixel character')}
          >
            <PixelPortrait />
            <span className="quest-portrait-hint">
              {say('点击，与我打个招呼', 'CLICK TO SAY HELLO')} <span aria-hidden="true">↵</span>
            </span>
          </button>
          <span className="quest-fictional">
            {say('虚构角色形象 · 旅人', 'FICTIONAL AVATAR · TRAVELER')}
          </span>
        </div>
        <div className="quest-character-info">
          <p className="quest-kicker">
            PLAYER PROFILE <span aria-hidden="true">/</span>{' '}
            {say('个人角色档案', 'A LIFE IN PROGRESS')}
          </p>
          <h1 id="character-name">
            {profile.name}
            <span className="quest-name-star" aria-hidden="true">
              ✦
            </span>
          </h1>
          <p className="quest-hero-description">{text(profile.introduction)}</p>
          <div className="quest-interests">
            {profile.interests.map((interest) => (
              <span key={interest.zh}>{text(interest)}</span>
            ))}
          </div>
          <div className="quest-dialogue">
            <span aria-hidden="true">“</span>
            <p aria-live="polite">{text(profile.dialogue[dialogue])}</p>
          </div>
          <div className="quest-hero-actions">
            <Link href="/journal" className="quest-button">
              <Icon name="save" />
              {say('翻开冒险日志', 'Open the journal')}
              <span aria-hidden="true">→</span>
            </Link>
            <Link href="/collection" className="quest-text-link">
              {say('逛逛我的收藏', 'Explore my collection')} ↗
            </Link>
          </div>
        </div>
        <span className="quest-hero-watermark" aria-hidden="true">
          01
        </span>
      </section>
      <section className="quest-section">
        <SectionHeading
          code="CHARACTER ATTRIBUTES"
          title={say('角色属性', 'More than a character sheet')}
        />
        <div className="quest-attributes">
          {attributes.map((attribute) => (
            <Link
              key={attribute.code}
              href={attribute.href}
              className={`quest-attribute quest-attribute-${attribute.code.toLowerCase()}`}
            >
              <div className="quest-attribute-top">
                <Icon name={attribute.icon} />
                <span>{attribute.code}</span>
              </div>
              <h3>{attribute.title}</h3>
              <strong>{attribute.value}</strong>
              <p>{attribute.detail}</p>
              <span className="quest-attribute-arrow" aria-hidden="true">
                ↗
              </span>
            </Link>
          ))}
        </div>
        <p className="quest-footnote">
          {say(
            '由真实记录慢慢点亮。没有经验值，也不需要和谁比较。',
            'Lit up by real moments. No XP, no comparisons.'
          )}
        </p>
      </section>
      <section id="personal-records" className="quest-section">
        <SectionHeading
          code="PERSONAL BESTS"
          title={say('和昨天的自己，比一比', 'A little further than yesterday')}
        />
        <StrengthGym records={fitnessRecords} />
        <div>
          {(['cycling'] as ('fitness' | 'cycling')[]).map((category) => {
            const records = category === 'fitness' ? fitnessRecords : cyclingRecords
            return (
              <article
                key={category}
                className={`quest-panel quest-record-panel quest-record-${category}`}
              >
                <div className="quest-panel-title">
                  <Icon name={category === 'fitness' ? 'strength' : 'bike'} />
                  <h3>
                    {say(
                      category === 'fitness' ? '力量训练' : '骑行纪录',
                      category === 'fitness' ? 'Strength training' : 'On two wheels'
                    )}
                  </h3>
                  <span className="quest-kicker">
                    {category === 'fitness' ? 'TRAINING' : 'CYCLING'}
                  </span>
                </div>
                {records.length ? (
                  <div className="quest-records">
                    {records.map((record) => (
                      <div key={record.id}>
                        <h4>{text(record.title)}</h4>
                        <p className="quest-record-value">
                          {record.value} <span>{record.unit}</span>
                        </p>
                        <time dateTime={record.date}>{record.date}</time>
                        {record.note && <p>{text(record.note)}</p>}
                      </div>
                    ))}
                  </div>
                ) : (
                  <EmptyState
                    compact
                    icon={category === 'fitness' ? 'strength' : 'bike'}
                    title={say('等待第一次存档', 'Waiting for the first save')}
                  >
                    {say(
                      category === 'fitness'
                        ? '下一次突破，留在这里。'
                        : '最远的路、最高的坡，慢慢记录。',
                      category === 'fitness'
                        ? 'A place for your next personal best.'
                        : 'The longest ride. The highest climb. In your own time.'
                    )}
                  </EmptyState>
                )}
              </article>
            )
          })}
        </div>
      </section>
      <section className="quest-section">
        <SectionHeading
          code="LATEST SAVES"
          title={say('最近存档', 'Recently saved')}
          href="/journal"
          action={say('全部日志', 'All entries')}
        />
        <div className="quest-panel">
          {journalEntries.length ? (
            <JournalList entries={latestFirst(journalEntries).slice(0, 3)} />
          ) : (
            <div className="quest-log-empty">
              <span className="quest-save-slot" aria-hidden="true">
                <Icon name="save" />
              </span>
              <div>
                <h3>{say('故事才刚刚开始', 'The story is just beginning')}</h3>
                <p>
                  {say(
                    '一次训练、一段骑行，或一个突然冒出的想法。等你来存档。',
                    'A workout, a ride, a sudden idea. Your next save belongs here.'
                  )}
                </p>
              </div>
              <span className="quest-kicker">EMPTY SLOT</span>
            </div>
          )}
        </div>
      </section>
      <section className="quest-section">
        <SectionHeading
          code="THE COLLECTION"
          title={say('在别人的世界，留下自己的回忆', 'Other worlds. Personal memories.')}
          href="/collection"
          action={say('进入收藏室', 'View collection')}
        />
        <div className="quest-two-columns">
          {(['film', 'game'] as const).map((kind) => {
            const items = latestFirst(collectionItems.filter((item) => item.kind === kind)).slice(
              0,
              3
            )
            return (
              <article key={kind} className="quest-panel quest-preview-shelf">
                <div className="quest-panel-title">
                  <Icon name={kind} />
                  <h3>
                    {say(
                      kind === 'film' ? '光影之间' : '另一个世界',
                      kind === 'film' ? 'Between the frames' : 'Another world'
                    )}
                  </h3>
                  <span className="quest-kicker">{kind === 'film' ? 'FILMS' : 'GAMES'}</span>
                </div>
                {items.length ? <CollectionCards items={items} /> : <EmptyShelf kind={kind} />}
              </article>
            )
          })}
        </div>
      </section>
      <Link href="/research" className="quest-archive">
        <span className="quest-archive-icon">
          <Icon name="book" />
        </span>
        <div>
          <span className="quest-kicker">THE RESEARCH ARCHIVE</span>
          <h2>{say('技术探索，仍在继续。', 'The research continues.')}</h2>
          <p>
            {say(
              '研究笔记、项目实践与能力成长，都好好保存在这里。',
              'Research notes, projects, and professional growth. All preserved here.'
            )}
          </p>
        </div>
        <span className="quest-archive-action">
          {say('进入技术档案', 'Enter the archive')} <span aria-hidden="true">↗</span>
        </span>
      </Link>
    </>
  )
}
