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

interface AdaptedElement {
    id?: string
    type?: string
    containerId?: string
    strokeColor?: string
    backgroundColor?: string
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

    // Adapt initialData elements dynamically for theme, contrast, and accessibility
    const themedInitialData = useMemo(() => {
        if (!initialData || !initialData['elements']) return initialData

        const elements = (initialData['elements'] as AdaptedElement[]).map(
            (el) => {
                const newEl = { ...el }

                if (currentTheme === 'dark') {
                    // Theme adjustments for Dark Mode (Catppuccin Mocha)
                    if (newEl.type === 'text') {
                        if (newEl.containerId) {
                            // Text inside a container (always drawn on a light pastel background)
                            newEl.strokeColor = '#181825' // Keep it very dark for readability
                        } else {
                            // Standalone text (drawn directly on dark canvas)
                            newEl.strokeColor = '#cdd6f4' // Mocha Text
                        }
                    } else if (newEl.type === 'arrow') {
                        newEl.strokeColor = '#cdd6f4' // Mocha Text for high-contrast arrows
                    } else if (newEl.id === 'el_pipeline_group') {
                        newEl.strokeColor = '#6c7086' // Mocha Overlay0
                        newEl.backgroundColor = '#3132440b' // Very light translucent surface
                    } else {
                        // Other containers: ensure dark borders for contrast
                        if (newEl.strokeColor === '#1e1e2e') {
                            newEl.strokeColor = '#11111b'
                        }
                    }
                } else {
                    // Theme adjustments for Light Mode (Catppuccin Latte)
                    if (newEl.type === 'text') {
                        if (newEl.containerId) {
                            newEl.strokeColor = '#202030' // Dark text for light pastel background
                        } else {
                            newEl.strokeColor = '#4c4f69' // Latte Text
                        }
                    } else if (newEl.type === 'arrow') {
                        newEl.strokeColor = '#4c4f69' // Latte Text
                    } else if (newEl.id === 'el_pipeline_group') {
                        newEl.strokeColor = '#9ca0b0' // Latte Overlay0
                        newEl.backgroundColor = '#ccd0da08' // Very light translucent surface
                    } else {
                        if (newEl.strokeColor === '#1e1e2e') {
                            newEl.strokeColor = '#dce0e8' // Crust border
                        }
                    }
                }
                return newEl
            },
        )

        return {
            ...initialData,
            elements,
        }
    }, [initialData, currentTheme])

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
                    themedInitialData as import('@excalidraw/excalidraw/types').ExcalidrawInitialDataState
                }
                theme={currentTheme}
                viewModeEnabled={true}
                {...props}
            />
        </div>
    )
}
