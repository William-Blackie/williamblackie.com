import { type Metadata } from 'next'
import Image from 'next/image'
import { type ImageProps } from 'next/image'

import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import logoValeurSport from '@/images/logos/valeursport.svg'
import logoGoogle from '@/images/logos/google.svg'
import logoRff from '@/images/logos/rff.svg'
import logoDocSoc from '@/images/logos/docsoc.png'
import logoTna from '@/images/logos/tna.png'
import logoSamaritans from '@/images/logos/samaritans.png'
import logoMabyDuck from '@/images/logos/mabyduck.png'
import { GitHubIcon } from '@/components/SocialIcons'

interface Project {
  name: string
  description: string
  link: {
    href: string
    label: string
  }
  logo?: ImageProps['src']
  icon?: React.ComponentType<React.ComponentPropsWithoutRef<'svg'>>
}

const clientProjects: Array<Project> = [
  {
    name: 'MabyDuck',
    description:
      'Staff Engineer focused on product and platform delivery, helping the team ship quickly without sacrificing reliability.',
    link: {
      href: 'https://mabyduck.com',
      label: 'mabyduck.com',
    },
    logo: logoMabyDuck,
  },
  {
    name: "Google - DeepMind",
    description:
      'Delivered backend and platform work on Django/Wagtail systems, including deployment and delivery improvements.',
    link: {
      href: 'https://deepmind.google/',
      label: 'deepmind.google',
    },
    logo: logoGoogle,
  },
  {
    name: 'ValeurSport',
    description:
      'Built a Django and Next.js platform supporting fair pay advocacy in women&apos;s sport.',
    link: {
      href: 'http://www.app.valeursport.com',
      label: 'app.valeursport.com',
    },
    logo: logoValeurSport,
  },
  {
    name: 'The Doc Society',
    description:
      'Built and delivered Django/Wagtail CMS work to improve publishing workflows for editorial teams.',
    link: {
      href: 'https://docsociety.org/',
      label: 'docsociety.org',
    },
    logo: logoDocSoc,
  },
  {
    name: 'Resource for the Future',
    description:
      'Led delivery work on Django/Wagtail architecture and implementation for a large policy/research platform.',
    link: {
      href: 'https://rff.org/',
      label: 'rff.org',
    },
    logo: logoRff,
  },
  {
    name: 'The National Archives',
    description:
      'Contributed to nationalarchives.gov.uk delivery through the `ds-wagtail` platform with broad frontend/backend changes.',
    link: {
      href: 'https://github.com/nationalarchives/ds-wagtail',
      label: 'github.com/nationalarchives/ds-wagtail',
    },
    logo: logoTna,
  },
  {
    name: 'Torchbox - Samaritans UK',
    description:
      'Built a Django/Wagtail CMS platform to improve content management for Samaritans UK.',
    link: {
      href: 'https://www.samaritans.org/',
      label: 'www.samaritans.org',
    },
    logo: logoSamaritans,
  },
]

const openSourceContributions: Array<Project> = [
  {
    name: 'lazydjango',
    description:
      'A keyboard-first TUI for Django projects to inspect state, run workflows, and manage data/snapshots.',
    link: {
      href: 'https://github.com/William-Blackie/lazydjango',
      label: 'github.com/William-Blackie/lazydjango',
    },
    icon: GitHubIcon,
  },
  {
    name: 'chromeappcap',
    description:
      'CLI for polished app-window screenshots with native macOS capture and Playwright fallback for cross-platform use.',
    link: {
      href: 'https://github.com/William-Blackie/chromeappcap',
      label: 'github.com/William-Blackie/chromeappcap',
    },
    icon: GitHubIcon,
  },
  {
    name: 'django-storybook',
    description:
      'Published package for integrating Storybook-style component workflows into Django projects.',
    link: {
      href: 'https://github.com/William-Blackie/django_storybook',
      label: 'github.com/William-Blackie/django_storybook',
    },
    icon: GitHubIcon,
  },
  {
    name: 'wagtail/wagtail.org',
    description:
      'Contributed feature and frontend work via PRs to Wagtail&apos;s official website repository.',
    link: {
      href: 'https://github.com/wagtail/wagtail.org/pulls?q=is%3Apr+author%3AWilliam-Blackie',
      label: 'PRs by William-Blackie',
    },
    icon: GitHubIcon,
  },
  {
    name: 'nationalarchives/ds-wagtail',
    description:
      'High-volume contribution history across page templates, interaction/UI behavior, and content-model delivery.',
    link: {
      href: 'https://github.com/nationalarchives/ds-wagtail/pulls?q=is%3Apr+author%3AWilliam-Blackie',
      label: 'PRs by William-Blackie',
    },
    icon: GitHubIcon,
  },
  {
    name: 'wagtail/wagtail',
    description:
      'Core OSS contribution to Wagtail CMS, including a merged change to search-query normalisation behavior.',
    link: {
      href: 'https://github.com/wagtail/wagtail/pulls?q=is%3Apr+author%3AWilliam-Blackie',
      label: 'PRs by William-Blackie',
    },
    icon: GitHubIcon,
  },
  {
    name: 'jazzband/django-two-factor-auth',
    description:
      'Community contribution to authentication docs and setup guidance in a widely used Django security package.',
    link: {
      href: 'https://github.com/jazzband/django-two-factor-auth/pulls?q=is%3Apr+author%3AWilliam-Blackie',
      label: 'PRs by William-Blackie',
    },
    icon: GitHubIcon,
  },
]

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

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Client delivery highlights and selected open-source contributions from my public GitHub history.',
}

function ProjectGrid({ projects }: { projects: Array<Project> }) {
  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
    >
      {projects.map((project) => (
        <Card as="li" key={project.name}>
          <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
            {project.logo ? (
              <Image
                src={project.logo}
                alt=""
                className="h-8 w-8"
                unoptimized
              />
            ) : project.icon ? (
              <project.icon className="h-8 w-8 fill-zinc-600 dark:fill-zinc-300" />
            ) : null}
          </div>
          <h2 className="mt-6 text-base font-semibold text-zinc-800 dark:text-zinc-100">
            <Card.Link href={project.link.href}>{project.name}</Card.Link>
          </h2>
          <Card.Description>{project.description}</Card.Description>
          <p className="relative z-10 mt-6 flex text-sm font-medium text-zinc-400 transition group-hover:text-teal-500 dark:text-zinc-200">
            <LinkIcon className="h-6 w-6 flex-none" />
            <span className="ml-2">{project.link.label}</span>
          </p>
        </Card>
      ))}
    </ul>
  )
}

export default function Projects() {
  return (
    <SimpleLayout
      title="Client outcomes and open-source contributions."
      intro="A mix of product/platform work for high-profile teams and selected repositories I&apos;ve contributed to across GitHub."
    >
      <div className="space-y-24">
        <section>
          <h2 className="text-xl font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
            Client and Product Work
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-zinc-600 dark:text-zinc-400">
            Projects delivered across startup, agency, and contract
            engagements, including current work at MabyDuck.
          </p>
          <div className="mt-10">
            <ProjectGrid projects={clientProjects} />
          </div>
        </section>
        <section>
          <h2 className="text-xl font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
            Open-Source Contributions
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-zinc-600 dark:text-zinc-400">
            Selected repositories from my public GitHub history, including both
            projects I own and projects I contribute to.
          </p>
          <div className="mt-10">
            <ProjectGrid projects={openSourceContributions} />
          </div>
        </section>
      </div>
    </SimpleLayout>
  )
}
