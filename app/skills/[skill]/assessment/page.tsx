import { notFound } from 'next/navigation'
import CapabilityAssessmentPage from '@/components/CapabilityAssessmentPage'
import { capabilityDomains, getDomainBySkillPath } from '@/data/siteConfig'
import { genPageMetadata } from 'app/seo'

export async function generateMetadata(props: { params: Promise<{ skill: string }> }) {
  const { skill } = await props.params
  const domain = getDomainBySkillPath(skill)

  return genPageMetadata({ title: domain ? `${domain.label} · 评估说明` : '页面未找到' })
}

export function generateStaticParams() {
  return capabilityDomains.map((domain) => ({ skill: domain.route.split('/')[2] }))
}

export default async function Page(props: { params: Promise<{ skill: string }> }) {
  const { skill } = await props.params
  const domain = getDomainBySkillPath(skill)

  if (!domain) notFound()

  return <CapabilityAssessmentPage domain={domain} />
}
