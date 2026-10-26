'use client'
import Image from './Image'
import Link from './Link'
import ResearchMeta from './research/ResearchMeta'
import { useLanguage } from './LanguageProvider'
import type { Project } from '@/data/projectsData'
export default function Card({
  title,
  description,
  imgSrc,
  href,
  domains,
  lab,
  status,
  methods,
  outcome,
}: Project) {
  const { t } = useLanguage()
  return (
    <article className={`project-entry ${imgSrc ? 'project-entry--illustrated' : ''}`}>
      {imgSrc && (
        <Image
          alt={title}
          src={imgSrc}
          sizes="(max-width: 767px) 100vw, 50vw"
          width={544}
          height={306}
          className="project-entry__image w-full object-cover"
        />
      )}
      <div className="min-w-0">
        <ResearchMeta lab={lab} status={status} compact />
        <h2 className="mt-5 text-2xl font-medium">
          {href ? <Link href={href}>{title}</Link> : title}
        </h2>
        <p className="mt-4 max-w-2xl leading-7 text-[var(--muted)]">{description}</p>
        <div className="mt-5">
          <ResearchMeta {...{ domains, methods, outcome }} />
        </div>
        {href && (
          <Link href={href} className="console-link mt-6 inline-block text-sm">
            {t('viewResearchNote')}
          </Link>
        )}
      </div>
    </article>
  )
}
