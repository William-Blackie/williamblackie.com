'use client'

import { Excalidraw } from '@excalidraw/excalidraw'
import type { ExcalidrawProps } from '@excalidraw/excalidraw/types'
import type { CSSProperties } from 'react'
import { useEffect, useRef } from 'react'
import { useTheme } from 'next-themes'

// IMPORTANT: Excalidraw CSS must be imported
import '@excalidraw/excalidraw/index.css'

export type ExcalidrawInnerProps = ExcalidrawProps & {
    height?: CSSProperties['height']
}

export default function ExcalidrawInner({
    height = '500px',
    initialData,
    theme: propTheme,
    ...props
}: ExcalidrawInnerProps): React.ReactElement {
    const containerRef = useRef<HTMLDivElement>(null)
    const { resolvedTheme } = useTheme()
    const theme = propTheme || (resolvedTheme === 'dark' ? 'dark' : 'light')

    useEffect(() => {
        function labelMenuButton(): void {
            containerRef.current
                ?.querySelectorAll<HTMLButtonElement>('.main-menu-trigger')
                .forEach((button) => {
                    button.setAttribute('aria-label', 'Open diagram menu')
                })
        }

        labelMenuButton()

        const observer = new MutationObserver(labelMenuButton)
        if (containerRef.current) {
            observer.observe(containerRef.current, {
                childList: true,
                subtree: true,
            })
        }

        return () => observer.disconnect()
    }, [])

    return (
        <div
            ref={containerRef}
            style={{ height, width: '100%' }}
            className="excalidraw-container my-8"
        >
            <Excalidraw initialData={initialData} theme={theme} {...props} />
        </div>
    )
}
