import { type Metadata } from 'next'
import Link from 'next/link'
import clsx from 'clsx'

import { Button } from '@/components/Button'
import { Card } from '@/components/Card'
import { JsonLd } from '@/components/JsonLd'
import { Pill, SectionHeading, SurfaceCard } from '@/components/PagePrimitives'
import { SimpleLayout } from '@/components/SimpleLayout'
import { CalendarIcon, ClockIcon, RssIcon } from '@/components/GeneralIcons'
import { formatDate } from '@/lib/formatDate'
import { getAllArticles, type ArticleWithSlug } from '@/lib/articles'
import { createPageMetadata, createPageSchema } from '@/lib/metadata'
import { absoluteUrl } from '@/lib/site'

type LinkHref = React.ComponentPropsWithoutRef<typeof Link>['href']

const pageDescription =
    'Writing by William Blackie on software engineering, delivery, Python, Django, TypeScript, and tooling from production work.'
const feedHref = '/feed.xml' as LinkHref

interface TopicCount {
    name: string
    count: number
}

export const metadata: Metadata = createPageMetadata({
    title: 'Blog',
    description: pageDescription,
    path: '/articles',
})

function getTopicCounts(articles: Array<ArticleWithSlug>): Array<TopicCount> {
    const topicCounts = new Map<string, number>()

    for (const article of articles) {
        for (const tag of article.tags ?? ['Software engineering']) {
            topicCounts.set(tag, (topicCounts.get(tag) ?? 0) + 1)
        }
    }

    return [...topicCounts.entries()]
        .map(([name, count]) => ({ name, count }))
        .sort((a, z) => z.count - a.count || a.name.localeCompare(z.name))
}

function ArticleMetadata({
    article,
}: {
    article: ArticleWithSlug
}): React.ReactElement {
    return (
        <div className="text-ctp-subtext1 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
            <span className="inline-flex items-center gap-2">
                <CalendarIcon className="h-4 w-4" />
                <time dateTime={article.date}>{formatDate(article.date)}</time>
            </span>
            <span className="inline-flex items-center gap-2">
                <ClockIcon className="h-4 w-4" />
                {article.readingTime}
            </span>
        </div>
    )
}

function TagList({
    tags,
}: {
    tags?: Array<string>
}): React.ReactElement | null {
    if (!tags?.length) {
        return null
    }

    return (
        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Article topics">
            {tags.map((tag) => (
                <li key={tag}>
                    <Pill>{tag}</Pill>
                </li>
            ))}
        </ul>
    )
}

function ArticlePreview({
    article,
    featured = false,
}: {
    article: ArticleWithSlug
    featured?: boolean
}): React.ReactElement {
    return (
        <Card
            as="article"
            href={article.path}
            variant={featured ? 'default' : 'ghost'}
            className={clsx(
                featured ? 'p-6 sm:p-8' : (
                    'border-ctp-surface0/70 border-t py-8'
                ),
            )}
        >
            <header>
                <ArticleMetadata article={article} />
                <Card.Title
                    as="h3"
                    className={
                        featured ? 'mt-4 text-2xl sm:text-3xl' : 'mt-3 text-xl'
                    }
                >
                    {article.title}
                </Card.Title>
            </header>
            <Card.Description className="mt-3">
                {article.description}
            </Card.Description>
            <TagList tags={article.tags ?? []} />
            <Card.Cta className="mt-4">
                {featured ? 'Read latest article' : 'Read article'}
            </Card.Cta>
        </Card>
    )
}

function ArticleArchive({
    articles,
}: {
    articles: Array<ArticleWithSlug>
}): React.ReactElement | null {
    if (!articles.length) {
        return null
    }

    return (
        <section aria-labelledby="article-archive">
            <h2
                id="article-archive"
                className="text-ctp-text text-lg font-semibold"
            >
                All articles
            </h2>
            <ol className="mt-6" aria-label="Older articles">
                {articles.map((article) => (
                    <li key={article.slug}>
                        <ArticlePreview article={article} />
                    </li>
                ))}
            </ol>
        </section>
    )
}

