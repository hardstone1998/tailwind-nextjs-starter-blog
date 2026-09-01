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
    <article className="notebook-card flex h-full flex-col">
      {imgSrc && (
        <Image
          alt={title}
          src={imgSrc}
          sizes="(max-width: 767px) 100vw, 50vw"
          width={544}
          height={306}
          className="mb-5 w-full rounded object-cover"
        />
      )}
      <h2 className="text-2xl font-bold">{href ? <Link href={href}>{title}</Link> : title}</h2>
      <p className="mt-4 leading-7 text-[var(--muted)]">{description}</p>
      <div className="mt-5">
        <ResearchMeta {...{ domains, lab, status, methods, outcome }} />
      </div>
      {href && (
        <Link href={href} className="mt-auto pt-5 font-semibold text-[var(--accent)]">
          {t('viewResearchNote')} →
        </Link>
      )}
    </article>
  )
}
