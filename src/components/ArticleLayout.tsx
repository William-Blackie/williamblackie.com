import { Container } from '@/components/Container'
import { Comments } from '@/components/Comments'
import { JsonLd } from '@/components/JsonLd'
import { Prose } from '@/components/Prose'
import { formatDate } from '@/lib/formatDate'
import { createArticleSchema } from '@/lib/metadata'

interface ArticleMetadata {
  title: string
  description: string
  author: string
  date: string
  path: string
}

export function ArticleLayout({
  article,
  children,
}: {
  article: ArticleMetadata
  children: React.ReactNode
}) {
  return (
    <Container className="mt-16 lg:mt-32">
      <JsonLd
        id={`article-schema-${article.date}`}
        data={createArticleSchema({
          title: article.title,
          description: article.description,
          path: article.path,
          datePublished: article.date,
          author: article.author,
        })}
      />
      <article className="mx-auto max-w-2xl">
        <header className="flex flex-col">
          <h1 className="text-ctp-text text-4xl font-bold tracking-tight sm:text-5xl">
            {article.title}
          </h1>
          <div className="text-ctp-subtext1 order-first flex items-center gap-3 text-sm">
            <time dateTime={article.date}>{formatDate(article.date)}</time>
            <span aria-hidden="true">·</span>
            <span>{article.author}</span>
          </div>
        </header>
        <Prose className="mt-8">{children}</Prose>
        <Comments />
      </article>
    </Container>
  )
}
