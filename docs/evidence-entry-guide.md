# 内容与评分证据录入指南

站点中的“内容展示”和“Rubric 评分”是两条相互关联但彼此独立的数据链路。新增文章或职业案例后，它会出现在内容列表和相关能力页；只有再登记证据并更新对应维度的判断，它才会影响证据覆盖率和暂定总分。

完整流程如下：

```text
文章或职业案例
  → 稳定的页面链接和章节锚点
  → EvidenceRecord 证据记录
  → DimensionRating 维度判断
  → calculateAssessment 统一计算
  → 首页、能力页和评估页展示
```

## 1. 先判断要补哪一种数据

| 目的                       | 必须修改                                                            | 是否影响评分                               |
| -------------------------- | ------------------------------------------------------------------- | ------------------------------------------ |
| 增加一篇公开研究或工程笔记 | `data/blog/*.mdx`                                                   | 不自动影响                                 |
| 增加一个职业项目或案例     | `data/professionalProjects.ts` 和 `data/professionalProjects.en.ts` | 不自动影响                                 |
| 让已有材料进入 Rubric      | `data/capability-assessments.ts` 的 `evidenceRecords`               | 只增加可引用证据，不自动改变等级           |
| 补齐待评估项或调整等级     | `data/capability-assessments.ts` 的领域评分行                       | 会影响覆盖率；五项都有等级后才发布暂定总分 |
| 修改评分标准               | `data/capability-rubrics.ts` 并升级规则版本                         | 会影响所有使用该规则的评估，应整体复核     |

不要用文章数量、链接数量或篇幅直接换算等级。一份材料可以支持多个维度，但每个维度必须引用不同的具体事实或章节。

## 2. 新增博客材料

在 `data/blog/` 新建以英文短横线命名的 `.mdx` 文件，例如：

```mdx
---
title: '模型微调复现记录：任务、配置与误差分析'
date: '2026-09-01'
lastmod: '2026-09-01'
tags: ['LoRA', '模型微调', '复现']
summary: '记录一次脱敏的模型适配过程，包括数据划分、配置、基线、结果与复现限制。'
authors: ['qsl']
domains: ['model-research']
status: 'completed'
methods: ['LoRA', '固定数据划分', '基线评测']
outcome: '公开脱敏配置、运行记录、失败样例和复现限制。'
language: 'zh'
layout: PostLayout
---

## 任务与边界

说明要解决的问题、不解决的问题、模型选择理由和本人负责范围。

## 数据与划分

说明可公开的数据来源、样本定义、训练/验证/测试划分和脱敏限制。

## 配置与运行记录

给出模型版本、代码版本、关键参数、随机种子、硬件、命令和运行记录。

## 基线与结果

保持相同数据和评测口径，报告基线、适配方案、重复次数及不确定性。

## 错误样例与局限

记录失败样例、误差类别、不能推出的结论及下一步实验。

## 复现步骤

列出从环境准备到得到结果的最小步骤；私有材料使用可运行的脱敏样例代替。
```

正文从 H2 开始，页面模板负责唯一 H1。`domains` 必须使用以下稳定标识：

| 领域               | `domains` 值              | 既有网址              |
| ------------------ | ------------------------- | --------------------- |
| 模型理解与微调     | `model-research`          | `/skills/code`        |
| 系统工程与部署     | `systems-engineering`     | `/skills/model`       |
| 跨模态与多任务融合 | `multimodal-intelligence` | `/skills/deploy`      |
| 快速学习与技术更新 | `learning-practice`       | `/skills/engineering` |
| 产品导向与场景思维 | `product-thinking`        | `/skills/nlp`         |
| 技术影响力与表达   | `open-source-writing`     | `/skills/open-source` |

`domains` 只控制相关内容归类，不决定评分。如果文章有真实英文译文，两篇文章分别设置 `language: 'zh'` 和 `language: 'en'`，并使用同一个唯一 `translationKey`。只有单语文章时不要设置 `translationKey`。

图片放入 `public/static/images/`，正文使用 `/static/images/...`。标题中的章节锚点由 GitHub slugger 生成；登记证据前应在本地页面确认最终锚点。

## 3. 新增职业项目或案例

在 `data/professionalProjects.ts` 中增加中文主记录。适合评分的项目应尽量包含稳定、可核查的章节：

