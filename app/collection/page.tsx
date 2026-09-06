import Collection from '@/components/adventure/Collection'
import { collectionItems } from '@/data/adventure/collection'
import { adventureMetadata } from '@/lib/adventure-metadata'

export const metadata = adventureMetadata(
  '收藏室',
  '/collection',
  '电影与游戏的私人收藏，留下故事，也留下感受。'
)
export default function Page() {
  return <Collection items={collectionItems} />
}
