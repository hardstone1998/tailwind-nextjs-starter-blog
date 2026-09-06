import Achievements from '@/components/adventure/Achievements'
import { achievements } from '@/data/adventure/achievements'
import { adventureMetadata } from '@/lib/adventure-metadata'

export const metadata = adventureMetadata(
  '成就墙',
  '/achievements',
  '为个人里程碑和想挑战的目标留一个位置。'
)
export default function Page() {
  return <Achievements items={achievements} />
}
