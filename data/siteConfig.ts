export type DomainId =
  | 'model-research'
  | 'systems-engineering'
  | 'multimodal-intelligence'
  | 'learning-practice'
  | 'product-thinking'
  | 'open-source-writing'

export type LabStatus = 'active' | 'iterating' | 'archived'

type EvidenceType = 'project' | 'research-note' | 'practice'

interface CapabilityEvidence {
  title: string
  type: EvidenceType
  summary: string
  href?: `/${string}`
}

interface ScoreRationale {
  disclosure: string
  dimensions: string[]
  evidenceBasis: string
  reviewCadence: string
}

interface NextAction {
  title: string
  description: string
}

interface AssessmentModelContext {
  models: string[]
  description: string
  evidenceBasis: string
  dimensions: string
  updateFrequency: string
}

interface AssessmentDetails {
  criteria: string[]
  modelContext: AssessmentModelContext
}

export interface CapabilityDomain {
  id: DomainId
  label: string
  shortLabel: string
  description: string
  claim: string
  route: `/skills/${string}`
  score: number
  accent: 'blue' | 'emerald' | 'violet' | 'amber' | 'rose' | 'cyan'
  keywords: string[]
  evidence: CapabilityEvidence[]
  scoreRationale: ScoreRationale
  nextAction: NextAction
  introduction: string[]
  assessmentDetails: AssessmentDetails
}

export const labStatusLabels: Record<LabStatus, string> = {
  active: '进行中',
  iterating: '持续迭代',
  archived: '已归档',
}

const historicalModelContext: AssessmentModelContext = {
  models: ['GPT-4', 'Claude-3.5'],
  description:
    '旧版能力页曾将这些模型列为评估模型。该记录保留为历史页面上下文，不是可复现的当前评估运行。',
  evidenceBasis: '项目经验、技术博客、代码仓库与技术分享等公开或可核对材料。',
  dimensions: '理论深度、实践经验、项目复杂度与技术影响力。',
  updateFrequency: '根据新增项目、技术输出和公开复盘定期更新。',
}

