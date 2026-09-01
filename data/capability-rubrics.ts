import { bilingual, type RubricDefinition } from '@/lib/assessment'
import type { DomainId } from './siteConfig'

// Each row: label, L1, L2, L3, L4. The pipe separates Chinese and English.
const specifications: Record<DomainId, [string, string, string, string, string][]> = {
  'model-research': [
    [
      '原理、任务与模型选择|Principles, tasks and model selection',
      '解释任务目标与模型限制|Explain task objectives and model limitations',
      '用任务案例说明模型选择及替代方案|Explain model choice and alternatives for a concrete task',
      '结合实验结果分析机制与选择的适用边界|Use experiments to analyze mechanisms and selection boundaries',
      '在多任务中复核模型选择规则及反例|Validate selection rules and counterexamples across tasks',
    ],
    [
      '训练或适配实现|Training or adaptation implementation',
      '解释训练与适配步骤|Explain training and adaptation steps',
      '提供本人实现的适配代码、配置及运行记录|Provide adaptation code, configuration and run records for own work',
      '完成版本化训练、验证和部署衔接|Connect versioned training, validation and deployment',
      '适配流程被独立复现或实际复用|Have the adaptation workflow independently reproduced or reused',
    ],
    [
      '基线、消融、误差分析|Baselines, ablations and error analysis',
      '定义指标与数据划分原则|Define metrics and data-splitting principles',
      '提供固定数据上的基线和错误样例|Provide a fixed-data baseline and error cases',
      '同条件消融、重复测量并解释偏差与不确定性|Run matched ablations and repeated measurements; explain bias and uncertainty',
      '独立复核实验，并在新数据上验证边界|Independently reproduce experiments and validate limits on new data',
    ],
    [
      '效果与资源约束|Quality and resource constraints',
      '识别质量、延迟与资源约束|Identify quality, latency and resource constraints',
      '记录具体任务的资源配置与质量取舍|Record resource configuration and quality trade-offs for a task',
      '在目标负载下验证质量、成本和失效条件|Validate quality, cost and failure conditions under target load',
      '提供跨场景复用及持续运行的验证记录|Provide validated reuse and sustained operation across scenarios',
    ],
    [
      '配置、数据说明及复现|Configuration, data and reproduction',
      '说明训练输入、输出和局限|Describe training inputs, outputs and limitations',
      '提供配置、数据说明与执行步骤|Provide configuration, data descriptions and run steps',
      '提供固定版本、样例与可执行复现脚本|Provide pinned versions, examples and runnable reproduction scripts',
      '有独立复现报告和差异解释|Provide an independent reproduction report and discrepancy analysis',
    ],
  ],
  'systems-engineering': [
    [
      '架构与瓶颈建模|Architecture and bottleneck modeling',
      '解释进程、队列、锁与资源约束|Explain processes, queues, locks and resource constraints',
      '用具体服务链路定位瓶颈与方案取舍|Locate bottlenecks and trade-offs in a concrete service',
      '用测量比较架构方案并解释瓶颈迁移|Measure architectural alternatives and explain bottleneck shifts',
      '跨负载复核模型、边界与反例|Validate the model, limits and counterexamples across workloads',
    ],
    [
      '服务与部署实现|Service and deployment implementation',
      '解释服务运行和部署步骤|Explain service execution and deployment steps',
      '提供本人服务实现片段及任务调度记录|Provide own service implementation snippets and scheduling records',
      '交付有版本、集成验证及回滚流程的部署|Deliver versioned deployment with integration checks and rollback',
      '服务组件被独立部署或多个场景复用|Have service components independently deployed or reused across scenarios',
    ],
    [
      '公平压测及性能分析|Matched benchmarks and performance analysis',
      '说明压测指标与比较条件|Explain benchmark metrics and comparison conditions',
      '提供配置与测量表，并明确混杂因素|Provide configuration and measurements with confounders disclosed',
      '同硬件同输入基线、消融与重复测量|Use matched hardware and inputs, ablations and repeated measurements',
      '独立复核压测并验证新负载|Independently reproduce benchmarks and validate new workloads',
    ],
    [
      '可靠性、容量与恢复|Reliability, capacity and recovery',
      '识别超时、过载与资源泄漏风险|Identify timeout, overload and resource-leak risks',
      '提供限流、清理或故障处理实现记录|Provide implementation records for throttling, cleanup or failure handling',
      '验证容量、尾延迟、恢复与告警|Validate capacity, tail latency, recovery and alerts',
      '提供持续运行数据或系统性故障演练记录|Provide sustained operation data or systematic fault-injection records',
    ],
    [
      '运行说明与故障复盘|Run instructions and incident reviews',
      '说明系统用途、过程与局限|Describe system purpose, process and limitations',
      '提供运行步骤、代码及故障复盘|Provide run steps, code and incident reviews',
      '固定环境与样例，提供可执行验证脚本|Pin the environment and examples; provide executable validation scripts',
      '有独立复现或维护者复用反馈|Provide independent reproduction or maintainer reuse feedback',
    ],
  ],
  'multimodal-intelligence': [
    [
      '模态关系与任务边界|Modality relationships and task boundaries',
      '解释模态输入、输出与任务关系|Explain modalities, outputs and task relationships',
      '给出具体跨模态链路及对齐假设|Describe a concrete cross-modal flow and alignment assumptions',
      '用实验分析各模态贡献与错误来源|Experimentally analyze modality contributions and error sources',
      '跨数据域验证模态关系及适用边界|Validate modality relationships and limits across data domains',
    ],
    [
      '对齐、融合或任务链路|Alignment, fusion or task pipeline',
      '说明对齐或任务编排方法|Explain alignment or task orchestration methods',
      '提供本人对齐、融合或链路的实现制品|Provide own implementation artifacts for alignment, fusion or a pipeline',
      '完成可运行链路和组件级验证|Deliver a runnable pipeline with component-level validation',
      '链路被独立复现或用于多个场景|Have the pipeline independently reproduced or used in multiple scenarios',
    ],
    [
      '分模态基线与错误分析|Per-modality baselines and error analysis',
      '定义各模态评价指标|Define metrics for each modality',
      '给出固定样例的单模态与组合结果|Provide unimodal and combined results on fixed examples',
      '控制输入，完成模态消融及错误分类|Control inputs; perform modality ablations and error categorization',
      '独立复核并在新数据域重复实验|Independently validate and repeat experiments on a new domain',
    ],
    [
      '缺失模态及实际约束|Missing modalities and practical constraints',
      '识别噪声、缺失模态与资源风险|Identify noise, missing-modality and resource risks',
      '给出缺失或失效输入的处理实现|Provide handling for missing or failed inputs',
      '测试噪声、缺失与真实负载下的降级|Test degradation under noise, missing inputs and realistic load',
      '跨场景验证鲁棒性与持续运行|Validate robustness and sustained operation across scenarios',
    ],
    [
      '数据、流程与复现|Data, workflow and reproduction',
      '说明数据来源及隐私边界|Describe data provenance and privacy boundaries',
      '提供脱敏样例、流程和运行步骤|Provide redacted examples, workflow and run steps',
      '提供版本化样例、依赖与复现脚本|Provide versioned examples, dependencies and reproduction scripts',
      '有独立复核和数据偏差说明|Provide independent verification and data-bias analysis',
    ],
  ],
  'learning-practice': [
    [
      '学习问题与知识边界|Learning questions and knowledge boundaries',
      '说明待解决问题与已有知识|State the question and prior knowledge',
      '记录具体知识缺口及学习计划|Record specific knowledge gaps and a learning plan',
      '依据验证结果修订问题和知识边界|Revise questions and knowledge boundaries using validation',
      '多次专题记录能复核边界判断|Provide multiple auditable topic records of boundary judgments',
    ],
    [
      '实验与实践产出|Experiments and practical outputs',
      '记录学习材料及练习目标|Record learning resources and exercise objectives',
      '提供与学习问题对应的代码或实验产物|Provide code or experiments tied to the learning question',
      '通过多轮实验形成可验证的交付|Produce a verifiable deliverable through iterative experiments',
      '产物被独立复现或在新任务复用|Have outputs independently reproduced or reused in a new task',
    ],
    [
      '假设检验及认知修正|Hypothesis testing and revision',
      '明确可证伪的学习假设|State a falsifiable learning hypothesis',
      '记录一次假设、试验和据此作出的修正|Record a hypothesis, experiment and resulting revision',
      '比较多种解释，保留反例和修正依据|Compare explanations; preserve counterexamples and revision evidence',
      '在后续独立验证中确认或修正结论|Confirm or revise conclusions through subsequent independent validation',
    ],
    [
      '跨任务迁移与适用边界|Transfer and applicability',
      '解释所学方法可能适用的任务|Explain possible target tasks for a learned method',
      '记录在不同任务中的一次应用|Record an application to a different task',
      '提供新任务的效果验证与方法调整记录|Validate outcomes and document adaptation in a new task',
      '多个新场景的迁移结果可独立复核|Make transfer outcomes independently verifiable across new scenarios',
    ],
    [
      '学习记录与方法沉淀|Learning records and reusable methods',
      '记录过程和未解决问题|Record the process and unresolved questions',
      '形成带时间线、步骤和局限的笔记|Produce notes with a timeline, steps and limitations',
      '以版本记录连接假设、结果和后续修正|Connect hypotheses, results and revisions through versioned records',
      '学习方法被他人复用并有反馈记录|Have others reuse the learning method with recorded feedback',
    ],
  ],
  'product-thinking': [
    [
      '用户需求与成功标准|User needs and success criteria',
      '解释目标用户、需求和限制|Explain target users, needs and constraints',
      '用具体场景定义成功标准及非目标|Define success criteria and non-goals for a scenario',
      '通过用户研究验证需求与标准|Validate needs and criteria through user research',
      '在多个场景持续验证需求判断|Continuously validate need judgments across scenarios',
    ],
    [
      '方案取舍与交付|Trade-offs and delivery',
      '说明方案和替代选择|Explain the solution and alternatives',
      '提供工作流、产物与取舍记录|Provide workflow, artifacts and trade-off records',
      '依据对比验证完成交付与调整|Deliver and revise using comparative validation',
      '方案被不同团队或场景采用并验证|Have the solution adopted and validated across teams or scenarios',
    ],
    [
      '用户反馈及结果验证|User feedback and outcome validation',
      '定义反馈问题与指标口径|Define feedback questions and metric definitions',
      '提供有样本范围的用户反馈记录|Provide user feedback records with sample scope',
      '比较方案结果并分析偏差和不确定性|Compare outcomes and analyze bias and uncertainty',
      '持续追踪结果并接受独立复核|Track outcomes over time with independent verification',
    ],
    [
      '成本、体验与运营约束|Cost, experience and operational constraints',
      '识别成本、体验与失败风险|Identify cost, experience and failure risks',
      '在方案中落实控制点与失败处理|Implement control points and failure handling in the design',
      '用实际场景验证体验、成本及恢复|Validate experience, cost and recovery in real scenarios',
      '跨场景验证运营效果和持续性|Validate operational outcomes and sustainability across scenarios',
    ],
    [
      '决策记录与复盘|Decision records and reviews',
      '说明决策目标和局限|Describe decision objectives and limitations',
      '保留候选、取舍和结果的可读记录|Preserve readable candidates, trade-offs and outcomes',
      '以版本连接反馈、决策及后续修正|Version feedback, decisions and subsequent revisions',
      '其他参与者能够复核并复用决策过程|Enable other participants to audit and reuse the decision process',
    ],
  ],
  'open-source-writing': [
    [
      '受众与问题界定|Audience and problem framing',
      '说明内容受众和要回答的问题|State the audience and question',
      '按受众背景组织具体问题与例子|Organize concrete questions and examples for the audience',
      '依据读者反馈验证表达边界|Validate communication boundaries through reader feedback',
      '在多类受众中复核信息可理解性|Verify comprehensibility across audience groups',
    ],
    [
      '技术作品质量|Technical output quality',
      '形成有结构的技术说明|Produce a structured technical explanation',
      '提供代码、图示或具体案例支撑内容|Support the content with code, diagrams or concrete examples',
      '作品经过技术审阅与有记录的修正|Have technical review and documented corrections',
      '作品被独立复现或实际复用|Have the work independently reproduced or practically reused',
    ],
    [
      '内容准确性与可验证性|Accuracy and verifiability',
      '区分事实、推断和局限|Distinguish facts, inferences and limitations',
      '关键技术说法有可检查的代码或测量依据|Support key technical claims with inspectable code or measurements',
      '提供固定环境的可执行验证，记录比较口径与错误修正|Provide executable checks in a pinned environment; document comparison conditions and corrections',
      '独立复核关键结论与适用边界|Independently verify key conclusions and applicability',
    ],
    [
      '协作、采用及反馈|Collaboration, adoption and feedback',
      '说明协作或反馈渠道|Describe collaboration or feedback channels',
      '提供真实参与者的协作或采用记录|Provide records of actual collaboration or adoption',
      '说明反馈如何改变作品并追踪结果|Explain how feedback changed the work and track outcomes',
      '多方复用和持续贡献可独立核验|Enable independent verification of broad reuse and sustained contribution',
    ],
    [
      '文档组织与持续维护|Documentation and maintenance',
      '提供基本导航及使用说明|Provide basic navigation and usage instructions',
      '组织步骤、案例、局限和更新记录|Organize steps, cases, limitations and update records',
      '版本化文档与实现一致，有问题处理记录|Keep versioned docs aligned with implementation and record issue handling',
      '维护流程被协作者持续采用和验证|Have collaborators consistently use and validate the maintenance process',
    ],
  ],
}
const weights = [15, 25, 25, 20, 15]
function copy(value: string) {
  const [zh, en] = value.split('|')
  if (!zh || !en) throw new Error('Rubric translation missing')
  return bilingual(zh, en)
}
export const rubrics = Object.fromEntries(
  Object.entries(specifications).map(([domainId, rows]) => [
    domainId,
    {
      version: '1.0.0',
      domainId,
      dimensions: rows.map(([label, ...levels], index) => ({
        id: `dimension-${index + 1}`,
        weight: weights[index],
        label: copy(label),
        levels: levels.map(copy),
      })),
    },
  ])
) as Record<DomainId, RubricDefinition>
