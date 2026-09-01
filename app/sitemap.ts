import type { MetadataRoute } from 'next'
import { allBlogs } from 'contentlayer/generated'
import siteMetadata from '@/data/siteMetadata'
import { orderedProfessionalProjects } from '@/data/professionalProjects'
import { capabilityDomains } from '@/data/siteConfig'
import { getTranslationPath } from '@/lib/blog-language'
export const dynamic = 'force-static'
const reviewDate = '2026-09-01'
export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => new URL(path, siteMetadata.siteUrl).href
  const routes = [
    '/',
    '/blog',
    '/projects',
    '/tags',
    '/about',
    ...orderedProfessionalProjects.map((p) => `/about/projects/${p.id}`),
    ...capabilityDomains.flatMap((d) => [d.route, `${d.route}/assessment`]),
  ].map((path) => ({ url: url(path), lastModified: reviewDate }))
  const blogs = allBlogs
    .filter((p) => !p.draft)
    .map((p) => {
      const zh = getTranslationPath(allBlogs, p, 'zh')
      const en = getTranslationPath(allBlogs, p, 'en')
      return {
        url: url(`/${p.path}`),
        lastModified: p.lastmod || p.date,
        ...(zh && en
          ? { alternates: { languages: { 'zh-CN': url(`/${zh}`), en: url(`/${en}`) } } }
          : {}),
      }
    })
  return [...routes, ...blogs]
}
