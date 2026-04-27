import Link from 'next/link'
import clsx from 'clsx'

function ChevronRightIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
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
}: Omit<React.ComponentPropsWithoutRef<T>, 'as' | 'className'> & {
  as?: T
  className?: string
}) {
  const Component = as ?? 'div'

  return (
    <Component
      className={clsx(className, 'group relative flex flex-col items-start')}
    >
      {children}
    </Component>
  )
}

Card.Link = function CardLink({
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof Link>) {
  return (
    <>
      <div className="from-ctp-mantle/95 via-ctp-base/90 to-ctp-surface0/75 shadow-ctp-crust/8 ring-ctp-surface0/55 group-hover:shadow-ctp-crust/12 group-hover:ring-ctp-overlay0/25 absolute -inset-x-4 -inset-y-6 z-0 scale-[0.985] rounded-2xl bg-linear-to-br opacity-0 shadow-xl ring-1 transition-all duration-300 ease-out ring-inset group-hover:scale-100 group-hover:opacity-100 group-hover:shadow-2xl sm:-inset-x-6" />
      <Link {...props}>
        <span className="absolute -inset-x-4 -inset-y-6 z-20 sm:-inset-x-6 sm:rounded-2xl" />
        <span className="relative z-10">{children}</span>
      </Link>
    </>
  )
}

Card.Title = function CardTitle<T extends React.ElementType = 'h2'>({
  as,
  href,
  children,
}: Omit<React.ComponentPropsWithoutRef<T>, 'as' | 'href'> & {
  as?: T
  href?: string
}) {
  const Component = as ?? 'h2'

  return (
    <Component className="text-ctp-text text-base font-semibold tracking-tight">
      {href ? <Card.Link href={href}>{children}</Card.Link> : children}
    </Component>
  )
}

Card.Description = function CardDescription({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <p className="text-ctp-subtext1 relative z-10 mt-2 text-sm">{children}</p>
  )
}

Card.Cta = function CardCta({ children }: { children: React.ReactNode }) {
  return (
    <div
      aria-hidden="true"
      className="text-ctp-blue mocha:text-ctp-pink relative z-10 mt-4 flex items-center text-sm font-medium"
    >
      {children}
      <ChevronRightIcon className="ml-1 h-4 w-4 stroke-current" />
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
}) {
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
