'use client'

import React, { useRef, useState, useCallback } from 'react'

function CopyIcon(
    props: React.ComponentPropsWithoutRef<'svg'>,
): React.ReactElement {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            {...props}
        >
            <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
        </svg>
    )
}

function CheckIcon(
    props: React.ComponentPropsWithoutRef<'svg'>,
): React.ReactElement {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            {...props}
        >
            <path d="M20 6 9 17l-5-5" />
        </svg>
    )
}

export function CodeBlockPre({
    children,
    ...props
}: React.ComponentPropsWithoutRef<'pre'>): React.ReactElement {
    const preRef = useRef<HTMLPreElement>(null)
    const [copied, setCopied] = useState(false)

    const language = (props as Record<string, unknown>)['data-language'] as
        string | undefined

    const handleCopy = useCallback(async () => {
        if (!preRef.current) return

        const code = preRef.current.querySelector('code')
        const text = code?.textContent ?? preRef.current.textContent ?? ''

        try {
            await navigator.clipboard.writeText(text)
        } catch {
            // Fallback for older browsers
            const textarea = document.createElement('textarea')
            textarea.value = text
            textarea.style.position = 'fixed'
            textarea.style.opacity = '0'
            document.body.appendChild(textarea)
            textarea.select()
            try {
                document.execCommand('copy')
            } catch {
                // Silently fail
            } finally {
                document.body.removeChild(textarea)
            }
        }

        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }, [])

    return (
        <pre
            ref={preRef}
            {...props}
            className={`code-block group ${props.className ?? ''}`}
        >
            <div className="code-block-toolbar">
                {language && (
                    <span className="code-block-lang">{language}</span>
                )}
                <button
                    type="button"
                    className="code-block-copy theme-focus"
                    onClick={handleCopy}
                    aria-label={
                        copied ?
                            'Copied to clipboard!'
                        :   'Copy code to clipboard'
                    }
                    aria-live="polite"
                >
                    {copied ?
                        <>
                            <CheckIcon className="code-block-copy-icon" />
                            <span>Copied!</span>
                        </>
                    :   <>
                            <CopyIcon className="code-block-copy-icon" />
                            <span>Copy</span>
                        </>
                    }
                </button>
            </div>
            {children}
        </pre>
    )
}
