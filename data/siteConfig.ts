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
  models: string
  introduction: string
  evidenceBasis: string
  dimensions: string
  updateFrequency: string
  notice: string
}

interface AssessmentDetails {
  criteria: string[]
  scoreRange: string
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

const legacyModelContext: AssessmentModelContext = {
  models: 'GPT-4 / Claude-3.5',
  introduction: '本技能评分通过AI模型评估生成，评估模型综合考虑了以下因素：',
  evidenceBasis: '项目经验、技术博客、代码仓库、技术分享等',
  dimensions: '理论深度、实践经验、项目复杂度、技术影响力',
  updateFrequency: '根据最新项目和技术输出定期更新',
  notice: '评分仅供参考，实际能力会随着项目经验和技术学习持续提升。',
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
      '在模型理解与微调能力方面，我深入理解Transformer架构、注意力机制等核心原理，能够从底层理解大模型的工作机制。我具备丰富的模型微调实践经验，熟悉LoRA、QLoRA、Adapter等参数高效微调方法。',
      '我擅长根据具体任务需求选择合适的预训练模型，设计微调策略，优化训练流程。在模型理解方面，我能够分析模型的内部表示、注意力模式，理解模型的行为机制。我具备从零开始训练模型的能力，也擅长基于预训练模型进行领域适配和任务微调。',
    ],
    assessmentDetails: {
      criteria: [
        '模型架构理解：对Transformer、BERT、GPT等模型架构的深入理解',
        '微调技术：LoRA、QLoRA、Adapter等参数高效微调方法的应用',
        '训练优化：训练策略设计、超参数调优、训练稳定性控制',
        '模型分析：模型内部机制分析、注意力可视化、表示学习理解',
        '实践项目：实际微调项目的复杂度和效果',
        '理论基础：对深度学习、自然语言处理理论的掌握',
      ],
      scoreRange: '0-100分',
      modelContext: legacyModelContext,
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
      '在系统工程与部署能力方面，我专注于将AI模型和算法转化为可生产部署的系统。我具备丰富的DevOps实践经验，熟悉Docker容器化、Kubernetes编排、CI/CD流程设计等。能够从零到一构建完整的AI服务基础设施，确保系统的可扩展性、稳定性和高性能。',
      '我擅长设计微服务架构，优化模型推理性能，处理高并发场景。在部署过程中，我注重监控、日志、容错机制等运维最佳实践，确保AI系统能够稳定运行并持续迭代优化。',
    ],
    assessmentDetails: {
      criteria: [
        '系统架构设计能力：能否设计可扩展、高可用的系统架构',
        '容器化与编排：Docker、Kubernetes等容器技术的掌握程度',
        'CI/CD流程：自动化部署流程的设计与实施能力',
        '性能优化：系统性能调优、资源管理能力',
        '监控与运维：日志、监控、告警等运维实践',
        '故障处理：问题定位、容错机制设计能力',
      ],
      scoreRange: '0-100分',
      modelContext: legacyModelContext,
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
      '在跨模态与多任务融合方面，我专注于将不同模态（文本、图像、语音等）的信息进行有效融合，并设计能够同时处理多个相关任务的统一模型架构。我深入研究视觉-语言理解、多模态预训练、跨模态检索等前沿技术。',
      '我具备设计和实现多任务学习框架的能力，能够通过共享表示学习提升模型效率。在跨模态融合方面，我熟悉注意力机制、特征对齐、模态转换等关键技术，能够构建端到端的跨模态理解系统。',
    ],
    assessmentDetails: {
      criteria: [
        '跨模态理解能力：文本-图像、文本-语音等跨模态理解技术掌握',
        '多任务学习：设计统一架构处理多个相关任务的能力',
        '特征融合技术：不同模态特征的融合与对齐方法',
        '预训练模型应用：CLIP、ALIGN等跨模态预训练模型的使用',
        '实际项目经验：跨模态应用场景的落地实践',
        '技术创新：在跨模态融合方面的创新与优化',
      ],
      scoreRange: '0-100分',
      modelContext: legacyModelContext,
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
      '在快速学习与技术更新能力方面，我具备强烈的学习驱动力和快速适应新技术的能力。我始终保持对AI领域最新技术趋势的敏感度，能够快速理解并掌握新的模型架构、算法和工具。',
      '我建立了系统化的学习体系，通过阅读论文、实践项目、技术分享等方式持续提升。我擅长从零开始快速上手新技术栈，能够在短时间内将理论知识转化为实际应用能力。面对技术快速迭代的AI领域，我能够保持持续学习的状态，不断更新知识体系。',
    ],
    assessmentDetails: {
      criteria: [
        '学习速度：快速理解新技术、新概念的能力',
        '技术跟踪：对前沿技术的关注度和跟踪能力',
        '知识更新：知识体系的持续更新频率和深度',
        '实践转化：将理论知识快速转化为实践的能力',
        '学习系统：是否有系统化的学习方法论',
        '适应能力：面对新技术栈的适应速度',
      ],
      scoreRange: '0-100分',
      modelContext: legacyModelContext,
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
      '在产品导向与场景思维方面，我始终将技术能力与业务需求紧密结合。我具备从用户场景出发，设计AI解决方案的能力，能够将复杂的AI技术转化为解决实际问题的产品功能。',
      '我擅长分析业务场景，理解用户痛点，设计符合产品定位的AI功能。在NLP领域，我深入理解文本理解、信息抽取、对话系统等技术的应用场景，能够根据不同的业务需求选择合适的技术方案，并考虑性能、成本、用户体验等因素。',
    ],
    assessmentDetails: {
      criteria: [
        '场景理解：对业务场景和用户需求的理解深度',
        '产品思维：将技术转化为产品功能的能力',
        '技术选型：根据场景选择合适技术方案的能力',
        '落地实践：技术在实际产品中的落地经验',
        '用户体验：考虑用户体验和产品体验的能力',
        '业务价值：技术方案带来的业务价值评估',
      ],
      scoreRange: '0-100分',
      modelContext: legacyModelContext,
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
      '在技术影响力与表达力方面，我致力于通过技术分享、开源贡献、博客写作等方式传播技术知识，与社区共同成长。我具备将复杂技术概念清晰表达的能力，能够通过文字、代码、演示等多种形式分享技术见解。',
      '我积极参与开源社区，贡献代码、文档和技术方案。通过技术博客记录学习过程和实践经验，帮助他人少走弯路。我注重技术表达的准确性和可理解性，能够将深奥的技术原理转化为易于理解的内容，提升技术影响力。',
    ],
    assessmentDetails: {
      criteria: [
        '技术写作：技术博客、文档的质量和数量',
        '开源贡献：GitHub等平台的开源项目贡献',
        '技术分享：技术会议、社区分享的参与度',
        '表达能力：将复杂技术清晰表达的能力',
        '社区影响：在技术社区的影响力和认可度',
        '知识传播：帮助他人学习和成长的能力',
      ],
      scoreRange: '0-100分',
      modelContext: legacyModelContext,
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
