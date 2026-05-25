import fs from 'node:fs/promises'
import path from 'node:path'
import glob from 'fast-glob'

import { slugifyHeading } from '@/lib/headings'

interface Article {
    title: string
    description: string
    author: string
    date: string
    path?: string
    tags?: Array<string>
}

export interface ArticleWithSlug extends Article {
    slug: string
    path: string
    readingTime: string
    wordCount: number
}

export interface ArticleHeading {
    id: string
    level: 2 | 3
    title: string
}

export interface ArticleContentStats {
    headings: Array<ArticleHeading>
    readingTime: string
    wordCount: number
}

async function importArticle(
    articleFilename: string,
): Promise<ArticleWithSlug> {
    const { article } = (await import(
        `../content/articles/${articleFilename}`
    )) as {
        default: React.ComponentType
        article: Article
    }
    const slug = articleFilename.replace(/(\/page)?\.mdx$/, '')
    const source = await fs.readFile(
        path.join(process.cwd(), 'src', 'content', 'articles', articleFilename),
        'utf8',
    )
    const stats = getArticleContentStats(source)

    return {
        ...article,
        slug,
        path: article.path ?? `/articles/${slug}`,
        readingTime: stats.readingTime,
        wordCount: stats.wordCount,
    }
}

export async function getAllArticles(): Promise<ArticleWithSlug[]> {
    const articleFilenames = await glob('*/page.mdx', {
        cwd: './src/content/articles',
    })

    const articles = await Promise.all(articleFilenames.map(importArticle))

    return articles.sort((a, z) => +new Date(z.date) - +new Date(a.date))
}

export async function getArticleSourceBySlug(slug: string): Promise<string> {
    const articlePath = path.join(
        process.cwd(),
        'src',
        'content',
        'articles',
        slug,
        'page.mdx',
    )

    return fs.readFile(articlePath, 'utf8')
}

export async function getArticleContentStatsBySlug(
    slug: string,
): Promise<ArticleContentStats> {
    return getArticleContentStats(await getArticleSourceBySlug(slug))
}

export function getArticleContentStats(source: string): ArticleContentStats {
    const wordCount = countReadableWords(source)
    const minutes = Math.max(1, Math.ceil(wordCount / 225))

    return {
        headings: extractArticleHeadings(source),
        readingTime: `${minutes} min read`,
        wordCount,
    }
}

function getArticleBody(source: string): string {
    return (
        source.match(
            /<ArticleLayout[^>]*>\s*([\s\S]*?)\s*<\/ArticleLayout>/,
        )?.[1] ?? source
    )
}

function countReadableWords(source: string): number {
    const articleBody = getArticleBody(source)

    const text = articleBody
        .replace(/```[\s\S]*?```/g, ' ')
        .replace(/<([A-Z][\w.]*)\b[\s\S]*?\/>/g, ' ')
        .replace(/<([A-Z][\w.]*)\b[\s\S]*?<\/\1>/g, ' ')
        .replace(/<[^>]+>/g, ' ')
        .replace(/\[[^\]]+\]\([^)]+\)/g, ' ')
        .replace(/[`*_>#{}[\]().,:;!?/\\|-]/g, ' ')

    return text.match(/[A-Za-z0-9]+(?:'[A-Za-z0-9]+)?/g)?.length ?? 0
}

function extractArticleHeadings(source: string): Array<ArticleHeading> {
    const bodyWithoutCode = getArticleBody(source).replace(
        /```[\s\S]*?```/g,
        '',
    )
    const seenIds = new Map<string, number>()

    return [...bodyWithoutCode.matchAll(/^(##|###)\s+(.+)$/gm)].map((match) => {
        const level = match[1] === '##' ? 2 : 3
        const title = cleanHeadingText(match[2] ?? '')
        const baseId = slugifyHeading(title)
        const count = seenIds.get(baseId) ?? 0
        seenIds.set(baseId, count + 1)

        return {
            id: count === 0 ? baseId : `${baseId}-${count + 1}`,
            level,
            title,
        }
    })
}

function cleanHeadingText(value: string): string {
    return value
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
        .replace(/<[^>]+>/g, '')
        .replace(/[`*_~]/g, '')
        .trim()
}
