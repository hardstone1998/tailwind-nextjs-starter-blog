export type ProfessionalProjectStatus = 'completed' | 'iterating' | 'in-progress' | 'exploring'

export interface ProfessionalProjectLink {
  title: string
  href: `/${string}`
}

export interface ProfessionalProject {
  id: string
  title: string
  period: string
  sortOrder: number
  status: ProfessionalProjectStatus
  role: string
  summary: string
  responsibilities: string[]
  methods: string[]
  outcomes?: string[]
  confidentialityNotice?: string
  relatedBlogs?: ProfessionalProjectLink[]
  relatedLabs?: ProfessionalProjectLink[]
  relatedProjectIds?: string[]
}

export const professionalProjectStatusLabels: Record<ProfessionalProjectStatus, string> = {
  completed: '已完成',
  iterating: '持续迭代',
  'in-progress': '开发中',
  exploring: '探索中',
}

const confidentialityNotice = '业务名称、数据和实现细节均已做抽象与脱敏处理。'

const professionalProjects: ProfessionalProject[] = [
  {
    id: 'video-creation-agent',
    title: '视频创作 Agent',
    period: '2026—至今',
    sortOrder: 202603,
    status: 'exploring',
    role: 'Agent 工作流设计与开发',
    summary: '探索从创意澄清到分镜视频生成的可控、人机协作式创作工作流。',
    responsibilities: [
      '拆解创意确认、剧本生成、资产规划与分镜视频生成之间的任务依赖。',
      '设计由 Agent 协调的自由创作流程，为后续人工确认和局部重做保留控制点。',
    ],
    methods: ['Agent', '创作工作流', '剧本生成', '资产规划', '分镜视频'],
    confidentialityNotice,
    relatedProjectIds: ['video-redraw-pipeline'],
  },
  {
    id: 'video-redraw-pipeline',
    title: '视频重绘流水线',
    period: '2026—至今',
    sortOrder: 202602,
    status: 'in-progress',
    role: '生成式视频流程开发',
    summary: '将既有视频资产拆解为镜头级的可编辑生产流程，并重建为新的成片。',
    responsibilities: [
      '设计从视频资产库解析、分镜脚本生成到资产图与分镜视频生成的端到端链路。',
      '组织镜头级资产与最终合成之间的中间产物，使流程便于持续调试与迭代。',
    ],
    methods: ['视频解析', '分镜脚本', '图像生成', '视频生成', '成片合成'],
    confidentialityNotice,
    relatedProjectIds: ['video-creation-agent'],
  },
  {
    id: 'translation-quality-system',
    title: '多语言翻译质量系统',
    period: '2025—至今',
    sortOrder: 202601,
    status: 'iterating',
    role: '翻译 Agent 与质量闭环建设',
    summary: '围绕剧名与视频字幕翻译，建立候选生成、模型评估、人工数据回流和持续迭代的质量系统。',
    responsibilities: [
      '搭建翻译流程 Agent，并打通线上数据、人工反馈和训练数据回流。',
      '设计剧名翻译候选生成、LLM 多维度打分和加权选择流程。',
      '使用人工标注数据训练奖励模型（RM）加入评估流程，并用 RM 训练数据改善候选生成的多样性。',
    ],
    methods: ['Translation Agent', 'LLM 评估', 'Reward Model', '候选排序', '数据回流'],
    outcomes: [
      '剧名翻译第一版采用多候选生成与 LLM 加权评分，线上采用率为 42%。',
      '引入 RM 后采用率提升至 70%；持续迭代后，部分语种超过 85%，平均约 75%。',
      '候选生成模型获得更多可用剧名候选，多样性提升、重复率降低。',
    ],
    confidentialityNotice,
    relatedBlogs: [
      {
        title: '生产级 LLM 字幕翻译质量体系',
        href: '/blog/2026-08-04-production-llm-subtitle-translation',
      },
      {
        title: 'Production LLM Subtitle Translation',
        href: '/blog/2026-08-06-production-llm-subtitle-translation-en',
      },
    ],
    relatedLabs: [
      {
        title: 'WebNovel Title Localization Lab',
        href: '/blog/webnovel-title-localization-lab',
      },
    ],
  },
  {
    id: 'asr-platform-engineering',
    title: 'ASR 性能优化与统一 AI 中台',
    period: '2025 年中—2026 年初',
    sortOrder: 202512,
    status: 'completed',
    role: '语音系统与 AI 平台建设',
    summary: '围绕高性能 ASR 推理、评测数据闭环和统一 AI 能力接入，支持多个业务场景复用。',
    responsibilities: [
      '优化多 Worker、任务队列与模型部署的协作方式，完成调研、压测与性能评估。',
      '搭建 ASR 评测程序与数据集，并组织普通话、四川话、英语及业务语料的收集与清洗。',
      '建设统一 AI 中台，为业务方提供 RAG、Agent 与 ASR 等通用能力。',
    ],
    methods: ['ASR', '性能优化', '多 Worker', '队列', '模型部署', '数据治理', 'AI 中台'],
    outcomes: ['形成从数据收集、评测到部署优化的 ASR 工程闭环，并沉淀为可复用的平台能力。'],
    confidentialityNotice,
    relatedBlogs: [
      {
        title: 'FunASR：Queue、SharedMemory 与全链路并发控制',
        href: '/blog/2025-12-14-funasr-performance-optimization-shared-memory',
      },
      {
        title: 'FunASR 多进程部署故障排查',
        href: '/blog/funasr-deployment-pitfall-guide-cpu-thread-explosion-memory-overflow',
      },
      {
        title: 'Python 多进程多模型部署',
        href: '/blog/python-multiprocessing-multi-model-deploy',
      },
    ],
  },
  {
    id: 'multimodal-platform-capabilities',
    title: '行业智能化平台能力建设',
    period: '2024 年中—2025 年中',
    sortOrder: 202412,
    status: 'completed',
    role: '平台子能力研发',
    summary: '面向复杂行业场景，持续交付语音、视觉、多模态检索与文档生成等平台型能力。',
    responsibilities: [
      '完成 ASR 微调训练、定制 OCR 开发与部署。',
      '建设以图搜图、文字搜图以及视频人物与物体识别能力。',
      '推进 TTS 声纹克隆和 Agent 驱动的文档、报告生成等功能。',
    ],
    methods: ['ASR 微调', 'OCR', '以图搜图', '文字搜图', '视频理解', 'TTS', 'Agent'],
    confidentialityNotice,
  },
  {
    id: 'intelligent-customer-service',
    title: '文化服务智能客服',
    period: '2023 年初—2024 年中',
    sortOrder: 202306,
    status: 'completed',
    role: '项目 Owner / 全流程开发',
    summary: '独立负责从语音输入到语音回复的智能客服全流程，完成模型、数据与标注工具的协同建设。',
    responsibilities: [
      '搭建 ASR → RAG → LLM → TTS 的端到端服务流程。',
      '完成 RAG 系统搭建，以及 ASR、LLM 训练数据的组织与标注。',
      '开展 LoRA 微调训练，并开发支持数据生产的标注平台。',
    ],
    methods: ['ASR', 'RAG', 'LLM', 'TTS', 'LoRA', '数据标注', '标注平台'],
    confidentialityNotice,
  },
]

export const professionalProjectsById = Object.fromEntries(
  professionalProjects.map((project) => [project.id, project])
) as Record<string, ProfessionalProject>

export const orderedProfessionalProjects = [...professionalProjects].sort(
  (left, right) => right.sortOrder - left.sortOrder
)

export default orderedProfessionalProjects
