import {
  bilingual as b,
  type AssessmentRecord,
  type EvidenceRecord,
  type Level,
} from '@/lib/assessment'
import type { DomainId } from './siteConfig'
import { rubrics } from './capability-rubrics'

const snapshot = 'review-2026-09-01'
const authorLimit = b(
  '作者脱敏陈述；未检查生产数据、外部代码仓库或独立复核。',
  'Redacted author account; production data, external repositories and independent verification were not inspected.'
)
function account(
  id: string,
  project: string,
  title: [string, string],
  section = 'responsibilities'
): EvidenceRecord {
  return {
    id,
    title: b(...title),
    href: `/about/projects/${project}#${section}`,
    sourceFile: 'data/professionalProjects.ts',
    sourceVersion: snapshot,
    section: b(
      section === 'responsibilities'
        ? '我的负责范围'
        : section === 'detail-0'
          ? 'ASR 加速与并发优化'
          : '方案与系统链路',
      section === 'responsibilities'
        ? 'My responsibilities'
        : section === 'detail-0'
          ? 'ASR acceleration and concurrency'
          : 'Architecture and delivery flow'
    ),
    kind: 'author-account',
    responsibility: b(
      '依据案例中列出的本人职责；不推断团队整体成果均由本人完成。',
      'Limited to responsibilities stated in the case; team outcomes are not attributed entirely to the author.'
    ),
    limitation: authorLimit,
  }
}
function note(
  id: string,
  slug: string,
  title: [string, string],
  section: [string, string],
  anchor: string,
  kind: EvidenceRecord['kind'] = 'code-and-experiment'
): EvidenceRecord {
  return {
    id,
    title: b(...title),
    href: `/blog/${slug}#${anchor}`,
    sourceFile: `data/blog/${slug}.mdx`,
    sourceVersion: snapshot,
    section: b(...section),
    kind,
    responsibility: b(
      '评审站内文章及其展示的代码、图示或记录；没有执行外部项目。',
      'Review of the local article and its displayed code, diagrams or records; external projects were not executed.'
    ),
    limitation: b(
      '材料由作者提供，未独立复现；截图与代码片段不证明生产效果或持续运行。',
      'Author-provided material, not independently reproduced; screenshots and snippets do not prove production outcomes or sustained operation.'
    ),
  }
}
export const evidenceRecords: EvidenceRecord[] = [
  account('model-adaptation', 'multimodal-platform-capabilities', [
    '多模态平台：语音适配职责',
    'Multimodal platform: speech adaptation responsibilities',
  ]),
  account(
    'multimodal-flow',
    'multimodal-platform-capabilities',
    ['多模态平台：任务链路', 'Multimodal platform: task pipeline'],
    'architecture'
  ),
  account(
    'asr-iteration',
    'asr-platform-engineering',
    ['ASR 平台：迭代与资源约束', 'ASR platform: iteration and resource constraints'],
    'detail-0'
  ),
  account('product-outcomes', 'translation-quality-system', [
    '翻译系统：工作流职责',
    'Translation system: workflow responsibilities',
  ]),
  note(
    'asr-code',
    'python-multiprocessing-multi-model-deploy',
    ['多进程部署实现', 'Multiprocess deployment implementation'],
    ['关键实现细节（精简代码）', 'Key implementation details (abridged code)'],
    '5-关键实现细节精简代码'
  ),
  note(
    'asr-measurement',
    '2025-12-14-funasr-performance-optimization-shared-memory',
    ['ASR 历史性能记录', 'Historical ASR measurements'],
    ['效果实战：性能对比', 'Measured performance comparison'],
    '5-效果实战性能对比'
  ),
  note(
    'asr-debugging',
    'funasr-deployment-pitfall-guide-cpu-thread-explosion-memory-overflow',
    ['CPU 线程膨胀排障', 'CPU thread explosion debugging'],
    ['问题背景', 'Problem background'],
    '1-问题背景豪横的-180-核服务器反而跑不起来'
  ),
  note(
    'title-design',
    'webnovel-title-localization-lab',
    ['标题本地化：冻结候选与评估', 'Title localization: frozen candidates and evaluation'],
    ['从生成到评估的完整流程', 'Generation-to-evaluation workflow'],
    '从生成到评估的完整流程',
    'author-account'
  ),
  note(
    'title-boundaries',
    'webnovel-title-localization-lab',
    ['标题本地化：研究边界', 'Title localization: research boundaries'],
    ['正在建立的研究边界', 'Research boundaries'],
    '正在建立的研究边界',
    'author-account'
  ),
  note(
    'parliament-decisions',
    'project-parliament',
    ['Project Parliament：设计取舍', 'Project Parliament: design trade-offs'],
    ['我做出的几个取舍', 'Design trade-offs'],
    '我做出的几个取舍',
    'author-account'
  ),
  note(
    'parliament-artifacts',
    'project-parliament',
    ['Project Parliament：流程与截图', 'Project Parliament: workflow and screenshots'],
    ['七步议会式工作流', 'Seven-step workflow'],
    '七步议会式工作流'
  ),
  note(
    'parliament-timeline',
    'project-parliament',
    ['Project Parliament：迭代时间线', 'Project Parliament: iteration timeline'],
    ['两个周末的推进过程', 'Iteration over two weekends'],
    '两个周末的推进过程',
    'author-account'
  ),
]

