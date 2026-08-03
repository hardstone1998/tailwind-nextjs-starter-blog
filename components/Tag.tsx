import Link from 'next/link'
import { slug } from 'github-slugger'
interface Props {
  text: string
}

const Tag = ({ text }: Props) => {
  return (
    <Link
      href={`/tags/${slug(text)}`}
      className="mr-2 inline-flex rounded-full border border-[var(--rule)] px-2 py-0.5 text-xs font-semibold tracking-wide text-[var(--muted)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
    >
      {text.split(' ').join('-')}
    </Link>
  )
}

export default Tag
