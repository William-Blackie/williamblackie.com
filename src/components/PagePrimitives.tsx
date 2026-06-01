'use client'

import clsx from 'clsx'
import { motion } from 'framer-motion'
import Link from 'next/link'
import type { Route } from 'next'

export function SectionHeading({
    eyebrow,
    title,
    description,
    id,
    className,
}: {
    eyebrow?: string
    title: string
    description?: string
    id?: string
    className?: string | undefined
}): React.ReactElement {
    return (
        <div className={className}>
            {eyebrow && (
                <p className="text-ctp-blue dark:text-ctp-pink text-xs font-semibold tracking-widest uppercase">
                    {eyebrow}
                </p>
            )}
            <h2
                id={id}
                className={clsx(
                    'text-ctp-text font-semibold tracking-tight',
                    eyebrow ? 'mt-2 text-xl' : 'text-xl',
                )}
            >
                {title}
            </h2>
            {description && (
                <p className="text-ctp-subtext1 mt-3 max-w-2xl text-sm">
                    {description}
                </p>
            )}
        </div>
    )
}

export function SurfaceCard({
    as,
    className,
    children,
    interactive = false,
    href,
    variant = 'default',
}: {
    as?: React.ElementType
    className?: string | undefined
    children: React.ReactNode
    interactive?: boolean
    href?: Route | string
    variant?: 'default' | 'ghost'
}): React.ReactElement {
    const isLink = typeof href !== 'undefined'
    const Component = interactive ? motion.div : (as ?? 'div')

    const card = (
        <Component
            {...(interactive ?
                {
                    whileHover: { y: -4 },
                    transition: {
                        type: 'spring' as const,
                        stiffness: 300,
                        damping: 20,
                    },
                }
            :   {})}
            className={clsx(
                'relative rounded-2xl transition-colors duration-300',
                variant === 'default' && 'theme-panel',
                variant === 'ghost' &&
                    'border border-transparent bg-transparent',
                interactive && 'theme-panel-interactive will-change-transform',
                className,
            )}
        >
            {children}
        </Component>
    )

    if (isLink) {
        return (
            <Link
                href={href as Route}
                className="theme-focus group block rounded-2xl h-full"
            >
                {card}
            </Link>
        )
    }

    return card
}

export function Pill({
    className,
    children,
}: {
    className?: string | undefined
    children: React.ReactNode
}): React.ReactElement {
    return (
        <span
            className={clsx(
                'theme-pill text-ctp-subtext1 inline-flex rounded-lg px-2.5 py-1.5 text-xs font-medium',
                className,
            )}
        >
            {children}
        </span>
    )
}
