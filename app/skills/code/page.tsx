import { allBlogs } from 'contentlayer/generated'
import { compareDesc } from 'date-fns'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: '模型理解与微调能力' })

// 根据技能关键词过滤相关博客
function getRelatedPosts(skillName: string) {
  const keywords = {
    系统工程与部署能力: [
      '部署',
      '系统',
      '工程',
      'devops',
      'docker',
      'kubernetes',
      'ci/cd',
      'infrastructure',
    ],
    模型理解与微调能力: ['微调', '模型', 'fine-tuning', '训练', '模型理解', '训练', 'pretrain'],
    跨模态与多任务融合: [
      '跨模态',
      '多模态',
      'multimodal',
      '多任务',
      'fusion',
      '视觉',
      '语言',
      '图像',
    ],
    快速学习与技术更新能力: ['学习', '技术', '更新', '新技术', '学习能力', '快速', '适应'],
    产品导向与场景思维: ['产品', '场景', '应用', '落地', 'nlp', '自然语言处理', '产品思维', '业务'],
    技术影响力与表达力: [
      '开源',
      '分享',
      '技术',
      '影响力',
      '表达',
      'open source',
      '技术分享',
      '社区',
    ],
  }

  const skillKeywords = keywords[skillName] || []

  return allBlogs
    .filter((post) => {
      if (post.draft) return false
      const content =
        `${post.title} ${post.summary || ''} ${post.tags?.join(' ') || ''}`.toLowerCase()
      return skillKeywords.some((keyword) => content.includes(keyword.toLowerCase()))
    })
    .sort((a, b) => compareDesc(new Date(a.date ?? '1970-01-01'), new Date(b.date ?? '1970-01-01')))
    .slice(0, 10)
}

export default function SkillPage() {
  const skillName = '模型理解与微调能力'
  const skillData = siteMetadata.individual_ability_data.find((d) => d.subject === skillName)
  const relatedPosts = getRelatedPosts(skillName)

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
          {skillName}
        </h1>
        {skillData && (
          <div className="flex items-center space-x-4">
            <span className="text-primary-600 dark:text-primary-400 text-2xl font-semibold">
              技能评分: {skillData.score}
            </span>
          </div>
        )}
      </div>

      {/* 个人介绍 */}
      <section className="py-8">
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">个人介绍</h2>
        <div className="prose max-w-none text-gray-600 dark:text-gray-300">
          <p>
            在模型理解与微调能力方面，我深入理解Transformer架构、注意力机制等核心原理，
            能够从底层理解大模型的工作机制。我具备丰富的模型微调实践经验，
            熟悉LoRA、QLoRA、Adapter等参数高效微调方法。
          </p>
          <p>
            我擅长根据具体任务需求选择合适的预训练模型，设计微调策略，优化训练流程。
            在模型理解方面，我能够分析模型的内部表示、注意力模式，理解模型的行为机制。
            我具备从零开始训练模型的能力，也擅长基于预训练模型进行领域适配和任务微调。
          </p>
        </div>
      </section>

      {/* 相关博客 */}
      <section className="py-8">
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">相关博客</h2>
        {relatedPosts.length > 0 ? (
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {relatedPosts.map((post) => {
              const { slug, date, title, summary, tags } = post
              return (
                <li key={slug} className="py-6">
                  <article>
                    <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                      <dl>
                        <dt className="sr-only">Published on</dt>
                        <dd className="text-base leading-6 font-medium text-gray-500 dark:text-gray-400">
                          <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                        </dd>
                      </dl>
                      <div className="space-y-5 xl:col-span-3">
                        <div className="space-y-6">
                          <div>
                            <h3 className="text-2xl leading-8 font-bold tracking-tight">
                              <Link
                                href={`/blog/${slug}`}
                                className="text-gray-900 dark:text-gray-100"
                              >
                                {title}
                              </Link>
                            </h3>
                            <div className="flex flex-wrap">
                              {tags?.map((tag) => {
                                return <Tag key={tag} text={tag} />
                              })}
                            </div>
                          </div>
                          <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                            {summary}
                          </div>
                        </div>
                        <div className="text-base leading-6 font-medium">
                          <Link
                            href={`/blog/${slug}`}
                            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                            aria-label={`Read more: "${title}"`}
                          >
                            阅读更多 &rarr;
                          </Link>
                        </div>
                      </div>
                    </div>
                  </article>
                </li>
              )
            })}
          </ul>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">暂无相关博客文章</p>
        )}
      </section>

      {/* 评分提示词 */}
      <section className="py-8">
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">评分提示词</h2>
        <div className="rounded-lg bg-gray-50 p-6 dark:bg-gray-800">
          <div className="prose max-w-none text-gray-700 dark:text-gray-300">
            <p className="mb-2 font-semibold">评分标准：</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>模型架构理解：对Transformer、BERT、GPT等模型架构的深入理解</li>
              <li>微调技术：LoRA、QLoRA、Adapter等参数高效微调方法的应用</li>
              <li>训练优化：训练策略设计、超参数调优、训练稳定性控制</li>
              <li>模型分析：模型内部机制分析、注意力可视化、表示学习理解</li>
              <li>实践项目：实际微调项目的复杂度和效果</li>
              <li>理论基础：对深度学习、自然语言处理理论的掌握</li>
            </ul>
            <p className="mt-4 font-semibold">评分范围：0-100分</p>
            <p className="mt-2">当前得分：{skillData?.score || 'N/A'}</p>
          </div>
        </div>
      </section>

      {/* 调用模型 */}
      <section className="py-8">
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">调用模型</h2>
        <div className="rounded-lg bg-gray-50 p-6 dark:bg-gray-800">
          <div className="prose max-w-none text-gray-700 dark:text-gray-300">
            <p className="mb-4">本技能评分通过AI模型评估生成，评估模型综合考虑了以下因素：</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                <strong>评估模型：</strong>GPT-4 / Claude-3.5
              </li>
              <li>
                <strong>评估依据：</strong>项目经验、技术博客、代码仓库、技术分享等
              </li>
              <li>
                <strong>评估维度：</strong>理论深度、实践经验、项目复杂度、技术影响力
              </li>
              <li>
                <strong>更新频率：</strong>根据最新项目和技术输出定期更新
              </li>
            </ul>
            <div className="mt-4 rounded border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/20">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                <strong>提示：</strong>评分仅供参考，实际能力会随着项目经验和技术学习持续提升。
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
