'use client'

import { useRef, useState } from 'react'
import Image from '@/components/Image'
import type { JournalEntry, JournalImage, Metric } from '@/data/adventure/types'
import { useAdventure } from './useAdventure'
import Icon from './Icon'

function Metrics({ metrics, primary = false }: { metrics: Metric[]; primary?: boolean }) {
  const { text } = useAdventure()
  return (
    <dl className={`quest-journal-metrics ${primary ? 'quest-journal-metrics-primary' : ''}`}>
      {metrics.map((metric, index) => (
        <div key={index}>
          <dt>{text(metric.label)}</dt>
          <dd>
            {metric.value} {metric.unit && <span>{metric.unit}</span>}
          </dd>
        </div>
      ))}
    </dl>
  )
}

function JournalGallery({ images }: { images: JournalImage[] }) {
  const { say, text } = useAdventure()
  const dialog = useRef<HTMLDialogElement>(null)
  const [selected, setSelected] = useState(0)
  const current = images[selected]
  return (
    <div className="quest-journal-gallery">
      <p className="quest-kicker">
        {say('原始影像 / 点击查看', 'ORIGINAL CAPTURES / OPEN TO VIEW')}
      </p>
      <div className="quest-journal-thumbnails">
        {images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            onClick={() => {
              setSelected(index)
              dialog.current?.showModal()
            }}
            aria-label={say('查看原图：', 'View original: ') + text(image.caption ?? image.alt)}
          >
            <Image
              src={image.src}
              alt={text(image.alt)}
              width={image.width}
              height={image.height}
              sizes="80px"
            />
            <span>
              <small>0{index + 1}</small>
              <strong>{text(image.caption ?? image.alt)}</strong>
            </span>
            <span aria-hidden="true">↗</span>
          </button>
        ))}
      </div>
      <dialog
        ref={dialog}
        className="quest-image-dialog"
        aria-label={say('存档原图', 'Original capture')}
      >
        <div className="quest-image-dialog-toolbar">
          <p>{text(current.caption ?? current.alt)}</p>
          <button type="button" onClick={() => dialog.current?.close()}>
            {say('关闭', 'Close')} <span aria-hidden="true">×</span>
          </button>
        </div>
        <Image
          src={current.src}
          alt={text(current.alt)}
          width={current.width}
          height={current.height}
          sizes="(max-width: 700px) 90vw, 600px"
        />
        <a href={`${process.env.BASE_PATH || ''}${current.src}`} target="_blank" rel="noreferrer">
          {say('在新标签页查看完整尺寸', 'Open full-size image in a new tab')} ↗
        </a>
      </dialog>
    </div>
  )
}

export default function JournalCard({
  entry,
  category,
}: {
  entry: JournalEntry
  category: string
}) {
  const { say, text } = useAdventure()
  const paragraphs = text(entry.text).split('\n\n')
  const metrics = entry.metrics ?? []
  const images = entry.images ?? []
  return (
    <article
      id={entry.id}
      className={`quest-journal-card ${entry.cover ? 'quest-journal-card-illustrated' : ''}`}
    >
      <div className="quest-journal-overview">
        {entry.cover && (
          <figure className="quest-journal-cover">
            <div className="quest-journal-cover-image">
              <Image
                src={entry.cover.src}
                alt={text(entry.cover.alt)}
                fill
                sizes="(max-width: 760px) 90vw, 480px"
                style={{ objectFit: 'cover', objectPosition: entry.cover.position ?? 'center' }}
              />
            </div>
            <figcaption>
              <Icon name={entry.category === 'cycling' ? 'bike' : 'compass'} />
              {text(entry.cover.caption ?? entry.cover.alt)}
            </figcaption>
          </figure>
        )}
        <div className="quest-journal-intro">
          <div className="quest-journal-dateline">
            <span className="quest-chip">{category}</span>
            <time dateTime={entry.date}>{entry.date.replaceAll('-', ' / ')}</time>
          </div>
          <h3>{text(entry.title)}</h3>
          <p className="quest-journal-lead">{paragraphs[0]}</p>
          {!!metrics.length && <Metrics metrics={metrics.slice(0, 3)} primary />}
          <span className="quest-journal-stamp">
            <Icon name="save" />
            {say('这一程，已存档', 'A MOMENT, SAVED')}
          </span>
        </div>
      </div>
      <details className="quest-journal-details">
        <summary>
          <span>{say('手记与完整记录', 'Notes & complete record')}</span>
          <span className="quest-journal-expand" aria-hidden="true">
            ＋
          </span>
        </summary>
        <div className="quest-journal-detail-content">
          <div className="quest-journal-notes">
            <p className="quest-kicker">{say('关于这一程', 'FIELD NOTES')}</p>
            {paragraphs.slice(1).map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
          {metrics.length > 3 && <Metrics metrics={metrics.slice(3)} />}
          {entry.image && (
            <Image
              src={entry.image.src}
              alt={text(entry.image.alt)}
              width={960}
              height={640}
              sizes="(max-width: 700px) 90vw, 800px"
            />
          )}
          {!!images.length && <JournalGallery images={images} />}
        </div>
      </details>
    </article>
  )
}