type RatingInput = [Level | null, string[], string, string, string, string]
const inputs: Record<DomainId, RatingInput[]> = {
  'model-research': [
    [
      2,
      ['title-design', 'title-boundaries'],
      '冻结候选与规则、LLM、学习排序的比较说明了任务约束和替代方案。',
      'Frozen candidates and alternative rankers explain task constraints and choices.',
      '缺少已完成模型对比与误差实验，不能达到 L3。',
      'Completed comparative model experiments and error analysis are missing for L3.',
    ],
    [
      null,
      ['model-adaptation'],
      '职业案例提到 LoRA，但没有站内训练配置或运行制品可检查。',
      'The career account mentions LoRA, but no local training configuration or run artifacts are inspectable.',
      '补充适配代码、配置、数据划分和实际运行记录。',
      'Add adaptation code, configuration, data splits and run records.',
    ],
    [
      1,
      ['title-design'],
      '文章解释冻结集和评分原则，实际排序改进仍列为后续实验。',
      'The note explains a frozen set and scoring principles; ranking improvements remain future experiments.',
      '补充同数据基线结果和错误样例以支持 L2。',
      'Add matched-data baseline results and error examples for L2.',
    ],
    [
      1,
      ['title-boundaries', 'model-adaptation'],
      '说明同步服务、私有数据和部署边界，但没有模型级资源对比。',
      'Service, private-data and deployment boundaries are described without model-level resource comparisons.',
      '提供具体模型资源配置、测量和质量取舍。',
      'Provide model resource configurations, measurements and quality trade-offs.',
    ],
    [
      null,
      ['model-adaptation'],
      '模型训练输入与流程未形成可审核的公开材料。',
      'Training inputs and workflow are not available as auditable public material.',
      '提供脱敏训练说明及可公开样例，不要求披露私有数据。',
      'Provide redacted training instructions and shareable examples, without disclosing private data.',
    ],
  ],
  'systems-engineering': [
    [
      2,
      ['asr-code', 'asr-debugging'],
      '代码与排障说明了多进程调度和线程争用的具体关系。',
      'Code and debugging notes explain scheduling and thread contention concretely.',
      '需要受控测量比较架构方案与瓶颈迁移。',
      'Controlled measurements comparing architectures and bottleneck shifts are needed.',
    ],
    [
      2,
      ['asr-code'],
      '文章包含模型工厂、Worker 和任务队列实现及运行说明。',
      'The article contains model factory, worker and task queue implementation with run instructions.',
      '缺少固定版本的集成部署验证和回滚记录。',
      'Pinned integration-deployment validation and rollback records are missing.',
    ],
    [
      2,
      ['asr-measurement'],
      '提供设备配置与测量表；明确单卡到双卡及软件优化的共同变化。',
      'Hardware configuration and measurements are given; hardware expansion and software changes are disclosed together.',
      'L3 需要同硬件同输入消融、重复测量及不确定性分析。',
      'L3 needs matched-hardware and input ablations, repeated measurements and uncertainty analysis.',
    ],
    [
      2,
      ['asr-debugging', 'asr-code'],
      '公开片段支持线程限制、进程退出及异常处理的实现讨论。',
      'Public snippets support discussion of thread limits, process shutdown and exception handling.',
      '缺少容量、尾延迟、告警和恢复的系统验证记录。',
      'Systematic capacity, tail-latency, alerting and recovery validation is missing.',
    ],
    [
      2,
      ['asr-code', 'asr-debugging'],
      '代码、执行步骤与故障复盘可读；未在本轮运行模型服务。',
      'Code, run steps and incident reviews are readable; model services were not executed in this review.',
      '需要固定依赖与输入样例，以及可执行验证脚本。',
      'Pinned dependencies, sample inputs and executable validation scripts are needed.',
    ],
  ],
  'multimodal-intelligence': [
    [
      1,
      ['multimodal-flow'],
      '案例区分文档、语音、视觉与文本任务输入输出。',
      'The case distinguishes document, speech, visual and text task inputs and outputs.',
      '补充具体对齐假设；并列集成不证明跨模态融合。',
      'Add concrete alignment assumptions; parallel integration does not prove fusion.',
    ],
    [
      null,
      ['multimodal-flow'],
      '只有职责与架构描述，缺少公开链路实现制品。',
      'Only responsibilities and architecture are described; public pipeline artifacts are missing.',
      '提供脱敏链路实现、输入和输出样例。',
      'Provide redacted pipeline implementation and input/output examples.',
    ],
    [
      null,
      ['multimodal-flow'],
      '没有分模态结果或定义充分的评价协议。',
      'No per-modality results or sufficiently defined evaluation protocol is available.',
      '补充单模态基线、组合结果、数据范围与指标。',
      'Add unimodal baselines, combined results, data scope and metrics.',
    ],
    [
      1,
      ['multimodal-flow'],
      '架构陈述提及异常降级，未提供缺失模态测试。',
      'The architecture mentions fallback, without missing-modality tests.',
      '提供具体失效输入及处理实现。',
      'Provide concrete failed inputs and handling implementation.',
    ],
    [
      1,
      ['multimodal-flow'],
      '案例说明业务内容已脱敏，公开数据与复现步骤不足。',
      'The case states a confidentiality boundary; public data and reproduction steps are limited.',
      '补充可公开样例与流程说明。',
      'Add shareable examples and workflow instructions.',
    ],
  ],
  'learning-practice': [
    [
      1,
      ['parliament-timeline'],
      '时间线说明了问题与迭代目标，没有完整的初始知识边界。',
      'The timeline describes questions and iteration goals, but not a complete prior-knowledge boundary.',
      '记录先验知识、具体缺口与学习计划；不由工期推断学习速度。',
      'Record prior knowledge, specific gaps and a plan; do not infer learning speed from duration.',
    ],
    [
      2,
      ['parliament-artifacts', 'asr-code'],
      '有对应问题的流程截图和实现片段，支持实践产出。',
      'Workflow screenshots and code snippets tied to questions support practical output.',
      '补充多轮试验到交付的可验证关联。',
      'Add verifiable links from iterative experiments to delivery.',
    ],
    [
      2,
      ['asr-iteration', 'asr-debugging'],
      '材料记录了线程膨胀排查及批处理收益不足后的方案修正。',
      'Material records thread-explosion debugging and revisions after insufficient batching gains.',
      '需要原始假设、替代解释、反例和版本化测量记录。',
      'Original hypotheses, alternative explanations, counterexamples and versioned measurements are needed.',
    ],
    [
      null,
      [],
      '不同项目并列出现不足以证明知识迁移。',
      'The existence of different projects does not establish knowledge transfer.',
      '提供从既有方法到新任务的应用、效果与调整记录。',
      'Document application of an existing method to a new task, outcomes and adaptations.',
    ],
    [
      2,
      ['parliament-timeline', 'asr-debugging'],
      '有时间线、实现步骤和失败复盘，但未形成连续的假设版本链。',
      'There are timelines, steps and incident reviews, but no continuous versioned hypothesis trail.',
      '连接每次假设、结果与后续修正的材料版本。',
      'Link each hypothesis, result and revision to material versions.',
    ],
  ],
  'product-thinking': [
    [
      2,
      ['title-boundaries', 'title-design'],
      '明确英语读者、忠实度与候选评估目标，并列出不做的功能。',
      'English readers, fidelity and candidate evaluation are framed, with explicit non-goals.',
      '需要真实用户研究验证需求与成功标准。',
      'Real user research is needed to validate needs and success criteria.',
    ],
    [
      2,
      ['parliament-decisions', 'parliament-artifacts'],
      '工作流截图与设计取舍支持具体方案产出。',
      'Workflow screenshots and design trade-offs support a concrete output.',
      '缺少基于方案比较和用户验证的交付调整记录。',
      'Delivery revisions based on comparative and user validation are missing.',
    ],
    [
      null,
      ['product-outcomes'],
      '案例报告采用率并说明反馈指标，但没有样本范围、采用率分母或可检查反馈记录。',
      'The case reports adoption and feedback metrics without sample scope, adoption denominators or inspectable records.',
      '补充脱敏反馈记录、样本范围和统计分母，不将自述当作验证。',
      'Add redacted feedback, sample scope and statistical denominators; self-report is not validation.',
    ],
    [
      2,
      ['parliament-decisions'],
      '逐步确认、局部重试与本地会话记录体现了控制点设计。',
      'Stepwise confirmation, selective retry and local sessions demonstrate control-point design.',
      '需要真实负载下的成本、体验及恢复验证。',
      'Validate cost, experience and recovery under real workloads.',
    ],
    [
      2,
      ['parliament-decisions', 'title-boundaries'],
      '可读记录说明候选、取舍与边界，尚缺反馈到修正的版本链。',
      'Readable records explain candidates, trade-offs and boundaries, without a versioned feedback-to-revision trail.',
      '补充决策版本与后续反馈的对应关系。',
      'Link decision versions with subsequent feedback.',
    ],
  ],
  'open-source-writing': [
    [
      2,
      ['parliament-decisions', 'asr-debugging'],
      '针对开发者方向选择与部署排障组织具体问题和例子。',
      'Concrete questions and examples target developer decisions and deployment debugging.',
      '需要读者反馈来验证表达是否清楚和边界是否充分。',
      'Reader feedback is needed to validate clarity and adequate boundaries.',
    ],
    [
      2,
      ['parliament-artifacts', 'asr-code'],
      '有截图、流程及代码支持技术说明。',
      'Screenshots, workflows and code support technical explanations.',
      '尚无可检查的外部技术审阅与修正记录。',
      'Inspectable external technical reviews and correction records are missing.',
    ],
    [
      2,
      ['asr-code', 'asr-measurement'],
      '代码与测量表可检查，修订已区分系统对比与单项归因。',
      'Code and measurements are inspectable; the revision distinguishes system comparisons from isolated attribution.',
      '缺少固定环境中的可执行验证和独立结果复核。',
      'Executable checks in a pinned environment and independent result verification are missing.',
    ],
    [
      null,
      [],
      '开源链接和邀请反馈不等于已发生协作、采用或社区认可。',
      'Repository links and feedback invitations do not establish collaboration, adoption or recognition.',
      '提供实际参与者的公开问题、复用报告或脱敏反馈记录。',
      'Provide actual participant issues, reuse reports or redacted feedback records.',
    ],
    [
      2,
      ['parliament-timeline', 'asr-code'],
      '文档有步骤、案例与更新时间线；维护成效尚未验证。',
      'Documentation includes steps, examples and an update timeline; maintenance effectiveness is unverified.',
      '提供文档与实现版本对应及问题处理记录。',
      'Provide documentation-to-implementation version links and issue-handling records.',
    ],
  ],
}
export const assessments = Object.fromEntries(
  Object.entries(inputs).map(([domainId, rows]) => [
    domainId,
    {
      id: `${domainId}-v1`,
      domainId,
      rubricVersion: rubrics[domainId as DomainId].version,
      assessedAt: '2026-09-01',
      materialCutoff: '2026-09-01',
      reviewStatus: 'pending-human-review',
      reviewer: 'AI-assisted local-material review',
      ratings: rows.map(([level, evidenceIds, zh, en, gapZh, gapEn], index) => ({
        dimensionId: `dimension-${index + 1}`,
        level,
        evidenceIds,
        rationale: b(zh, en),
        nextLevelGap: b(gapZh, gapEn),
      })),
    },
  ])
) as Record<DomainId, AssessmentRecord>

export function getDomainEvidence(domainId: DomainId) {
  const ids = new Set(assessments[domainId].ratings.flatMap((r) => r.evidenceIds))
  return evidenceRecords.filter((e) => ids.has(e.id))
}
