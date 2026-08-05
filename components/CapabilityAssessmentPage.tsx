import Link from '@/components/Link'
import SectionLabel from '@/components/research/SectionLabel'
import { CapabilityDomain } from '@/data/siteConfig'

export default function CapabilityAssessmentPage({ domain }: { domain: CapabilityDomain }) {
  const { criteria, modelContext, scoreRange } = domain.assessmentDetails

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
        <p className="mt-4 max-w-3xl leading-7 font-semibold text-[var(--ink)]">评分标准：</p>
        <ol className="mt-6 grid gap-3 md:grid-cols-2">
          {criteria.map((criterion, index) => (
            <li key={criterion} className="notebook-card flex gap-3">
              <span className="font-mono text-sm font-semibold text-[var(--accent)]">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="text-sm leading-6 text-[var(--muted)]">{criterion}</span>
            </li>
          ))}
        </ol>
        <p className="mt-6 font-semibold text-[var(--ink)]">评分范围：{scoreRange}</p>
        <p className="mt-2 text-[var(--muted)]">当前得分：{domain.score || 'N/A'}</p>
      </section>

      <section className="mt-14 border-t border-[var(--rule)] pt-8">
        <SectionLabel>Historical context</SectionLabel>
        <h2 className="mt-2 text-2xl font-bold text-[var(--ink)]">调用模型</h2>
        <div className="notebook-card mt-6 max-w-3xl">
          <p className="leading-7 text-[var(--muted)]">{modelContext.introduction}</p>
          <ul className="mt-4 list-disc space-y-2 pl-6 leading-7 text-[var(--muted)]">
            <li>
              <strong className="text-[var(--ink)]">评估模型：</strong>
              {modelContext.models}
            </li>
            <li>
              <strong className="text-[var(--ink)]">评估依据：</strong>
              {modelContext.evidenceBasis}
            </li>
            <li>
              <strong className="text-[var(--ink)]">评估维度：</strong>
              {modelContext.dimensions}
            </li>
            <li>
              <strong className="text-[var(--ink)]">更新频率：</strong>
              {modelContext.updateFrequency}
            </li>
          </ul>
          <div className="mt-4 rounded border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/20">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              <strong>提示：</strong>
              {modelContext.notice}
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
