'use client'

import Giscus from '@giscus/react'
import { useTheme } from 'next-themes'

type GiscusMapping =
  | 'pathname'
  | 'url'
  | 'title'
  | 'og:title'
  | 'specific'
  | 'number'

type GiscusInputPosition = 'top' | 'bottom'
type BooleanString = '0' | '1'

const repo = process.env.NEXT_PUBLIC_GISCUS_REPO
const repoId = process.env.NEXT_PUBLIC_GISCUS_REPO_ID
const category = process.env.NEXT_PUBLIC_GISCUS_CATEGORY
const categoryId = process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID
const mapping = (process.env.NEXT_PUBLIC_GISCUS_MAPPING ??
  'pathname') as GiscusMapping
const strict = (process.env.NEXT_PUBLIC_GISCUS_STRICT ?? '0') as BooleanString
const reactionsEnabled = (process.env.NEXT_PUBLIC_GISCUS_REACTIONS_ENABLED ??
  '1') as BooleanString
const emitMetadata = (process.env.NEXT_PUBLIC_GISCUS_EMIT_METADATA ??
  '0') as BooleanString
const inputPosition = (process.env.NEXT_PUBLIC_GISCUS_INPUT_POSITION ??
  'top') as GiscusInputPosition
const lang = process.env.NEXT_PUBLIC_GISCUS_LANG ?? 'en'

const isConfigured =
  typeof repo === 'string' &&
  typeof repoId === 'string' &&
  typeof category === 'string' &&
  typeof categoryId === 'string' &&
  repo.length > 0 &&
  repoId.length > 0 &&
  category.length > 0 &&
  categoryId.length > 0

export function Comments() {
  const { resolvedTheme } = useTheme()

  if (!isConfigured) {
    return null
  }

  const configuredRepo = repo as `${string}/${string}`
  const configuredRepoId = repoId as string
  const configuredCategory = category as string
  const configuredCategoryId = categoryId as string

  return (
    <section className="mt-16 border-t border-zinc-200 pt-10 dark:border-zinc-700/40">
      <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
        Comments
      </h2>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        Join the discussion via GitHub Discussions.
      </p>
      <div className="mt-6">
        <Giscus
          repo={configuredRepo}
          repoId={configuredRepoId}
          category={configuredCategory}
          categoryId={configuredCategoryId}
          mapping={mapping}
          strict={strict}
          reactionsEnabled={reactionsEnabled}
          emitMetadata={emitMetadata}
          inputPosition={inputPosition}
          lang={lang}
          loading="lazy"
          theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
        />
      </div>
    </section>
  )
}
