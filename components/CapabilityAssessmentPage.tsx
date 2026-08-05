import Link from '@/components/Link'
import SectionLabel from '@/components/research/SectionLabel'
import { CapabilityDomain } from '@/data/siteConfig'

export default function CapabilityAssessmentPage({ domain }: { domain: CapabilityDomain }) {
  const { modelContext } = domain.assessmentDetails

  return (
    <div className="py-10 sm:py-14">
      <Link
        href={domain.route}
        className="text-sm font-semibold text-[var(--accent)] hover:underline"
      >
        ← 返回{domain.label}
      </Link>

      <div className="mt-8 max-w-3xl">
        <SectionLabel>Assessment details</SectionLabel>
        <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
          <h1 className="text-4xl font-extrabold tracking-tight text-[var(--ink)] sm:text-5xl">
            {domain.label} · 评估说明
          </h1>
          <span className="font-mono text-2xl font-semibold text-[var(--accent)]">
            {domain.score}/100
          </span>
        </div>
        <p className="mt-5 text-lg leading-8 text-[var(--muted)]">
          {domain.scoreRationale.disclosure}
        </p>
      </div>

      <section className="mt-14 border-t border-[var(--rule)] pt-8">
        <SectionLabel>Scoring rubric</SectionLabel>
        <h2 className="mt-2 text-2xl font-bold text-[var(--ink)]">评分提示词</h2>
        <p className="mt-4 max-w-3xl leading-7 text-[var(--muted)]">
          以下维度沿用旧版能力页的评分标准，用于解释分数关注的范围，而非自动评分规则。
        </p>
        <ol className="mt-6 grid gap-3 md:grid-cols-2">
          {domain.assessmentDetails.criteria.map((criterion, index) => (
            <li key={criterion} className="notebook-card flex gap-3">
              <span className="font-mono text-sm font-semibold text-[var(--accent)]">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="text-sm leading-6 text-[var(--muted)]">{criterion}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-14 border-t border-[var(--rule)] pt-8">
        <SectionLabel>Historical context</SectionLabel>
        <h2 className="mt-2 text-2xl font-bold text-[var(--ink)]">调用模型</h2>
        <div className="notebook-card mt-6 max-w-3xl">
          <p className="font-semibold text-[var(--ink)]">历史页面记录的辅助模型</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {modelContext.models.map((model) => (
              <li
                key={model}
                className="rounded-full border border-[var(--rule)] bg-[var(--surface)] px-3 py-1 font-mono text-sm text-[var(--ink)]"
              >
                {model}
              </li>
            ))}
          </ul>
          <p className="mt-5 leading-7 text-[var(--muted)]">{modelContext.description}</p>
          <dl className="mt-6 grid gap-5 border-t border-[var(--rule)] pt-5 text-sm leading-6 sm:grid-cols-3">
            <div>
              <dt className="font-semibold text-[var(--ink)]">评估依据</dt>
              <dd className="mt-1 text-[var(--muted)]">{modelContext.evidenceBasis}</dd>
            </div>
            <div>
              <dt className="font-semibold text-[var(--ink)]">综合维度</dt>
              <dd className="mt-1 text-[var(--muted)]">{modelContext.dimensions}</dd>
            </div>
            <div>
              <dt className="font-semibold text-[var(--ink)]">更新频率</dt>
              <dd className="mt-1 text-[var(--muted)]">{modelContext.updateFrequency}</dd>
            </div>
          </dl>
        </div>
      </section>
    </div>
  )
}
