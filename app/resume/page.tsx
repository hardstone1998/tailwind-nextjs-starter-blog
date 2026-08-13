import Link from '@/components/Link'
import {
  orderedProfessionalProjects,
  professionalProjectStatusLabels,
} from '@/data/professionalProjects'
import siteMetadata from '@/data/siteMetadata'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({
  title: 'Resume',
  description: '多模态 / 视频模型工程师的脱敏在线简历：项目经历、技术能力与可公开结果。',
})

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

const workExperience = [
  {
    period: '2024.07 — 至今',
    title: '算法工程师',
    company: 'AI 技术服务公司（脱敏）',
    description: '负责多模态、语音与 LLM 应用的模型工程、平台能力建设和生产落地。',
  },
  {
    period: '2022.02 — 2024.07',
    title: '开发工程师',
    company: '技术服务公司（脱敏）',
    description: '负责智能客服、语音与知识检索系统的端到端研发、部署与数据工具建设。',
  },
]

export default function ResumePage() {
  return (
    <div className="py-12 sm:py-16">
      <section className="border-b border-[var(--rule)] pb-10 sm:pb-14">
        <p className="section-label">Online Resume · Desensitized</p>
        <div className="mt-4 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-extrabold tracking-tight text-[var(--ink)] sm:text-5xl">
              多模态 / 视频模型工程师
            </h1>
            <p className="mt-4 text-lg leading-8 text-[var(--muted)]">
              Multimodal · Video · LLM Systems · Model Engineering
            </p>
            <p className="mt-3 text-lg font-medium text-[var(--ink)]">把 AI 能力做成可用的系统。</p>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm font-medium">
            <a
              className="text-[var(--accent)] hover:underline"
              href={`mailto:${siteMetadata.email}`}
            >
              {siteMetadata.email}
            </a>
            <a
              className="text-[var(--accent)] hover:underline"
              href={siteMetadata.github}
              target="_blank"
              rel="noreferrer"
            >
              GitHub ↗
            </a>
            <Link className="text-[var(--accent)] hover:underline" href="/about">
              About →
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16" aria-labelledby="capabilities-title">
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
              <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{capability.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section
        className="border-y border-[var(--rule)] py-12 sm:py-16"
        aria-labelledby="projects-title"
      >
        <p className="section-label">Selected Projects</p>
        <div className="mt-3 max-w-3xl">
          <h2 id="projects-title" className="text-3xl font-bold tracking-tight text-[var(--ink)]">
            项目经历
          </h2>
          <p className="mt-3 leading-7 text-[var(--muted)]">
            以可公开职责、技术方案与结果呈现项目经验；客户、业务名称及内部实现均已脱敏。
          </p>
        </div>
        <ol className="mt-8 grid gap-4 lg:grid-cols-2">
          {orderedProfessionalProjects.map((project) => (
            <li key={project.id}>
              <article className="notebook-card">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="font-mono text-xs font-semibold tracking-wide text-[var(--muted)]">
                    {project.period}
                  </p>
                  <span className="rounded-full border border-[var(--rule)] bg-[var(--surface)] px-2.5 py-1 text-xs font-semibold text-[var(--muted)]">
                    {professionalProjectStatusLabels[project.status]}
                  </span>
                </div>
                <h3 className="mt-4 text-2xl font-bold tracking-tight text-[var(--ink)]">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm font-semibold text-[var(--accent)]">{project.role}</p>
                <p className="mt-4 max-w-3xl leading-7 text-[var(--muted)]">{project.summary}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.methods.map((method) => (
                    <span
                      key={method}
                      className="rounded-md border border-[var(--rule)] bg-[var(--surface)] px-2.5 py-1 text-xs font-medium text-[var(--muted)]"
                    >
                      {method}
                    </span>
                  ))}
                </div>
                <Link
                  href={`/resume/projects/${project.id}`}
                  className="mt-7 inline-flex text-sm font-semibold text-[var(--accent)] hover:underline"
                >
                  查看项目详情 →
                </Link>
              </article>
            </li>
          ))}
        </ol>
      </section>

      <section className="py-12 sm:py-16" aria-labelledby="experience-title">
        <p className="section-label">Experience & Education</p>
        <div className="mt-3 grid gap-10 lg:grid-cols-2">
          <div>
            <h2
              id="experience-title"
              className="text-3xl font-bold tracking-tight text-[var(--ink)]"
            >
              工作经历
            </h2>
            <ol className="mt-7 space-y-5 border-l border-[var(--rule)] pl-5">
              {workExperience.map((experience) => (
                <li key={experience.period} className="relative">
                  <span
                    aria-hidden="true"
                    className="absolute top-1.5 -left-[1.82rem] h-3 w-3 rounded-full border-2 border-[var(--surface)] bg-[var(--accent)]"
                  />
                  <p className="font-mono text-xs font-semibold text-[var(--muted)]">
                    {experience.period}
                  </p>
                  <h3 className="mt-2 text-lg font-bold text-[var(--ink)]">{experience.title}</h3>
                  <p className="mt-1 text-sm font-medium text-[var(--accent)]">
                    {experience.company}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                    {experience.description}
                  </p>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-[var(--ink)]">教育经历</h2>
            <article className="notebook-card mt-7">
              <p className="font-mono text-xs font-semibold text-[var(--muted)]">
                2017.09 — 2021.06
              </p>
              <h3 className="mt-3 text-lg font-bold text-[var(--ink)]">太原科技大学</h3>
              <p className="mt-1 text-sm font-medium text-[var(--accent)]">应用心理学 · 本科</p>
            </article>
          </div>
        </div>
      </section>
    </div>
  )
}
