import Image, { type ImageProps } from 'next/image'
import clsx from 'clsx'
import React from 'react'
import Link from 'next/link'
import { Container } from '@/components/Container'
import { GitHubIcon, LinkedInIcon } from '@/components/SocialIcons'
import { BriefcaseIcon, MailIcon } from '@/components/GeneralIcons'
import { SocialLink } from '@/components/SocialLink'
import logoDeveloperfy from '@/images/logos/developerfy.svg'
import logoGoogle from '@/images/logos/google.svg'
import logoTorchbox from '@/images/logos/tbx.svg'
import logoMabyDuck from '@/images/logos/mabyduck.png'

import image1 from '@/images/photos/image-1.jpg'
import image2 from '@/images/photos/image-2.jpg'
import image3 from '@/images/photos/image-3.jpg'
import image4 from '@/images/photos/image-4.jpg'
import image5 from '@/images/photos/image-5.jpg'

interface Role {
  company: string
  title: string
  logo: ImageProps['src']
  start: string | { label: string; dateTime: string }
  end: string | { label: string; dateTime: string }
}

function Role({ role }: { role: Role }) {
  const startLabel =
    typeof role.start === 'string' ? role.start : role.start.label
  const startDate =
    typeof role.start === 'string' ? role.start : role.start.dateTime

  const endLabel = typeof role.end === 'string' ? role.end : role.end.label
  const endDate = typeof role.end === 'string' ? role.end : role.end.dateTime

  return (
    <li className="flex gap-4">
      <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
        <Image src={role.logo} alt="" className="h-7 w-7" unoptimized />
      </div>
      <dl className="flex flex-auto flex-wrap gap-x-2">
        <dt className="sr-only">Company</dt>
        <dd className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
          {role.company}
        </dd>
        <dt className="sr-only">Role</dt>
        <dd className="text-xs text-zinc-500 dark:text-zinc-400">
          {role.title}
        </dd>
        <dt className="sr-only">Date</dt>
        <dd
          className="ml-auto text-xs text-zinc-500"
          aria-label={`${startLabel} until ${endLabel}`}
        >
          <time dateTime={startDate}>{startLabel}</time>{' '}
          <span aria-hidden="true">—</span>{' '}
          <time dateTime={endDate}>{endLabel}</time>
        </dd>
      </dl>
    </li>
  )
}

function Resume() {
  const resume: Array<Role> = [
    {
      company: 'MabyDuck',
      title: 'Staff Engineer',
      logo: logoMabyDuck,
      start: 'April 2025',
      end: {
        label: 'Present',
        dateTime: new Date().getFullYear().toString(),
      },
    },
    {
      company: 'Torchbox',
      title: 'Software Engineer - Contract',
      logo: logoTorchbox,
      start: 'Jan 2025',
      end: 'April 2025',
    },
    {
      company: 'Google',
      title: 'Software Engineer - Contract',
      logo: logoGoogle,
      start: 'Jul 2024',
      end: 'Dec 2024',
    },
    {
      company: 'Developerfy',
      title: 'Founder - Selective Consulting',
      logo: logoDeveloperfy,
      start: '2024',
      end: {
        label: 'Present',
        dateTime: new Date().getFullYear().toString(),
      },
    },
    {
      company: 'Torchbox',
      title: 'Software Engineer - FTE',
      logo: logoTorchbox,
      start: '2020',
      end: '2024',
    },
  ]

  return (
    <div className="mx-auto max-w-2xl rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <BriefcaseIcon className="h-6 w-6 flex-none" />
        <span className="ml-3">Work Experience</span>
      </h2>
      <ol className="mt-6 space-y-4">
        {resume.map((role, roleIndex) => (
          <Role key={roleIndex} role={role} />
        ))}
      </ol>
    </div>
  )
}

function Photos() {
  const rotations = ['rotate-2', '-rotate-2', 'rotate-2', 'rotate-2', '-rotate-2']

  return (
    <div className="mt-16 sm:mt-20">
      <div className="-my-4 flex justify-center gap-5 overflow-hidden py-4 sm:gap-8">
        {[image1, image2, image3, image4, image5].map((image, imageIndex) => (
          <div
            key={image.src}
            className={clsx(
              'relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl bg-zinc-100 sm:w-72 sm:rounded-2xl dark:bg-zinc-800',
              rotations[imageIndex % rotations.length],
            )}
          >
            <Image
              src={image}
              alt=""
              sizes="(min-width: 640px) 18rem, 11rem"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <>
      <Container className="mt-9">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
            William Blackie
          </h1>
          <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
            I&apos;m William, a Staff Engineer based in Bristol, UK. I build
            full-stack products and platforms, with a focus on delivering
            reliable systems that teams can scale with confidence.
          </p>
          <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
            I&apos;m currently a Staff Engineer at{' '}
            <a
              href="https://mabyduck.com"
              rel="noopener noreferrer"
              target="_blank"
              className="text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
            >
              MabyDuck
            </a>
            , and I occasionally support selected consulting work through
            Developerfy.
          </p>
          <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
            I&apos;ve also started writing again. You can find new posts on the{' '}
            <Link
              href="/articles"
              className="font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
            >
              blog
            </Link>
            .
          </p>

          <div className="mt-6 flex gap-6">
            <SocialLink
              href="mailto:will@developerfy.com"
              srLabel="Send me an email"
              icon={MailIcon}
            />
            <SocialLink
              href="https://github.com/William-Blackie"
              srLabel="Follow me GitHub"
              icon={GitHubIcon}
            />
            <SocialLink
              href="https://www.linkedin.com/in/william-blackie/"
              srLabel="Follow me LinkedIn"
              icon={LinkedInIcon}
            />
          </div>
        </div>
      </Container>
      <Photos />
      <Container className="mt-24 md:mt-28">
        <Resume />
      </Container>
    </>
  )
}
