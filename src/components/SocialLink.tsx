import Link from 'next/link'
import clsx from 'clsx'

export function SocialLink({
  className,
  srLabel,
  href,
  children,
  icon: Icon,
}: {
  className?: string
  href: string
  srLabel?: string
  icon: React.ComponentType<{ className?: string }>
  children?: React.ReactNode
}) {
  const isExternalLink =
    href.startsWith('http://') || href.startsWith('https://')

  return (
    <li className={clsx(className, 'flex')}>
      <Link
        href={href}
        rel={isExternalLink ? 'noopener noreferrer' : undefined}
        target={isExternalLink ? '_blank' : undefined}
        className="group text-ctp-text hover:text-ctp-blue mocha:hover:text-ctp-pink flex text-sm font-medium transition"
      >
        <Icon className="fill-ctp-subtext1 group-hover:fill-ctp-blue mocha:group-hover:fill-ctp-pink h-6 w-6 flex-none transition" />
        {children && <span className="ml-4">{children}</span>}
        {srLabel && <span className="sr-only">{srLabel}</span>}
      </Link>
    </li>
  )
}
