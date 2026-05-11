'use client'

import { Excalidraw } from '@excalidraw/excalidraw'
import type { ExcalidrawProps } from '@excalidraw/excalidraw/types'
import type { CSSProperties } from 'react'
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
}: ExcalidrawInnerProps) {
  const { resolvedTheme } = useTheme()
  const theme = propTheme || (resolvedTheme === 'dark' ? 'dark' : 'light')

  return (
    <div
      style={{ height, width: '100%' }}
      className="excalidraw-container my-8"
    >
      <Excalidraw initialData={initialData} theme={theme} {...props} />
    </div>
  )
}
