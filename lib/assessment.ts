export type Localized = { zh: string; en: string }
export const bilingual = (zh: string, en: string): Localized => ({ zh, en })
export type Level = 0 | 1 | 2 | 3 | 4
export interface RubricDimension {
  id: string
  weight: number
  label: Localized
  levels: [Localized, Localized, Localized, Localized]
}
export interface RubricDefinition {
  version: string
  domainId: string
  dimensions: RubricDimension[]
}
export interface EvidenceRecord {
  id: string
  title: Localized
  href: `/${string}`
  sourceFile: string
  section: Localized
  sourceVersion: string
  kind: 'author-account' | 'code-and-experiment' | 'independent-verification'
  responsibility: Localized
  limitation: Localized
}
export interface DimensionRating {
  dimensionId: string
  level: Level | null
  evidenceIds: string[]
  rationale: Localized
  nextLevelGap: Localized
}
export interface AssessmentRecord {
  id: string
  domainId: string
  rubricVersion: string
  assessedAt: string
  materialCutoff: string
  reviewStatus: 'pending-human-review' | 'reviewed'
  reviewer: string
  ratings: DimensionRating[]
}
export function calculateAssessment(
  rubric: RubricDefinition,
  assessment: AssessmentRecord,
  evidence: EvidenceRecord[]
) {
  if (rubric.version !== assessment.rubricVersion || rubric.domainId !== assessment.domainId)
    throw new Error('Assessment/rubric mismatch')
  if (rubric.dimensions.length !== 5 || rubric.dimensions.reduce((n, d) => n + d.weight, 0) !== 100)
    throw new Error('Rubric requires five dimensions with weights totaling 100')
  const dimensionIds = new Set(rubric.dimensions.map((d) => d.id))
  if (
    dimensionIds.size !== 5 ||
    rubric.dimensions.some((d) => !Number.isFinite(d.weight) || d.weight <= 0)
  )
    throw new Error('Invalid dimensions')
  if (
    assessment.ratings.length !== 5 ||
    new Set(assessment.ratings.map((r) => r.dimensionId)).size !== 5
  )
    throw new Error('Missing or duplicate ratings')
  const evidenceIds = new Set(evidence.map((e) => e.id))
  if (evidenceIds.size !== evidence.length) throw new Error('Duplicate evidence IDs')
  let coverage = 0
  let weighted = 0
  for (const rating of assessment.ratings) {
    const dimension = rubric.dimensions.find((d) => d.id === rating.dimensionId)
    if (!dimension) throw new Error('Unknown dimension')
    if (rating.evidenceIds.some((id) => !evidenceIds.has(id)))
      throw new Error('Unknown evidence reference')
    if (rating.level === null) continue
    if (!Number.isInteger(rating.level) || rating.level < 0 || rating.level > 4)
      throw new Error('Invalid level')
    if (!rating.evidenceIds.length)
      throw new Error('Rated dimensions require evidence, including L0')
    coverage += dimension.weight
    weighted += (dimension.weight * rating.level) / 4
  }
  return {
    total: coverage === 100 ? Math.round(weighted) : null,
    coverage,
    completeness: coverage === 100 ? ('complete' as const) : ('partial' as const),
    reviewStatus: assessment.reviewStatus,
  }
}
