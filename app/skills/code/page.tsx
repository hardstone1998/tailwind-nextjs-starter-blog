import SkillDomainPage from '@/components/SkillDomainPage'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: '模型理解与微调' })

export default function Page() {
  return <SkillDomainPage domainId="model-research" />
}
