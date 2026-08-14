'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'

export type SiteLanguage = 'zh' | 'en'

const messages = {
  zh: {
    languageName: '中文',
    switchLanguage: '切换为英文界面',
    homeHero: '多模态 / 视频模型工程师',
    homeIntro: 'Multimodal · Video · LLM Systems · Model Engineering。把 AI 能力做成可用的系统。',
    activeLabs: '查看活跃实验室',
    readNotes: '阅读研究笔记',
    currentLabs: '正在推进的实验',
    allLabs: '全部实验室 →',
    capabilityTitle: '从能力域进入研究现场',
    capabilityIntro: '每个能力域都连接到说明页面、相关笔记与正在进行的工作。',
    capabilityScore: '能力得分',
    latestNotes: '最新研究笔记',
    archive: '完整归档 →',
    blogTitle: '研究笔记',
    allNotes: '全部笔记',
    language: '语言',
    publicNotes: '公开作品集与研究笔记 · 多模态、视频与 AI 系统工程',
    light: '浅色',
    dark: '深色',
    system: '跟随系统',
    openMenu: '打开导航菜单',
    closeMenu: '关闭导航菜单',
    search: '搜索研究笔记',
    researchArchive: '研究归档',
    publishedOn: '发布于',
    tags: '主题',
    previousArticle: '上一篇',
    nextArticle: '下一篇',
    backToBlog: '返回博客',
    viewOnGitHub: '在 GitHub 查看',
    methods: '方法',
    outcome: '结果',
    viewResearchNote: '查看研究记录',
    capabilityDomain: '能力域',
    viewCapability: '查看能力域',
    profile: '个人介绍',
    capabilityClaim: '能力主张',
    evidence: '代表证据',
    assessment: '评分方法',
    assessmentDetails: '评估说明',
    scoringRubric: '评分提示词',
    historicalContext: '调用模型',
    backTo: '返回',
    projectsTitle: '实验室',
    projectsIntro: '记录可运行的项目，以及仍在持续迭代的研究实验。',
    careerArchive: '职业经历归档',
    careerIntro: '以下内容聚焦可公开的职责、方法与结果；业务名称和实现细节已按保密要求做抽象处理。',
    responsibilities: '查看职责摘要',
    collapseResponsibilities: '收起职责摘要',
    relatedPublicContent: '关联公开内容',
    publicLabs: '公开实验',
    projectBackground: '项目背景',
    architecture: '方案与系统链路',
    responsibilityScope: '我的负责范围',
    publicOutcomes: '可公开结果',
    backToAbout: '返回关于',
    noContent: '暂无该语言内容。',
  },
  en: {
    languageName: 'English',
    switchLanguage: 'Switch to Chinese interface',
    homeHero: 'Multimodal / Video Model Engineer',
    homeIntro:
      'Multimodal · Video · LLM Systems · Model Engineering. Turning AI capabilities into usable systems.',
    activeLabs: 'Explore active labs',
    readNotes: 'Read research notes',
    currentLabs: 'Labs in progress',
    allLabs: 'All labs →',
    capabilityTitle: 'Enter the work through capability domains',
    capabilityIntro: 'Each domain connects to its overview, related notes, and work in progress.',
    capabilityScore: 'Capability score',
    latestNotes: 'Latest research notes',
    archive: 'Full archive →',
    blogTitle: 'Research notes',
    allNotes: 'All notes',
    language: 'Language',
    publicNotes:
      'Public portfolio and research notes · multimodal, video, and AI systems engineering',
    light: 'Light',
    dark: 'Dark',
    system: 'System',
    openMenu: 'Open navigation menu',
    closeMenu: 'Close navigation menu',
    search: 'Search research notes',
    researchArchive: 'Research archive',
    publishedOn: 'Published on',
    tags: 'Tags',
    previousArticle: 'Previous article',
    nextArticle: 'Next article',
    backToBlog: 'Back to the blog',
    viewOnGitHub: 'View on GitHub',
    methods: 'Methods',
    outcome: 'Outcome',
    viewResearchNote: 'View research note',
    capabilityDomain: 'Capability domain',
    viewCapability: 'View capability',
    profile: 'Profile',
    capabilityClaim: 'Capability claim',
    evidence: 'Evidence',
    assessment: 'Assessment',
    assessmentDetails: 'Assessment details',
    scoringRubric: 'Scoring rubric',
    historicalContext: 'Historical context',
    backTo: 'Back to',
    projectsTitle: 'Labs',
    projectsIntro: 'Working projects and research experiments that are still being iterated.',
    careerArchive: 'Career archive',
    careerIntro:
      'This archive focuses on publicly shareable responsibilities, methods, and outcomes; business names and implementation details have been abstracted for confidentiality.',
    responsibilities: 'View responsibilities',
    collapseResponsibilities: 'Collapse responsibilities',
    relatedPublicContent: 'Related public content',
    publicLabs: 'Public labs',
    projectBackground: 'Project background',
    architecture: 'Architecture and delivery flow',
    responsibilityScope: 'My responsibilities',
    publicOutcomes: 'Public outcomes',
    backToAbout: 'Back to about',
    noContent: 'No content is available in this language.',
  },
} as const

type MessageKey = keyof (typeof messages)['zh']

interface LanguageContextValue {
  language: SiteLanguage
  setLanguage: (language: SiteLanguage) => void
  t: (key: MessageKey) => string
  articlePaths: Partial<Record<SiteLanguage, string>>
  setArticlePaths: (paths: Partial<Record<SiteLanguage, string>>) => void
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<SiteLanguage>('zh')
  const [articlePaths, setArticlePaths] = useState<Partial<Record<SiteLanguage, string>>>({})

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem('site-language')
    if (savedLanguage === 'en' || savedLanguage === 'zh') {
      setLanguage(savedLanguage)
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en'
    window.localStorage.setItem('site-language', language)
  }, [language])

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t: (key: MessageKey) => messages[language][key],
      articlePaths,
      setArticlePaths,
    }),
    [articlePaths, language]
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
