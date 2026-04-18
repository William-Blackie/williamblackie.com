import { Providers } from '@/app/providers'
import { JsonLd } from '@/components/JsonLd'
import { Layout } from '@/components/Layout'
import { rootMetadata } from '@/lib/metadata'
import { personSchema, websiteSchema } from '@/lib/site'

import '@/styles/tailwind.css'

export const metadata = rootMetadata

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <JsonLd id="website-schema" data={websiteSchema} />
        <JsonLd id="person-schema" data={personSchema} />
      </head>
      <body className="bg-ctp-base text-ctp-text flex h-full">
        <a
          href="#main-content"
          className="bg-ctp-base text-ctp-text ring-ctp-text focus:ring-ctp-blue focus:ring-offset-ctp-base mocha:focus:ring-ctp-pink pointer-events-none fixed top-3 left-3 z-[100] -translate-y-[calc(100%+1rem)] px-4 py-3 text-base font-semibold opacity-0 ring-2 outline-none focus:pointer-events-auto focus:translate-y-0 focus:opacity-100 focus:ring-4 focus:ring-offset-2"
        >
          Skip to content
        </a>
        <Providers>
          <div className="flex w-full">
            <Layout>{children}</Layout>
          </div>
        </Providers>
      </body>
    </html>
  )
}
