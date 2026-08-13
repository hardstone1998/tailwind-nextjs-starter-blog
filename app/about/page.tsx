import { Authors, allAuthors } from 'contentlayer/generated'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import AuthorLayout from '@/layouts/AuthorLayout'
import ProfessionalProjectTimeline from '@/components/ProfessionalProjectTimeline'
import { coreContent } from 'pliny/utils/contentlayer'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'About' })

export default function Page() {
  const author = allAuthors.find((p) => p.slug === 'qsl') as Authors
  const mainContent = coreContent(author)

  return (
    <>
      <AuthorLayout content={mainContent}>
        <MDXLayoutRenderer code={author.body.code} />
        <section className="mt-10" aria-labelledby="professional-focus-title">
          <p className="section-label">Professional focus</p>
          <h2
            id="professional-focus-title"
            className="mt-3 text-2xl font-bold tracking-tight text-[var(--ink)]"
          >
            把 AI 能力做成可用的系统
          </h2>
          <p className="mt-4 leading-7 text-[var(--muted)]">
            专注于将语音、检索增强生成、多模态模型与 Agent 工作流转化为可运营的 AI
            能力：从端到端项目负责，到平台化建设，再到可评测、可迭代的生产质量系统。
          </p>
          <div className="mt-5 flex flex-wrap gap-2" aria-label="专业方向">
            {['语音与 ASR', 'RAG / LLM', '多模态智能', 'Agent 工作流', 'AI 系统工程'].map(
              (focus) => (
                <span
                  key={focus}
                  className="rounded-md border border-[var(--rule)] bg-[var(--surface-raised)] px-3 py-1.5 text-sm font-medium text-[var(--muted)]"
                >
                  {focus}
                </span>
              )
            )}
          </div>
        </section>
        <ProfessionalProjectTimeline />
      </AuthorLayout>
    </>
  )
}
