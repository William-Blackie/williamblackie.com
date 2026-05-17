import clsx from 'clsx'

export function Prose({
    className,
    ...props
}: React.ComponentPropsWithoutRef<'div'>): React.ReactElement {
    return (
        <div className={clsx(className, 'prose prose-catppuccin')} {...props} />
    )
}
