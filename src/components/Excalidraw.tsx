'use client'

import dynamic from 'next/dynamic'

/**
 * ExcalidrawWrapper - A dynamic loader for the Excalidraw component.
 */
const ExcalidrawInner = dynamic(() => import('./ExcalidrawInner'), {
    ssr: false,
    loading: () => (
        <div
            className="flex h-[500px] w-full items-center justify-center bg-ctp-mantle rounded-xl border border-ctp-surface0 my-8"
            role="status"
            aria-label="Loading diagram"
        >
            <div className="flex flex-col items-center gap-2">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-ctp-blue border-t-transparent"></div>
                <span className="text-ctp-subtext0 font-medium">
                    Loading diagram...
                </span>
            </div>
        </div>
    ),
})

interface ExcalidrawWrapperProps {
    height?: string
    initialData?: Record<string, unknown>
    theme?: 'dark' | 'light'
    [key: string]: unknown
}

export function ExcalidrawWrapper(props: ExcalidrawWrapperProps) {
    return <ExcalidrawInner {...props} />
}
