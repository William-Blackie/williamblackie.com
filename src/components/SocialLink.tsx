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
        className="group flex text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
      >
        <Icon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-teal-500" />
        {children && <span className="ml-4">{children}</span>}
        {srLabel && <span className="sr-only">{srLabel}</span>}
      </Link>
    </li>
  )
}
