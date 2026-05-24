import Link from 'next/link'
import React from 'react'
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
    text,
    ...props
}: InternalExternalLinkProps): React.ReactElement {
    const isExternal = isExternalUrl(href)
    const className =
        'group inline-flex items-center gap-1 text-ctp-text decoration-ctp-blue/50 hover:text-ctp-blue hover:decoration-ctp-blue dark:decoration-ctp-pink/35 dark:hover:text-ctp-pink dark:hover:decoration-ctp-pink font-medium underline underline-offset-4 transition-all duration-300'

    if (isExternal) {
        return (
            <a
                href={typeof href === 'string' ? href : undefined}
                rel="noopener noreferrer"
                target="_blank"
                className={className}
                {...props}
            >
                {children}
                {text && text}
                <ExternalIcon className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
        )
    }
    return (
        <Link href={href} className={className} {...props}>
            {children}
            <InternalIcon className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
        </Link>
    )
}
