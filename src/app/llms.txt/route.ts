import { renderLlmsTxt } from '@/lib/llms'

export const runtime = 'nodejs'

export async function GET() {
  return new Response(await renderLlmsTxt(), {
    status: 200,
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
