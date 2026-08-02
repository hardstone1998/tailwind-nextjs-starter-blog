interface Project {
  title: string
  description: string
  href?: string
  imgSrc?: string
}

const projectsData: Project[] = [
  {
    title: 'Project Parliament',
    description:
      'Lab #01 · 持续迭代 · 两个周末完成。一个面向开发者的多模型开源项目方向评估实验：让模型先发散、再辩论，最后收敛出可执行的主路线与备选路线。\n\nFastAPI / OpenRouter / Multi-model workflow',
    imgSrc: '/static/images/projects/project-parliament-homepage.png',
    href: '/blog/project-parliament',
  },
  {
    title: 'WebNovel Title Localization Lab',
    description:
      'Lab #02 · 持续开发中。一个评估优先的中文网文英文标题本地化研究项目：在冻结候选集上比较规则、LLM 与学习排序器，让标题既忠实原作，也贴近英语读者。\n\nPython / FastAPI / LLM Ranking',
    href: '/blog/webnovel-title-localization-lab',
  },
]

export default projectsData
