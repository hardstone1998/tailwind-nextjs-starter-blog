'use client'
import { useLanguage } from './LanguageProvider'
export default function AboutProfile() {
  const { language, t } = useLanguage()
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
    <section>
      <h2 className="text-3xl font-bold">{t('homeHero')}</h2>
      <p className="mt-4 leading-8 text-[var(--muted)]">{t('homeIntro')}</p>
      <div className="mt-8 grid gap-4">
        {focus.map(([title, body]) => (
          <section className="notebook-card" key={title}>
            <h3 className="font-bold">{title}</h3>
            <p className="mt-3 leading-7 text-[var(--muted)]">{body}</p>
          </section>
        ))}
      </div>
    </section>
  )
}
