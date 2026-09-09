'use client'

import { useState } from 'react'
import type { PersonalRecord } from '@/data/adventure/types'
import { useAdventure } from './useAdventure'
import Icon from './Icon'
import ExerciseMotion from './ExerciseMotion'

const stations = [
  {
    id: 'legs',
    zh: '下肢',
    en: 'LEGS',
    equipment: '深蹲架',
    english: 'Squat rack',
    ids: ['barbell-back-squat', 'romanian-deadlift'],
    quote: '今天也有认真对抗重力。',
    line: 'Another day standing up to gravity.',
  },
  {
    id: 'push',
    zh: '推',
    en: 'PUSH',
    equipment: '卧推区',
    english: 'Bench press',
    ids: ['barbell-bench-press', 'incline-dumbbell-press', 'seated-dumbbell-shoulder-press'],
    quote: '把生活，向上推一点。',
    line: 'Give life a little lift.',
  },
  {
    id: 'pull',
    zh: '拉',
    en: 'PULL',
    equipment: '拉力区',
    english: 'Cable station',
    ids: ['neutral-grip-lat-pulldown', 'assisted-pull-up', 'chest-supported-row'],
    quote: '慢慢拉近，和更强的自己的距离。',
    line: 'A little closer to a stronger self.',
  },
]

function Equipment({ kind }: { kind: string }) {
  return (
    <svg viewBox="0 0 120 110" fill="none" shapeRendering="crispEdges" aria-hidden="true">
      <path fill="#172633" d="M4 100h112v8H4z" />
      {kind === 'legs' ? (
        <>
          <path fill="#718b94" d="M20 18h6v82h-6zm74 0h6v82h-6zM20 16h80v6H20z" />
          <path fill="#c7b17c" d="M10 46h100v4H10z" />
          <path fill="currentColor" d="M12 34h8v28h-8zm10 4h6v20h-6zm70 0h6v20h-6zm8-4h8v28h-8z" />
          <path fill="#435b66" d="M14 94h20v6H14zm72 0h20v6H86z" />
        </>
      ) : kind === 'push' ? (
        <>
          <path fill="#718b94" d="M24 30h6v70h-6zm66 0h6v70h-6zM38 78h6v22h-6zm42 0h6v22h-6z" />
          <path fill="#c7b17c" d="M14 40h92v4H14z" />
          <path fill="currentColor" d="M16 28h10v28H16zm78 0h10v28H94zM32 70h60v10H32z" />
        </>
      ) : (
        <>
          <path fill="#718b94" d="M24 12h6v88h-6zm68 0h6v88h-6zM24 12h74v6H24z" />
          <path stroke="#c7b17c" strokeWidth="3" d="M60 18v28m-20 0h40" />
          <path fill="currentColor" d="M76 58h12v6H76zm0 8h12v6H76zm0 8h12v6H76zM38 78h32v8H38z" />
          <path fill="#718b94" d="M50 86h6v14h-6z" />
        </>
      )}
    </svg>
  )
}

