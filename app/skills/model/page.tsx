import SkillDomainPage from '@/components/SkillDomainPage'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: '系统工程与部署' })

export default function Page() {
  return <SkillDomainPage domainId="systems-engineering" />
}
