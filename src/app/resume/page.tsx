import { type Metadata } from 'next'

import { JsonLd } from '@/components/JsonLd'
import { Pill, SectionHeading, SurfaceCard } from '@/components/PagePrimitives'
import { SimpleLayout } from '@/components/SimpleLayout'
import { createPageMetadata, createPageSchema } from '@/lib/metadata'
import {
    highlightedProjects,
    resumeAwards,
    resumeSkills,
    volunteering,
    workExperience,
} from '@/lib/profile-content'
import { personSchemaId } from '@/lib/site'

export const metadata: Metadata = createPageMetadata({
    title: 'Resume',
    description: 'Resume and delivery history for William Blackie.',
    path: '/resume',
    noIndex: true,
})

export const dynamic = 'force-static'
export const revalidate = 0

function BulletList({ items }: { items: Array<string> }): React.ReactElement {
    return (
        <ul className="text-ctp-subtext1 mt-4 list-disc space-y-2 pl-5 text-sm">
            {items.map((item) => (
                <li key={item}>{item}</li>
            ))}
        </ul>
    )
}

function ResumeSection({
    title,
    children,
}: {
    title: string
    children: React.ReactNode
}): React.ReactElement {
    return (
        <section>
            <SectionHeading title={title} />
            <div className="mt-6">{children}</div>
        </section>
    )
}

function ResumeItem({
    title,
    subtitle,
    meta,
    children,
}: {
    title: string
    subtitle?: string
    meta?: string
    children?: React.ReactNode
}): React.ReactElement {
    return (
        <SurfaceCard className="p-6">
            <div className="gap-4 sm:flex sm:items-baseline sm:justify-between">
                <div>
                    <h3 className="text-ctp-text text-base font-semibold">
                        {title}
                    </h3>
                    {subtitle && (
                        <p className="text-ctp-subtext1 mt-1 text-sm">
                            {subtitle}
                        </p>
                    )}
                </div>
                {meta && (
                    <p className="text-ctp-subtext1 mt-2 text-sm sm:mt-0 sm:text-right">
                        {meta}
                    </p>
                )}
            </div>
            {children}
        </SurfaceCard>
    )
}

export default function Resume(): React.ReactElement {
    return (
        <>
            <JsonLd
                id="resume-page-schema"
                data={createPageSchema({
                    title: 'Resume',
                    description: metadata.description as string,
                    path: '/resume',
                    type: 'ProfilePage',
                    mainEntity: {
                        '@id': personSchemaId,
                    },
                })}
            />
            <SimpleLayout
                title="Resume and delivery history."
                intro="Full-stack engineer working across agency, contract, and product teams. Based in Bristol and London, UK."
            >
                <div className="max-w-4xl space-y-16">
                    <SurfaceCard className="p-6">
                        <p className="text-ctp-subtext1 text-base">
                            I design and deliver reliable systems, improve
                            delivery standards, and help teams keep shipping
                            confidently. Past work includes delivery for Google,
                            public-sector organisations, and major UK charities.
                        </p>
                        <p className="text-ctp-subtext1 mt-4 text-sm">
                            London and Bristol, UK (remote-friendly) |
                            will@developerfy.com
                        </p>
                    </SurfaceCard>

                    <ResumeSection title="Skills and Technologies">
                        <ul className="flex flex-wrap gap-2">
                            {resumeSkills.map((skill) => (
                                <li key={skill}>
                                    <Pill>{skill}</Pill>
                                </li>
                            ))}
                        </ul>
                    </ResumeSection>

                    <ResumeSection title="Highlighted Projects">
                        <div className="space-y-4">
                            {highlightedProjects.map((project) => (
                                <ResumeItem
                                    key={project.name}
                                    title={project.name}
                                    subtitle={project.role}
                                >
                                    <BulletList items={project.bullets} />
                                </ResumeItem>
                            ))}
                        </div>
                    </ResumeSection>

                    <ResumeSection title="Experience">
                        <div className="space-y-4">
                            {workExperience.map((role) => (
                                <ResumeItem
                                    key={role.key}
                                    title={role.company}
                                    subtitle={`${role.title}${role.location ? `, ${role.location}` : ''}`}
                                    meta={`${role.startLabel} - ${role.endLabel}`}
                                >
                                    {role.bullets && (
                                        <BulletList items={role.bullets} />
                                    )}
                                </ResumeItem>
                            ))}
                        </div>
                    </ResumeSection>

                    <ResumeSection title="Education">
                        <ResumeItem
                            title="BSc (Hons) Computer Science"
                            subtitle="University of the West of England, Bristol"
                            meta="September 2016 - May 2019"
                        >
                            <p className="text-ctp-subtext1 mt-4 text-sm">
                                First-Class Honours.
                            </p>
                        </ResumeItem>
                    </ResumeSection>

                    <ResumeSection title="Awards">
                        <SurfaceCard className="p-6">
                            <BulletList items={resumeAwards} />
                        </SurfaceCard>
                    </ResumeSection>

                    <ResumeSection title="Volunteering">
                        <ResumeItem
                            title={volunteering.role}
                            meta={volunteering.date}
                        >
                            <BulletList items={volunteering.bullets} />
                        </ResumeItem>
                    </ResumeSection>
                </div>
            </SimpleLayout>
        </>
    )
}
