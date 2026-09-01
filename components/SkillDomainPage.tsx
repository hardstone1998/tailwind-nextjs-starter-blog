import { allBlogs } from 'contentlayer/generated'
import { domainById, type DomainId } from '@/data/siteConfig'
import { getRelatedPosts } from '@/lib/research-content'
import SkillDomainPageClient from './SkillDomainPageClient'
import { allCoreContent } from 'pliny/utils/contentlayer'
import { getAssessmentView } from '@/lib/capability-view'

export default function SkillDomainPage({ domainId }: { domainId: DomainId }) {
  const domain = domainById[domainId]
  const relatedPosts = allCoreContent(getRelatedPosts(allBlogs, domainId))
  const { evidence, result } = getAssessmentView(domainId)

  return (
    <SkillDomainPageClient
      domain={domain}
      relatedPosts={relatedPosts}
      view={{ evidence, result }}
    />
  )
}
