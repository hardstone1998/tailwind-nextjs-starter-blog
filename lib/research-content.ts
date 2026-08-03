import { compareDesc } from 'date-fns'
import type { Blog } from 'contentlayer/generated'
import { capabilityDomains, DomainId } from '@/data/siteConfig'

type ResearchContent = Pick<Blog, 'title' | 'summary' | 'tags' | 'date' | 'draft'> & {
  domains?: string[]
}

export function getContentDomains(content: ResearchContent): DomainId[] {
  const explicitDomains = (content.domains ?? []).filter((domain): domain is DomainId =>
    capabilityDomains.some((item) => item.id === domain)
  )

  if (explicitDomains.length > 0) return explicitDomains

  const searchable =
    `${content.title} ${content.summary ?? ''} ${(content.tags ?? []).join(' ')}`.toLowerCase()
  return capabilityDomains
    .filter((domain) =>
      domain.keywords.some((keyword) => searchable.includes(keyword.toLowerCase()))
    )
    .map((domain) => domain.id)
}

export function getRelatedPosts(posts: Blog[], domainId: DomainId, limit = 10) {
  return posts
    .filter((post) => !post.draft && getContentDomains(post).includes(domainId))
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
    .slice(0, limit)
}
