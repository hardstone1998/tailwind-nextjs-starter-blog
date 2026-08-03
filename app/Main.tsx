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

const MAX_DISPLAY = 5

export default function Home({ posts }) {
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
            把模型、系统与实验，变成可复现的成果。
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--muted)]">
            这里记录 NLP、LLM 与 AI 系统工程中的问题、方法、结果和下一步，而不只是结论。
          </p>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/projects"
            className="rounded-md bg-[var(--ink)] px-4 py-2.5 text-sm font-semibold text-[var(--surface)] transition-opacity hover:opacity-85"
          >
            查看活跃实验室
          </Link>
          <Link
            href="/blog"
            className="rounded-md border border-[var(--rule)] bg-[var(--surface-raised)] px-4 py-2.5 text-sm font-semibold text-[var(--ink)] hover:border-[var(--accent)]"
          >
            阅读研究笔记
          </Link>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <SectionLabel>Active labs</SectionLabel>
        <div className="mt-3 flex items-end justify-between gap-4">
          <h2 className="text-3xl font-bold tracking-tight text-[var(--ink)]">正在推进的实验</h2>
          <Link
            href="/projects"
            className="text-sm font-semibold text-[var(--accent)] hover:underline"
          >
            全部实验室 →
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
              从能力域进入研究现场
            </h2>
            <p className="mt-4 max-w-2xl leading-7 text-[var(--muted)]">
              每个能力域都连接到说明页面、相关笔记与正在进行的工作。
            </p>
            <div className="mt-7">
              <CapabilityMap />
            </div>
          </div>
          <div
            className="notebook-card hidden h-96 lg:block"
            role="img"
            aria-label="六个能力域的能力地图；下方文字卡片提供等价导航。"
          >
            {showRadar && (
              <ResponsiveContainer>
                <RadarChart cx="50%" cy="50%" outerRadius="72%" data={radarData}>
                  <PolarGrid stroke="var(--rule)" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--muted)', fontSize: 12 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar
                    name="能力得分"
                    dataKey="score"
                    stroke="var(--accent)"
                    fill="var(--accent)"
                    fillOpacity={0.25}
                  />
                  <Tooltip formatter={(value: number) => [`${value}`, '能力得分']} />
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
              最新研究笔记
            </h2>
          </div>
          <Link href="/blog" className="text-sm font-semibold text-[var(--accent)] hover:underline">
            完整归档 →
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
