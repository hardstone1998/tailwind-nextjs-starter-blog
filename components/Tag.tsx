import Link from 'next/link'
import { slug } from 'github-slugger'
interface Props {
  text: string
}

const Tag = ({ text }: Props) => {
  return (
    <Link
      href={`/tags/${slug(text)}`}
      className="topic-chip mr-2 inline-flex border px-2 py-0.5 text-xs font-medium transition-colors"
    >
      {text.split(' ').join('-')}
    </Link>
  )
}

export default Tag