export default function StrengthGym({ records }: { records: PersonalRecord[] }) {
  const { say, text } = useAdventure()
  const [performing, setPerforming] = useState(false)
  const [paused, setPaused] = useState(false)
  const selectMovement = (id: string) => {
    setSelectedId(id)
    setPerforming(true)
    setPaused(false)
  }
  const [selectedId, setSelectedId] = useState('barbell-back-squat')
  const selected = records.find((record) => record.id === selectedId) ?? records[0]
  const stationIndex = Math.max(
    0,
    stations.findIndex((station) => station.ids.includes(selected?.id))
  )
  const station = stations[stationIndex]
  if (!selected)
    return (
      <p className="quest-empty">
        {say('训练馆等待第一次存档。', 'The gym is waiting for its first save.')}
      </p>
    )
  return (
    <article id="strength-gym" className="quest-panel gym">
      <header className="gym-header">
        <div>
          <p className="quest-kicker">THE TRAINING ROOM / STR</p>
          <h3>{say('重力之下，慢慢变强', 'A little stronger, rep by rep')}</h3>
        </div>
        <span className="gym-open">
          <span className="quest-dot" />
          {say('训练馆已开放', 'GYM IS OPEN')}
        </span>
      </header>
      <div className="gym-main">
        <div className="gym-room">
          <div className="gym-room-caption">
            <span>PLAYER 01</span>
            <span>NO SHORTCUTS. JUST REPS.</span>
          </div>
          {performing ? (
            <div className="gym-performance">
              <div className="gym-performance-toolbar">
                <button type="button" onClick={() => setPerforming(false)}>
                  {say('← 返回器械', '← Stations')}
                </button>
                <button type="button" onClick={() => setPaused(!paused)}>
                  {paused ? say('播放动作', 'Play') : say('暂停动作', 'Pause')}
                </button>
              </div>
              <ExerciseMotion
                key={selected.id}
                id={selected.id}
                label={text(selected.title)}
                paused={paused}
              />
              <p className="gym-performance-label">
                {text(selected.title)}
                <span>{say('像素动作演示', 'PIXEL MOTION')}</span>
              </p>
            </div>
          ) : (
            <div
              className="gym-stations"
              role="group"
              aria-label={say('选择训练区域', 'Choose a training area')}
            >
              {stations.map((item, index) => {
                const first = item.ids.find((id) => records.some((record) => record.id === id))
                return (
                  <button
                    type="button"
                    key={item.id}
                    disabled={!first}
                    aria-pressed={index === stationIndex}
                    onClick={() => first && selectMovement(first)}
                    className="gym-station"
                  >
                    <span className="gym-station-number">
                      0{index + 1} / {item.en}
                    </span>
                    <Equipment kind={item.id} />
                    <span>{say(item.equipment, item.english)}</span>
                  </button>
                )
              })}
              <div
                className="gym-traveler-position"
                style={{ left: `${stationIndex * 33.333 + 16.666}%` }}
                aria-hidden="true"
              >
                <div key={selected.id} className={`gym-traveler gym-move-${station.id}`}>
                  <svg viewBox="0 0 40 56" shapeRendering="crispEdges">
                    <path fill="#172633" d="M10 2h20v6h4v14H6V8h4z" />
                    <path fill="#d5af89" d="M10 10h20v14H10z" />
                    <path fill="#273847" d="M8 12h10v6H8zm14 0h10v6H22zm-4 2h4v2h-4z" />
                    <path fill="#55847a" d="M8 26h24v18H8z" />
                    <path fill="#c7b17c" d="M18 26h4v18h-4z" />
                    <path fill="#d5af89" d="M2 24h6v14H2zm30 0h6v14h-6z" />
                    <path fill="#718b94" d="M10 44h8v8h-8zm12 0h8v8h-8z" />
                    <path fill="#172633" d="M6 52h12v4H6zm16 0h12v4H22z" />
                  </svg>
                </div>
              </div>
            </div>
          )}
          <p className="gym-room-hint">
            {performing
              ? say('点击下方动作栏，换一个动作试试', 'Pick another movement below.')
              : say('点击器械，让小人动起来', 'Pick a station to start moving.')}{' '}
            <span aria-hidden="true">↗</span>
          </p>
        </div>
        <div className="gym-save" aria-live="polite" aria-atomic="true">
          <div key={selected.id} className="gym-save-content">
            <p className="quest-kicker">
              {say(station.zh, station.en)} / {say('工作组纪录', 'WORKING SET')}
            </p>
            <h4>{text(selected.title)}</h4>
            <p className="gym-value">
              {selected.value} <span>{selected.unit}</span>
            </p>
            <p className="gym-quote">“{say(station.quote, station.line)}”</p>
            <div className="gym-save-date">
              <Icon name="save" />
              <span>
                {say('存档日期', 'SAVED')} <time dateTime={selected.date}>{selected.date}</time>
              </span>
            </div>
            <p className="gym-note">
              {selected.note
                ? text(selected.note)
                : say(
                    '已完成的工作组，不代表单次极限。',
                    'A completed working set, not a one-rep max.'
                  )}
            </p>
          </div>
        </div>
      </div>
      <div className="gym-loadout">
        <div className="gym-loadout-heading">
          <span className="quest-kicker">{say('动作栏', 'MOVEMENT SELECT')}</span>
          <span>
            {records.length} {say('项动作已存档', 'movements saved')}
          </span>
        </div>
        <div
          className="gym-movements"
          role="group"
          aria-label={say('选择动作纪录', 'Choose a movement record')}
        >
          {stations.map((item) => (
            <div key={item.id} className="gym-group">
              <p>{say(item.zh, item.en)}</p>
              {records
                .filter((record) => item.ids.includes(record.id))
                .map((record) => (
                  <button
                    type="button"
                    key={record.id}
                    aria-pressed={selected.id === record.id}
                    onClick={() => selectMovement(record.id)}
                  >
                    <Icon name="strength" />
                    <span>{text(record.title)}</span>
                    <span aria-hidden="true">↗</span>
                  </button>
                ))}
            </div>
          ))}
        </div>
        <details className="gym-all">
          <summary>{say('展开全部纪录', 'View all records')}</summary>
          <div className="gym-record-list">
            {records.map((record) => (
              <div key={record.id}>
                <strong>{text(record.title)}</strong>
                <span>
                  {record.value} {record.unit}
                </span>
                <time dateTime={record.date}>{record.date}</time>
                {record.note && <p>{text(record.note)}</p>}
              </div>
            ))}
          </div>
        </details>
      </div>
    </article>
  )
}
