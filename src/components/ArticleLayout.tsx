import Link from 'next/link'

import { Container } from '@/components/Container'
import { Prose } from '@/components/Prose'
import { TableOfContents } from '@/components/TableOfContents'
import { Comments } from '@/components/Comments'
import {
    ArrowLeftIcon,
    CalendarIcon,
    ClockIcon,
} from '@/components/GeneralIcons'
import { JsonLd } from '@/components/JsonLd'
import { Pill, SurfaceCard } from '@/components/PagePrimitives'
import {
    getAllArticles,
    getArticleContentStatsBySlug,
    type ArticleWithSlug,
} from '@/lib/articles'
import { formatDate } from '@/lib/formatDate'
import { createArticleSchema } from '@/lib/metadata'

type LinkHref = React.ComponentPropsWithoutRef<typeof Link>['href']

interface ArticleMetadata {
    title: string
    description: string
    author: string
    date: string
    path: string
    tags?: Array<string>
}

function ArticleMeta({
    article,
    readingTime,
}: {
    article: ArticleMetadata
    readingTime: string
}): React.ReactElement {
    return (
        <div className="text-ctp-subtext1 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
            <span className="inline-flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 stroke-ctp-subtext1/70" />
                <time dateTime={article.date}>{formatDate(article.date)}</time>
            </span>
            <span className="inline-flex items-center gap-2">
                <ClockIcon className="h-4 w-4 stroke-ctp-subtext1/70" />
                {readingTime}
            </span>
        </div>
    )
}

function ArticleTags({
    tags,
}: {
    tags: Array<string> | undefined
}): React.ReactElement | null {
    if (!tags?.length) {
        return null
    }

    return (
        <ul className="mt-6 flex flex-wrap gap-2" aria-label="Article topics">
            {tags.map((tag) => (
                <li key={tag}>
                    <Pill>{tag}</Pill>
                </li>
            ))}
        </ul>
    )
}

function ArticleFacts({
    article,
    readingTime,
}: {
    article: ArticleMetadata
    readingTime: string
}): React.ReactElement {
    return (
        <SurfaceCard className="p-5">
            <h2 className="text-ctp-text text-sm font-semibold">Article</h2>
            <dl className="divide-ctp-surface0/70 mt-4 divide-y text-sm">
                <div className="flex justify-between gap-4 py-3 first:pt-0">
                    <dt className="text-ctp-subtext1">Published</dt>
                    <dd className="text-ctp-text text-right">
                        <time dateTime={article.date}>
                            {formatDate(article.date)}
                        </time>
                    </dd>
                </div>
                <div className="flex justify-between gap-4 py-3">
                    <dt className="text-ctp-subtext1">Reading time</dt>
                    <dd className="text-ctp-text text-right">{readingTime}</dd>
                </div>
                <div className="flex justify-between gap-4 pt-3">
                    <dt className="text-ctp-subtext1">Author</dt>
                    <dd className="text-ctp-text text-right">
                        {article.author}
                    </dd>
                </div>
            </dl>
        </SurfaceCard>
    )
}

function ArticleNavigation({
    olderArticle,
    newerArticle,
}: {
    olderArticle: ArticleWithSlug | undefined
    newerArticle: ArticleWithSlug | undefined
}): React.ReactElement {
    if (!olderArticle && !newerArticle) {
        return (
            <SurfaceCard className="mt-16 p-6">
                <p className="text-ctp-subtext1 text-sm">
                    This is the only published article right now.
                </p>
                <Link
                    href="/articles"
                    className="theme-link theme-focus mt-3 inline-flex text-sm"
                >
                    Back to the blog index
                </Link>
            </SurfaceCard>
        )
    }

    return (
        <nav
            aria-label="Article navigation"
            className="border-ctp-surface0/70 mt-16 grid gap-4 border-t pt-8 sm:grid-cols-2"
        >
            <ArticleNavigationLink
                article={newerArticle}
                label="Newer article"
            />
            <ArticleNavigationLink
                article={olderArticle}
                label="Older article"
                align="right"
            />
        </nav>
    )
}

function ArticleNavigationLink({
    article,
    label,
    align = 'left',
}: {
    article: ArticleWithSlug | undefined
    label: string
    align?: 'left' | 'right'
}): React.ReactElement {
    if (!article) {
        return <div />
    }

    return (
        <SurfaceCard className="p-5">
            <p className="text-ctp-subtext1 text-xs font-medium">{label}</p>
            <Link
                href={article.path as LinkHref}
                className={`theme-focus text-ctp-text hover:text-ctp-blue dark:hover:text-ctp-pink mt-2 block rounded-md text-sm font-semibold transition ${align === 'right' ? 'sm:text-right' : ''}`}
            >
                {article.title}
            </Link>
        </SurfaceCard>
    )
}

function slugFromArticlePath(path: string): string {
    return path.replace(/^\/articles\//, '').replace(/\/$/, '')
}

export async function ArticleLayout({
    article,
    children,
}: {
    article: ArticleMetadata
    children: React.ReactNode
}): Promise<React.ReactElement> {
    const [{ headings, readingTime }, articles] = await Promise.all([
        getArticleContentStatsBySlug(slugFromArticlePath(article.path)),
        getAllArticles(),
    ])
    const currentArticleIndex = articles.findIndex(
        (candidate) => candidate.path === article.path,
    )
    const newerArticle =
        currentArticleIndex > 0 ? articles[currentArticleIndex - 1] : undefined
    const olderArticle =
        currentArticleIndex >= 0 && currentArticleIndex < articles.length - 1 ?
            articles[currentArticleIndex + 1]
        :   undefined

    return (
        <Container className="mt-12 lg:mt-20">
            <JsonLd
                id={`article-schema-${article.date}`}
                data={createArticleSchema({
                    title: article.title,
                    description: article.description,
                    path: article.path,
                    datePublished: article.date,
                    author: article.author,
                    ...(article.tags ? { tags: article.tags } : {}),
                })}
            />
            <div className="mx-auto max-w-7xl">
                <Link
                    href="/articles"
                    className="theme-focus text-ctp-subtext1 hover:text-ctp-blue dark:hover:text-ctp-pink inline-flex items-center gap-2 rounded-md text-sm font-medium transition"
                >
                    <ArrowLeftIcon className="h-4 w-4 stroke-current" />
                    Blog
                </Link>

                <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_minmax(auto,16rem)] lg:items-start lg:gap-x-12">
                    <article className="min-w-0">
                        <header>
                            <ArticleMeta
                                article={article}
                                readingTime={readingTime}
                            />
                            <h1 className="text-ctp-text mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
                                {article.title}
                            </h1>
                            <p className="text-ctp-subtext1 mt-5 text-lg leading-relaxed sm:text-xl">
                                {article.description}
                            </p>
                            <ArticleTags tags={article.tags} />
                            <TableOfContents
                                headings={headings}
                                className="mt-10 lg:hidden"
                                collapsible
                            />
                        </header>

                        <Prose className="mt-12">{children}</Prose>

                        <div className="mt-16 pt-16">
                            <ArticleNavigation
                                newerArticle={newerArticle}
                                olderArticle={olderArticle}
                            />
                            <div className="mt-12">
                                <Comments />
                            </div>
                        </div>
                    </article>

                    <aside className="hidden lg:sticky lg:top-24 lg:block">
                        <div className="space-y-8">
                            <ArticleFacts
                                article={article}
                                readingTime={readingTime}
                            />
                            <TableOfContents headings={headings} />
                        </div>
                    </aside>
                </div>
            </div>
        </Container>
    )
}
