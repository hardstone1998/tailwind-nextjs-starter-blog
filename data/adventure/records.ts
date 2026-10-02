import type { PersonalRecord } from './types'

// A light-touch snapshot of current training, not a program or a progression plan.
// Values are the best completed working-set performances reported for 2026-08-19 to 2026-09-06.
// Subjective character-sheet score, not a standardized strength assessment.
export const strengthScore = 65

export const personalRecords: PersonalRecord[] = [
  {
    id: 'cycling-longest-distance',
    category: 'cycling',
    title: { zh: '单次最远骑行' },
    value: '125.93',
    unit: 'km',
    date: '2025-01-19',
    note: { zh: '北京骑行，运动时间 7:49:25，均速 16.1 km/h，累计爬升 318 m。' },
  },
  {
    id: 'barbell-back-squat',
    category: 'fitness',
    title: { zh: '杠铃深蹲' },
    value: '70 kg × 8',
    unit: '次',
    date: '2026-08-31',
  },
  {
    id: 'romanian-deadlift',
    category: 'fitness',
    title: { zh: '罗马尼亚硬拉' },
    value: '60 kg × 8',
    unit: '次',
    date: '2026-08-31',
  },
  {
    id: 'incline-dumbbell-press',
    category: 'fitness',
    title: { zh: '上斜哑铃卧推' },
    value: '50 kg × 8',
    unit: '次',
    date: '2026-09-06',
    note: { zh: '重量沿用原始记录，未注明单只或合计。' },
  },
  {
    id: 'barbell-bench-press',
    category: 'fitness',
    title: { zh: '平板杠铃卧推' },
    value: '50 kg × 8',
    unit: '次',
    date: '2026-09-06',
  },
  {
    id: 'neutral-grip-lat-pulldown',
    category: 'fitness',
    title: { zh: '中立握高位下拉' },
    value: '47 kg × 10',
    unit: '次',
    date: '2026-08-29',
  },
  {
    id: 'assisted-pull-up',
    category: 'fitness',
    title: { zh: '辅助引体向上' },
    value: '10',
    unit: '次',
    date: '2026-09-05',
    note: { zh: '辅助重量 25 kg，取本期最少辅助重量。' },
  },
  {
    id: 'seated-dumbbell-shoulder-press',
    category: 'fitness',
    title: { zh: '坐姿哑铃推肩' },
    value: '17.5 kg × 12',
    unit: '次',
    date: '2026-09-05',
    note: { zh: '重量沿用原始记录，未注明单只或合计。' },
  },
  {
    id: 'chest-supported-row',
    category: 'fitness',
    title: { zh: '胸托划船' },
    value: '20 kg × 10',
    unit: '次 / 单臂',
    date: '2026-09-06',
  },
]
