import { type Metadata } from 'next'

import { Card } from '@/components/Card'
import { JsonLd } from '@/components/JsonLd'
import { SimpleLayout } from '@/components/SimpleLayout'
import { formatDate } from '@/lib/formatDate'
import { getAllArticles } from '@/lib/articles'
import { createPageMetadata, createPageSchema } from '@/lib/metadata'

export const metadata: Metadata = createPageMetadata({
  title: 'Articles',
  description:
    'Writing by William Blackie on software engineering, delivery, and tooling. Topics include Python, Django, TypeScript, AI in the workflow, dotfiles, and lessons from agency, contract, and product engineering.',
  path: '/articles',
})

export default async function Articles() {
  const articles = await getAllArticles()
  const hasArticles = articles.length > 0

  return (
    <>
      <JsonLd
        id="articles-page-schema"
        data={createPageSchema({
          title: 'Articles',
          description: metadata.description as string,
          path: '/articles',
          type: 'CollectionPage',
        })}
      />
      <SimpleLayout
        title="Notes on engineering and delivery."
        intro="Practical write-ups from agency, freelance, and product work."
      >
        <div className="md:border-ctp-surface0/70 md:border-l md:pl-6">
          {hasArticles ? (
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
          ) : (
            <p className="max-w-2xl text-base text-ctp-subtext1">
              There are no published articles right now.
            </p>
          )}
        </div>
      </SimpleLayout>
    </>
  )
}
