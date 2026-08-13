import Link from '@/components/Link'
import {
  orderedProfessionalProjects,
  professionalProjectsById,
  professionalProjectStatusLabels,
  type ProfessionalProject,
} from '@/data/professionalProjects'

const statusClassNames = {
  completed: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300',
  iterating: 'border-sky-500/30 bg-sky-500/10 text-sky-700 dark:text-sky-300',
  'in-progress': 'border-amber-500/30 bg-amber-500/10 text-amber-800 dark:text-amber-300',
  exploring: 'border-violet-500/30 bg-violet-500/10 text-violet-800 dark:text-violet-300',
} as const

function RelatedLinks({ project }: { project: ProfessionalProject }) {
  const relatedProjects = (project.relatedProjectIds ?? [])
    .map((id) => professionalProjectsById[id])
    .filter((relatedProject): relatedProject is ProfessionalProject => Boolean(relatedProject))

  const hasRelatedContent =
    project.relatedBlogs?.length || project.relatedLabs?.length || relatedProjects.length

  if (!hasRelatedContent) return null

  return (
    <div className="mt-6 border-t border-[var(--rule)] pt-5">
      <h4 className="text-sm font-semibold text-[var(--ink)]">关联公开内容</h4>
      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm">
        {project.relatedBlogs?.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="font-medium text-[var(--accent)] hover:underline"
          >
            博客：{link.title} →
          </Link>
        ))}
        {project.relatedLabs?.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="font-medium text-[var(--accent)] hover:underline"
          >
            公开实验：{link.title} →
          </Link>
        ))}
        {relatedProjects.map((relatedProject) => (
          <Link
            key={relatedProject.id}
            href={`#${relatedProject.id}`}
            className="font-medium text-[var(--accent)] hover:underline"
          >
            关联项目：{relatedProject.title} →
          </Link>
        ))}
      </div>
    </div>
  )
}

export default function ProfessionalProjectTimeline() {
  return (
    <section
      className="mt-12 border-t border-[var(--rule)] pt-10"
      aria-labelledby="career-projects-title"
    >
      <p className="section-label">Career Archive</p>
      <div className="mt-3 max-w-3xl">
        <h2
          id="career-projects-title"
          className="text-3xl font-bold tracking-tight text-[var(--ink)]"
        >
          职业经历归档
        </h2>
        <p className="mt-3 leading-7 text-[var(--muted)]">
          以下内容聚焦可公开的职责、方法与结果；业务名称和实现细节已按保密要求做抽象处理。
        </p>
      </div>

      <ol className="mt-8 space-y-5 border-l border-[var(--rule)] pl-5 sm:pl-7">
        {orderedProfessionalProjects.map((project) => (
          <li key={project.id} id={project.id} className="relative scroll-mt-8">
            <span
              aria-hidden="true"
              className="absolute top-7 -left-[1.82rem] h-3 w-3 rounded-full border-2 border-[var(--surface)] bg-[var(--accent)] sm:-left-[2.32rem]"
            />
            <article className="notebook-card">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="font-mono text-xs font-semibold tracking-wide text-[var(--muted)]">
                  {project.period}
                </p>
                <span
                  className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${statusClassNames[project.status]}`}
                >
                  {professionalProjectStatusLabels[project.status]}
                </span>
              </div>
              <h3 className="mt-4 text-2xl font-bold tracking-tight text-[var(--ink)]">
                <Link
                  href={`/about/projects/${project.id}`}
                  className="hover:text-[var(--accent)] hover:underline"
                >
                  {project.title}
                </Link>
              </h3>
              <p className="mt-2 text-sm font-semibold text-[var(--accent)]">{project.role}</p>
              <p className="mt-4 leading-7 text-[var(--muted)]">{project.summary}</p>
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
              <details className="group mt-6">
                <summary className="cursor-pointer list-none font-semibold text-[var(--ink)] marker:hidden">
                  <span className="group-open:hidden">查看职责与项目说明 +</span>
                  <span className="hidden group-open:inline">收起职责与项目说明 −</span>
                </summary>
                <div className="mt-5 space-y-6 text-[var(--muted)]">
                  <div>
                    <h4 className="text-sm font-semibold text-[var(--ink)]">我的负责范围</h4>
                    <ul className="mt-3 list-disc space-y-2 pl-5 leading-7">
                      {project.responsibilities.map((responsibility) => (
                        <li key={responsibility}>{responsibility}</li>
                      ))}
                    </ul>
                  </div>
                  {project.outcomes && (
                    <div>
                      <h4 className="text-sm font-semibold text-[var(--ink)]">可公开结果</h4>
                      <ul className="mt-3 list-disc space-y-2 pl-5 leading-7">
                        {project.outcomes.map((outcome) => (
                          <li key={outcome}>{outcome}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {project.confidentialityNotice && (
                    <p className="rounded-md border border-[var(--rule)] bg-[var(--surface)] px-4 py-3 text-sm leading-6">
                      {project.confidentialityNotice}
                    </p>
                  )}
                  <RelatedLinks project={project} />
                </div>
              </details>
            </article>
          </li>
        ))}
      </ol>
    </section>
  )
}
