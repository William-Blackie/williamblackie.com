import { type Metadata } from 'next'
import Image from 'next/image'

import { Container } from '@/components/Container'
import { MailIcon } from '@/components/GeneralIcons'
import { JsonLd } from '@/components/JsonLd'
import { SurfaceCard } from '@/components/PagePrimitives'
import { GitHubIcon, LinkedInIcon } from '@/components/SocialIcons'
import { createPageMetadata, createPageSchema } from '@/lib/metadata'
import { personSchemaId } from '@/lib/site'
import portraitImage from '@/static/imgs/photos/sam-wedding.jpg'
import { SocialLink } from '@/components/SocialLink'

export const metadata: Metadata = createPageMetadata({
    title: 'About',
    description:
        'William Blackie is a full-stack engineer based in Bristol and London, UK. He builds product and platform software with Python (Django, Wagtail) and TypeScript (React, Next.js), and works as Staff Engineer at Mabyduck.',
    path: '/about',
})

export default function About(): React.ReactElement {
    return (
        <>
            <JsonLd
                id="about-page-schema"
                data={createPageSchema({
                    title: 'About',
                    description: metadata.description as string,
                    path: '/about',
                    type: 'AboutPage',
                    mainEntity: {
                        '@id': personSchemaId,
                    },
                })}
            />
            <Container className="mt-12 sm:mt-20">
                <div className="grid grid-cols-1 gap-y-12 lg:grid-cols-[1fr_18rem] lg:items-start lg:gap-x-12 lg:gap-y-0">
                    <div className="lg:order-1">
                        <h1 className="text-ctp-text text-4xl font-bold tracking-tight sm:text-5xl">
                            Hi, I&apos;m William.
                        </h1>
                        <p className="text-ctp-subtext1 mt-6 text-base">
                            I&apos;m a full-stack engineer based in Bristol and
                            London. I build product and platform software with
                            Python (Django, Wagtail) and TypeScript (React,
                            Next.js).
                        </p>
                        <div className="text-ctp-subtext1 mt-8 space-y-7 text-base">
                            <p>
                                I studied Computer Science at the University of
                                the West of England, then joined Torchbox in
                                2019 and spent four years delivering Django and
                                Wagtail work for charities and public-sector
                                teams, including the NHS and Samaritans.
                            </p>
                            <p>
                                Agency work taught me to ship under tight
                                timelines with real users, and to keep
                                communication clear when priorities shift.
                            </p>
                            <p>
                                In 2024 I started Developerfy and took on
                                contract work, including a stint with Google
                                DeepMind, plus delivery for Doc Society and
                                ValeurSport. Most of it was about unblocking
                                teams and stabilising systems.
                            </p>
                            <p>
                                I joined Mabyduck as Staff Engineer in April
                                2025, moving from project cycles into ongoing
                                product work. I still run Developerfy for
                                selected side projects.
                            </p>
                            <p>
                                Outside work I climb, ride motorcycles, and
                                spend too much money on food and coffee.
                            </p>
                        </div>
                    </div>
                    <aside className="space-y-6 lg:sticky lg:top-24 lg:order-2">
                        <div className="max-w-xs lg:max-w-none">
                            <Image
                                src={portraitImage}
                                alt="William Blackie"
                                sizes="(min-width: 1024px) 18rem, 20rem"
                                className="bg-ctp-surface0 aspect-square rotate-3 rounded-2xl object-cover shadow-lg"
                                priority
                            />
                        </div>
                        <SurfaceCard className="p-6">
                            <h2 className="text-ctp-text text-sm font-semibold">
                                Elsewhere
                            </h2>
                            <ul role="list" className="mt-4 space-y-1">
                                <SocialLink
                                    href="https://github.com/William-Blackie"
                                    icon={GitHubIcon}
                                    className="mt-3"
                                >
                                    Follow on GitHub
                                </SocialLink>
                                <SocialLink
                                    href="https://www.linkedin.com/in/william-blackie/"
                                    icon={LinkedInIcon}
                                    className="mt-3"
                                >
                                    Follow on LinkedIn
                                </SocialLink>
                                <SocialLink
                                    href="mailto:will@developerfy.com"
                                    icon={MailIcon}
                                    className="mt-3"
                                >
                                    will@developerfy.com
                                </SocialLink>
                            </ul>
                        </SurfaceCard>
                    </aside>
                </div>
            </Container>
        </>
    )
}
