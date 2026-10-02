import type { JournalEntry } from './types'

export const journalEntries: JournalEntry[] = [
  {
    id: 'beijing-longest-ride-2025-01-19',
    date: '2025-01-19',
    category: 'cycling',
    title: { zh: '125.93 公里：我最远的一次骑行' },
    text: {
      zh: '2025 年 1 月 19 日上午，在北京完成了我单次距离最远的一次骑行：125.93 公里，运动时间 7 小时 49 分 25 秒。\n\n地图上的红色轨迹绕北京城区画出了一大圈，终点标记落在石景山区。把这条路线和当天的数据存下来，留作自己的骑行里程碑。\n\n以下数据来自当天的骑行记录；两张截图分别保留了成绩总览，以及路线和海拔变化。',
    },
    metrics: [
      { label: { zh: '骑行距离' }, value: '125.93', unit: 'km' },
      { label: { zh: '运动时间' }, value: '7:49:25' },
      { label: { zh: '平均速度' }, value: '16.1', unit: 'km/h' },
      { label: { zh: '最快速度' }, value: '37.4', unit: 'km/h' },
      { label: { zh: '累计爬升' }, value: '318', unit: 'm' },
      { label: { zh: '累计下降' }, value: '345', unit: 'm' },
      { label: { zh: '最高海拔' }, value: '75', unit: 'm' },
      { label: { zh: '热量（应用记录）' }, value: '979', unit: 'kcal' },
    ],
    images: [
      {
        src: '/static/images/life/beijing-cycling-2025-01-19-summary.jpg',
        alt: { zh: '2025 年 1 月 19 日北京骑行成绩：125.93 公里，用时 7:49:25，均速 16.1 km/h' },
        width: 1206,
        height: 2622,
      },
      {
        src: '/static/images/life/beijing-cycling-2025-01-19-route.jpg',
        alt: { zh: '北京 125.93 公里骑行路线全图与海拔变化，终点标记位于石景山区' },
        width: 1206,
        height: 2622,
      },
    ],
  },
]
