import type { Metadata } from 'next'

import {
  absoluteUrl,
  personSchemaId,
  siteDescription,
  siteName,
  siteTitle,
  shortSiteDescription,
  websiteSchemaId,
} from '@/lib/site'

interface PageMetadataInput {
  title: string
  description: string
  path: string
  noIndex?: boolean
}

interface PageSchemaInput {
  title: string
  description: string
  path: string
  type?: string
  mainEntity?: Record<string, unknown>
}

interface ArticleSchemaInput {
  title: string
  description: string
  path: string
  datePublished: string
  author?: string
}

export function createPageMetadata({
  title,
  description,
  path,
  noIndex = false,
}: PageMetadataInput): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: absoluteUrl(path),
    },
    openGraph: {
      type: 'website',
      locale: 'en_GB',
      siteName,
      title: `${title} - ${siteName}`,
      description,
      url: absoluteUrl(path),
    },
    twitter: {
      card: 'summary',
      title: `${title} - ${siteName}`,
      description,
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : undefined,
  }
}

export function createArticleMetadata({
  title,
  description,
  path,
  datePublished,
}: ArticleSchemaInput): Metadata {
  return {
    ...createPageMetadata({
      title,
      description,
      path,
    }),
    openGraph: {
      type: 'article',
      locale: 'en_GB',
      siteName,
      title,
      description,
      url: absoluteUrl(path),
      publishedTime: datePublished,
      authors: [siteName],
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
    authors: [{ name: siteName, url: absoluteUrl('/') }],
  }
}

export function createPageSchema({
  title,
  description,
  path,
  type = 'WebPage',
  mainEntity,
}: PageSchemaInput) {
  return {
    '@context': 'https://schema.org',
    '@type': type,
    name: title,
    description,
    url: absoluteUrl(path),
    inLanguage: 'en-GB',
    isPartOf: {
      '@id': websiteSchemaId,
    },
    about: {
      '@id': personSchemaId,
    },
    ...(mainEntity ? { mainEntity } : {}),
  }
}

export function createArticleSchema({
  title,
  description,
  path,
  datePublished,
  author = siteName,
}: ArticleSchemaInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    datePublished,
    author: {
      '@type': 'Person',
      '@id': personSchemaId,
      name: author,
      url: absoluteUrl('/'),
    },
    publisher: {
      '@id': personSchemaId,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': absoluteUrl(path),
      url: absoluteUrl(path),
    },
    isPartOf: {
      '@id': websiteSchemaId,
    },
    inLanguage: 'en-GB',
  }
}

export const rootMetadata: Metadata = {
  metadataBase: new URL(absoluteUrl('/')),
  title: {
    template: `%s - ${siteName}`,
    default: siteTitle,
  },
  description: siteDescription,
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    siteName,
    title: siteTitle,
    description: shortSiteDescription,
    url: absoluteUrl('/'),
  },
  twitter: {
    card: 'summary',
    title: siteTitle,
    description: shortSiteDescription,
  },
  icons: {
    icon: [{ url: '/favicon.ico' }, { url: '/icon.jpg' }],
    apple: '/apple-icon.jpg',
  },
  alternates: {
    canonical: absoluteUrl('/'),
  },
}
