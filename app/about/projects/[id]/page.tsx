import Link from '@/components/Link'
import {
  orderedProfessionalProjects,
  professionalProjectStatusLabels,
  type ProfessionalProject,
} from '@/data/professionalProjects'
import { genPageMetadata } from 'app/seo'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

function getProject(id: string): ProfessionalProject | undefined {
  return orderedProfessionalProjects.find((project) => project.id === id)
}

export async function generateMetadata(props: {
  params: Promise<{ id: string }>
}): Promise<Metadata | undefined> {
  const { id } = await props.params
  const project = getProject(id)

  if (!project) return

  return genPageMetadata({
    title: `${project.title} · 项目详情`,
    description: project.summary,
  })
}

export function generateStaticParams() {
  return orderedProfessionalProjects.map((project) => ({ id: project.id }))
}

function DetailSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-[var(--rule)] py-10">
      <h2 className="text-2xl font-bold tracking-tight text-[var(--ink)]">{title}</h2>
      <div className="mt-5 text-[var(--muted)]">{children}</div>
    </section>
  )
}

export default async function ProjectDetailPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params
  const project = getProject(id)

  if (!project) notFound()

  return (
    <article className="py-12 sm:py-16">
      <Link href="/about" className="text-sm font-semibold text-[var(--accent)] hover:underline">
        ← 返回关于
      </Link>
      <header className="mt-8 border-b border-[var(--rule)] pb-10">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="font-mono text-xs font-semibold tracking-wide text-[var(--muted)]">
            {project.period}
          </p>
          <span className="rounded-full border border-[var(--rule)] bg-[var(--surface)] px-2.5 py-1 text-xs font-semibold text-[var(--muted)]">
            {professionalProjectStatusLabels[project.status]}
          </span>
        </div>
        <p className="section-label mt-7">Desensitized Project Case Study</p>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-[var(--ink)] sm:text-5xl">
          {project.title}
        </h1>
        <p className="mt-4 text-lg font-semibold text-[var(--accent)]">{project.role}</p>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-[var(--muted)]">{project.summary}</p>
        <div className="mt-7 flex flex-wrap gap-2">
          {project.methods.map((method) => (
            <span
              key={method}
              className="rounded-md border border-[var(--rule)] bg-[var(--surface-raised)] px-3 py-1.5 text-sm font-medium text-[var(--muted)]"
            >
              {method}
            </span>
          ))}
        </div>
      </header>

      {project.background && (
        <DetailSection title="项目背景">
          <p className="max-w-3xl leading-7">{project.background}</p>
        </DetailSection>
      )}

      {project.architecture && (
        <DetailSection title="方案与系统链路">
          <ol className="space-y-3">
            {project.architecture.map((item, index) => (
              <li key={item} className="flex gap-3 leading-7">
                <span className="font-mono text-sm font-semibold text-[var(--accent)]">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
        </DetailSection>
      )}

      <DetailSection title="我的负责范围">
        <ul className="max-w-3xl list-disc space-y-3 pl-5 leading-7">
          {project.responsibilities.map((responsibility) => (
            <li key={responsibility}>{responsibility}</li>
          ))}
        </ul>
      </DetailSection>

      {project.outcomes && (
        <DetailSection title="可公开结果">
          <ul className="max-w-3xl list-disc space-y-3 pl-5 leading-7">
            {project.outcomes.map((outcome) => (
              <li key={outcome}>{outcome}</li>
            ))}
          </ul>
        </DetailSection>
      )}

      <aside className="rounded-md border border-[var(--rule)] bg-[var(--surface-raised)] px-5 py-4 text-sm leading-6 text-[var(--muted)]">
        {project.confidentialityNotice ?? '本页面仅呈现可公开的项目内容。'}
      </aside>
    </article>
  )
}
