import { MetadataRoute } from 'next'
import { allBlogs } from 'contentlayer/generated'
import siteMetadata from '@/data/siteMetadata'
import { orderedProfessionalProjects } from '@/data/professionalProjects'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = siteMetadata.siteUrl

  const blogRoutes = allBlogs
    .filter((post) => !post.draft)
    .map((post) => ({
      url: `${siteUrl}/${post.path}`,
      lastModified: post.lastmod || post.date,
    }))

  const routes = ['', 'blog', 'projects', 'tags', 'about'].map((route) => ({
    url: `${siteUrl}/${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  const projectDetailRoutes = orderedProfessionalProjects.map((project) => ({
    url: `${siteUrl}/about/projects/${project.id}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [...routes, ...projectDetailRoutes, ...blogRoutes]
}
