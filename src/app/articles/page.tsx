import { type Metadata } from 'next'

import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import { formatDate } from '@/lib/formatDate'
import { getAllArticles } from '@/lib/articles'

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Writing about software engineering, product delivery, and lessons learned from agency, freelance, and startup work.',
}

export default async function Articles() {
  const articles = await getAllArticles()

  return (
    <SimpleLayout
      title="Writing about engineering and product work."
      intro="Thoughts from shipping software across agencies, consulting, and startup teams."
    >
      <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
        <div className="flex max-w-3xl flex-col space-y-16">
          {articles.map((article) => (
            <article
              key={article.slug}
              className="md:grid md:grid-cols-4 md:items-baseline"
            >
              <Card className="md:col-span-3">
                <Card.Title href={`/articles/${article.slug}`}>
                  {article.title}
                </Card.Title>
                <Card.Eyebrow
                  as="time"
                  dateTime={article.date}
                  decorate
                  className="md:hidden"
                >
                  {formatDate(article.date)}
                </Card.Eyebrow>
                <Card.Description>{article.description}</Card.Description>
                <Card.Cta>Read article</Card.Cta>
              </Card>
              <Card.Eyebrow
                as="time"
                dateTime={article.date}
                className="mt-1 hidden md:block"
              >
                {formatDate(article.date)}
              </Card.Eyebrow>
            </article>
          ))}
        </div>
      </div>
    </SimpleLayout>
  )
}
