'use client'

import { motion } from 'framer-motion'

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
}): React.ReactElement {
    const isExternalLink =
        href.startsWith('http://') || href.startsWith('https://')

    return (
        <motion.div
            className={className}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{
                type: 'spring' as const,
                stiffness: 400,
                damping: 20,
            }}
        >
            <a
                href={href}
                rel={isExternalLink ? 'noopener noreferrer' : undefined}
                target={isExternalLink ? '_blank' : undefined}
                className="theme-focus group text-ctp-text hover:text-ctp-blue dark:hover:text-ctp-pink flex rounded-md text-sm font-medium transition"
            >
                <Icon className="fill-ctp-subtext1 group-hover:fill-ctp-blue dark:group-hover:fill-ctp-pink h-6 w-6 flex-none transition" />
                {children && <span className="ml-4">{children}</span>}
                {srLabel && <span className="sr-only">{srLabel}</span>}
            </a>
        </motion.div>
    )
}
