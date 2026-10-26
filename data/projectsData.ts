import { DomainId, LabStatus } from './siteConfig'

export interface Project {
  title: string
  description: string
  href?: string
  imgSrc?: string
  domains: DomainId[]
  lab: string
  status: LabStatus
  methods: string[]
  outcome: string
  en: { description: string; outcome: string; methods: string[] }
}

const projectsData: Project[] = [
  {
    title: 'Project Parliament',
    en: {
      description:
        'A multi-model experiment for developer project decisions: generate options, debate them and converge on an actionable primary and alternative path. Built over two weekends; still iterating.',
      outcome: 'Converge on actionable primary and alternative open-source directions.',
      methods: ['Multi-model workflow', 'Structured debate', 'FastAPI'],
    },
    description:
      '一个面向开发者的多模型项目方向评估实验：先生成候选，再进行结构化辩论，最后收敛为可执行路线。',
    imgSrc: '/static/images/projects/project-parliament-homepage.webp',
    href: '/blog/project-parliament',
    domains: ['product-thinking', 'open-source-writing'],
    lab: 'Lab #01',
    status: 'iterating',
    methods: ['多模型工作流', '结构化辩论', 'FastAPI'],
    outcome: '从发散候选中收敛出可执行的开源主路线与备选路线。',
  },
  {
    title: 'WebNovel Title Localization Lab',
    en: {
      description:
        'An evaluation-first experiment for English localization of Chinese webnovel titles. Compare rules, LLM judges and learning-to-rank on frozen candidates. Research is ongoing.',
      outcome:
        'Compare title-selection approaches on frozen candidates with reproducible evaluation.',
      methods: ['Frozen candidates', 'LLM evaluation', 'Learning to rank'],
    },
    description: '比较规则、LLM 评估与学习排序器，探索如何为中文网文选出适合英语读者的英文标题。',
    href: '/blog/webnovel-title-localization-lab',
    domains: ['model-research', 'product-thinking'],
    lab: 'Lab #02',
    status: 'active',
    methods: ['冻结候选集', 'LLM 评估', '学习排序'],
    outcome: '以可复现实验比较规则、LLM 与学习排序的标题选择能力。',
  },
]

export default projectsData
