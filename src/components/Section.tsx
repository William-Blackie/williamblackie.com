import { useId } from 'react'

import { SectionHeading } from '@/components/PagePrimitives'

export function Section({
    title,
    children,
}: {
    title: string
    children: React.ReactNode
}): React.ReactElement {
    const id = useId()

    return (
        <section
            aria-labelledby={id}
            className="md:border-ctp-surface0/70 md:border-l md:pl-6"
        >
            <div className="grid grid-cols-1 items-baseline gap-y-4 md:grid-cols-4 md:gap-y-8">
                <SectionHeading id={id} title={title} className="md:pt-0.5" />
                <div className="md:col-span-3">{children}</div>
            </div>
        </section>
    )
}
