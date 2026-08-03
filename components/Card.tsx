import Image from './Image'
import Link from './Link'
import ResearchMeta from './research/ResearchMeta'

const Card = ({ title, description, imgSrc, href, domains, lab, status, methods, outcome }) => (
  <div className="md max-w-[544px] p-4 md:w-1/2">
    <div className={`${imgSrc && 'h-full'} notebook-card overflow-hidden p-0`}>
      {imgSrc &&
        (href ? (
          <Link href={href} aria-label={`Link to ${title}`}>
            <Image
              alt={title}
              src={imgSrc}
              className="object-cover object-center md:h-36 lg:h-48"
              width={544}
              height={306}
            />
          </Link>
        ) : (
          <Image
            alt={title}
            src={imgSrc}
            className="object-cover object-center md:h-36 lg:h-48"
            width={544}
            height={306}
          />
        ))}
      <div className="p-6">
        <h2 className="mb-3 text-2xl leading-8 font-bold tracking-tight text-[var(--ink)]">
          {href ? (
            <Link href={href} aria-label={`Link to ${title}`}>
              {title}
            </Link>
          ) : (
            title
          )}
        </h2>
        <p className="mb-4 leading-7 whitespace-pre-line text-[var(--muted)]">{description}</p>
        <ResearchMeta
          domains={domains}
          lab={lab}
          status={status}
          methods={methods}
          outcome={outcome}
        />
        {href && (
          <Link
            href={href}
            className="mt-5 inline-flex text-base font-semibold text-[var(--accent)] hover:underline"
            aria-label={`Link to ${title}`}
          >
            查看研究记录 →
          </Link>
        )}
      </div>
    </div>
  </div>
)

export default Card