function BlogSidebar({
    articles,
    topics,
}: {
    articles: Array<ArticleWithSlug>
    topics: Array<TopicCount>
}): React.ReactElement {
    const latestArticle = articles.at(0)

    return (
        <aside className="lg:border-ctp-surface0/70 lg:border-l lg:pl-8">
            <div className="space-y-10 lg:sticky lg:top-24">
                <section aria-labelledby="blog-index">
                    <h2
                        id="blog-index"
                        className="text-ctp-text text-sm font-semibold"
                    >
                        Blog index
                    </h2>
                    <dl className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-1">
                        <SurfaceCard className="p-4">
                            <dt className="text-ctp-subtext1 text-xs">
                                Published
                            </dt>
                            <dd className="text-ctp-text mt-1 text-2xl font-semibold">
                                {articles.length}
                            </dd>
                        </SurfaceCard>
                        <SurfaceCard className="p-4">
                            <dt className="text-ctp-subtext1 text-xs">
                                Focus areas
                            </dt>
                            <dd className="text-ctp-text mt-1 text-2xl font-semibold">
                                {topics.length}
                            </dd>
                        </SurfaceCard>
                    </dl>
                </section>

                <section aria-labelledby="focus-areas">
                    <h2
                        id="focus-areas"
                        className="text-ctp-text text-sm font-semibold"
                    >
                        Focus areas
                    </h2>
                    {topics.length ?
                        <ul className="divide-ctp-surface0/70 mt-4 divide-y">
                            {topics.map((topic) => (
                                <li
                                    key={topic.name}
                                    className="flex items-center justify-between gap-4 py-3 text-sm"
                                >
                                    <span className="text-ctp-subtext1">
                                        {topic.name}
                                    </span>
                                    <span className="text-ctp-text font-medium">
                                        {topic.count}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    :   <p className="text-ctp-subtext1 mt-4 text-sm">
                            Python, TypeScript, tooling, and delivery notes will
                            appear here once articles are published.
                        </p>
                    }
                </section>

                <section
                    aria-labelledby="latest-published"
                    className="border-ctp-surface0/70 border-t pt-8"
                >
                    <h2
                        id="latest-published"
                        className="text-ctp-text text-sm font-semibold"
                    >
                        Latest published
                    </h2>
                    <p className="text-ctp-subtext1 mt-4 text-sm">
                        {latestArticle ?
                            formatDate(latestArticle.date)
                        :   'No published articles yet.'}
                    </p>
                    <Button
                        href={feedHref}
                        variant="secondary"
                        className="mt-5 w-full"
                    >
                        <RssIcon className="h-4 w-4" />
                        RSS feed
                    </Button>
                </section>
            </div>
        </aside>
    )
}

function EmptyState(): React.ReactElement {
    return (
        <SurfaceCard className="p-6 sm:p-8">
            <h2 className="text-ctp-text text-xl font-semibold tracking-tight">
                No articles published yet.
            </h2>
            <p className="text-ctp-subtext1 mt-3 max-w-2xl text-sm">
                Drafts are in progress. Published writing will appear here with
                dates, reading time, topic indexing, and an RSS feed.
            </p>
        </SurfaceCard>
    )
}

export default async function Articles(): Promise<React.ReactElement> {
    const articles = await getAllArticles()
    const latestArticle = articles.at(0)
    const archiveArticles = articles.slice(1)
    const topics = getTopicCounts(articles)
    const collectionSchema = createPageSchema({
        title: 'Blog',
        description: pageDescription,
        path: '/articles',
        type: 'CollectionPage',
        ...(articles.length ?
            {
                mainEntity: {
                    '@type': 'ItemList',
                    numberOfItems: articles.length,
                    itemListElement: articles.map((article, articleIndex) => ({
                        '@type': 'ListItem',
                        position: articleIndex + 1,
                        url: absoluteUrl(article.path),
                        name: article.title,
                        description: article.description,
                    })),
                },
            }
        :   {}),
    })

    return (
        <>
            <JsonLd id="articles-page-schema" data={collectionSchema} />
            <SimpleLayout
                title="Writing on delivery and the work."
                intro="Notes from production work: Python, Django, TypeScript, and the small habits that keep shipping steady."
            >
                <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_17rem] lg:items-start lg:gap-x-16">
                    <div className="min-w-0 space-y-12">
                        {latestArticle ?
                            <>
                                <section aria-labelledby="latest-article">
                                    <SectionHeading
                                        id="latest-article"
                                        eyebrow="Latest"
                                        title="Latest article"
                                        className="mb-6"
                                    />
                                    <ArticlePreview
                                        article={latestArticle}
                                        featured
                                    />
                                </section>
                                <ArticleArchive articles={archiveArticles} />
                            </>
                        :   <EmptyState />}
                    </div>
                    <BlogSidebar articles={articles} topics={topics} />
                </div>
            </SimpleLayout>
        </>
    )
}
