import Link from 'next/link'
import React from 'react'
import { ExternalIcon, InternalIcon } from './Icons'

type InternalExternalLinkProps = React.ComponentProps<typeof Link> & {
  text?: React.ReactNode
}

/**
 * Determines if the given href is an external URL.
 * Returns true if href is a string starting with "http://" or "https://".
 * If href is an object, it is treated as an internal link.
 *
 * @param href - The path or URL to navigate to. Can be a string or an object.
 * @returns True if the href is an external URL, false otherwise.
 */
function isExternalUrl({ href }: { href: string | object }): boolean {
  if (typeof href === 'string') {
    return /^https?:\/\//.test(href)
  }
  // If it's an object, treat as internal
  return false
}

export function InternalExternalLink({
  href,
  children,
  text,
  ...props
}: InternalExternalLinkProps): React.ReactElement {
  const isExternal = isExternalUrl({ href })
  if (isExternal) {
    return (
      <a
        href={typeof href === 'string' ? href : undefined}
        rel="noopener noreferrer"
        target="_blank"
        className="text-ctp-text decoration-ctp-blue/50 hover:text-ctp-blue hover:decoration-ctp-blue dark:decoration-ctp-pink/35 dark:hover:text-ctp-pink dark:hover:decoration-ctp-pink font-medium underline underline-offset-4 transition-[text-decoration-color]"
        {...props}
      >
        {children}
        {text && text}
        <ExternalIcon />
      </a>
    )
  }
  return (
    <Link href={href} {...props}>
      {children}
      <InternalIcon />
    </Link>
  )
}
