'use client'

import Link from 'next/link'
import clsx from 'clsx'
import { motion } from 'framer-motion'

const variantStyles = {
    primary: 'button-primary font-semibold active:opacity-90',
    secondary: 'button-secondary font-medium active:text-ctp-text/70',
}

type ButtonProps = {
    variant?: keyof typeof variantStyles
} & (
    | (React.ComponentPropsWithoutRef<'button'> & { href?: undefined })
    | React.ComponentPropsWithoutRef<typeof Link>
)

export function Button({
    variant = 'primary',
    className,
    ...props
}: ButtonProps): React.ReactElement {
    className = clsx(
        'theme-focus inline-flex items-center justify-center gap-2 rounded-md px-3 py-2 text-sm transition active:transition-none',
        variantStyles[variant],
        className,
    )

    const motionProps = {
        whileHover: { scale: 1.02 },
        whileTap: { scale: 0.98 },
        transition: { type: 'spring' as const, stiffness: 400, damping: 25 },
    }

    const inner =
        typeof props.href === 'undefined' ?
            <button className={className} {...props} />
        :   <Link className={className} {...props} />

    return (
        <motion.div className="contents" {...motionProps}>
            {inner}
        </motion.div>
    )
}
