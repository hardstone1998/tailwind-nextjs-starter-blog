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
}

const projectsData: Project[] = [
  {
    title: 'Project Parliament',
    description:
      'Lab #01 · 持续迭代 · 两个周末完成。一个面向开发者的多模型开源项目方向评估实验：让模型先发散、再辩论，最后收敛出可执行的主路线与备选路线。\n\nFastAPI / OpenRouter / Multi-model workflow',
    imgSrc: '/static/images/projects/project-parliament-homepage.png',
    href: '/blog/project-parliament',
    domains: ['product-thinking', 'open-source-writing'],
    lab: 'Lab #01',
    status: 'iterating',
    methods: ['多模型工作流', '结构化辩论', 'FastAPI'],
    outcome: '从发散候选中收敛出可执行的开源主路线与备选路线。',
  },
  {
    title: 'WebNovel Title Localization Lab',
    description:
      'Lab #02 · 持续开发中。一个评估优先的中文网文英文标题本地化研究项目：在冻结候选集上比较规则、LLM 与学习排序器，让标题既忠实原作，也贴近英语读者。\n\nPython / FastAPI / LLM Ranking',
    href: '/blog/webnovel-title-localization-lab',
    domains: ['model-research', 'product-thinking'],
    lab: 'Lab #02',
    status: 'active',
    methods: ['冻结候选集', 'LLM 评估', '学习排序'],
    outcome: '以可复现实验比较规则、LLM 与学习排序的标题选择能力。',
  },
]

export default projectsData
