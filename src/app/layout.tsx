import { type Metadata } from 'next'
import Script from 'next/script'

import { Providers } from '@/app/providers'
import { Layout } from '@/components/Layout'

import '@/styles/tailwind.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://williamblackie.com'),
  title: {
    template: '%s - William Blackie',
    default: 'William Blackie - Full-stack Engineer',
  },
  description:
    'William Blackie is a full-stack software engineer based in Bristol and London, UK. He builds product and platform software with Python (Django, Wagtail, FastAPI) and TypeScript (React, Next.js). Currently Staff Engineer at Mabyduck. Previously at Torchbox and Google DeepMind.',
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    siteName: 'William Blackie',
    title: 'William Blackie - Full-stack Engineer',
    description:
      'Full-stack engineer building product and platform software with Python and TypeScript. Based in Bristol and London, UK. Staff Engineer at Mabyduck.',
    url: 'https://williamblackie.com',
  },
  twitter: {
    card: 'summary',
    title: 'William Blackie - Full-stack Engineer',
    description:
      'Full-stack engineer building product and platform software with Python and TypeScript. Based in Bristol and London, UK.',
  },
  icons: {
    icon: [{ url: '/favicon.ico' }, { url: '/icon.jpg' }],
    apple: '/apple-icon.jpg',
  },
  alternates: {
    canonical: 'https://williamblackie.com',
  },
}

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'William Blackie',
  url: 'https://williamblackie.com',
  jobTitle: 'Staff Engineer',
  worksFor: {
    '@type': 'Organization',
    name: 'Mabyduck',
    url: 'https://mabyduck.com',
  },
  alumniOf: [
    {
      '@type': 'Organization',
      name: 'Torchbox',
      url: 'https://torchbox.com',
    },
    {
      '@type': 'Organization',
      name: 'Google DeepMind',
      url: 'https://deepmind.google',
    },
    {
      '@type': 'CollegeOrUniversity',
      name: 'University of the West of England, Bristol',
    },
  ],
  knowsAbout: [
    'Python',
    'Django',
    'Wagtail',
    'FastAPI',
    'TypeScript',
    'React',
    'Next.js',
    'Software Engineering',
    'Full-stack Development',
    'Product Engineering',
    'Platform Engineering',
    'Web Accessibility',
    'Software Delivery',
  ],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Bristol',
    addressCountry: 'GB',
  },
  sameAs: [
    'https://github.com/William-Blackie',
    'https://www.linkedin.com/in/william-blackie/',
  ],
  email: 'will@developerfy.com',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <Script
          id="person-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body className="flex h-full bg-zinc-50 dark:bg-black">
        <Providers>
          <div className="flex w-full">
            <Layout>{children}</Layout>
          </div>
        </Providers>
      </body>
    </html>
  )
}
