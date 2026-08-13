import { Authors, allAuthors } from 'contentlayer/generated'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import AuthorLayout from '@/layouts/AuthorLayout'
import ProfessionalProjectTimeline from '@/components/ProfessionalProjectTimeline'
import { coreContent } from 'pliny/utils/contentlayer'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'About' })

const capabilities = [
  {
    title: '多模态与视频',
    description: '视频理解与生成、文档多模态解析、OCR / DocVQA、视觉检索与多模态资产工作流。',
  },
  {
    title: 'LLM 与生成质量',
    description: 'RAG / Agent、偏好学习、奖励模型、LLM 评估、候选排序与数据闭环。',
  },
  {
    title: '模型服务与平台',
    description: 'ASR Serving、模型微调与部署、性能优化、可观测性及可复用 AI Platform 能力。',
  },
]

export default function Page() {
  const author = allAuthors.find((p) => p.slug === 'qsl') as Authors
  const mainContent = coreContent(author)

  return (
    <>
      <AuthorLayout content={mainContent}>
        <MDXLayoutRenderer code={author.body.code} />
        <section className="mt-10" aria-labelledby="professional-focus-title">
          <p className="section-label">Professional Profile</p>
          <h2
            id="professional-focus-title"
            className="mt-3 text-3xl font-bold tracking-tight text-[var(--ink)]"
          >
            多模态 / 视频模型工程师
          </h2>
          <p className="mt-3 text-lg leading-8 text-[var(--muted)]">
            Multimodal · Video · LLM Systems · Model Engineering
          </p>
          <p className="mt-3 text-lg font-medium text-[var(--ink)]">把 AI 能力做成可用的系统。</p>
        </section>
        <section
          className="mt-12 border-t border-[var(--rule)] pt-10"
          aria-labelledby="capabilities-title"
        >
          <p className="section-label">Core Capabilities</p>
          <h2
            id="capabilities-title"
            className="mt-3 text-3xl font-bold tracking-tight text-[var(--ink)]"
          >
            核心能力
          </h2>
          <div className="mt-7 grid gap-4 md:grid-cols-3">
            {capabilities.map((capability) => (
              <article key={capability.title} className="notebook-card">
                <h3 className="text-lg font-bold text-[var(--ink)]">{capability.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                  {capability.description}
                </p>
              </article>
            ))}
          </div>
        </section>
        <ProfessionalProjectTimeline />
      </AuthorLayout>
    </>
  )
}
