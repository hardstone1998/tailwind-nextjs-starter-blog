'use client'

import Image from '@/components/Image'
import { useLanguage } from './LanguageProvider'

export default function AboutProfile() {
  const { language, t } = useLanguage()
  const copy =
    language === 'zh'
      ? {
          label: 'PROFILE / 01',
          title: '让复杂的 AI，成为可靠、自然的产品体验。',
          intro:
            '我专注于多模态、视频和 LLM 系统工程。从模型能力、评测数据到服务链路，持续把可行的技术方案推进为可用的业务系统。',
          portrait: 'AI 工程师的自我介绍插画',
          principles: [
            ['01', '方向判断', '从真实问题出发，找到值得长期投入的路径。'],
            ['02', '系统落地', '让模型、数据与产品在同一套交付链路里协同。'],
            ['03', '持续迭代', '用评测和反馈驱动每一次可验证的改进。'],
          ],
          focusLabel: '正在聚焦',
        }
      : {
          label: 'PROFILE / 01',
          title: 'Turning complex AI into reliable, natural product experiences.',
          intro:
            'I work across multimodal, video and LLM systems engineering—taking viable ideas from model capability and evaluation data through to dependable production workflows.',
          portrait: 'Illustrated self-introduction of an AI engineer',
          principles: [
            [
              '01',
              'Sound judgment',
              'Start with real problems and choose a direction worth compounding.',
            ],
            [
              '02',
              'Systems delivery',
              'Bring models, data and product together in one delivery loop.',
            ],
            [
              '03',
              'Continuous iteration',
              'Use evaluation and feedback to make each improvement measurable.',
            ],
          ],
          focusLabel: 'Current focus',
        }
  const focus =
    language === 'zh'
      ? [
          ['多模态与视频', '视频理解与生成、文档解析、OCR / DocVQA 与视觉检索。'],
          ['LLM 与生成质量', 'RAG / Agent、奖励模型、候选排序、评估与数据闭环。'],
          ['模型服务与平台', 'ASR Serving、模型适配、资源管理与可观测性。'],
        ]
      : [
          [
            'Multimodal & video',
            'Video understanding and generation, document parsing, OCR / DocVQA and visual retrieval.',
          ],
          [
            'LLMs & generation quality',
            'RAG / agents, reward models, candidate ranking, evaluation and data feedback.',
          ],
          [
            'Model serving & platforms',
            'ASR serving, adaptation, resource management and observability.',
          ],
        ]
  return (
    <section className="not-prose">
      <div className="relative overflow-hidden rounded-3xl border border-[var(--rule)] bg-[var(--surface-raised)] shadow-[0_18px_60px_rgb(24_35_44/0.08)]">
        <div className="absolute top-0 right-0 h-48 w-48 translate-x-1/3 -translate-y-1/3 rounded-full bg-[var(--signal)] opacity-25 blur-3xl" />
        <div className="grid items-center lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.86fr)]">
          <div className="relative order-2 p-6 sm:p-10 lg:order-1 lg:py-12">
            <p className="section-label">{copy.label}</p>
            <p className="mt-5 text-sm font-semibold tracking-[0.12em] text-[var(--accent)] uppercase">
              {t('homeHero')}
            </p>
            <h2 className="mt-3 max-w-xl text-3xl leading-tight font-extrabold tracking-tight text-[var(--ink)] sm:text-4xl">
              {copy.title}
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-[var(--muted)]">{copy.intro}</p>
            <div className="mt-7 flex flex-wrap gap-2" aria-label={copy.focusLabel}>
              {['Multimodal', 'Video', 'LLM Systems', 'Model Engineering'].map((item) => (
                <span
                  className="rounded-full border border-[var(--rule)] bg-[var(--surface)] px-3 py-1.5 text-xs font-semibold tracking-wide text-[var(--ink)]"
                  key={item}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="relative order-1 border-b border-[var(--rule)] bg-[#162127] p-3 sm:p-5 lg:order-2 lg:border-b-0 lg:border-l">
            <div className="overflow-hidden rounded-2xl shadow-2xl shadow-black/30">
              <Image
                src="/static/images/about-engineer.png"
                alt={copy.portrait}
                width={1122}
                height={1536}
                priority
                sizes="(max-width: 1023px) calc(100vw - 3rem), 38vw"
                className="h-auto w-full"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {copy.principles.map(([number, title, body]) => (
          <section className="notebook-card group" key={number}>
            <p className="font-mono text-xs font-bold tracking-widest text-[var(--accent)]">
              {number}
            </p>
            <h3 className="mt-5 text-lg font-bold text-[var(--ink)]">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{body}</p>
          </section>
        ))}
      </div>

      <div className="mt-12">
        <div className="flex items-end justify-between gap-4 border-b border-[var(--rule)] pb-4">
          <div>
            <p className="section-label">{copy.focusLabel}</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-[var(--ink)]">
              {t('homeHero')}
            </h2>
          </div>
          <span className="hidden text-sm text-[var(--muted)] sm:block">{t('homeIntro')}</span>
        </div>
        <div className="mt-5 grid gap-4">
          {focus.map(([title, body], index) => (
            <section
              className="group grid gap-3 rounded-2xl border border-[var(--rule)] bg-[var(--surface-raised)] p-5 transition-colors hover:border-[var(--accent)] sm:grid-cols-[2.5rem_minmax(0,1fr)] sm:gap-5"
              key={title}
            >
              <span className="font-mono text-xs font-bold tracking-widest text-[var(--accent)]">
                0{index + 1}
              </span>
              <div>
                <h3 className="font-bold text-[var(--ink)]">{title}</h3>
                <p className="mt-2 leading-7 text-[var(--muted)]">{body}</p>
              </div>
            </section>
          ))}
        </div>
      </div>
    </section>
  )
}
