export type DomainId =
  | 'model-research'
  | 'systems-engineering'
  | 'multimodal-intelligence'
  | 'learning-practice'
  | 'product-thinking'
  | 'open-source-writing'
export type LabStatus = 'active' | 'iterating' | 'archived'
export interface DomainCopy {
  label: string
  shortLabel: string
  description: string
  claim: string
  introduction: string[]
  nextAction: { title: string; description: string }
}
export interface CapabilityDomain extends DomainCopy {
  id: DomainId
  route: `/skills/${string}`
  accent: 'blue' | 'emerald' | 'violet' | 'amber' | 'rose' | 'cyan'
  keywords: string[]
  assessmentId: string
  en: DomainCopy
}
export const labStatusLabels: Record<LabStatus, string> = {
  active: '进行中',
  iterating: '持续迭代',
  archived: '已归档',
}
export const capabilityDomains: CapabilityDomain[] = [
  {
    id: 'model-research',
    route: '/skills/code',
    accent: 'blue',
    assessmentId: 'model-research-v1',
    label: '模型理解与微调',
    shortLabel: '模型研究',
    description: '从任务约束、模型适配到候选评估，检验模型选择。',
    claim: '公开材料支持模型选型和评估设计的讨论；微调效果还需要配置、数据划分和实验记录支持。',
    introduction: [
      '围绕字幕翻译、语音适配和标题排序开展模型实践。职业案例记录了 LoRA 与奖励模型相关职责，公开笔记提供评估流程；这些材料不等于已独立复核的训练结果。',
    ],
    nextAction: {
      title: '补齐训练实验',
      description: '公开脱敏配置、同数据基线、消融和误差分析，明确本人负责范围。',
    },
    keywords: ['微调', '模型', 'fine-tuning', 'lora', 'qlora', 'ranking'],
    en: {
      label: 'Model understanding & adaptation',
      shortLabel: 'Model research',
      description:
        'Examine model choices through task constraints, adaptation and candidate evaluation.',
      claim:
        'Public material supports discussion of model selection and evaluation design; adaptation results still need configurations, data splits and experiment records.',
      introduction: [
        'My work spans subtitle translation, speech adaptation and title ranking. Career accounts describe LoRA and reward-model responsibilities, while public notes explain evaluation workflows. These are not independently verified training results.',
      ],
      nextAction: {
        title: 'Publish training experiments',
        description:
          'Add redacted configurations, matched-data baselines, ablations and error analysis, with a clear statement of my contribution.',
      },
    },
  },
  {
    id: 'systems-engineering',
    route: '/skills/model',
    accent: 'emerald',
    assessmentId: 'systems-engineering-v1',
    label: '系统工程与部署',
    shortLabel: '系统工程',
    description: '把模型带入服务：并发、资源管理、部署与恢复。',
    claim:
      '通过多进程排障、共享内存和有界队列记录工程取舍；历史压测包含硬件扩容，不能视为单项软件收益。',
    introduction: [
      '主要实践集中在 ASR 服务、异步处理与统一 AI 平台。公开代码片段和排障记录可说明实现思路，生产运行稳定性及独立复现仍需补充证据。',
    ],
    nextAction: {
      title: '建立公平压测基线',
      description: '固定设备与音频集，补充重复压测、尾延迟和故障恢复记录。',
    },
    keywords: ['部署', '系统', 'devops', 'docker', '性能', '并发', 'asyncio', 'sharedmemory'],
    en: {
      label: 'Systems engineering & deployment',
      shortLabel: 'Systems',
      description: 'Bring models into services: concurrency, resources, deployment and recovery.',
      claim:
        'Multiprocess debugging, shared memory and bounded queues document engineering trade-offs. Historical benchmarks include hardware expansion, not isolated software gains.',
      introduction: [
        'My practice focuses on ASR serving, asynchronous processing and a shared AI platform. Public snippets and debugging notes illustrate implementation choices; sustained production reliability and independent reproduction need further evidence.',
      ],
      nextAction: {
        title: 'Establish a matched benchmark',
        description:
          'Fix hardware and audio inputs; add repeated measurements, tail latency and recovery records.',
      },
    },
  },
  {
    id: 'multimodal-intelligence',
    route: '/skills/deploy',
    accent: 'violet',
    assessmentId: 'multimodal-intelligence-v1',
    label: '跨模态与多任务融合',
    shortLabel: '多模态',
    description: '连接文档、语言、语音与视觉任务。',
    claim: '职业案例描述了 OCR、语音适配和视觉检索；多组件集成不自动证明跨模态融合效果。',
    introduction: [
      '参与文档解析、语音转写和视觉向量检索等平台能力建设，并探索视频生产流程。当前证据主要是脱敏职责说明，尚缺公开的分模态对照和失败样例。',
    ],
    nextAction: {
      title: '发布跨模态评测',
      description: '提供明确任务、可公开样例、单模态基线以及缺失模态测试。',
    },
    keywords: ['跨模态', '多模态', 'multimodal', '视觉', '语音', '图像'],
    en: {
      label: 'Multimodal & multitask integration',
      shortLabel: 'Multimodal',
      description: 'Connect document, language, speech and visual tasks.',
      claim:
        'Career accounts describe OCR, speech adaptation and visual retrieval. Integrating components does not itself demonstrate effective multimodal fusion.',
      introduction: [
        'I have worked on document parsing, transcription and visual retrieval, and am exploring video production workflows. Current evidence is mainly redacted responsibility statements, without public per-modality comparisons or failure cases.',
      ],
      nextAction: {
        title: 'Publish multimodal evaluation',
        description:
          'Define a task with shareable examples, unimodal baselines and missing-modality tests.',
      },
    },
  },
  {
    id: 'learning-practice',
    route: '/skills/engineering',
    accent: 'amber',
    assessmentId: 'learning-practice-v1',
    label: '快速学习与技术更新',
    shortLabel: '学习实践',
    description: '以问题、实验和修正记录学习过程。',
    claim: '项目时间线提供学习线索，但不能仅凭输出数量或“两个周末”判断学习速度。',
    introduction: [
      '把技术问题转化为小规模实验，并通过公开笔记记录实现与取舍。当前材料尚不足以控制既有经验和任务难度，因此首评不宣称学习速度或跨任务迁移已得到验证。',
    ],
    nextAction: {
      title: '记录迁移与修正',
      description: '补充初始知识边界、失败假设及在新任务中应用后的调整。',
    },
    keywords: ['学习', '复盘', '试验', '实验', '适应'],
    en: {
      label: 'Learning & technical renewal',
      shortLabel: 'Learning',
      description: 'Document learning through questions, experiments and revisions.',
      claim:
        'Project timelines provide learning traces, but output volume or “two weekends” cannot establish learning speed.',
      introduction: [
        'I turn technical questions into small experiments and document implementation choices. Current material does not control for prior experience or task difficulty, so the assessment does not claim verified learning speed or transfer.',
      ],
      nextAction: {
        title: 'Document transfer and revision',
        description:
          'Record initial knowledge gaps, failed hypotheses and adaptations in a new task.',
      },
    },
  },
  {
    id: 'product-thinking',
    route: '/skills/nlp',
    accent: 'rose',
    assessmentId: 'product-thinking-v1',
    label: '产品导向与场景思维',
    shortLabel: '产品思维',
    description: '从用户约束和成功标准反推技术方案。',
    claim:
      '标题本地化与多模型工作流展示了问题界定和方案取舍；采用率等作者陈述仍需定义、样本和反馈记录支持。',
    introduction: [
      '围绕翻译质量、候选选择和开发者决策设计工作流，关注什么结果可被采用以及如何处理失败。公开材料可说明设计思路，但不替代独立用户验证。',
    ],
    nextAction: {
      title: '补充用户验证',
      description: '公开脱敏成功标准、样本范围、反馈方法和结果追踪。',
    },
    keywords: ['产品', '场景', 'nlp', '自然语言处理', '推荐系统', 'ranking', '本地化'],
    en: {
      label: 'Product & scenario thinking',
      shortLabel: 'Product',
      description: 'Work backwards from user constraints and success criteria.',
      claim:
        'Title localization and multi-model workflows illustrate framing and trade-offs. Reported adoption rates still need definitions, samples and feedback records.',
      introduction: [
        'I design workflows for translation quality, candidate selection and developer decisions, focusing on usable outcomes and failure handling. Public material explains design choices but does not replace independent user validation.',
      ],
      nextAction: {
        title: 'Add user validation',
        description:
          'Publish redacted success criteria, sample scope, feedback methods and outcome tracking.',
      },
    },
  },
  {
    id: 'open-source-writing',
    route: '/skills/open-source',
    accent: 'cyan',
    assessmentId: 'open-source-writing-v1',
    label: '技术影响力与表达',
    shortLabel: '开源表达',
    description: '把技术过程组织成可理解、可验证的公开材料。',
    claim: '公开笔记和项目说明展示技术表达；是否被复用、社区影响和持续维护需要单独证据。',
    introduction: [
      '以博客、代码片段和实验截图解释实现路径与取舍。首评关注实际材料的清晰度及局限，不以文章数量或自述推断社区认可。',
    ],
    nextAction: {
      title: '补齐复现与反馈',
      description: '提供版本化运行说明、已解决问题和有记录的外部复现或协作反馈。',
    },
    keywords: ['开源', '分享', '表达', 'open source', 'github'],
    en: {
      label: 'Technical communication & impact',
      shortLabel: 'Open source',
      description: 'Organize technical work into understandable, verifiable public material.',
      claim:
        'Notes and project descriptions show communication. Reuse, community impact and sustained maintenance require separate evidence.',
      introduction: [
        'I explain implementation and trade-offs through notes, code snippets and screenshots. This assessment examines the material itself, without inferring community recognition from publication counts or self-description.',
      ],
      nextAction: {
        title: 'Add reproduction and feedback',
        description:
          'Provide versioned run instructions, resolved issues and recorded external reproduction or collaboration.',
      },
    },
  },
]
export const domainById = Object.fromEntries(capabilityDomains.map((d) => [d.id, d])) as Record<
  DomainId,
  CapabilityDomain
>
export function localizeDomain(domain: CapabilityDomain, language: 'zh' | 'en'): CapabilityDomain {
  return language === 'en' ? { ...domain, ...domain.en } : domain
}
export const getAssessmentRoute = (domain: CapabilityDomain) =>
  `${domain.route}/assessment` as `/skills/${string}/assessment`
export const getDomainBySkillPath = (path: string) =>
  capabilityDomains.find((d) => d.route === `/skills/${path}`)
export const siteNavigation = [
  { href: '/', title: { zh: '首页', en: 'Home' } },
  { href: '/blog', title: { zh: '研究笔记', en: 'Notes' } },
  { href: '/tags', title: { zh: '主题索引', en: 'Topics' } },
  { href: '/projects', title: { zh: '实验室', en: 'Labs' } },
  { href: '/about', title: { zh: '关于', en: 'About' } },
]
