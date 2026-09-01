'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'

export type SiteLanguage = 'zh' | 'en'

const messages = {
  zh: {
    featuredProjects: '代表项目',
    featuredIntro: '从真实任务、负责范围与可公开结果了解我的工作。',
    viewProject: '查看项目',
    pendingReview: 'AI 辅助初评，待人工复核',
    pendingAssessment: '待评估',
    provisionalScore: '暂定总分',
    evidenceCoverage: '证据覆盖率',
    evidenceCount: '项代表证据',
    rubricVersion: '规则版本',
    materialCutoff: '材料截止日期',
    nextLevelGap: '下一等级所缺证据',
    ratingRationale: '等级依据',
    evidenceType: '材料类型',
    evidenceLimit: '验证限制',
    authorAccount: '作者陈述',
    codeExperiment: '代码／实验材料',
    independentlyVerified: '独立验证',
    reviewScope: '仅评估现有公开材料所支持的表现，不代表完整职业能力或行业排名。',
    scoringFormula: '总分 = Σ（权重 × 等级 ÷ 4）。任一项缺证据时不发布总分；覆盖率不计入能力分。',
    levelZero: 'L0 表示材料明确显示未达到 L1；缺少材料记为待评估，不等于零分。',
    reviewNext: '人工复核需检查引用、等级匹配及缺项；尚无独立复现的材料不得视为独立认证。',
    assessmentHistory: '旧版手写分数已归档，缺少可复算记录，不能与本版直接比较。',
    nextAction: '下一步',
    evidenceOverview: '用证据了解能力',
    evidenceOverviewIntro: '查看材料、初评依据与尚缺的证据；缺少公开材料不等于没有能力。',
    previous: '上一页',
    next: '下一页',
    page: '页',
    of: '/',
    originalLanguage: '原文语言',
    untranslated: '本文暂无所选界面的译文，以下保留原文。',
    toc: '文章目录',
    readingMinutes: '分钟阅读',
    copyCode: '复制代码',
    copied: '已复制',
    copyFailed: '复制失败，请选择代码手动复制',
    skipContent: '跳转到正文',
    themeLabel: '选择主题',
    searchPlaceholder: '搜索标题或摘要…',
    searchLoading: '正在加载搜索索引…',
    searchError: '搜索索引加载失败，请重试。',
    retry: '重试',
    close: '关闭',
    loadComments: '加载评论',
    commentsUnavailable: '评论尚未配置。',
    scrollTop: '回到顶部',
    scrollComment: '前往评论',
    notFoundTitle: '页面未找到',
    notFoundBody: '这个地址没有对应内容，可以返回首页继续浏览。',
    backHome: '返回首页',
    allTopics: '主题索引',
    noTopics: '暂无主题。',
    confidential: '业务名称、数据和实现细节均已做抽象与脱敏处理。',
    projectAccount: '以下为作者提供的脱敏项目记录，结果尚未经独立复核。',
    completed: '已完成',
    iterating: '持续迭代',
    inProgress: '开发中',
    exploring: '探索中',
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
    featuredProjects: 'Selected work',
    featuredIntro: 'Explore real tasks, my responsibilities and publicly shareable outcomes.',
    viewProject: 'View project',
    pendingReview: 'AI-assisted preliminary review · Human review pending',
    pendingAssessment: 'Not assessed',
    provisionalScore: 'Provisional total',
    evidenceCoverage: 'Evidence coverage',
    evidenceCount: 'evidence records',
    rubricVersion: 'Rubric version',
    materialCutoff: 'Material cutoff',
    nextLevelGap: 'Evidence needed for the next level',
    ratingRationale: 'Rating rationale',
    evidenceType: 'Material type',
    evidenceLimit: 'Verification limits',
    authorAccount: 'Author account',
    codeExperiment: 'Code / experimental material',
    independentlyVerified: 'Independent verification',
    reviewScope:
      'Assessment of performance supported by available public material, not overall professional ability or industry ranking.',
    scoringFormula:
      'Total = Σ(weight × level ÷ 4). No total is published with missing evidence; coverage is separate from ability.',
    levelZero:
      'L0 requires evidence of not meeting L1. Missing material is not assessed, not zero.',
    reviewNext:
      'Human review must check citations, level matches and gaps. Material without independent reproduction is not independent certification.',
    assessmentHistory:
      'Legacy handwritten scores are archived without reproducible records and cannot be compared directly with this version.',
    nextAction: 'Next action',
    evidenceOverview: 'Explore capabilities through evidence',
    evidenceOverviewIntro:
      'Inspect material, preliminary judgments and missing evidence. Limited public material does not mean limited ability.',
    previous: 'Previous',
    next: 'Next',
    page: 'Page',
    of: 'of',
    originalLanguage: 'Original language',
    untranslated:
      'No translation is available for the selected interface language; the original text is shown below.',
    toc: 'On this page',
    readingMinutes: 'min read',
    copyCode: 'Copy code',
    copied: 'Copied',
    copyFailed: 'Copy failed. Select the code and copy it manually.',
    skipContent: 'Skip to content',
    themeLabel: 'Choose theme',
    searchPlaceholder: 'Search titles or summaries…',
    searchLoading: 'Loading search index…',
    searchError: 'Search index could not be loaded. Please retry.',
    retry: 'Retry',
    close: 'Close',
    loadComments: 'Load comments',
    commentsUnavailable: 'Comments are not configured yet.',
    scrollTop: 'Back to top',
    scrollComment: 'Go to comments',
    notFoundTitle: 'Page not found',
    notFoundBody: 'There is no content at this address. Return home to keep exploring.',
    backHome: 'Back to homepage',
    allTopics: 'Topics',
    noTopics: 'No topics yet.',
    confidential:
      'Business names, data and implementation details have been abstracted and redacted.',
    projectAccount:
      'These are redacted project records provided by the author. Outcomes have not been independently verified.',
    completed: 'Completed',
    iterating: 'Iterating',
    inProgress: 'In progress',
    exploring: 'Exploring',
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
  isLanguageReady: boolean
  setLanguage: (language: SiteLanguage) => void
  t: (key: MessageKey) => string
  articlePaths: Partial<Record<SiteLanguage, string>>
  setArticlePaths: (paths: Partial<Record<SiteLanguage, string>>) => void
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<SiteLanguage>('zh')
  const [initialized, setInitialized] = useState(false)
  const [articlePaths, setArticlePaths] = useState<Partial<Record<SiteLanguage, string>>>({})

  useEffect(() => {
    try {
      const savedLanguage = window.localStorage.getItem('site-language')
      if (savedLanguage === 'en' || savedLanguage === 'zh') setLanguage(savedLanguage)
    } catch {
      /* Storage is optional. */
    }
    setInitialized(true)
  }, [])

  useEffect(() => {
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en'
    if (initialized) {
      try {
        window.localStorage.setItem('site-language', language)
      } catch {
        /* Storage is optional. */
      }
    }
  }, [language, initialized])

  const value = useMemo(
    () => ({
      language,
      isLanguageReady: initialized,
      setLanguage,
      t: (key: MessageKey) => messages[language][key],
      articlePaths,
      setArticlePaths,
    }),
    [articlePaths, language, initialized]
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
