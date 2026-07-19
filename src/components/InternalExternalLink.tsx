import Link from 'next/link'
import React from 'react'
import clsx from 'clsx'
import { ExternalIcon, InternalIcon } from './Icons'

type InternalExternalLinkProps = React.ComponentProps<typeof Link> & {
    text?: React.ReactNode
}

function isExternalUrl(href: string | object): boolean {
    if (typeof href === 'string') {
        return /^https?:\/\//.test(href)
    }
    return false
}

export function InternalExternalLink({
    href,
    children,
    className,
    text,
    ...props
}: InternalExternalLinkProps): React.ReactElement {
    const isExternal = isExternalUrl(href)
    const linkClassName = clsx(
        'theme-link theme-focus group inline-flex items-center gap-1 transition-all duration-300',
        className,
    )
    if (isExternal) {
        return (
            <a
                href={typeof href === 'string' ? href : undefined}
                rel="noopener noreferrer"
                target="_blank"
                className={linkClassName}
                {...props}
            >
                {children}
                {text && text}
                <ExternalIcon
                    aria-hidden="true"
                    className="h-3 w-3 transition-transform group-hover:translate-x-0.5"
                />
            </a>
        )
    }
    return (
        <Link href={href} className={linkClassName} {...props}>
            {children}
            <InternalIcon
                aria-hidden="true"
                className="h-3 w-3 transition-transform group-hover:translate-x-0.5"
            />
        </Link>
    )
}
