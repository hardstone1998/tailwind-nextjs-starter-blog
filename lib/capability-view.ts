import { assessments, getDomainEvidence } from '@/data/capability-assessments'
import { rubrics } from '@/data/capability-rubrics'
import { calculateAssessment } from './assessment'
import { capabilityDomains, type DomainId } from '@/data/siteConfig'
export function getAssessmentView(id: DomainId) {
  const rubric = rubrics[id]
  const assessment = assessments[id]
  const evidence = getDomainEvidence(id)
  return { rubric, assessment, evidence, result: calculateAssessment(rubric, assessment, evidence) }
}
export type AssessmentView = ReturnType<typeof getAssessmentView>
export function getCapabilitySummaries() {
  return capabilityDomains.map((domain) => {
    const view = getAssessmentView(domain.id)
    return {
      domain,
      evidenceCount: view.evidence.length,
      coverage: view.result.coverage,
      assessedAt: view.assessment.assessedAt,
    }
  })
}
export type CapabilitySummary = ReturnType<typeof getCapabilitySummaries>[number]
