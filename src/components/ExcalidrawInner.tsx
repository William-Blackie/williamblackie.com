'use client'

import { useMemo } from 'react'
import { Excalidraw } from '@excalidraw/excalidraw'
import { useTheme } from 'next-themes'

// IMPORTANT: Excalidraw CSS must be imported for correct layout and icons
import '@excalidraw/excalidraw/index.css'

interface ExcalidrawInnerProps {
    height?: string
    initialData?: Record<string, unknown>
    theme?: 'dark' | 'light'
    [key: string]: unknown
}

/**
 * ExcalidrawInner - The actual browser-side component that renders the diagram.
 * It detects the site's current theme (Catppuccin Mocha/Latte) and applies it to the canvas.
 */
export default function ExcalidrawInner({
    height = '500px',
    initialData,
    theme: propTheme,
    ...props
}: ExcalidrawInnerProps) {
    const { resolvedTheme } = useTheme()

    // Compute theme once using useMemo to avoid hydration mismatches
    const currentTheme = useMemo(() => {
        return propTheme || (resolvedTheme === 'light' ? 'light' : 'dark')
    }, [propTheme, resolvedTheme])

    return (
        <div
            style={{ height, width: '100%' }}
            className="my-8 excalidraw-container"
            role="region"
            aria-label="Interactive diagram"
            aria-describedby="excalidraw-desc"
        >
            <div id="excalidraw-desc" className="sr-only">
                Use your mouse or keyboard to interact with the diagram
                elements.
            </div>
            <Excalidraw
                initialData={
                    initialData as import('@excalidraw/excalidraw/types').ExcalidrawInitialDataState
                }
                theme={currentTheme}
                {...props}
            />
        </div>
    )
}
