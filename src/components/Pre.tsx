'use client'

import React, { useRef, useState } from 'react'

/**
 * Enhanced Pre component with line numbers, copy button, and terminal styling.
 * Adheres to accessibility guidelines by providing clear labels and keyboard support.
 */
export function Pre({
    children,
    ...props
}: React.ComponentPropsWithoutRef<'pre'>) {
    const preRef = useRef<HTMLPreElement>(null)

    const getRawText = () => {
        if (!preRef.current) return ''
        return preRef.current.innerText || ''
    }

    // Calculate line numbers based on the child code block's lines
    const codeElement = React.Children.only(children) as React.ReactElement
    const codeContent = codeElement.props.children
    const lineCount = React.Children.count(
        typeof codeContent === 'string' ?
            codeContent.split('\n')
        :   React.Children.toArray(codeContent),
    )

    return (
        <pre
            {...props}
            ref={preRef}
            className="relative group rounded-xl border border-ctp-surface1 bg-ctp-mantle shadow-lg overflow-hidden my-6 transition-all duration-300"
        >
            {/* Header with modern styling and subtle border */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-ctp-surface0/70 border-b border-ctp-surface1 backdrop-blur-sm">
                <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-ctp-red shadow-sm" />
                    <div className="w-2.5 h-2.5 rounded-full bg-ctp-yellow shadow-sm" />
                    <div className="w-2.5 h-2.5 rounded-full bg-ctp-green shadow-sm" />
                </div>
                <CopyButtonWrapper getRawText={getRawText} />
            </div>

            {/* Code container with improved gutter styling */}
            <div className="flex overflow-x-auto text-sm">
                <div
                    className="flex flex-col items-end px-3 py-4 text-ctp-overlay1 font-mono text-[0.85rem] select-none border-r border-ctp-surface1 bg-ctp-crust"
                    aria-hidden="true"
                >
                    {Array.from({ length: lineCount }).map((_, i) => (
                        <span key={i} className="leading-6 opacity-60">
                            {i + 1}
                        </span>
                    ))}
                </div>
                <div className="flex-1 overflow-x-auto">{children}</div>
            </div>
        </pre>
    )
}

interface CopyButtonWrapperProps {
    getRawText: () => string
}

function CopyButtonWrapper({ getRawText }: CopyButtonWrapperProps) {
    const [isCopied, setIsCopied] = useState(false)

    async function copyToClipboard() {
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
            className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-md bg-ctp-surface1/50 hover:bg-ctp-surface1 text-ctp-subtext1 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-ctp-blue outline-none"
            onClick={copyToClipboard}
            // Accessibility: aria-live ensures screen reader feedback on copy
            aria-live="polite"
            aria-label={
                isCopied ? 'Copied to clipboard!' : 'Copy code to clipboard'
            }
        >
            <span
                className={`transition-opacity duration-300 ${isCopied ? 'text-ctp-green' : ''}`}
            >
                {isCopied ? 'Copied!' : 'Copy'}
            </span>
        </button>
    )
}
