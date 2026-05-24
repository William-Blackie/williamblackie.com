import { Feed } from 'feed'

import { getAllArticles } from '@/lib/articles'
import { absoluteUrl, siteDescription, siteName, siteUrl } from '@/lib/site'

export const runtime = 'nodejs'

export async function GET(): Promise<Response> {
    const articles = await getAllArticles()
    const feed = new Feed({
        title: `${siteName} Blog`,
        description: siteDescription,
        id: absoluteUrl('/articles'),
        link: absoluteUrl('/articles'),
        language: 'en-GB',
        favicon: absoluteUrl('/favicon.ico'),
        copyright: `All rights reserved ${new Date().getFullYear()}, ${siteName}`,
        feedLinks: {
            rss2: absoluteUrl('/feed.xml'),
        },
        author: {
            name: siteName,
            link: siteUrl,
        },
    })

    for (const article of articles) {
        feed.addItem({
            title: article.title,
            id: absoluteUrl(article.path),
            link: absoluteUrl(article.path),
            description: article.description,
            date: new Date(article.date),
            author: [{ name: article.author, link: siteUrl }],
            ...(article.tags ?
                { category: article.tags.map((tag) => ({ name: tag })) }
            :   {}),
        })
    }

    return new Response(feed.rss2(), {
        status: 200,
        headers: {
            'Content-Type': 'application/rss+xml; charset=utf-8',
            'Cache-Control': 'public, max-age=3600, s-maxage=3600',
        },
    })
}
