import SkillDomainPage from '@/components/SkillDomainPage'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ path: '/skills/nlp', title: '产品导向与场景思维' })

export default function Page() {
  return <SkillDomainPage domainId="product-thinking" />
}
