import Link from 'next/link'
import clsx from 'clsx'
import { SurfaceCard } from './PagePrimitives'

type LinkHref = React.ComponentPropsWithoutRef<typeof Link>['href']
type CardHref = LinkHref | string

function ChevronRightIcon(
    props: React.ComponentPropsWithoutRef<'svg'>,
): React.ReactElement {
    return (
        <svg
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            aria-hidden="true"
            {...props}
        >
            <path
                d="M6.75 5.75 9.25 8l-2.5 2.25"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}
export function Card<T extends React.ElementType = 'div'>({
    as,
    className,
    children,
    href,
    variant = 'default',
}: Omit<React.ComponentPropsWithoutRef<T>, 'as' | 'className'> & {
    as?: T
    className?: string
    href?: CardHref
    variant?: 'default' | 'ghost'
}): React.ReactElement {
    const Component = href ? (as ?? 'div') : 'div'

    return (
        <SurfaceCard
            {...(!href && as ? { as } : {})}
            interactive={!!href}
            href={href as string}
            variant={variant}
            className={clsx(
                'h-full flex flex-col',
                className,
                variant === 'default' ? 'p-6' : 'p-0',
            )}
        >
            <Component className="relative flex flex-col items-start flex-1 h-full w-full">
                {children}
            </Component>
        </SurfaceCard>
    )
}

Card.Link = function CardLink({
    children,
    className,
    href,
    ...props
}: { href: CardHref } & Omit<
    React.ComponentPropsWithoutRef<typeof Link>,
    'href'
>): React.ReactElement {
    return (
        <Link
            href={href as LinkHref}
            className={clsx('theme-focus rounded-md', className)}
            {...props}
        >
            <span className="absolute -inset-6 z-20 rounded-2xl" />
            <span className="relative z-10">{children}</span>
        </Link>
    )
}

Card.Title = function CardTitle<T extends React.ElementType = 'h2'>({
    as,
    href,
    className,
    children,
    ...props
}: Omit<React.ComponentPropsWithoutRef<T>, 'as' | 'href'> & {
    as?: T
    href?: CardHref | undefined
}): React.ReactElement {
    const Component = as ?? 'h2'

    return (
        <Component
            className={clsx(
                'text-ctp-text font-semibold tracking-tight',
                className,
            )}
            {...props}
        >
            {href ?
                <Card.Link href={href}>{children}</Card.Link>
            :   children}
        </Component>
    )
}

Card.Description = function CardDescription({
    className,
    children,
}: {
    className?: string
    children: React.ReactNode
}): React.ReactElement {
    return (
        <p
            className={clsx(
                'text-ctp-subtext1 relative z-10 mt-2 text-sm',
                className,
            )}
        >
            {children}
        </p>
    )
}

Card.Cta = function CardCta({
    className,
    children,
}: {
    className?: string
    children: React.ReactNode
}): React.ReactElement {
    return (
        <div
            className={clsx(
                'text-ctp-blue dark:text-ctp-pink relative z-10 mt-auto flex items-center pt-4 text-sm font-medium',
                className,
            )}
        >
            <span>{children}</span>
            <ChevronRightIcon
                aria-hidden="true"
                className="ml-1 h-4 w-4 stroke-current transition-transform duration-300 group-hover:translate-x-1"
            />
        </div>
    )
}

Card.Eyebrow = function CardEyebrow<T extends React.ElementType = 'p'>({
    as,
    decorate = false,
    className,
    children,
    ...props
}: Omit<React.ComponentPropsWithoutRef<T>, 'as' | 'decorate'> & {
    as?: T
    decorate?: boolean
}): React.ReactElement {
    const Component = as ?? 'p'

    return (
        <Component
            className={clsx(
                className,
                'text-ctp-subtext1 relative z-10 order-first mb-3 flex items-center text-sm',
                decorate && 'pl-3.5',
            )}
            {...props}
        >
            {decorate && (
                <span
                    className="absolute inset-y-0 left-0 flex items-center"
                    aria-hidden="true"
                >
                    <span className="bg-ctp-surface1 h-4 w-0.5 rounded-full" />
                </span>
            )}
            {children}
        </Component>
    )
}
