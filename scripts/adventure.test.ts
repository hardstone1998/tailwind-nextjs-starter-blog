import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { lifeText, latestFirst, filterJournal, isAdventureRoute } from '../lib/adventure'
import type { JournalEntry, LifeText } from '../data/adventure/types'
import { journalEntries } from '../data/adventure/journal'
import { personalRecords } from '../data/adventure/records'
import { collectionItems } from '../data/adventure/collection'
import { achievements } from '../data/adventure/achievements'
import { profile } from '../data/adventure/profile'

test('single-language life content stays in its original language', () => {
  assert.equal(lifeText({ zh: '原文' }, 'en'), '原文')
  assert.equal(lifeText({ en: 'Original' }, 'zh'), 'Original')
  assert.equal(lifeText({ zh: '原文', en: 'Translation' }, 'en'), 'Translation')
})

test('journal filters before sorting, preserves input and represents empty categories', () => {
  const entries: JournalEntry[] = [
    {
      id: 'older',
      date: '2026-08-01',
      category: 'cycling',
      title: { zh: '测试' },
      text: { zh: '测试资料，不发布' },
    },
    {
      id: 'newer',
      date: '2026-09-01',
      category: 'life',
      title: { en: 'Fixture' },
      text: { en: 'Test only' },
    },
    {
      id: 'ride',
      date: '2026-08-15',
      category: 'cycling',
      title: { zh: '测试' },
      text: { zh: '测试' },
    },
  ]
  assert.deepEqual(
    filterJournal(entries, 'cycling').map((entry) => entry.id),
    ['ride', 'older']
  )
  assert.deepEqual(filterJournal(entries, 'fitness'), [])
  assert.equal(latestFirst(entries)[0].id, 'newer')
  assert.equal(entries[0].id, 'older')
  assert.deepEqual(filterJournal([], 'all'), [])
})

test('new shell only wraps the four life routes, not existing technical pages', () => {
  for (const route of ['/', '/journal', '/collection/', '/achievements'])
    assert.ok(isAdventureRoute(route))
  for (const route of [
    '/research',
    '/about',
    '/projects',
    '/blog',
    '/blog/example',
    '/skills/code',
    '/missing',
    '/journal/missing',
  ])
    assert.equal(isAdventureRoute(route), false)
  const old = process.env.BASE_PATH
  try {
    process.env.BASE_PATH = '/review-preview'
    assert.ok(isAdventureRoute('/review-preview/collection'))
    assert.ok(isAdventureRoute('/review-preview/'))
    assert.equal(isAdventureRoute('/review-preview/blog'), false)
    assert.equal(isAdventureRoute('/review-preview-other/collection'), false)
  } finally {
    if (old === undefined) delete process.env.BASE_PATH
    else process.env.BASE_PATH = old
  }
})

test('published life data has valid dates, distinct IDs, original text and local assets', () => {
  const validText = (value: LifeText) =>
    assert.ok(
      value && (value.zh?.trim() || value.en?.trim()),
      'At least one original language is required'
    )
  const validDate = (value: string) => {
    assert.match(value, /^\d{4}-\d{2}-\d{2}$/)
    assert.equal(new Date(`${value}T00:00:00Z`).toISOString().slice(0, 10), value)
  }
  const validImage = (src: string) => {
    assert.ok(src.startsWith('/static/images/'), 'Keep personal images in public/static/images')
    const root = path.resolve('public/static/images')
    const file = path.resolve('public', `.${src}`)
    assert.ok(file.startsWith(root + path.sep) && fs.existsSync(file), `Missing image: ${src}`)
  }
  for (const items of [journalEntries, personalRecords, collectionItems, achievements]) {
    assert.equal(new Set(items.map((item) => item.id)).size, items.length, 'Duplicate entry ID')
    for (const item of items) {
      assert.ok(item.id.trim())
      validText(item.title)
      if (item.date) validDate(item.date)
    }
  }
  validText(profile.introduction)
  assert.ok(profile.dialogue.length > 0)
  profile.dialogue.forEach(validText)
  profile.interests.forEach(validText)
  for (const entry of journalEntries) {
    validDate(entry.date)
    validText(entry.text)
    if (entry.image) {
      validImage(entry.image.src)
      validText(entry.image.alt)
    }
    for (const metric of entry.metrics ?? []) {
      validText(metric.label)
      assert.ok(metric.value.trim())
    }
  }
  for (const record of personalRecords) {
    validDate(record.date)
    assert.ok(record.value.trim())
    if (record.note) validText(record.note)
  }
  for (const item of collectionItems) {
    validDate(item.date)
    if (item.cover) validImage(item.cover)
    if (item.note) validText(item.note)
  }
  for (const item of achievements) {
    validText(item.description)
    if (item.status === 'achieved') validDate(item.date)
  }
})
