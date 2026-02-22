import { type Metadata } from 'next'

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
    "I'm William Blackie, a Full-stack Engineer building product and platform software in London and Bristol, UK.",
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    siteName: 'William Blackie',
    title: 'William Blackie - Full-stack Engineer',
    description:
      'Full-stack engineer building product and platform software in London and Bristol, UK.',
    url: 'https://williamblackie.com',
  },
  twitter: {
    card: 'summary',
    title: 'William Blackie - Full-stack Engineer',
    description:
      'Full-stack engineer building product and platform software in London and Bristol, UK.',
  },
  icons: {
    icon: [{ url: '/favicon.ico' }, { url: '/icon.jpg' }],
    apple: '/apple-icon.jpg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
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