```ts
{
  id: 'model-adaptation-reproduction',
  title: '模型适配与复现实验',
  period: '2026',
  sortOrder: 202609,
  status: 'completed',
  role: '模型适配与评测',
  summary: '使用脱敏材料记录任务界定、适配实现、评测和复现过程。',
  background: '说明业务或研究问题、约束和材料边界。',
  architecture: ['数据准备 → 基线 → 适配训练 → 固定测试集评测 → 误差分析。'],
  responsibilities: ['明确本人完成的实现、实验和文档工作。'],
  detailSections: [
    {
      title: '训练配置与运行制品',
      paragraphs: ['记录版本、参数、数据划分、硬件、命令和脱敏运行结果。'],
    },
    {
      title: '基线、误差与复现限制',
      paragraphs: ['说明比较口径、错误样例、复现步骤和目前不能验证的结论。'],
    },
  ],
  methods: ['LoRA', '基线评测', '误差分析'],
  outcomes: ['只填写有材料支持的结果；没有测量值时不要估算。'],
  confidentialityNotice: '业务名称、数据和实现细节均已做抽象与脱敏处理。',
}
```

随后在 `data/professionalProjects.en.ts` 中以相同 `id` 增加英文覆盖。中文记录新增了 `background`、`architecture`、`detailSections`、`responsibilities`、`methods` 或 `outcomes` 时，英文记录也要提供对应字段，否则双语内容检查会失败。

时间线会自动读取新项目。若要把它放入首页“代表项目”，还需修改 `app/page.tsx` 中的代表项目 ID 列表。职业项目页面的稳定章节通常是：

- `#architecture`
- `#responsibilities`
- `#detail-0`、`#detail-1`，顺序与 `detailSections` 一致

调整 `detailSections` 顺序会改变 `detail-N` 的含义。已经被评分引用的章节不要随意重排；需要重构时应同步更新证据和评估记录。

## 4. 把内容登记为证据

打开 `data/capability-assessments.ts`，在 `evidenceRecords` 中增加记录。博客优先使用现有 `note()` 助手：

```ts
note(
  'model-lora-implementation',
  'model-adaptation-reproduction',
  ['LoRA 适配实现与运行记录', 'LoRA implementation and run record'],
  ['配置与运行记录', 'Configuration and run record'],
  '配置与运行记录'
),
note(
  'model-lora-reproduction',
  'model-adaptation-reproduction',
  ['LoRA 脱敏复现步骤', 'Redacted LoRA reproduction steps'],
  ['复现步骤', 'Reproduction steps'],
  '复现步骤'
),
```

`note()` 的参数依次是稳定证据 ID、文章 slug、中英文标题、中英文章节名、真实锚点和可选材料类型。同一篇文章可以产生两条证据，因为两个链接指向不同章节并支持不同判断。

职业案例可以使用 `account()`：

```ts
account(
  'model-adaptation-role',
  'model-adaptation-reproduction',
  ['模型适配：本人负责范围', 'Model adaptation: responsibilities'],
  'responsibilities'
),
```

当前 `account()` 对 `responsibilities`、`architecture` 和既有 ASR `detail-0` 提供了内置章节名称。引用其他 `detail-N` 时，应直接写完整 `EvidenceRecord`，确保 `section` 与实际章节一致，而不是借用错误的章节名称：

```ts
{
  id: 'model-adaptation-artifacts',
  title: b('模型适配：运行制品', 'Model adaptation: run artifacts'),
  href: '/about/projects/model-adaptation-reproduction#detail-0',
  sourceFile: 'data/professionalProjects.ts',
  sourceVersion: snapshot,
  section: b('训练配置与运行制品', 'Training configuration and run artifacts'),
  kind: 'author-account',
  responsibility: b(
    '仅依据案例中明确列出的本人工作。',
    'Limited to work explicitly attributed to the author in the case.'
  ),
  limitation: authorLimit,
},
```

材料类型必须按实际情况填写：

| `kind`                     | 适用情况                                                         |
| -------------------------- | ---------------------------------------------------------------- |
| `author-account`           | 作者陈述、脱敏职业案例、未附可运行材料的项目记录                 |
| `code-and-experiment`      | 页面包含可检查的代码、配置、数据定义、实验表或运行记录           |
| `independent-verification` | 明确的第三方复现、评审、采用或可核验反馈；不能仅因材料公开就使用 |

`responsibility` 写清本人和团队成果的边界，`limitation` 写清未检查的私有数据、外部仓库、生产指标或复现条件。不要把保密内容直接复制进站点；可以公开字段定义、样本规模区间、指标口径、脱敏样例和验证限制。

## 5. 更新对应维度判断

