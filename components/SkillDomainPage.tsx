import { allBlogs } from 'contentlayer/generated'
import { domainById, DomainId } from '@/data/siteConfig'
import { getRelatedPosts } from '@/lib/research-content'
import SkillDomainPageClient from './SkillDomainPageClient'

export default function SkillDomainPage({ domainId }: { domainId: DomainId }) {
  const domain = domainById[domainId]
  const relatedPosts = getRelatedPosts(allBlogs, domainId)

  return <SkillDomainPageClient domain={domain} relatedPosts={relatedPosts} />
}
