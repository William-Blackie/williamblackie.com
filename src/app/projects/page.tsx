import { type Metadata } from 'next'
import Image from 'next/image'
import { type ImageProps } from 'next/image'

import { Card } from '@/components/Card'
import { JsonLd } from '@/components/JsonLd'
import { SimpleLayout } from '@/components/SimpleLayout'
import { createPageMetadata, createPageSchema } from '@/lib/metadata'
import logoValeurSport from '@/images/logos/valeursport.svg'
import logoGoogle from '@/images/logos/google.svg'
import logoRff from '@/images/logos/rff.svg'
import logoDocSoc from '@/images/logos/docsoc.png'
import logoTna from '@/images/logos/tna.png'
import logoSamaritans from '@/images/logos/samaritans.png'
import logoMabyDuck from '@/images/logos/mabyduck.png'
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

function LinkIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M15.712 11.823a.75.75 0 1 0 1.06 1.06l-1.06-1.06Zm-4.95 1.768a.75.75 0 0 0 1.06-1.06l-1.06 1.06Zm-2.475-1.414a.75.75 0 1 0-1.06-1.06l1.06 1.06Zm4.95-1.768a.75.75 0 1 0-1.06 1.06l1.06-1.06Zm3.359.53-.884.884 1.06 1.06.885-.883-1.061-1.06Zm-4.95-2.12 1.414-1.415L12 6.344l-1.415 1.413 1.061 1.061Zm0 3.535a2.5 2.5 0 0 1 0-3.536l-1.06-1.06a4 4 0 0 0 0 5.656l1.06-1.06Zm4.95-4.95a2.5 2.5 0 0 1 0 3.535L17.656 12a4 4 0 0 0 0-5.657l-1.06 1.06Zm1.06-1.06a4 4 0 0 0-5.656 0l1.06 1.06a2.5 2.5 0 0 1 3.536 0l1.06-1.06Zm-7.07 7.07.176.177 1.06-1.06-.176-.177-1.06 1.06Zm-3.183-.353.884-.884-1.06-1.06-.884.883 1.06 1.06Zm4.95 2.121-1.414 1.414 1.06 1.06 1.415-1.413-1.06-1.061Zm0-3.536a2.5 2.5 0 0 1 0 3.536l1.06 1.06a4 4 0 0 0 0-5.656l-1.06 1.06Zm-4.95 4.95a2.5 2.5 0 0 1 0-3.535L6.344 12a4 4 0 0 0 0 5.656l1.06-1.06Zm-1.06 1.06a4 4 0 0 0 5.657 0l-1.061-1.06a2.5 2.5 0 0 1-3.535 0l-1.061 1.06Zm7.07-7.07-.176-.177-1.06 1.06.176.178 1.06-1.061Z"
        fill="currentColor"
      />
    </svg>
  )
}

export const metadata: Metadata = createPageMetadata({
  title: 'Projects',
  description: 'Selected delivery work and open-source contributions.',
  path: '/projects',
})

function ProjectGrid({ projects }: { projects: Array<Project> }) {
  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
    >
      {projects.map((project) => (
        <Card as="li" key={project.name}>
          <div className="bg-ctp-mantle shadow-ctp-crust/10 ring-ctp-surface0/80 relative z-10 flex h-12 w-12 items-center justify-center rounded-full shadow-md ring-1">
            {project.logo ? (
              <div className="mocha:bg-ctp-text/90 mocha:ring-ctp-text/15 mocha:ring-1 flex h-10 w-10 items-center justify-center rounded-full p-2">
                <Image
                  src={project.logo}
                  alt=""
                  className="h-full w-full object-contain"
                  unoptimized
                />
              </div>
            ) : project.icon ? (
              <project.icon className="fill-ctp-subtext1 h-10 w-10" />
            ) : null}
          </div>
          <h2 className="text-ctp-text mt-6 text-base font-semibold">
            <Card.Link href={project.href}>{project.name}</Card.Link>
          </h2>
          <Card.Description>{project.description}</Card.Description>
          <p className="text-ctp-subtext1 group-hover:text-ctp-blue mocha:group-hover:text-ctp-pink relative z-10 mt-6 flex text-sm font-medium transition">
            <LinkIcon className="h-6 w-6 flex-none" />
            <span className="ml-2">{project.label}</span>
          </p>
        </Card>
      ))}
    </ul>
  )
}

export default function Projects() {
  const clientProjectLogos: Record<string, ImageProps['src']> = {
    mabyduck: logoMabyDuck,
    google: logoGoogle,
    valeursport: logoValeurSport,
    docsociety: logoDocSoc,
    rff: logoRff,
    tna: logoTna,
    samaritans: logoSamaritans,
  }

  const clientProjectItems: Array<Project> = clientProjects.map((project) => ({
    ...project,
    logo: clientProjectLogos[project.key],
  }))

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
        intro="A mix of client delivery and open-source work from my public contribution history."
      >
        <div className="space-y-24">
          <section>
            <h2 className="text-ctp-text text-xl font-semibold tracking-tight">
              Client and Product Work
            </h2>
            <p className="text-ctp-subtext1 mt-3 max-w-2xl text-sm">
              Work across startup, agency, and contract engagements.
            </p>
            <div className="mt-10">
              <ProjectGrid projects={clientProjectItems} />
            </div>
          </section>
          <section>
            <h2 className="text-ctp-text text-xl font-semibold tracking-tight">
              Open-Source Contributions
            </h2>
            <p className="text-ctp-subtext1 mt-3 max-w-2xl text-sm">
              Repositories from my public GitHub history, including projects I
              own and projects I contribute to.
            </p>
            <div className="mt-10">
              <ProjectGrid projects={openSourceProjectItems} />
            </div>
          </section>
        </div>
      </SimpleLayout>
    </>
  )
}
