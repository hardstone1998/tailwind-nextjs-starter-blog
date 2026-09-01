export type ProfessionalProjectStatus = 'completed' | 'iterating' | 'in-progress' | 'exploring'

export interface ProfessionalProjectLink {
  title: string
  href: `/${string}`
}

export interface ProfessionalProjectDetailSection {
  title: string
  paragraphs: string[]
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
  detailSections?: ProfessionalProjectDetailSection[]
  responsibilities: string[]
  methods: string[]
  outcomes?: string[]
  confidentialityNotice?: string
  relatedBlogs?: ProfessionalProjectLink[]
  relatedLabs?: ProfessionalProjectLink[]
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
  },
  {
    id: 'translation-quality-system',
    title: '多语言翻译质量系统',
    period: '2025',
    sortOrder: 202601,
    status: 'iterating',
    role: '翻译三阶段 Agent、剧名 RM / RL 与质量闭环建设',
    summary:
      '围绕剧名与视频字幕翻译，建设从生成、诊断、定向修复到人工反馈和训练数据回流的多语言质量系统。',
    background:
      '业务需要把中文或英文内容持续交付到多个目标语种。剧名翻译既要忠实剧情，又要符合当地市场的表达和传播习惯；字幕翻译除语义准确外，还受到字幕 ID 对齐、术语一致性、阅读速度、标点与语区规范等约束。直接调用模型得到单次译文后，质量问题主要依赖译员逐条发现和修改，问题类型、最终采用结果与模型版本之间也缺少稳定关联。因此，项目分别建设字幕三阶段 Agent 和剧名候选选择链路，并以译员反馈、实际采用数据和人工修改结果构成统一的数据闭环。',
    architecture: [
      '字幕翻译：原文字幕、时间轴与术语 → 语种路由和上下文增强 → 第一阶段初译 → 第二阶段反思诊断 → 第三阶段定向改进 → 程序质检与语区后处理 → 交付译文。',
      '剧名翻译：原剧名、剧情简介与市场要求 → 多策略候选生成 → 长度和硬性风险过滤 → LLM 多维评分 / RM 评估 → 加权排序与人工采用 → 实际剧名记录。',
      '工程保障：统一行协议与字幕 ID → CPS、术语及文字泄漏检查 → 主备模型切换与失败降级 → 分阶段日志、Token 和修正记录 → 按语种独立配置与迭代。',
      '质量闭环：主动收集译员问题反馈、剧名采用率、实际采用剧名、字幕单行修改率和整集无修改率 → 错误分类与样本清洗 → 回归集、RM / RL 数据和 Prompt 样本 → 新版本离线评估与线上反馈。',
    ],
    responsibilities: [
      '在既有字幕初译链路中引入“初译—反思—改进”三阶段 Agent：由反思阶段定位错译、漏译、术语、字幕错位、CPS 和语区表达问题，再由改进阶段只修复问题行。',
      '设计剧名多候选生成、硬性质量过滤、LLM 多维度打分和加权选择流程；使用人工偏好与实际采用数据构建奖励模型，并将奖励信号用于 RL 迭代候选生成和排序。',
      '建设主动反馈与数据回流流程，关联译员问题、最终人工版本、实际采用剧名、语种、模型和策略版本，将生产反馈整理为评估、训练及回归样本。',
      '建立剧名采用率、字幕单行修改率、整集无修改率与严重错误分类等指标，按语种持续比较 Agent、Prompt、规则、RM 和 RL 版本的效果。',
    ],
    detailSections: [
      {
        title: '字幕三阶段 Agent 与定向问题修复',
        paragraphs: [
          '字幕链路的核心改动，是把一次性翻译拆成职责清晰的三个阶段。第一阶段根据源字幕、上下文、术语和目标语种要求完成初译；第二阶段同时读取原文与初译，按语义、漏译、字幕行对应、术语、CPS 和语区表达等维度输出问题诊断；第三阶段接收诊断结果，只返回需要修改的字幕行，并按 index 合并回原译文。没有发现问题时可以跳过改进阶段，避免为了“润色”而改坏已经正确的内容。',
          'Agent 前后保留程序化保障：术语在翻译前匹配并贯穿诊断与修正，统一行协议保护字幕 ID，CPS 和语区规则负责低成本快速检查，目标语种后处理再统一标点和格式。各阶段支持主备模型切换；反思或改进失败时降级保留初译，不让附加质量环节扩大服务故障。分阶段元数据记录是否调用反思、是否执行改进、修正行数、模型尝试和 Token，为后续定位问题与成本评估提供依据。',
        ],
      },
      {
        title: '剧名候选、奖励模型与强化学习',
        paragraphs: [
          '剧名不是对原文做一次字面翻译，而是候选生成与选择问题。系统结合原剧名、剧情简介和目标市场要求，从不同策略生成多个候选，再做去重、长度控制和硬性风险过滤。通过语义忠实度、目标语自然度、题材与市场匹配、吸引力、辨识度及完整性安全等维度进行 LLM 评分，由程序复算加权结果并输出排序，保留候选、分项依据和最终选择记录。',
          '在第一版多候选与 LLM 加权评分基础上，将译员选择、实际采用剧名及相关人工偏好整理为训练数据，构建奖励模型（RM）学习业务对好剧名的判断。RM 既参与候选评估，也为强化学习（RL）提供奖励信号，用于继续优化候选生成和排序，使模型不只复现表面措辞，而是逐步学习不同语种和市场中的采用偏好。整条链路保留人工决策出口，并以真实采用结果检验模型评分是否与生产选择一致。',
        ],
      },
      {
        title: '译员反馈与生产数据闭环',
        paragraphs: [
          '反馈流程不只等待最终译文，而是主动收集译员在生产中遇到的问题，并记录问题字幕、错误类型、严重程度、修改前后文本和处理意见。剧名侧同时保存系统候选、推荐结果、是否采用以及最终实际采用的剧名；字幕侧保存单行修改结果和整集是否无需修改。数据通过任务、语种、模型、Prompt、Agent 与规则版本关联，使一次人工修改可以追溯到产生它的具体策略。',
          '回流时先清洗敏感信息和无效修改，再把高风险错译、漏译、人物关系、数字、术语、字幕错位、CPS 和表达问题分别沉淀为回归样本。剧名选择与采用记录用于 RM / RL 和候选排序，字幕修改对用于诊断 Prompt、定向修复和语种规则迭代；整集无修改样本则用于检查新版本是否破坏已经稳定的案例。新策略先离线回放，再结合后续生产指标决定是否继续使用。',
        ],
      },
      {
        title: '评估口径与持续迭代',
        paragraphs: [
          '剧名侧以候选可用性、推荐采用率和实际采用结果观察模型是否真正支持生产决策；字幕侧以单行修改率衡量人工返工量，以整集无修改率衡量可直接交付的完整剧集比例。同时保留严重错译、漏译、术语错误和字幕错位等分类指标，避免少量高风险错误被较低的字符修改量掩盖。',
          '指标按语种和版本拆分，用同一批样本比较直接翻译、三阶段 Agent、Prompt 调整、程序规则和模型训练版本。失败案例进入固定回归集，修改 Prompt、规则、RM 或 RL 策略后重新测试，并检查其他语种和错误类型是否退化，从而把零散人工经验转化为可以重复验证的优化过程。',
        ],
      },
    ],
    methods: [
      '三阶段 Translation Agent',
      '多语种路由',
      'CPS / 术语 / 行协议',
      'LLM 多维评估',
      'Reward Model / RL',
      '候选排序',
      '主动反馈',
      '回归评测',
    ],
    outcomes: [
      '剧名翻译第一版采用多候选生成与 LLM 加权评分，线上采用率为 42%。',
      '引入 RM 后采用率提升至 70%；持续迭代后，部分语种超过 85%，平均约 75%。',
      'RM 与 RL 迭代后，候选生成获得更多可用剧名，多样性提升、重复率降低，并以实际采用剧名持续校正奖励与排序。',
      '引入字幕三阶段 Agent 后，已有阶段性统计的阿拉伯语、印地语、日语、葡萄牙语和土耳其语单行字符修改率均较直接翻译下降；该指标用于衡量返工量，并与严重错误分类共同使用。',
      '形成覆盖译员问题、剧名采用、实际采用剧名、字幕单行修改和整集无修改结果的数据闭环，用于 Prompt、规则、Agent、RM 与 RL 的持续回归和优化。',
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
    role: 'ASR 服务优化、评测建设与 AI 中台开发',
    summary:
      '围绕语音识别服务的处理速度与并发能力，完成多进程推理和数据传输优化；收集中英文、四川方言及业务音频，搭建模型接口评测流程，并通过统一 AI 中台承接业务接入。',
    background:
      '业务既需要实时语音转写，也需要处理已有录音。随着并发请求增加，仅增加模型实例并不能直接解决锁竞争、进程间音频传输和前后处理带来的等待。同时，不同 ASR 模型在中文、英文、四川方言和实际业务录音上的表现需要用数据验证。因此，项目围绕服务性能、识别效果评测和平台接入三条主线展开：提高处理速度与并发承载能力，建立音频与人工标注组成的评测数据集，再把语音能力与 RAG、Agent 等能力纳入统一中台。',
    architecture: [
      '实时转写：WebSocket 音频输入 → 有界音频队列 → VAD 与流式 ASR → 标点、时间戳处理 → 增量与最终转写结果。',
      '文件转写：HTTP 文件上传或音频 URL → 音频预处理 → 模型工厂与多进程 Worker 调度 → 转写结果；业务侧长任务通过 Kafka 异步处理与回调。',
      '模型评测：中文三个开源数据集、英文三个开源数据集、四川方言数据及业务录音 → 整理与人工标注 → 调用各 ASR 模型接口 → 对照参考文本评估识别效果。',
      '平台接入：统一 API 与鉴权 → 公司、业务、模型及 Agent 配置 → ASR / LLM / RAG / TTS 能力调用 → 用量记录、链路追踪与失败任务处理。',
    ],
    responsibilities: [
      '负责 ASR 推理服务的加速与并发优化，调整锁粒度、多进程 Worker、共享内存传输和多设备模型调度，并通过压测验证方案。',
      '收集中文三个开源数据集、英文三个开源数据集、四川方言数据和实际业务音频，完成人工标注，并搭建调用不同 ASR 模型接口的效果评测程序。',
      '建设统一 AI 中台，提供模型与 Agent 接入、知识库检索、API Key 鉴权、业务配置和用量管理，打通异步语音转写与结果回调。',
    ],
    detailSections: [
      {
        title: 'ASR 加速与并发优化',
        paragraphs: [
          '优化重点是让音频处理更快，并在多路请求同时进入时保持可用的处理能力。服务基于 FastAPI 与 FunASR，支持 WebSocket 流式识别和 HTTP 文件转写，并将 VAD、标点预测、时间戳和可选说话人识别纳入语音处理链路。',
          '早期实现中，工厂级全局锁限制了多个模型实例的并行执行。迭代时先把锁的粒度收敛到模型实例，并尝试批处理；在多实例收益仍不明显后，移除当时的批处理机制，改用 multiprocessing 将模型放入独立 Worker 进程，通过模型工厂、任务队列与结果队列组织推理，并支持多 GPU 上的实例部署。随后将 VAD、标点和时间戳组件也纳入多实例与队列管理，避免只优化 ASR 主模型后，等待转移到其他环节。',
          '针对流式音频跨进程传输的开销，引入 SharedMemory 存放音频数据，队列主要传递任务信息、共享内存名称和数据长度，减少原先 Base64 编码及大块音频随队列传递的开销。由主进程在任务完成、异常和关闭时回收共享内存。Worker 读取后仍保留一次数组复制，优化主要减少了跨进程编码与传输的开销。',
          '在接口入口使用信号量控制并发，以 AnyIO 有界音频队列协调接收与处理速度，并对音频转换等环节单独限制并发。配合异步文件操作、任务与统计状态的锁保护，以及多进程部署中的 CPU 线程数约束，降低事件循环阻塞和资源争用。后续补充模型就绪检查、运行统计、Worker 存活监测与异常重启，以及启动和关闭时的资源管理。',
          '验证时使用不同并发档位和模型部署组合进行压测，观察总耗时、请求延迟、队列等待及 CPU、内存、GPU 使用情况，判断增加 Worker 或设备后是否获得实际收益。识别文本的质量则由独立的模型效果评测流程验证。',
        ],
      },
      {
        title: '评测数据集收集与人工标注',
        paragraphs: [
          '收集中文三个开源数据集、英文三个开源数据集，同时补充四川方言数据和实际业务中的音频，覆盖通用中文、英文、地方方言与业务场景。开源数据用于观察模型的通用识别表现，方言和业务录音用于补充通用语料难以代表的实际使用情况。',
          '对收集的音频进行整理与人工标注，建立音频和参考转写文本的对应关系，为不同模型提供共同的评估依据，将分散的数据来源整理成可以用于模型比较的样本。',
        ],
      },
      {
        title: '基于模型接口的识别效果评测',
        paragraphs: [
          '搭建评测程序，通过接口调用不同 ASR 模型，将评测音频送入模型并获取识别结果，再结合人工标注的参考文本评估转写效果。模型以服务接口接入，使效果比较不依赖于某一种模型的内部实现。',
          '在共同的音频样本上比较各模型的输出，关注其在中文、英文、四川方言及业务录音中的识别差异，为模型选择提供依据。评测程序回答模型是否适合具体语料的问题；服务压测回答处理速度和并发承载的问题，两者共同支撑后续方案选择与优化。',
        ],
      },
      {
        title: '统一 AI 中台与业务接入',
        paragraphs: [
          '统一中台承担业务系统与底层 AI 能力之间的接入和管理职责。基于 FastAPI 组织聊天、RAG、语音转写和语音合成等 API，将公司、业务、模型、Agent、提示词和知识库配置集中管理，减少各业务重复对接模型和维护调用逻辑的工作。',
          '在接入侧建设 API Key 鉴权、有效期校验与鉴权缓存，并将身份信息传递到请求处理过程。围绕业务和子账户记录模型调用用量与消费明细，支持模型价格配置、余额检查和扣减；通过幂等写入与数据库行锁处理重复用量记录和并发余额更新问题。',
          '在知识库与 Agent 侧，使用 LangChain、LangGraph 和 Milvus 串联文档处理、向量化、检索与生成。支持向量检索、混合检索和重排，并通过查询改写、会话状态持久化及提示词配置组织多轮 RAG 流程；检索时结合公司和文档元数据限定范围。',
          '在异步语音任务侧，通过 Kafka 接收任务，串联音频下载、分段或分声道处理、ASR 调用、结果拼接与业务回调。对处理失败的任务进行重试，并提供死信队列和重新处理入口，使失败任务可以继续排查与补偿。结合 trace ID、结构化日志、Langfuse 和健康检查，支持调用追踪与运行问题定位。',
        ],
      },
    ],
    methods: [
      'FunASR',
      '多进程 / 多 GPU',
      'SharedMemory',
      'Asyncio / AnyIO',
      'ASR 评测',
      'FastAPI',
      'LangGraph / Milvus',
      'Kafka',
      'AI 中台',
    ],
    outcomes: [
      '形成覆盖实时与文件转写的 ASR 服务，将模型并行、音频传输、前后处理和运行管理纳入同一套性能优化方案。',
      '历史公开压测记录中，50 路并发下，从单卡单实例基线到双卡双实例与软件优化后的方案，RTF 从 0.61 降至 0.23，平均队列延迟从 1273ms 降至 187ms。该结果包含硬件扩容与软件优化的共同影响，不代表共享内存单项优化的收益。',
      '建立覆盖中文、英文、四川方言和业务音频的评测数据基础，并通过模型接口调用与人工标注对照，为 ASR 模型选择提供依据。',
      '将 ASR、RAG、Agent 和模型调用管理沉淀到统一中台，提供可复用的业务接入、用量管理与异步任务处理能力。',
    ],
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
