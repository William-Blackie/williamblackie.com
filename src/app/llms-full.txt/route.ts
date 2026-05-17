import { renderLlmsFullMarkdown } from '@/lib/llms'

export const runtime = 'nodejs'

export async function GET(): Promise<Response> {
    return new Response(await renderLlmsFullMarkdown(), {
        status: 200,
        headers: {
            'Content-Type': 'text/markdown; charset=utf-8',
            'Cache-Control': 'public, max-age=3600, s-maxage=3600',
        },
    })
}
