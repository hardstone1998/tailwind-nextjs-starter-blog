import type { LifeText } from './types'

export const profile = {
  name: 'qiaoshilei',
  introduction: {
    zh: '记录生活，研究技术，制造一点有趣的东西。',
    en: 'Collecting moments, exploring technology, making something just for the fun of it.',
  } satisfies LifeText,
  interests: [
    { zh: '健身', en: 'Fitness' },
    { zh: '骑行', en: 'Cycling' },
    { zh: '电影', en: 'Films' },
    { zh: '游戏', en: 'Games' },
    { zh: '创造', en: 'Making' },
  ] satisfies LifeText[],
  dialogue: [
    { zh: '欢迎来到我的存档点。', en: 'Welcome to my save point.' },
    { zh: '支线任务，也值得认真玩。', en: 'Side quests deserve a little love, too.' },
    { zh: '不一定有用，但一定要有趣。', en: 'It does not have to be useful. Just interesting.' },
    { zh: '今天的小事，也可以存个档。', en: 'Even a small moment is worth saving.' },
  ] satisfies LifeText[],
}
