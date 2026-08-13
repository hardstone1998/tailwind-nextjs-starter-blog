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
  },
} as const

type MessageKey = keyof (typeof messages)['zh']

interface LanguageContextValue {
  language: SiteLanguage
  setLanguage: (language: SiteLanguage) => void
  t: (key: MessageKey) => string
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<SiteLanguage>('zh')

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
    }),
    [language]
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
