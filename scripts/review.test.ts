import test from 'node:test'
import assert from 'node:assert/strict'
import { copyCode } from '../lib/copy-code'
import { calculateAssessment, type Level } from '../lib/assessment'
import { rubrics } from '../data/capability-rubrics'
import { assessments, evidenceRecords } from '../data/capability-assessments'
import {
  getVisiblePosts,
  getVisibleTagCounts,
  getCollectionPage,
  maxPageCount,
  type LanguageAwarePost,
} from '../lib/blog-language'

const fixture = () => ({
  rubric: structuredClone(rubrics['systems-engineering']),
  assessment: structuredClone(assessments['systems-engineering']),
})
test('copy preserves code and rejects empty content or clipboard failures', async () => {
  const sample = '# a heading inside code\nprint("hello")\n'
  let copied = ''
  await copyCode(sample, {
    writeText: async (value) => {
      copied = value
    },
  })
  assert.equal(copied, sample)
  await assert.rejects(copyCode(undefined, { writeText: async () => {} }))
  await assert.rejects(copyCode(sample))
  await assert.rejects(
    copyCode(sample, {
      writeText: async () => {
        throw new Error('Permission denied')
      },
    })
  )
})
test('complete provisional assessment computes weighted total and retains review state', () => {
  const { rubric, assessment } = fixture()
  const result = calculateAssessment(rubric, assessment, evidenceRecords)
  assert.deepEqual(result, {
    total: 50,
    coverage: 100,
    completeness: 'complete',
    reviewStatus: 'pending-human-review',
  })
})
test('missing evidence is not zero and cannot be normalized away', () => {
  const { rubric, assessment } = fixture()
  assessment.ratings[1].level = null
  const result = calculateAssessment(rubric, assessment, evidenceRecords)
  assert.equal(result.total, null)
  assert.equal(result.coverage, 75)
})
test('real L0 remains a scored dimension with evidence', () => {
  const { rubric, assessment } = fixture()
  assessment.ratings.forEach((r) => (r.level = 0))
  assert.equal(calculateAssessment(rubric, assessment, evidenceRecords).total, 0)
  assert.equal(calculateAssessment(rubric, assessment, evidenceRecords).coverage, 100)
})
test('weighted values round only at the final total', () => {
  const { rubric, assessment } = fixture()
  assessment.ratings[0].level = 3
  assert.equal(calculateAssessment(rubric, assessment, evidenceRecords).total, 54)
})
test('rejects invalid weights, duplicate dimensions and mismatched versions', () => {
  for (const mutate of [
    (r: (typeof rubrics)['systems-engineering']) => {
      r.dimensions[0].weight = 16
    },
    (r: (typeof rubrics)['systems-engineering']) => {
      r.dimensions[1].id = r.dimensions[0].id
    },
    (r: (typeof rubrics)['systems-engineering']) => {
      r.version = 'another-version'
    },
  ]) {
    const { rubric, assessment } = fixture()
    mutate(rubric)
    assert.throws(() => calculateAssessment(rubric, assessment, evidenceRecords))
  }
})
test('rejects invalid levels, absent evidence, unknown evidence and duplicate ratings', () => {
  for (const level of [-1, 1.5, 5, NaN]) {
    const { rubric, assessment } = fixture()
    assessment.ratings[0].level = level as Level
    assert.throws(() => calculateAssessment(rubric, assessment, evidenceRecords))
  }
  for (const refs of [[], ['missing-evidence']]) {
    const { rubric, assessment } = fixture()
    assessment.ratings[0].evidenceIds = refs
    assert.throws(() => calculateAssessment(rubric, assessment, evidenceRecords))
  }
  const { rubric, assessment } = fixture()
  assessment.ratings[1] = assessment.ratings[0]
  assert.throws(() => calculateAssessment(rubric, assessment, evidenceRecords))
})
test('all six initial reviews have complete translated criteria and traceable ratings', () => {
  assert.equal(Object.keys(rubrics).length, 6)
  for (const id of Object.keys(rubrics) as (keyof typeof rubrics)[]) {
    const rubric = rubrics[id]
    for (const d of rubric.dimensions) {
      assert.equal(d.levels.length, 4)
      assert.ok(d.levels.every((l) => l.zh && l.en))
    }
    const result = calculateAssessment(rubric, assessments[id], evidenceRecords)
    assert.equal(result.reviewStatus, 'pending-human-review')
    assert.ok(
      assessments[id].ratings.every(
        (r) => r.rationale.zh && r.rationale.en && r.nextLevelGap.zh && r.nextLevelGap.en
      )
    )
  }
  assert.equal(
    calculateAssessment(
      rubrics['multimodal-intelligence'],
      assessments['multimodal-intelligence'],
      evidenceRecords
    ).total,
    null
  )
})
const post = (id: string, options: Partial<LanguageAwarePost> = {}): LanguageAwarePost => ({
  path: 'blog/' + id,
  slug: id,
  date: '2026-01-01',
  language: 'zh',
  tags: ['AI'],
  ...options,
})
test('publication filtering precedes translation selection; unpaired originals remain visible', () => {
  const data = [
    post('zh', { translationKey: 'a' }),
    post('en', { language: 'en', translationKey: 'a' }),
    post('single'),
    post('draft', { draft: true, language: 'en', translationKey: 'b' }),
    post('b', { translationKey: 'b' }),
  ]
  assert.deepEqual(
    getVisiblePosts(data, 'en')
      .map((p) => p.slug)
      .sort(),
    ['b', 'en', 'single']
  )
  assert.deepEqual(
    getVisiblePosts(data, 'zh')
      .map((p) => p.slug)
      .sort(),
    ['b', 'single', 'zh']
  )
})
test('tag counts normalize labels and count a translated article once', () => {
  const data = [
    post('zh', { translationKey: 'a', tags: ['AI', 'ai'] }),
    post('en', { translationKey: 'a', language: 'en', tags: ['AI'] }),
  ]
  assert.deepEqual(getVisibleTagCounts(data, 'zh'), { ai: 1 })
  assert.deepEqual(getVisibleTagCounts(data, 'en'), { ai: 1 })
})
test('pagination applies after translation selection and tag filtering', () => {
  const data = Array.from({ length: 11 }, (_, i) => post(String(i)))
  data.push(
    post('translation', { translationKey: 'paired' }),
    post('translation-en', { translationKey: 'paired', language: 'en' }),
    post('draft', { draft: true })
  )
  assert.equal(maxPageCount(data), 3)
  assert.equal(getCollectionPage(data, 'en', 'ai', 3).posts.length, 2)
  assert.equal(getCollectionPage(data, 'en', 'ai', 4).currentPage, 1)
  assert.equal(getCollectionPage(data, 'en', 'ai', 4).outOfRange, true)
  assert.equal(getCollectionPage(data, 'en', 'absent').total, 0)
})
test('language changes can invalidate a tagged page and reset to the first page', () => {
  const data = Array.from({ length: 6 }, (_, i) =>
    post(String(i), { translationKey: String(i), tags: ['中文'] })
  )
  data.push(
    ...Array.from({ length: 6 }, (_, i) =>
      post('en' + i, { language: 'en', translationKey: String(i), tags: ['English'] })
    )
  )
  assert.equal(getCollectionPage(data, 'zh', '中文', 2).posts.length, 1)
  assert.equal(getCollectionPage(data, 'en', '中文', 2).outOfRange, true)
  assert.equal(getCollectionPage(data, 'en', '中文', 2).currentPage, 1)
})
