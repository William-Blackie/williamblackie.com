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
    className,
    children,
    interactive = false,
    href,
    variant = 'default',
}: {
    className?: string | undefined
    children: React.ReactNode
    interactive?: boolean
    href?: Route | string
    variant?: 'default' | 'ghost'
}): React.ReactElement {
    const isLink = typeof href !== 'undefined'
    const Component = interactive ? motion.div : 'div'

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
                variant === 'default' &&
                    'border-ctp-surface0/80 bg-ctp-mantle/60 border',
                variant === 'ghost' && 'border-transparent bg-transparent',
                interactive &&
                    'hover:bg-ctp-surface0/40 hover:border-ctp-surface1 hover:border',
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
                className="group block focus:outline-hidden"
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
                'border-ctp-surface0 bg-ctp-base text-ctp-subtext1 inline-flex rounded-md border px-2 py-1 text-xs font-medium',
                className,
            )}
        >
            {children}
        </span>
    )
}
