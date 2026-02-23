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
    name: 'Mabyduck',
    description:
      'Product and platform delivery focused on reliability, delivery quality, and steady shipping pace.',
    link: {
      href: 'https://mabyduck.com',
      label: 'mabyduck.com',
    },
    logo: logoMabyDuck,
  },
  {
    name: "Google - DeepMind",
    description:
      'Worked on Django/Wagtail delivery for deepmind.google, including CMS structure, frontend components, search, and releases.',
    link: {
      href: 'https://deepmind.google/',
      label: 'deepmind.google',
    },
    logo: logoGoogle,
  },
  {
    name: 'ValeurSport',
    description:
      "Built a Django and Next.js platform supporting fair-pay advocacy in women's sport, with practical editorial workflows.",
    link: {
      href: 'http://www.app.valeursport.com',
      label: 'app.valeursport.com',
    },
    logo: logoValeurSport,
  },
  {
    name: 'The Doc Society',
    description:
      'Delivered Django/Wagtail CMS work to make publishing workflows smoother for content teams.',
    link: {
      href: 'https://docsociety.org/',
      label: 'docsociety.org',
    },
    logo: logoDocSoc,
  },
  {
    name: 'Resource for the Future',
    description:
      'Led Django/Wagtail delivery for a policy and research platform with complex publishing requirements.',
    link: {
      href: 'https://rff.org/',
      label: 'rff.org',
    },
    logo: logoRff,
  },
  {
    name: 'The National Archives',
    description:
      'Contributed to ds-wagtail delivery for nationalarchives.gov.uk across frontend behaviour, CMS features, and content modelling.',
    link: {
      href: 'https://www.nationalarchives.gov.uk/',
      label: 'nationalarchives.gov.uk',
    },
    logo: logoTna,
  },
  {
    name: 'Torchbox - Samaritans UK',
    description:
      'Delivered long-running Django/Wagtail improvements across content operations, donation journeys, and platform maintenance.',
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
      'Keyboard-first TUI for Django projects focused on day-to-day workflows, data operations, and local tooling.',
    link: {
      href: 'https://github.com/William-Blackie/lazydjango',
      label: 'github.com/William-Blackie/lazydjango',
    },
    icon: GitHubIcon,
  },
  {
    name: 'chromeappcap',
    description:
      'CLI for clean app-window screenshots, using native macOS capture with Playwright fallback for cross-platform use.',
    link: {
      href: 'https://github.com/William-Blackie/chromeappcap',
      label: 'github.com/William-Blackie/chromeappcap',
    },
    icon: GitHubIcon,
  },
  {
    name: 'django-storybook',
    description:
      'Package for bringing Storybook-style component workflows into Django and template-led teams.',
    link: {
      href: 'https://github.com/William-Blackie/django_storybook',
      label: 'github.com/William-Blackie/django_storybook',
    },
    icon: GitHubIcon,
  },
  {
    name: 'wagtail/wagtail.org',
    description:
      "Contributed feature and frontend work to Wagtail's main website repository.",
    link: {
      href: 'https://github.com/wagtail/wagtail.org',
      label: 'github.com/wagtail/wagtail.org',
    },
    icon: GitHubIcon,
  },
  {
    name: 'torchbox/wagtail-torchbox',
    description:
      'Contributed to Wagtail delivery and frontend behaviour on the Torchbox website codebase.',
    link: {
      href: 'https://github.com/torchbox/wagtail-torchbox',
      label: 'github.com/torchbox/wagtail-torchbox',
    },
    icon: GitHubIcon,
  },
  {
    name: 'wagtail/wagtail',
    description:
      'Contributed upstream to Wagtail CMS, including search query handling and platform behaviour improvements.',
    link: {
      href: 'https://github.com/wagtail/wagtail',
      label: 'github.com/wagtail/wagtail',
    },
    icon: GitHubIcon,
  },
  {
    name: 'torchbox/django-pattern-library',
    description:
      'Contributed to Django template tooling and pattern-library workflows used by content teams.',
    link: {
      href: 'https://github.com/torchbox/django-pattern-library',
      label: 'github.com/torchbox/django-pattern-library',
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
    'Selected delivery work and open-source contributions.',
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
      title="Delivery work and open-source projects."
      intro="A mix of client delivery and open-source work from my public contribution history."
    >
      <div className="space-y-24">
        <section>
          <h2 className="text-xl font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
            Client and Product Work
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-zinc-600 dark:text-zinc-400">
            Work across startup, agency, and contract engagements.
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
            Repositories from my public GitHub history, including projects I
            own and projects I contribute to.
          </p>
          <div className="mt-10">
            <ProjectGrid projects={openSourceContributions} />
          </div>
        </section>
      </div>
    </SimpleLayout>
  )
}
