export type DomainId =
  | 'model-research'
  | 'systems-engineering'
  | 'multimodal-intelligence'
  | 'learning-practice'
  | 'product-thinking'
  | 'open-source-writing'

export type LabStatus = 'active' | 'iterating' | 'archived'

export interface CapabilityDomain {
  id: DomainId
  label: string
  shortLabel: string
  description: string
  route: `/skills/${string}`
  score: number
  accent: 'blue' | 'emerald' | 'violet' | 'amber' | 'rose' | 'cyan'
  keywords: string[]
}

export const labStatusLabels: Record<LabStatus, string> = {
  active: '进行中',
  iterating: '持续迭代',
  archived: '已归档',
}

export const capabilityDomains: CapabilityDomain[] = [
  {
    id: 'model-research',
    label: '模型理解与微调',
    shortLabel: '模型研究',
    description: '从模型机理、训练策略到高效微调，理解并改进模型行为。',
    route: '/skills/code',
    score: 72,
    accent: 'blue',
    keywords: ['微调', '模型', 'fine-tuning', '训练', 'pretrain', 'lora', 'qlora'],
  },
  {
    id: 'systems-engineering',
    label: '系统工程与部署',
    shortLabel: '系统工程',
    description: '把模型带入生产：并发、性能、部署与可靠性。',
    route: '/skills/model',
    score: 71.5,
    accent: 'emerald',
    keywords: [
      '部署',
      '系统',
      '工程',
      'devops',
      'docker',
      'kubernetes',
      'ci/cd',
      'infrastructure',
      '性能',
      '并发',
      'asyncio',
      'sharedmemory',
    ],
  },
  {
    id: 'multimodal-intelligence',
    label: '跨模态与多任务融合',
    shortLabel: '多模态',
    description: '连接语言、语音、视觉与跨任务智能。',
    route: '/skills/deploy',
    score: 68.5,
    accent: 'violet',
    keywords: ['跨模态', '多模态', 'multimodal', '多任务', 'fusion', '视觉', '语音', '图像'],
  },
  {
    id: 'learning-practice',
    label: '快速学习与技术更新',
    shortLabel: '学习实践',
    description: '用实践和复盘保持技术判断持续更新。',
    route: '/skills/engineering',
    score: 72,
    accent: 'amber',
    keywords: ['学习', '技术', '更新', '新技术', '学习能力', '快速', '适应'],
  },
  {
    id: 'product-thinking',
    label: '产品导向与场景思维',
    shortLabel: '产品思维',
    description: '把算法能力放回真实用户、场景与产品决策。',
    route: '/skills/nlp',
    score: 73,
    accent: 'rose',
    keywords: [
      '产品',
      '场景',
      '应用',
      '落地',
      'nlp',
      '自然语言处理',
      '推荐系统',
      'ranking',
      '本地化',
    ],
  },
  {
    id: 'open-source-writing',
    label: '技术影响力与表达',
    shortLabel: '开源表达',
    description: '通过开源、写作与可复现材料让技术产生外部价值。',
    route: '/skills/open-source',
    score: 57.5,
    accent: 'cyan',
    keywords: ['开源', '分享', '技术', '影响力', '表达', 'open source', 'github', 'markdown'],
  },
]

export const domainById = Object.fromEntries(
  capabilityDomains.map((domain) => [domain.id, domain])
) as Record<DomainId, CapabilityDomain>

export const siteNavigation = [
  { href: '/', title: '首页' },
  { href: '/blog', title: '研究笔记' },
  { href: '/tags', title: '主题索引' },
  { href: '/projects', title: '实验室' },
  { href: '/about', title: '关于' },
]
