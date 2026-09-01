import SkillDomainPage from '@/components/SkillDomainPage'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ path: '/skills/open-source', title: '技术影响力与表达' })

export default function Page() {
  return <SkillDomainPage domainId="open-source-writing" />
}
