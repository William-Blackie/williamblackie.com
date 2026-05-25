import { notFound } from 'next/navigation'
import { type Metadata } from 'next'
import { getAllArticles } from '@/lib/articles'

interface PageProps {
    params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
    const articles = await getAllArticles()
    return articles.map((article) => ({
        slug: article.slug,
    }))
}

export async function generateMetadata({
    params,
}: PageProps): Promise<Metadata> {
    const { slug } = await params
    const articles = await getAllArticles()
    const article = articles.find((a) => a.slug === slug)

    if (!article) {
        return {}
    }

    const { createArticleMetadata } = await import('@/lib/metadata')
    return createArticleMetadata({
        title: article.title,
        description: article.description,
        path: article.path,
        datePublished: article.date,
        tags: article.tags ?? [],
    })
}

export default async function ArticlePage({ params }: PageProps) {
    const { slug } = await params

    let PostContent: React.ComponentType | null = null
    try {
        const postModule = await import(`@/content/articles/${slug}/page.mdx`)
        PostContent = postModule.default
    } catch {
        // Handle failed imports gracefully
    }

    if (!PostContent) {
        notFound()
    }

    return <PostContent />
}
