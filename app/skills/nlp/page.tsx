import { allBlogs } from 'contentlayer/generated'
import { compareDesc } from 'date-fns'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: '产品导向与场景思维' })

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
    模型理解与微调能力: ['微调', '模型', 'fine-tuning', '训练', '模型理解'],
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
    技术影响力与表达力: ['开源', '分享', '技术', '影响力', '表达', 'open source'],
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
  const skillName = '产品导向与场景思维'
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
            在产品导向与场景思维方面，我始终将技术能力与业务需求紧密结合。
            我具备从用户场景出发，设计AI解决方案的能力，能够将复杂的AI技术转化为
            解决实际问题的产品功能。
          </p>
          <p>
            我擅长分析业务场景，理解用户痛点，设计符合产品定位的AI功能。
            在NLP领域，我深入理解文本理解、信息抽取、对话系统等技术的应用场景，
            能够根据不同的业务需求选择合适的技术方案，并考虑性能、成本、用户体验等因素。
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
                              {tags?.map((tag) => (
                                <Tag key={tag} text={tag} />
                              ))}
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
              <li>场景理解：对业务场景和用户需求的理解深度</li>
              <li>产品思维：将技术转化为产品功能的能力</li>
              <li>技术选型：根据场景选择合适技术方案的能力</li>
              <li>落地实践：技术在实际产品中的落地经验</li>
              <li>用户体验：考虑用户体验和产品体验的能力</li>
              <li>业务价值：技术方案带来的业务价值评估</li>
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
