import Journal from '@/components/adventure/Journal'
import { journalEntries } from '@/data/adventure/journal'
import { adventureMetadata } from '@/lib/adventure-metadata'

export const metadata = adventureMetadata(
  '冒险日志',
  '/journal',
  '健身、骑行、生活与创造，记录每一次值得保存的小事。'
)
export default function Page() {
  return <Journal entries={journalEntries} />
}
