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
  background?: string
  architecture?: string[]
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
    period: '2026',
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
    period: '2026',
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
    period: '2025',
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
    period: '2025',
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
    title: '行业多模态平台',
    period: '2024',
    sortOrder: 202412,
    status: 'completed',
    role: '平台子能力研发',
    summary:
      '面向复杂行业场景，交付多语种文档解析、语音识别、视觉向量检索与 LLM 文本理解等可复用平台能力。',
    background:
      '面向需要处理多语种文档、音视频与图像资料的行业用户，统一提供文档解析、内容检索、语音转写和文本理解能力，以提升信息处理效率与可访问性。',
    architecture: [
      '文档侧：多 OCR 引擎路由 → 语种识别与版面还原 → 结构化抽取 / DocVQA。',
      '语音侧：Whisper large-v3 → LoRA 小语种与行业术语适配 → 流式分段与端点检测 → 服务化推理。',
      '视觉侧：ResNetV2-50 / CLIP 特征提取 → Milvus GPU 索引 → 倒排与向量混合检索。',
      '应用侧：Qwen / GPT Prompt-based 分类 → FastAPI 服务封装 → 容器化、灰度发布、监控与异常降级。',
    ],
    responsibilities: [
      '整合 PP-OCR、EasyOCR 与 MinerU，构建多语种 OCR 路由、版面还原、结构化抽取与 DocVQA 能力。',
      '使用 Whisper large-v3 与 LoRA 完成小语种、行业术语适配，并实现流式分段与端点检测的服务化部署。',
      '基于 ResNetV2-50 / CLIP 提取视觉特征并接入 Milvus，支持以图搜图、文字搜图及文档封面等视觉检索场景。',
      '探索以 Qwen / GPT 为核心的 Prompt-based 文本分类，支持无标签冷启动场景；完成容器化、灰度发布、监控与异常降级。',
    ],
    methods: [
      'OCR / DocVQA',
      'Whisper + LoRA',
      'CTranslate2',
      'CLIP / ResNet',
      'Milvus',
      'LLM 分类',
      'FastAPI',
    ],
    outcomes: [
      '统一多语种识别与版面还原后，结构化字段准确率提升 9.8%。',
      '小语种 ASR 服务端到端 P95 降低 28%，QPS 提升 1.4×。',
      '千万级视觉向量检索 P99 小于 120ms，并通过倒排与向量混检降低误召。',
    ],
    confidentialityNotice,
  },
  {
    id: 'intelligent-customer-service',
    title: '文化服务智能客服',
    period: '2023',
    sortOrder: 202306,
    status: 'completed',
    role: '项目 Owner / 全流程开发',
    summary:
      '独立负责 ASR、RAG/Agent、LLM 与 TTS 的智能客服闭环，并完成话务接入、模型服务、评测与数据生产工具建设。',
    background:
      '面向文化服务场景的高频咨询，建设替代部分人工坐席的智能语音问答系统。系统需支持从电话语音输入到语音回复的完整闭环，并为知识更新、模型迭代和服务质量评估提供数据基础。',
    architecture: [
      '话务接入：FreeSWITCH → WebSocket 流式传输 → ASR 转写与 VAD 分段。',
      '问答决策：意图识别 → LlamaIndex / Milvus 检索与工具路由 → Qwen / ChatGLM 生成回复。',
      '语音反馈：Edge-TTS / VITS 合成 → 话务系统返回；3D-Speaker 支持身份核验与多说话人处理。',
      '质量闭环：链路追踪与回放 → ASR / QA 标注平台 → 训练数据、实验配置与 Prompt 版本管理。',
    ],
    responsibilities: [
      '基于 LlamaIndex 与 Milvus 构建知识库检索、工具路由与多轮问答，设计 System Prompt 与 Few-shot 模板，并建立召回率、覆盖率与幻觉率评测。',
      '完成 Whisper large-v2 LoRA 领域微调、CTranslate2 INT8 推理优化，以及 ChatGLM LoRA 意图识别和 Qwen 服务部署。',
      '使用 3D-Speaker 与 VAD 实现自动分段、多说话人分离、身份核验与黑名单能力；结合 Edge-TTS 和 VITS 支持语音反馈与音色迁移。',
      '对接 FreeSWITCH，打通 WebSocket 流式 ASR → RAG/Agent → LLM → TTS 链路；建设链路追踪、回放、ASR/QA 标注与 Prompt 版本管理工具。',
    ],
    methods: [
      'Whisper + LoRA',
      'RAG / Agent',
      'LlamaIndex',
      'Milvus',
      'Qwen / ChatGLM',
      '3D-Speaker + VAD',
      'FreeSWITCH',
      'Edge-TTS / VITS',
    ],
    outcomes: [
      'RAG 检索召回@20 提升 12%，幻觉率降低 18%。',
      'Whisper 领域识别准确率从 87% 提升至 93%；推理 P95 降低 37%，显存降低 30%，吞吐提升 1.6×。',
      '多说话人混叠场景误检降低 22%，语音合成 MOS 盲测提升 0.3。',
      '端到端服务峰值 QPS 达 120，P99 为 850ms。',
    ],
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
