"use client"

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { compareDesc } from 'date-fns'
import { allBlogs } from 'contentlayer/generated'
import { useMDXComponent } from 'next-contentlayer/hooks'
import MDXComponents from '@/components/MDXComponents'

// 定义类型
type PostLite = {
  slug: string
  title: string
  summary?: string
  date?: string
  tags?: string[]
  code: string
}

export default function BlogPreviewPage() {
  // 直接在客户端取数据，不需要 getStaticProps
  const posts: PostLite[] = allBlogs
    .filter((p) => !p.draft)
    .sort((a, b) => compareDesc(new Date(a.date ?? '1970-01-01'), new Date(b.date ?? '1970-01-01')))
    .map((p) => ({
      slug: p.slug,
      title: p.title,
      summary: p.summary ?? p.description ?? '',
      date: p.date,
      tags: p.tags ?? [],
      code: p.body.code,
    }))

  const router = useRouter()
  const searchParams = useSearchParams()
  const slugFromQuery = searchParams.get('slug')

  const [activeSlug, setActiveSlug] = useState<string | null>(null)

  useEffect(() => {
    if (slugFromQuery) {
      setActiveSlug(slugFromQuery)
    } else if (!activeSlug && posts.length) {
      setActiveSlug(posts[0].slug)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slugFromQuery, posts.length])

  const activePost = useMemo(
    () => posts.find((p) => p.slug === activeSlug) ?? null,
    [posts, activeSlug]
  )

  const Mdx = useMDXComponent(activePost?.code ?? '')

  const handleSelect = (slug: string) => {
    setActiveSlug(slug)
    router.push(`/skills/code?slug=${slug}`)
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl mb-6">
        博客预览（App Router 版本）
      </h1>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* 左边文章列表 */}
        <aside className="lg:col-span-4">
          <ul className="divide-y divide-gray-200 dark:divide-gray-800 border rounded-lg">
            {posts.map((p) => {
              const isActive = p.slug === activeSlug
              return (
                <li key={p.slug}>
                  <button
                    type="button"
                    onClick={() => handleSelect(p.slug)}
                    className={`w-full text-left px-4 py-3 ${
                      isActive
                        ? 'bg-indigo-50 dark:bg-indigo-900/30'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-800/60'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{p.title}</span>
                      <Link
                        href={`/blog/${p.slug.replace(/^blog\//, '')}`}
                        className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        打开全文 →
                      </Link>
                    </div>
                  </button>
                </li>
              )
            })}
          </ul>
        </aside>

        {/* 右边 MDX 渲染区 */}
        <main className="lg:col-span-8 border rounded-lg p-6">
          {activePost ? (
            <div className="prose dark:prose-invert max-w-none">
              <Mdx components={MDXComponents as any} />
            </div>
          ) : (
            <div className="text-sm text-gray-500">请选择一篇文章</div>
          )}
        </main>
      </div>
    </div>
  )
}
