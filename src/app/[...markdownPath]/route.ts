import type { NextRequest } from 'next/server'

import { renderMarkdownForRoute, resolveMarkdownRoute } from '@/lib/llms'

export const runtime = 'nodejs'

export async function GET(request: NextRequest) {
  const route = resolveMarkdownRoute(request.nextUrl.pathname)

  if (!route) {
    return new Response('Not Found', { status: 404 })
  }

  const content = await renderMarkdownForRoute(route)

  if (!content) {
    return new Response('Not Found', { status: 404 })
  }

  return new Response(content, {
    status: 200,
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
