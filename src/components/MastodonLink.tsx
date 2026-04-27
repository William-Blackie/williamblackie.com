'use client'

import { useEffect } from 'react'

export function MastodonLink() {
  useEffect(() => {
    // Create link element
    const link = document.createElement('link')
    link.rel = 'me'
    link.href = 'https://mastodon.social/@williamblackie'

    // Add to head
    document.head.appendChild(link)

    // Cleanup
    return () => {
      document.head.removeChild(link)
    }
  }, [])

  return null
}
