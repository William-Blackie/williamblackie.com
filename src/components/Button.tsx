'use client'

import Link from 'next/link'
import clsx from 'clsx'
import { motion } from 'framer-motion'

const variantStyles = {
    primary:
        'bg-ctp-text font-semibold text-ctp-base hover:bg-ctp-overlay1 active:bg-ctp-overlay0 active:text-ctp-base/70',
    secondary:
        'bg-ctp-surface0/50 font-medium text-ctp-text hover:bg-ctp-surface0 active:bg-ctp-surface1 active:text-ctp-text/70',
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
        'inline-flex items-center gap-2 justify-center rounded-md py-2 px-3 text-sm outline-offset-2 transition active:transition-none',
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
