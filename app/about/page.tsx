import { Authors, allAuthors } from 'contentlayer/generated'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import AuthorLayout from '@/layouts/AuthorLayout'
import ProfessionalProjectTimeline from '@/components/ProfessionalProjectTimeline'
import { coreContent } from 'pliny/utils/contentlayer'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'About' })

const featuredWork = [
  {
    number: '01',
    title: '视频重绘与多模态资产系统',
    focus: 'Video Understanding · Character Consistency · Video Generation',
    description:
      '将视频资产拆解为镜头级、可编辑的生产链路，并通过多模态资产管理支撑角色一致性与视频生成。',
    highlights: ['视频解析与分镜规划', '镜头级资产与角色一致性', '视频生成与成片合成'],
  },
  {
    number: '02',
    title: '基于偏好学习的多语言生成系统',
    focus: 'Reward Model · Preference Learning · LLM Evaluation',
    description: '构建从候选生成、模型评估到人工数据回流的翻译质量闭环，让多语言生成持续迭代。',
    highlights: ['候选生成与排序', '奖励模型与偏好学习', 'LLM 评估与数据回流'],
  },
  {
    number: '03',
    title: '高性能模型服务与 AI Platform',
    focus: 'ASR Serving · Model Deployment · AI Infrastructure',
    description: '围绕高并发 ASR 推理、模型部署和统一能力接入，沉淀可复用、可运营的 AI 平台能力。',
    highlights: ['高性能 ASR Serving', '模型部署与性能优化', 'AI Platform 基础设施'],
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
            className="mt-3 text-2xl font-bold tracking-tight text-[var(--ink)]"
          >
            把 AI 能力做成可用的系统
          </h2>
          <p className="mt-4 leading-7 text-[var(--muted)]">
            多模态 / 视频模型工程师。聚焦视频理解与生成、LLM 系统和模型工程：从端到端项目负责，
            到平台化建设，再到可评测、可迭代的生产质量系统。
          </p>
          <div className="mt-5 flex flex-wrap gap-2" aria-label="专业方向">
            {['Multimodal', 'Video', 'LLM Systems', 'Model Engineering', 'AI Platform'].map(
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
        <section
          className="mt-12 border-t border-[var(--rule)] pt-10"
          aria-labelledby="featured-work-title"
        >
          <p className="section-label">Featured Work</p>
          <div className="mt-3 max-w-3xl">
            <h2
              id="featured-work-title"
              className="text-3xl font-bold tracking-tight text-[var(--ink)]"
            >
              最强的三件事
            </h2>
            <p className="mt-3 leading-7 text-[var(--muted)]">
              面向模型与 AI 系统岗位：视频多模态生产、偏好学习驱动的生成质量，以及高性能模型服务。
            </p>
          </div>
          <ol className="mt-8 grid gap-4">
            {featuredWork.map((work) => (
              <li key={work.number} className="notebook-card">
                <div className="flex flex-wrap items-start gap-x-5 gap-y-3">
                  <span className="font-mono text-sm font-bold tracking-[0.16em] text-[var(--accent)]">
                    {work.number}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-xl font-bold tracking-tight text-[var(--ink)]">
                      {work.title}
                    </h3>
                    <p className="mt-2 font-mono text-xs leading-5 text-[var(--accent)]">
                      {work.focus}
                    </p>
                    <p className="mt-4 leading-7 text-[var(--muted)]">{work.description}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {work.highlights.map((highlight) => (
                        <span
                          key={highlight}
                          className="rounded-md border border-[var(--rule)] bg-[var(--surface)] px-2.5 py-1 text-xs font-medium text-[var(--muted)]"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </section>
        <ProfessionalProjectTimeline />
      </AuthorLayout>
    </>
  )
}
