'use client'

import dynamic from 'next/dynamic'

const ExcalidrawInner = dynamic(() => import('./ExcalidrawInner'), {
    ssr: false,
    loading: () => (
        <div
            className="border-ctp-surface0 bg-ctp-mantle my-8 flex h-[500px] w-full items-center justify-center rounded-xl border"
            role="status"
            aria-label="Loading diagram"
        >
            <div className="flex flex-col items-center gap-2">
                <div className="border-ctp-blue h-8 w-8 animate-spin rounded-full border-4 border-t-transparent"></div>
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
