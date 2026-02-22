import { Container } from '@/components/Container'
import { Prose } from '@/components/Prose'
import { formatDate } from '@/lib/formatDate'

interface ArticleMetadata {
  title: string
  description: string
  author: string
  date: string
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
      <article className="mx-auto max-w-2xl">
        <header className="flex flex-col">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
            {article.title}
          </h1>
          <div className="order-first flex items-center gap-3 text-sm text-zinc-500 dark:text-zinc-400">
            <time dateTime={article.date}>{formatDate(article.date)}</time>
            <span aria-hidden="true">·</span>
            <span>{article.author}</span>
          </div>
        </header>
        <Prose className="mt-8">{children}</Prose>
      </article>
    </Container>
  )
}