export const capabilityDomains: CapabilityDomain[] = [
  {
    id: 'model-research',
    label: '模型理解与微调',
    shortLabel: '模型研究',
    description: '从模型机理、训练策略到高效微调，理解并改进模型行为。',
    claim: '围绕候选生成、评估与排序等模型决策环节，重点把可比较的实验设计转化为可审计的模型选择。',
    route: '/skills/code',
    score: 72,
    accent: 'blue',
    keywords: ['微调', '模型', 'fine-tuning', '训练', 'pretrain', 'lora', 'qlora'],
    evidence: [
      {
        title: 'WebNovel Title Localization Lab',
        type: 'project',
        summary: '以冻结候选集和八维评估比较规则、LLM 与学习排序方法，保留可复核的模型选择过程。',
        href: '/blog/webnovel-title-localization-lab',
      },
      {
        title: '推荐系统从召回到精排的分析',
        type: 'research-note',
        summary: '梳理候选生成、粗排与精排之间的目标差异和优化链路。',
        href: '/blog/recommendation-system-analysis-from-recall-to-ranking-optimization',
      },
    ],
    scoreRationale: {
      disclosure: '72/100 为基于已公开研究与项目记录维护的自评，不代表第三方认证。',
      dimensions: ['实验设计与可比性', '模型与排序方法选择', '训练和评估闭环', '结果可审计性'],
      evidenceBasis: '当前依据包括标题本地化实验和推荐系统分析等公开材料。',
      reviewCadence: '在新增可复核的模型实验或方法复盘后更新。',
    },
    nextAction: {
      title: '补充微调与误差分析记录',
      description: '把训练配置、失败实验和误差归因整理为可复现的公开笔记。',
    },
    introduction: [
      '我关注 Transformer、注意力机制与参数高效微调等模型方法，并通过标题本地化和排序问题持续练习模型选择与评估。',
      '面对具体任务时，我会从预训练模型、训练策略和评估标准一起审视方案，并把方法取舍与后续误差分析沉淀为可复核的记录。',
    ],
    assessmentDetails: {
      criteria: [
        '模型架构理解：对 Transformer、BERT、GPT 等模型架构的理解。',
        '微调技术：LoRA、QLoRA、Adapter 等参数高效微调方法的应用。',
        '训练优化：训练策略设计、超参数调优与训练稳定性控制。',
        '模型分析：模型内部机制分析、注意力可视化与表示学习理解。',
        '实践项目：实际微调或排序项目的复杂度与效果。',
        '理论基础：对深度学习和自然语言处理理论的掌握。',
      ],
      modelContext: historicalModelContext,
    },
  },
  {
    id: 'systems-engineering',
    label: '系统工程与部署',
    shortLabel: '系统工程',
    description: '把模型带入生产：并发、性能、部署与可靠性。',
    claim: '以推理服务的并发、内存和吞吐量约束为起点，持续验证模型系统从原型到稳定运行的工程取舍。',
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
    evidence: [
      {
        title: 'FunASR SharedMemory 与并发控制优化',
        type: 'research-note',
        summary: '记录 SharedMemory、AnyIO 和 Asyncio 锁在 50 路并发下的性能优化与量化结果。',
        href: '/blog/2025-12-14-funasr-performance-optimization-shared-memory',
      },
      {
        title: 'FunASR 多进程部署故障排查',
        type: 'practice',
        summary: '定位多进程推理中的 CPU 线程膨胀和内存溢出，并沉淀排查与修复路径。',
        href: '/blog/funasr-deployment-pitfall-guide-cpu-thread-explosion-memory-overflow',
      },
    ],
    scoreRationale: {
      disclosure: '71.5/100 为基于已公开系统实践维护的自评，不代表第三方认证。',
      dimensions: ['并发与资源管理', '性能测量与优化', '故障定位与恢复', '部署可维护性'],
      evidenceBasis: '当前依据包括 FunASR 的多进程排障、共享内存和并发控制实践。',
      reviewCadence: '在新增性能基准、部署复盘或可靠性改进后更新。',
    },
    nextAction: {
      title: '补齐端到端部署基线',
      description: '公开服务监控、容量规划和持续部署的最小可复现实验。',
    },
    introduction: [
      '我关注把 AI 模型从原型带到可运行服务时的工程问题，尤其是并发、内存、性能和稳定性之间的取舍。',
      '已有的 FunASR 排障与性能优化记录围绕多进程、共享内存和异步控制展开；后续会继续补齐监控、容量规划与部署基线。',
    ],
    assessmentDetails: {
      criteria: [
        '系统架构设计：设计可扩展、高可用系统架构的能力。',
        '容器化与编排：Docker、Kubernetes 等容器技术的掌握程度。',
        'CI/CD 流程：自动化部署流程的设计与实施能力。',
        '性能优化：系统性能调优与资源管理能力。',
        '监控与运维：日志、监控与告警等运维实践。',
        '故障处理：问题定位与容错机制设计能力。',
      ],
      modelContext: historicalModelContext,
    },
  },
  {
    id: 'multimodal-intelligence',
    label: '跨模态与多任务融合',
    shortLabel: '多模态',
    description: '连接语言、语音、视觉与跨任务智能。',
    claim:
      '面向语言、语音与视觉之间的任务连接持续积累方法判断，但目前公开材料尚不足以形成完整的证据链。',
    route: '/skills/deploy',
    score: 68.5,
    accent: 'violet',
    keywords: ['跨模态', '多模态', 'multimodal', '多任务', 'fusion', '视觉', '语音', '图像'],
    evidence: [],
    scoreRationale: {
      disclosure: '68.5/100 为基于当前学习与实践积累维护的自评，不代表第三方认证。',
      dimensions: ['跨模态任务拆解', '模态间信息对齐', '评测设计', '工程可行性'],
      evidenceBasis: '当前公开材料正在整理，分数将在可复核实验发布后补充证据。',
      reviewCadence: '在发布跨模态实验、评测或技术复盘后更新。',
    },
    nextAction: {
      title: '发布首个跨模态基准实验',
      description: '以明确任务、数据和评测指标建立可公开复核的多模态实践记录。',
    },
    introduction: [
      '我持续学习文本、图像和语音之间的信息连接方式，关注视觉语言理解、多模态预训练与跨模态检索等问题。',
      '目前这部分的公开实验材料仍在整理中，因此会先以明确任务、数据和评测指标建立基准记录，再逐步补充模型与工程实践。',
    ],
    assessmentDetails: {
      criteria: [
        '跨模态理解：文本—图像、文本—语音等跨模态理解技术的掌握。',
        '多任务学习：设计统一架构处理多个相关任务的能力。',
        '特征融合：不同模态特征的融合与对齐方法。',
        '预训练模型应用：CLIP、ALIGN 等跨模态预训练模型的使用。',
        '实际项目经验：跨模态应用场景的落地实践。',
        '技术创新：在跨模态融合方面的创新与优化。',
      ],
      modelContext: historicalModelContext,
    },
  },
  {
    id: 'learning-practice',
    label: '快速学习与技术更新',
    shortLabel: '学习实践',
    description: '用实践和复盘保持技术判断持续更新。',
    claim: '通过把新方法拆成小规模实验、复盘结果并沉淀为研究记录，维持对技术选型和问题边界的更新。',
    route: '/skills/engineering',
    score: 72,
    accent: 'amber',
    keywords: ['学习', '技术', '更新', '新技术', '学习能力', '快速', '适应'],
    evidence: [],
    scoreRationale: {
      disclosure: '72/100 为基于公开复盘与持续实践维护的自评，不代表第三方认证。',
      dimensions: ['问题拆解速度', '实验与复盘质量', '技术选型判断', '知识沉淀与迁移'],
      evidenceBasis: '当前以研究笔记和项目复盘作为积累线索，专题证据正在整理。',
      reviewCadence: '在完成一次有公开输出的学习专题或项目复盘后更新。',
    },
    nextAction: {
      title: '建立学习专题复盘索引',
      description: '把技术调研、试验结论和后续修正串成可追溯的专题记录。',
    },
    introduction: [
      '我把快速变化的技术主题拆成可验证的小问题，通过阅读、实践和复盘逐步形成自己的判断。',
      '重点不是追逐新概念，而是把新方法转化为项目中的可执行尝试，并在研究记录中保留结论、限制和后续修正。',
    ],
    assessmentDetails: {
      criteria: [
        '学习速度：快速理解新技术和新概念的能力。',
        '技术跟踪：对前沿技术的关注与跟踪能力。',
        '知识更新：知识体系的持续更新频率与深度。',
        '实践转化：将理论知识快速转化为实践的能力。',
        '学习系统：是否形成系统化的学习方法。',
        '适应能力：面对新技术栈的适应速度。',
      ],
      modelContext: historicalModelContext,
    },
  },
  {
    id: 'product-thinking',
    label: '产品导向与场景思维',
    shortLabel: '产品思维',
    description: '把算法能力放回真实用户、场景与产品决策。',
    claim:
      '从真实决策场景反推模型与工作流：先明确用户价值和可比较标准，再把技术方案收敛为可执行选择。',
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
    evidence: [
      {
        title: 'Project Parliament',
        type: 'project',
        summary: '将开放式开源方向通过多模型辩论收敛为面向开发者的主路线与备选路线。',
        href: '/blog/project-parliament',
      },
      {
        title: 'WebNovel Title Localization Lab',
        type: 'project',
        summary: '以英语读者和作品语境为约束，比较标题候选的可用性与排序结果。',
        href: '/blog/webnovel-title-localization-lab',
      },
    ],
    scoreRationale: {
      disclosure: '73/100 为基于已公开产品实验与研究记录维护的自评，不代表第三方认证。',
      dimensions: ['场景与用户约束定义', '评价标准设计', '方案取舍与收敛', '结果可执行性'],
      evidenceBasis: '当前依据包括 Project Parliament 和标题本地化实验的决策过程。',
      reviewCadence: '在完成新的用户场景验证或决策复盘后更新。',
    },
    nextAction: {
      title: '补充用户反馈与结果追踪',
      description: '把方案被采用后的反馈、偏差和下一轮决策纳入公开复盘。',
    },
    introduction: [
      '我习惯从用户场景和业务约束出发设计 AI 方案，把复杂技术放回真实问题、成本和体验中判断。',
      '无论是开源方向选择还是标题本地化实验，我都会先定义评价标准，再比较方案，并把最终选择与后续反馈连接起来。',
    ],
    assessmentDetails: {
      criteria: [
        '场景理解：对业务场景和用户需求的理解深度。',
        '产品思维：将技术转化为产品功能的能力。',
        '技术选型：根据场景选择合适技术方案的能力。',
        '落地实践：技术在实际产品中的落地经验。',
        '用户体验：考虑用户体验和产品体验的能力。',
        '业务价值：评估技术方案带来业务价值的能力。',
      ],
      modelContext: historicalModelContext,
    },
  },
  {
    id: 'open-source-writing',
    label: '技术影响力与表达',
    shortLabel: '开源表达',
    description: '通过开源、写作与可复现材料让技术产生外部价值。',
    claim: '把实验过程、技术取舍和可执行结论组织成可阅读、可复核、可继续协作的公开材料。',
    route: '/skills/open-source',
    score: 57.5,
    accent: 'cyan',
    keywords: ['开源', '分享', '技术', '影响力', '表达', 'open source', 'github', 'markdown'],
    evidence: [
      {
        title: 'Project Parliament 的公开实验记录',
        type: 'project',
        summary: '公开多模型工作流和结构化辩论过程，将模糊灵感转化为可讨论的开发者方向。',
        href: '/blog/project-parliament',
      },
    ],
    scoreRationale: {
      disclosure: '57.5/100 为基于当前公开项目与写作积累维护的自评，不代表第三方认证。',
      dimensions: ['技术叙事清晰度', '材料可复现性', '开源协作可用性', '持续输出'],
      evidenceBasis: '当前依据包括 Project Parliament 等公开项目说明和持续更新的研究笔记。',
      reviewCadence: '在发布可复现项目材料、系列技术文章或获得可验证反馈后更新。',
    },
    nextAction: {
      title: '完善项目复现入口',
      description: '为公开实验补齐运行说明、决策记录和可参与的后续任务。',
    },
    introduction: [
      '我希望通过技术写作、项目说明和可复现材料，把复杂的实验过程与技术取舍讲清楚，并与更多人协作。',
      '现阶段的重点是持续记录项目的学习过程和实践经验，补齐运行说明、决策记录与后续可参与的任务。',
    ],
    assessmentDetails: {
      criteria: [
        '技术写作：技术博客和文档的质量与数量。',
        '开源贡献：GitHub 等平台的开源项目贡献。',
        '技术分享：技术会议和社区分享的参与度。',
        '表达能力：将复杂技术清晰表达的能力。',
        '社区影响：在技术社区的影响力和认可度。',
        '知识传播：帮助他人学习和成长的能力。',
      ],
      modelContext: historicalModelContext,
    },
  },
]

export const domainById = Object.fromEntries(
  capabilityDomains.map((domain) => [domain.id, domain])
) as Record<DomainId, CapabilityDomain>

export function getAssessmentRoute(domain: CapabilityDomain) {
  return `${domain.route}/assessment` as `/skills/${string}/assessment`
}

export function getDomainBySkillPath(skillPath: string) {
  return capabilityDomains.find((domain) => domain.route === `/skills/${skillPath}`)
}

export const siteNavigation = [
  { href: '/', title: '首页' },
  { href: '/blog', title: '研究笔记' },
  { href: '/tags', title: '主题索引' },
  { href: '/projects', title: '实验室' },
  { href: '/about', title: '关于' },
]
