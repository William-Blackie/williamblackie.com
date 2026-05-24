'use client'

import { useEffect, useRef, useState } from 'react'
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
    const [sliderTop, setSliderTop] = useState(0)
    const listRef = useRef<HTMLOListElement>(null)

    useEffect(() => {
        const hash = window.location.hash.substring(1)
        let hashFrame: number | undefined
        let sliderTimeout: ReturnType<typeof setTimeout> | undefined

        if (hash) {
            hashFrame = window.requestAnimationFrame(() => {
                setActiveId(hash)
            })
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActiveId(entry.target.id)
                })
            },
            { rootMargin: '-10% 0px -60% 0px' },
        )

        headings.forEach((h) => {
            const el = document.getElementById(h.id)
            if (el) observer.observe(el)
        })

        // Force a calculation after the layout is established on mount
        if (hash) {
            sliderTimeout = setTimeout(() => {
                const activeEl = listRef.current?.querySelector(
                    `a[href="#${hash}"]`,
                )
                if (activeEl instanceof HTMLElement) {
                    setSliderTop(activeEl.offsetTop)
                }
            }, 100)
        }

        return () => {
            observer.disconnect()
            if (typeof hashFrame !== 'undefined') {
                window.cancelAnimationFrame(hashFrame)
            }
            if (sliderTimeout) {
                clearTimeout(sliderTimeout)
            }
        }
    }, [headings])

    useEffect(() => {
        if (!activeId || !listRef.current) return
        const activeEl = listRef.current.querySelector(`a[href="#${activeId}"]`)
        if (activeEl instanceof HTMLElement) {
            setSliderTop(activeEl.offsetTop)
        }
    }, [activeId])

    if (!headings.length) return null

    const headingLinks = (
        <div className="relative mt-4">
            <div className="absolute left-0 top-0 h-full w-0.5 bg-ctp-surface0">
                <motion.div
                    className="absolute left-0 w-0.5 bg-ctp-blue dark:bg-ctp-pink"
                    animate={{ top: sliderTop, height: '24px' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
            </div>
            <ol ref={listRef} className="ml-4 space-y-3 text-sm">
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
        <nav className={className} aria-label="Table of contents">
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
