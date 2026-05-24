'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { clsx } from 'clsx'
import { SurfaceCard } from '@/components/PagePrimitives'

interface Heading {
    id: string
    title: string
    level: number
}

export function TableOfContents({
    headings,
    className,
    collapsible = false,
}: {
    headings: Heading[]
    className?: string
    collapsible?: boolean
}) {
    const [activeId, setActiveId] = useState<string | null>(null)
    const [offsets, setOffsets] = useState<Record<string, number>>({})

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id)
                    }
                })
            },
            { rootMargin: '-20% 0% -70% 0%' },
        )

        headings.forEach((heading) => {
            const element = document.getElementById(heading.id)
            if (element) observer.observe(element)
        })

        // Calculate offsets based on list item positions
        const updateOffsets = () => {
            const newOffsets: Record<string, number> = {}
            headings.forEach((heading, index) => {
                newOffsets[heading.id] = index * 40 // Assuming ~40px spacing
            })
            setOffsets(newOffsets)
        }

        updateOffsets()
        window.addEventListener('resize', updateOffsets)
        return () => {
            observer.disconnect()
            window.removeEventListener('resize', updateOffsets)
        }
    }, [headings])

    if (!headings.length) return null

    const headingLinks = (
        <div className="relative mt-4">
            <div className="absolute left-0 top-0 h-full w-0.5 bg-ctp-surface0">
                <motion.div
                    className="absolute left-0 w-0.5 bg-ctp-blue dark:bg-ctp-pink"
                    animate={{
                        top:
                            activeId && offsets[activeId] !== undefined ?
                                `${offsets[activeId]}px`
                            :   0,
                        height: '20px',
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
            </div>
            <ol className="ml-4 space-y-3 text-sm">
                {headings.map((heading) => (
                    <li
                        key={heading.id}
                        className={heading.level === 3 ? 'pl-4' : ''}
                    >
                        <a
                            href={`#${heading.id}`}
                            className={clsx(
                                'transition block py-1',
                                activeId === heading.id ?
                                    'text-ctp-blue dark:text-ctp-pink font-medium'
                                :   'text-ctp-subtext1 hover:text-ctp-blue dark:hover:text-ctp-pink',
                            )}
                        >
                            {heading.title}
                        </a>
                    </li>
                ))}
            </ol>
        </div>
    )

    if (collapsible) {
        return (
            <SurfaceCard className={className}>
                <details className="p-5">
                    <summary className="text-ctp-text marker:text-ctp-subtext1 cursor-pointer text-sm font-semibold">
                        On this page
                    </summary>
                    {headingLinks}
                </details>
            </SurfaceCard>
        )
    }

    return (
        <nav className={className}>
            <h2
                id="table-of-contents"
                className="text-ctp-text text-sm font-semibold"
            >
                On this page
            </h2>
            {headingLinks}
        </nav>
    )
}
