import { type Metadata } from 'next'
import Image from 'next/image'
import { type ImageProps } from 'next/image'

import { Card } from '@/components/Card'
import { JsonLd } from '@/components/JsonLd'
import { SectionHeading } from '@/components/PagePrimitives'
import { SimpleLayout } from '@/components/SimpleLayout'
import { createPageMetadata, createPageSchema } from '@/lib/metadata'
import logoValeurSport from '@/static/imgs/logos/valeursport.svg'
import logoGoogle from '@/static/imgs/logos/google.svg'
import logoRff from '@/static/imgs/logos/rff.svg'
import logoDocSoc from '@/static/imgs/logos/docsoc.png'
import logoTna from '@/static/imgs/logos/tna.png'
import logoSamaritans from '@/static/imgs/logos/samaritans.png'
import logoMabyDuck from '@/static/imgs/logos/mabyduck.png'
import { GitHubIcon } from '@/components/SocialIcons'
import {
    clientProjects,
    openSourceContributions,
    type ProjectItem,
} from '@/lib/profile-content'

interface Project extends ProjectItem {
    logo?: ImageProps['src']
    icon?: React.ComponentType<React.ComponentPropsWithoutRef<'svg'>>
}

export const metadata: Metadata = createPageMetadata({
    title: 'Projects',
    description: 'Selected delivery work and open-source contributions.',
    path: '/projects',
})

function ProjectGrid({
    projects,
}: {
    projects: Array<Project>
}): React.ReactElement {
    return (
        <ul
            role="list"
            className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12 lg:grid-cols-3"
        >
            {projects.map((project) => (
                <Card key={project.name} href={project.href}>
                    <div className="bg-ctp-mantle shadow-ctp-crust/10 ring-ctp-surface0/80 relative z-10 flex h-12 w-12 items-center justify-center rounded-full shadow-md ring-1">
                        {project.logo ?
                            <div className="flex h-10 w-10 items-center justify-center rounded-full p-2 dark:bg-ctp-text/90 dark:ring-ctp-text/15 dark:ring-1">
                                <Image
                                    src={project.logo}
                                    alt=""
                                    className="h-full w-full object-contain"
                                    unoptimized
                                />
                            </div>
                        : project.icon ?
                            <project.icon className="fill-ctp-subtext1 h-6 w-6" />
                        :   null}
                    </div>
                    <h2 className="text-ctp-text mt-6 text-base font-semibold">
                        {project.name}
                    </h2>
                    <Card.Description>{project.description}</Card.Description>
                    <Card.Cta>{project.label}</Card.Cta>
                </Card>
            ))}
        </ul>
    )
}

export default function Projects(): React.ReactElement {
    const clientProjectLogos: Record<string, ImageProps['src']> = {
        mabyduck: logoMabyDuck,
        google: logoGoogle,
        valeursport: logoValeurSport,
        docsociety: logoDocSoc,
        rff: logoRff,
        tna: logoTna,
        samaritans: logoSamaritans,
    }

    const clientProjectItems: Array<Project> = clientProjects.map((project) => {
        const logo = clientProjectLogos[project.key]

        if (!logo) {
            throw new Error(`Missing logo for client project: ${project.key}`)
        }

        return {
            ...project,
            logo,
        }
    })

    const openSourceProjectItems: Array<Project> = openSourceContributions.map(
        (project) => ({
            ...project,
            icon: GitHubIcon,
        }),
    )

    return (
        <>
            <JsonLd
                id="projects-page-schema"
                data={createPageSchema({
                    title: 'Projects',
                    description: metadata.description as string,
                    path: '/projects',
                    type: 'CollectionPage',
                })}
            />
            <SimpleLayout
                title="Delivery work and open-source projects."
                intro="Selected client delivery and public repositories from my contribution history."
            >
                <div className="space-y-16">
                    <section>
                        <SectionHeading
                            title="Client and Product Work"
                            description="Work across startup, agency, and contract engagements."
                        />
                        <div className="mt-8">
                            <ProjectGrid projects={clientProjectItems} />
                        </div>
                    </section>
                    <section>
                        <SectionHeading
                            title="Open-Source Contributions"
                            description="Repositories I maintain, plus upstream work in the Wagtail and Django ecosystems."
                        />
                        <div className="mt-8">
                            <ProjectGrid projects={openSourceProjectItems} />
                        </div>
                    </section>
                </div>
            </SimpleLayout>
        </>
    )
}
