'use client'

import React, { useRef, useState } from 'react'

export function Pre({
    children,
    ...props
}: React.ComponentPropsWithoutRef<'pre'>): React.ReactElement {
    const preRef = useRef<HTMLPreElement>(null)

    const getRawText = (): string => {
        if (!preRef.current) return ''
        return preRef.current.innerText || ''
    }

    return (
        <pre {...props} ref={preRef} className="group relative">
            {children}
            <div className="absolute top-3 right-3 opacity-0 transition-opacity group-hover:opacity-100">
                <CopyButtonWrapper getRawText={getRawText} />
            </div>
        </pre>
    )
}

function CopyButtonWrapper({
    getRawText,
}: {
    getRawText: () => string
}): React.ReactElement {
    const [isCopied, setIsCopied] = useState(false)

    async function copyToClipboard(): Promise<void> {
        const text = getRawText()
        try {
            await navigator.clipboard.writeText(text)
            setIsCopied(true)
            setTimeout(() => setIsCopied(false), 2000)
        } catch (err) {
            console.error('Failed to copy!', err)
        }
    }

    return (
        <button
            type="button"
            className="bg-ctp-surface1/50 hover:bg-ctp-surface1 rounded-lg p-2 transition-colors"
            onClick={copyToClipboard}
            aria-label="Copy code"
        >
            {isCopied ?
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    className="text-ctp-green h-4 w-4"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <polyline points="20 6 9 17 4 12" />
                </svg>
            :   <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    className="text-ctp-text h-4 w-4"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
            }
        </button>
    )
}
