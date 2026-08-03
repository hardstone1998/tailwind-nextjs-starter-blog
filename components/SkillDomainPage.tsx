import { allBlogs } from 'contentlayer/generated'
import Link from '@/components/Link'
import NotebookCard from '@/components/research/NotebookCard'
import ResearchMeta from '@/components/research/ResearchMeta'
import SectionLabel from '@/components/research/SectionLabel'
import { domainById, DomainId } from '@/data/siteConfig'
import { getRelatedPosts } from '@/lib/research-content'

export default function SkillDomainPage({ domainId }: { domainId: DomainId }) {
  const domain = domainById[domainId]
  const relatedPosts = getRelatedPosts(allBlogs, domainId)

  return (
    <div className="py-10 sm:py-14">
      <SectionLabel>Capability domain</SectionLabel>
      <div className="mt-4 max-w-3xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h1 className="text-4xl font-extrabold tracking-tight text-[var(--ink)] sm:text-5xl">
            {domain.label}
          </h1>
          <span className="font-mono text-2xl font-semibold text-[var(--accent)]">
            {domain.score}
          </span>
        </div>
        <p className="mt-5 text-lg leading-8 text-[var(--muted)]">{domain.description}</p>
        <div className="mt-6">
          <ResearchMeta domains={[domainId]} compact />
        </div>
      </div>

      <section className="mt-14 border-t border-[var(--rule)] pt-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <SectionLabel>Selected notes</SectionLabel>
            <h2 className="mt-2 text-2xl font-bold text-[var(--ink)]">相关研究记录</h2>
          </div>
          <Link href="/blog" className="text-sm font-semibold text-[var(--accent)] hover:underline">
            浏览全部笔记 →
          </Link>
        </div>
        {relatedPosts.length > 0 ? (
          <div className="mt-6 grid gap-4">
            {relatedPosts.map((post) => (
              <NotebookCard
                key={post.path}
                path={post.path}
                date={post.date}
                title={post.title}
                summary={post.summary}
                domains={post.domains}
                lab={post.lab}
                status={post.status}
                methods={post.methods}
                outcome={post.outcome}
              />
            ))}
          </div>
        ) : (
          <p className="mt-6 text-[var(--muted)]">这一能力域的公开笔记正在整理中。</p>
        )}
      </section>
    </div>
  )
}
