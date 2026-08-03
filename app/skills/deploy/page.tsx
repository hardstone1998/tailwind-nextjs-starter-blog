import SkillDomainPage from '@/components/SkillDomainPage'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: '跨模态与多任务融合' })

export default function Page() {
  return <SkillDomainPage domainId="multimodal-intelligence" />
}
