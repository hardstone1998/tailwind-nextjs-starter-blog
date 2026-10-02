# 个人冒险存档维护指南

新首页 `/` 是角色档案；`/research` 保留原首页。原有博客、实验室、关于与能力页的链接、正文和排版继续保留。

生活内容只在 `data/adventure/` 维护。空数组就是尚未记录，不用为了填满页面添加虚构经历。修改并重新构建网站后生效，没有网页后台。

## 角色与属性

`profile.ts` 维护昵称、介绍、兴趣和点击角色时出现的台词。像素旅人是原创虚构形象。

每段文字填写 `{ zh: '中文' }` 或 `{ en: 'English' }` 即可；有真实译文时可以同时填写两种语言。切换界面语言不会自动翻译私人记录，缺少译文时显示原文。

六项属性不设经验值。力量可在 `records.ts` 维护一个宽松的近期综合分（`strengthScore`），保留作个人记录；首页力量入口显示已存档动作数量，点击进入像素训练馆。耐力显示对应类别最新维护的个人纪录及其名称；完整纪录在首页下方展示。智识统计去重后的公开技术文章，创造统计公开实验（不表示完成）。探索统计手动标记 `exploration: true` 的日志；感知统计电影和游戏收藏条数。未录入生活资料显示等待记录。

## 添加一条日志

在 `journal.ts` 的 `journalEntries` 数组内添加对象。以下只是格式示例，请替换成真实内容，不要直接当作个人经历发布：

```ts
{
  id: 'replace-with-unique-id',
  date: '2026-09-06', // 实际记录日期，YYYY-MM-DD
  category: 'life', // fitness / cycling / life / creative
  title: { zh: '替换成真实标题' },
  text: { zh: '替换成自己的记录。可以很短，也可以用换行分段。' },
  // exploration: true, // 只有本人认为是新路线或新体验时才添加
}
```

可选 `metrics: [{ label: { zh: '指标名称' }, value: '实际数值', unit: '单位' }]`。
可选 `image: { src: '/static/images/life/你的文件.jpg', alt: { zh: '图片描述' } }`。
图片文件自行放入 `public/static/images/life/`。日志按日期倒序展示，全文在列表内展开。
多张配图可使用 `images: [{ src: '/static/images/life/你的文件.jpg', alt: { zh: '图片描述' }, width: 1206, height: 2622 }]`，宽高填写原图尺寸，页面会按比例缩放。`image` 单图字段仍然可用。

## 添加个人纪录

在 `records.ts` 的 `personalRecords` 添加：`id`、`category`（`fitness` 或 `cycling`）、`title`（如卧推最好成绩、单次最远距离、最大爬升）、`value`（字符串）、`unit`、`date`，可选 `note`。

纪录由本人明确录入，不从训练日志自动猜测或比较不同项目。刷新同一项目的纪录时更新原对象；不同项目使用不同 ID。力量目前精选 2026-08-19 至 2026-09-06 的 8 个主要动作，记录最高工作重量及该重量下的完成次数，不代表单次极限；辅助引体向上取最少辅助重量。未注明单只或合计的重量保留原始口径。力量评分为主观趣味分，不使用标准化体能评级；耐力属性摘要展示日期最新的一项纪录，并注明项目名称。

## 添加电影或游戏

在 `collection.ts` 的 `collectionItems` 添加：`id`、`kind`（`film` 或 `game`）、`title`、`date`、`status`；可选 `note`（短评）和 `cover`（本地图片路径）。

| 类型 | 状态                                                             |
| ---- | ---------------------------------------------------------------- |
| 电影 | `want` 想看、`watched` 看过                                      |
| 游戏 | `want` 想玩、`playing` 在玩、`completed` 通关、`paused` 暂时搁置 |

没有封面时自动显示原创占位图，不需要评分。收藏室按日期倒序展示；首页分别预览最近三部电影和三个游戏。

## 添加成就或目标

在 `achievements.ts` 的 `achievements` 添加 `id`、`title`、`description`、`icon`、`status`。

- 达成的成就：`status: 'achieved'`，必须填写实际达成日期 `date`。
- 想挑战的目标：`status: 'goal'`，不填写达成日期。
- 图标：`strength`、`bike`、`book`、`spark`、`compass`、`film`、`game`、`trophy`、`save`。

## 提交前检查

运行 `npm run check` 检查类型、日期、ID、本地图片与原有内容；运行 `npm run build` 和 `npm run check:build` 验证产物。

私人内容不进入原技术搜索。不要修改原能力评分的证据快照来绕过校验。新内容若缺少英文，保持原文即可。

## 像素训练馆

首页力量区按下肢、推、拉分区，点击器械或动作按钮切换真实工作组纪录；默认选中杠铃深蹲，全部纪录可展开。点击后隐藏器械，显示独立人物动作演示，可暂停或返回器械；8 项动作的姿势帧在 components/adventure/ExerciseMotion.tsx 维护。动作与区域的映射在 components/adventure/StrengthGym.tsx 的 stations 维护，新增动作时同步添加 ID。未分区动作仍会显示在全部纪录中。像素动画仅作趣味表现，开启减少动态效果时停用，不代表实际动作教学。
