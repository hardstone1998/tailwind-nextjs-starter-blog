import SkillDomainPage from '@/components/SkillDomainPage'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: '快速学习与技术更新' })

export default function Page() {
  return <SkillDomainPage domainId="learning-practice" />
}
