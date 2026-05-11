'use client'

import dynamic from 'next/dynamic'
import type { ExcalidrawInnerProps } from './ExcalidrawInner'

const ExcalidrawInner = dynamic(() => import('./ExcalidrawInner'), {
  ssr: false,
  loading: () => (
    <div className="bg-ctp-mantle border-ctp-surface0 my-8 flex h-125 w-full items-center justify-center rounded-xl border">
      <div className="flex flex-col items-center gap-2">
        <div className="border-ctp-blue h-8 w-8 animate-spin rounded-full border-4 border-t-transparent"></div>
        <span className="text-ctp-subtext0 font-medium">
          Loading diagram...
        </span>
      </div>
    </div>
  ),
})

export function ExcalidrawWrapper(props: ExcalidrawInnerProps) {
  return <ExcalidrawInner {...props} />
}
