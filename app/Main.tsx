'use client'

import { useEffect, useState } from 'react'
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import Link from '@/components/Link'
import CapabilityMap from '@/components/research/CapabilityMap'
import LabStatusBadge from '@/components/research/LabStatusBadge'
import NotebookCard from '@/components/research/NotebookCard'
import SectionLabel from '@/components/research/SectionLabel'
import { capabilityDomains } from '@/data/siteConfig'
import projectsData from '@/data/projectsData'
import { useLanguage } from '@/components/LanguageProvider'

const MAX_DISPLAY = 5

type RadarAngleTickProps = {
  x?: number | string
  y?: number | string
  payload?: { value?: number | string }
}

function renderRadarAngleAxis({ x, y, payload }: RadarAngleTickProps) {
  const shortLabel = String(payload?.value ?? '')
  const domain = capabilityDomains.find((item) => item.shortLabel === shortLabel)

  if (!domain || x === undefined || y === undefined) return <text />

  return (
    <a
      href={domain.route}
      aria-label={`查看 ${domain.label} 能力域详情 / View ${domain.label} details`}
    >
      <text
        x={x}
        y={y}
        fill="var(--accent)"
        fontSize={12}
        style={{ cursor: 'pointer', textDecoration: 'underline', textUnderlineOffset: 3 }}
        textAnchor="middle"
      >
        {shortLabel}
      </text>
    </a>
  )
}

export default function Home({ posts }) {
  const { t } = useLanguage()
  const [showRadar, setShowRadar] = useState(false)
  const activeLabs = projectsData.filter(
    (project) => project.status === 'active' || project.status === 'iterating'
  )
  const radarData = capabilityDomains.map((domain) => ({
    subject: domain.shortLabel,
    score: domain.score,
  }))

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px)')
    const updateVisibility = () => setShowRadar(mediaQuery.matches)
    updateVisibility()
    mediaQuery.addEventListener('change', updateVisibility)
    return () => mediaQuery.removeEventListener('change', updateVisibility)
  }, [])

  return (
    <div className="pb-12">
      <section className="notebook-grid border-b border-[var(--rule)] py-14 sm:py-20">
        <SectionLabel>Public research notebook · NLP Journey</SectionLabel>
        <div className="mt-5 max-w-4xl">
          <h1 className="text-4xl font-extrabold tracking-tight text-[var(--ink)] sm:text-6xl">
            {t('homeHero')}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--muted)]">{t('homeIntro')}</p>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/projects"
            className="rounded-md bg-[var(--ink)] px-4 py-2.5 text-sm font-semibold text-[var(--surface)] transition-opacity hover:opacity-85"
          >
            {t('activeLabs')}
          </Link>
          <Link
            href="/blog"
            className="rounded-md border border-[var(--rule)] bg-[var(--surface-raised)] px-4 py-2.5 text-sm font-semibold text-[var(--ink)] hover:border-[var(--accent)]"
          >
            {t('readNotes')}
          </Link>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <SectionLabel>Active labs</SectionLabel>
        <div className="mt-3 flex items-end justify-between gap-4">
          <h2 className="text-3xl font-bold tracking-tight text-[var(--ink)]">
            {t('currentLabs')}
          </h2>
          <Link
            href="/projects"
            className="text-sm font-semibold text-[var(--accent)] hover:underline"
          >
            {t('allLabs')}
          </Link>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {activeLabs.map((project) => (
            <Link
              key={project.title}
              href={project.href ?? '/projects'}
              className="notebook-card block transition-transform hover:-translate-y-0.5"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-xs font-semibold tracking-[0.14em] text-[var(--muted)]">
                  {project.lab}
                </span>
                <LabStatusBadge status={project.status} />
              </div>
              <h3 className="mt-4 text-xl font-bold text-[var(--ink)]">{project.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{project.outcome}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-[var(--rule)] py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-center">
          <div>
            <SectionLabel>Capability map</SectionLabel>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[var(--ink)]">
              {t('capabilityTitle')}
            </h2>
            <p className="mt-4 max-w-2xl leading-7 text-[var(--muted)]">{t('capabilityIntro')}</p>
            <div className="mt-7">
              <CapabilityMap />
            </div>
          </div>
          <div
            className="notebook-card hidden h-96 lg:block"
            role="region"
            aria-label="Capability map with six domains; radar labels and cards link to their details."
          >
            {showRadar && (
              <ResponsiveContainer>
                <RadarChart cx="50%" cy="50%" outerRadius="72%" data={radarData}>
                  <PolarGrid stroke="var(--rule)" />
                  <PolarAngleAxis dataKey="subject" tick={renderRadarAngleAxis} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar
                    name={t('capabilityScore')}
                    dataKey="score"
                    stroke="var(--accent)"
                    fill="var(--accent)"
                    fillOpacity={0.25}
                  />
                  <Tooltip formatter={(value: number) => [`${value}`, t('capabilityScore')]} />
                </RadarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="flex items-end justify-between gap-4">
          <div>
            <SectionLabel>Latest notes</SectionLabel>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[var(--ink)]">
              {t('latestNotes')}
            </h2>
          </div>
          <Link href="/blog" className="text-sm font-semibold text-[var(--accent)] hover:underline">
            {t('archive')}
          </Link>
        </div>
        <div className="mt-7 grid gap-4">
          {posts.slice(0, MAX_DISPLAY).map((post) => (
            <NotebookCard
              key={post.slug}
              path={`blog/${post.slug}`}
              date={post.date}
              title={post.title}
              summary={post.summary}
              domains={post.domains}
              lab={post.lab}
              status={post.status}
              methods={post.methods}
              outcome={post.outcome}
            />
          ))}
        </div>
      </section>
    </div>
  )
}