同一文件的 `inputs` 按每个领域的五个 Rubric 维度顺序保存判断。每一行的结构是：

```ts
;[
  level,
  ['evidence-id-1', 'evidence-id-2'],
  '中文判断理由',
  'English rationale',
  '中文下一等级缺项',
  'English gap to next level',
]
```

例如，模型理解与微调的“训练或适配实现”补齐后，可以将原来的 `null` 行改为：

```ts
[
  2,
  ['model-adaptation-role', 'model-lora-implementation'],
  '脱敏案例界定本人职责，文章提供配置、数据划分和实际运行记录，支持具体适配产出。',
  'The redacted case scopes responsibility, while the note provides configuration, data splits and an actual run record.',
  '仍缺少固定基线下的方案比较、消融和失败分析，不能达到 L3。',
  'Matched-baseline comparisons, ablations and failure analysis are still missing for L3.',
],
```

等级不能从示例照抄。先在 `data/capability-rubrics.ts` 找到该领域和该维度，逐条核对 L1–L4：

- 只有准确解释和边界，通常最多支持 L1。
- 有具体实现、产物或运行记录，且满足该领域专属标准，才考虑 L2。
- 有系统验证、同口径比较、误差与局限分析，才考虑 L3。
- 有独立复核、实际复用或跨场景重复验证，才考虑 L4。
- 缺材料使用 `null`。只有证据明确显示未达到 L1 时才使用 `0`。

每个非空等级，包括 L0，都必须引用有效证据。任一维度仍是 `null` 时，总分继续显示为空；系统不会按已有维度重新归一化。

## 6. 当前最值得补的材料

| 领域               | 当前缺项                 | 建议公开的最小材料                                                                  | 可能支持的维度 |
| ------------------ | ------------------------ | ----------------------------------------------------------------------------------- | -------------- |
| 模型理解与微调     | 适配实现、复现说明       | 一篇脱敏微调记录：配置、数据划分、真实运行、复现步骤                                | 第 2、5 维     |
| 跨模态与多任务融合 | 融合链路制品、分模态评测 | 一篇流水线记录：输入输出契约、对齐/融合实现、文本/音频/视频单模态基线、缺失模态测试 | 第 2、3 维     |
| 快速学习与技术更新 | 新任务迁移               | 一篇“旧方法 → 新任务 → 假设失败 → 修正”的迁移复盘                                   | 第 4 维        |
| 产品导向与场景思维 | 用户反馈与结果验证       | 脱敏反馈样本、成功指标定义、上线前后同口径结果、失败/偏差说明                       | 第 3 维        |
| 技术影响力与表达   | 协作、采用与反馈         | PR/评审记录、引用或采用记录、读者反馈及据此修订的版本历史                           | 第 4 维        |

一篇综合材料可以补两个维度，但必须让每个维度拥有独立章节和具体事实。例如“模型微调复现记录”中的“配置与运行记录”可支持实现维度，“复现步骤”可支持复现维度；仅在摘要里声称“可复现”不能同时补齐两项。

系统工程目前已经发布暂定总分。后续若要从 L2 提升到 L3，优先补同硬件、同输入、固定版本的重复压测，报告尾延迟、资源利用率、方差或置信区间、失败恢复和方案消融。现有“单卡基线”与“双卡加软件优化”不是同口径消融，不能支持单项收益结论。

## 7. 日期、版本与复核状态

增加新材料并重新判断后：

1. 更新评估记录的 `assessedAt` 和 `materialCutoff` 为真实日期。
2. 实质性复评应更换评估记录 ID；如果评分规则本身没有变化，继续使用现有 Rubric 版本。
3. 只有人已经逐项核对材料、等级和限制后，才能改变复核状态和复核者。否则继续显示“AI 辅助初评，待人工复核”。
4. 不要只为获得总分而把缺材料的项目填成 L0；这会错误表达为“已有证据证明不达标”。

## 8. 更新证据快照并验证

先运行普通内容检查，它会指出新证据尚未进入快照或已引用来源发生变化：

```sh
npm run check:content
```

确认新材料、证据链接和维度判断都已人工检查后，再有意更新证据指纹：

```sh
node scripts/check-content.mjs --snapshot
```

最后执行完整验证：

```sh
npm run lint
npm run typecheck
npm test
npm run check:content
npm run build
npm run check:build
```

若内容检查报告失效证据，优先检查 `href` 的 slug/锚点、`sourceFile`、证据 ID 拼写和双语项目字段。不要通过删除检查或无复核刷新快照来绕过错误。
