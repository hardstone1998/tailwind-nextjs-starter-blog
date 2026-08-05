import { allBlogs } from 'contentlayer/generated'
import Link from '@/components/Link'
import NotebookCard from '@/components/research/NotebookCard'
import ResearchMeta from '@/components/research/ResearchMeta'
import SectionLabel from '@/components/research/SectionLabel'
import { domainById, DomainId, getAssessmentRoute } from '@/data/siteConfig'
import { getRelatedPosts } from '@/lib/research-content'

const evidenceTypeLabels = {
  project: '项目',
  'research-note': '研究笔记',
  practice: '实践记录',
}

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
          <div className="shrink-0 text-right">
            <span className="block font-mono text-2xl font-semibold text-[var(--accent)]">
              {domain.score}/100
            </span>
            <Link
              href={getAssessmentRoute(domain)}
              aria-label={`查看${domain.label}的评分提示词与调用模型说明`}
              className="mt-2 inline-block text-sm font-semibold text-[var(--accent)] hover:underline"
            >
              查看评估说明 →
            </Link>
          </div>
        </div>
        <p className="mt-5 text-lg leading-8 text-[var(--muted)]">{domain.description}</p>
        <div className="mt-6">
          <ResearchMeta domains={[domainId]} compact />
        </div>
      </div>

      <section className="mt-12 border-t border-[var(--rule)] pt-8">
        <SectionLabel>Profile</SectionLabel>
        <h2 className="mt-2 text-2xl font-bold text-[var(--ink)]">个人介绍</h2>
        <div className="mt-4 max-w-3xl space-y-4 text-lg leading-8 text-[var(--muted)]">
          {domain.introduction.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className="mt-14 border-t border-[var(--rule)] pt-8">
        <SectionLabel>Capability claim</SectionLabel>
        <h2 className="mt-2 text-2xl font-bold text-[var(--ink)]">能力主张</h2>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-[var(--muted)]">{domain.claim}</p>
      </section>

      <section className="mt-14 border-t border-[var(--rule)] pt-8">
        <SectionLabel>Evidence</SectionLabel>
        <h2 className="mt-2 text-2xl font-bold text-[var(--ink)]">代表证据</h2>
        {domain.evidence.length > 0 ? (
          <ol className="mt-6 grid gap-4 md:grid-cols-2">
            {domain.evidence.map((evidence) => (
              <li key={evidence.title}>
                {evidence.href ? (
                  <Link
                    href={evidence.href}
                    className="notebook-card block h-full transition-transform hover:-translate-y-0.5"
                  >
                    <EvidenceContent evidence={evidence} />
                  </Link>
                ) : (
                  <article
                    className="notebook-card h-full"
                    aria-label={`${evidence.title}（无公开链接）`}
                  >
                    <EvidenceContent evidence={evidence} />
                  </article>
                )}
              </li>
            ))}
          </ol>
        ) : (
          <p className="mt-5 max-w-3xl text-[var(--muted)]">
            该能力域的公开证据正在整理中。下一步将通过“{domain.nextAction.title}
            ”补齐可复核的实践记录。
          </p>
        )}
      </section>

      <section className="mt-14 border-t border-[var(--rule)] pt-8">
        <SectionLabel>Assessment</SectionLabel>
        <h2 className="mt-2 text-2xl font-bold text-[var(--ink)]">评分方法</h2>
        <div className="notebook-card mt-6 max-w-3xl">
          <p className="font-semibold text-[var(--ink)]">{domain.scoreRationale.disclosure}</p>
          <p className="mt-4 leading-7 text-[var(--muted)]">
            {domain.scoreRationale.evidenceBasis}
          </p>
          <div className="mt-5">
            <h3 className="font-semibold text-[var(--ink)]">评估维度</h3>
            <ul className="mt-3 grid gap-2 text-sm leading-6 text-[var(--muted)] sm:grid-cols-2">
              {domain.scoreRationale.dimensions.map((dimension) => (
                <li key={dimension} className="rounded-md border border-[var(--rule)] px-3 py-2">
                  {dimension}
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-5 text-sm leading-6 text-[var(--muted)]">
            更新约定：{domain.scoreRationale.reviewCadence}
          </p>
        </div>
      </section>

      <section className="mt-14 border-t border-[var(--rule)] pt-8">
        <SectionLabel>Next action</SectionLabel>
        <h2 className="mt-2 text-2xl font-bold text-[var(--ink)]">当前缺口与下一步</h2>
        <div className="notebook-card mt-6 max-w-3xl">
          <h3 className="font-semibold text-[var(--ink)]">{domain.nextAction.title}</h3>
          <p className="mt-3 leading-7 text-[var(--muted)]">{domain.nextAction.description}</p>
        </div>
      </section>

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

function EvidenceContent({
  evidence,
}: {
  evidence: (typeof domainById)[DomainId]['evidence'][number]
}) {
  return (
    <>
      <span className="font-mono text-xs tracking-[0.14em] text-[var(--accent)]">
        {evidenceTypeLabels[evidence.type]}
      </span>
      <h3 className="mt-3 text-lg font-bold text-[var(--ink)]">{evidence.title}</h3>
      <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{evidence.summary}</p>
      {evidence.href && (
        <span className="mt-4 block text-sm font-semibold text-[var(--accent)]">查看记录 →</span>
      )}
    </>
  )
}
