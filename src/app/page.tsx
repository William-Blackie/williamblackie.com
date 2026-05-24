import { type Metadata } from 'next'
import { JsonLd } from '@/components/JsonLd'
import { createPageMetadata, createPageSchema } from '@/lib/metadata'
import { personSchemaId } from '@/lib/site'
import { HomeContent } from '@/components/HomeContent'

export default function Home(): React.ReactElement {
    return (
        <>
            <JsonLd
                id="home-page-schema"
                data={createPageSchema({
                    title: 'Home',
                    description:
                        'Introduction, current role, and delivery focus.',
                    path: '/',
                    type: 'ProfilePage',
                    mainEntity: {
                        '@id': personSchemaId,
                    },
                })}
            />
            <HomeContent />
        </>
    )
}

export const metadata: Metadata = createPageMetadata({
    title: 'Home',
    description: 'Introduction, current role, and delivery focus.',
    path: '/',
})
