import { type Metadata } from 'next'
import Image, { type ImageProps } from 'next/image'
import clsx from 'clsx'
import React from 'react'
import Link from 'next/link'
import { Container } from '@/components/Container'
import { JsonLd } from '@/components/JsonLd'
import { GitHubIcon, LinkedInIcon } from '@/components/SocialIcons'
import { BriefcaseIcon, MailIcon } from '@/components/GeneralIcons'
import { SocialLink } from '@/components/SocialLink'
import { createPageMetadata, createPageSchema } from '@/lib/metadata'
import { personSchemaId } from '@/lib/site'
import logoDeveloperfy from '@/images/logos/developerfy.svg'
import logoGoogle from '@/images/logos/google.svg'
import logoTorchbox from '@/images/logos/tbx.svg'
import logoMabyDuck from '@/images/logos/mabyduck.png'
import { workExperience } from '@/lib/profile-content'

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
      <div className="bg-ctp-mantle shadow-ctp-crust/10 ring-ctp-surface0/80 relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md ring-1">
        <div className="mocha:bg-ctp-text/90 mocha:ring-ctp-text/15 mocha:ring-1 flex h-10 w-10 items-center justify-center rounded-full p-1.5">
          <Image
            src={role.logo}
            alt=""
            className="h-full w-full object-contain"
            unoptimized
          />
        </div>
      </div>
      <dl className="flex flex-auto flex-wrap gap-x-2">
        <dt className="sr-only">Company</dt>
        <dd className="text-ctp-text w-full flex-none text-sm font-medium">
          {role.company}
        </dd>
        <dt className="sr-only">Role</dt>
        <dd className="text-ctp-subtext1 text-xs">{role.title}</dd>
        <dt className="sr-only">Date</dt>
        <dd
          className="text-ctp-subtext1 ml-auto text-xs"
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
  const logos: Record<string, ImageProps['src']> = {
    mabyduck: logoMabyDuck,
    developerfy: logoDeveloperfy,
    google: logoGoogle,
    torchbox: logoTorchbox,
  }

  const resume: Array<Role> = workExperience.map((role) => ({
    company: role.company,
    title:
      role.key === 'google' ? 'Full-stack Developer - Contract' : role.title,
    logo: logos[role.key],
    start: {
      label: role.startLabel,
      dateTime: role.startDateTime,
    },
    end: {
      label: role.endLabel,
      dateTime: role.endDateTime,
    },
  }))

  return (
    <div className="border-ctp-surface0/80 bg-ctp-mantle mx-auto max-w-2xl rounded-2xl border p-6">
      <h2 className="text-ctp-text flex text-sm font-semibold">
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
  const rotations = [
    'rotate-2',
    '-rotate-2',
    'rotate-2',
    'rotate-2',
    '-rotate-2',
  ]

  return (
    <div className="mt-16 sm:mt-20">
      <div className="-my-4 flex justify-center gap-5 overflow-hidden py-4 sm:gap-8">
        {[image1, image2, image3, image4, image5].map((image, imageIndex) => (
          <div
            key={image.src}
            className={clsx(
              'bg-ctp-surface0 relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl sm:w-72 sm:rounded-2xl',
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
      <JsonLd
        id="home-page-schema"
        data={createPageSchema({
          title: 'Home',
          description: 'Introduction, current role, and delivery focus.',
          path: '/',
          type: 'ProfilePage',
          mainEntity: {
            '@id': personSchemaId,
          },
        })}
      />
      <Container className="mt-9">
        <div className="max-w-2xl">
          <h1 className="text-ctp-text text-4xl font-bold tracking-tight sm:text-5xl">
            William Blackie
          </h1>
          <p className="text-ctp-subtext1 mt-6 text-base">
            Hi, I&apos;m William. I&apos;m a Full-stack Engineer based in
            Bristol and London, UK.
          </p>
          <p className="text-ctp-subtext1 mt-6 text-base">
            I&apos;ve worked across agency delivery at{' '}
            <a
              href="https://www.torchbox.com"
              rel="noopener noreferrer"
              target="_blank"
              className="text-ctp-text decoration-ctp-blue/50 hover:text-ctp-blue hover:decoration-ctp-blue mocha:decoration-ctp-pink/35 mocha:hover:text-ctp-pink mocha:hover:decoration-ctp-pink font-medium underline underline-offset-4 transition-[text-decoration-color] transition-colors"
            >
              Torchbox
            </a>
            , contract and freelance work through Developerfy (including a stint
            at Google DeepMind), and now full-time product engineering at{' '}
            <a
              href="https://mabyduck.com"
              rel="noopener noreferrer"
              target="_blank"
              className="text-ctp-text decoration-ctp-blue/50 hover:text-ctp-blue hover:decoration-ctp-blue mocha:decoration-ctp-pink/35 mocha:hover:text-ctp-pink mocha:hover:decoration-ctp-pink font-medium underline underline-offset-4 transition-[text-decoration-color] transition-colors"
            >
              Mabyduck
            </a>
            . Each context taught me the same thing at a different speed: pace
            matters, but so does building systems that don&apos;t need heroics
            to keep running.
          </p>
          <p className="text-ctp-subtext1 mt-6 text-base">
            I build with Python (Django, FastAPI, Wagtail) and TypeScript
            (React, Next.js). I care about accessible products, clear
            architecture, and releases that don&apos;t require a prayer circle
            on Friday afternoon.
          </p>
          <p className="text-ctp-subtext1 mt-6 text-base">
            I write about delivery, tooling, and lessons from real projects on
            the{' '}
            <Link
              href="/articles"
              className="text-ctp-text decoration-ctp-blue/50 hover:text-ctp-blue hover:decoration-ctp-blue mocha:decoration-ctp-pink/35 mocha:hover:text-ctp-pink mocha:hover:decoration-ctp-pink font-medium underline underline-offset-4 transition-[text-decoration-color] transition-colors"
            >
              blog
            </Link>
            .
          </p>

          <ul className="mt-6 flex gap-6">
            <SocialLink
              href="mailto:will@developerfy.com"
              srLabel="Send me an email"
              icon={MailIcon}
            />
            <SocialLink
              href="https://github.com/William-Blackie"
              srLabel="Follow on GitHub"
              icon={GitHubIcon}
            />
            <SocialLink
              href="https://www.linkedin.com/in/william-blackie/"
              srLabel="Follow on LinkedIn"
              icon={LinkedInIcon}
            />
          </ul>
        </div>
      </Container>
      <Photos />
      <Container className="mt-24 md:mt-28">
        <Resume />
      </Container>
    </>
  )
}

export const metadata: Metadata = createPageMetadata({
  title: 'Home',
  description: 'Introduction, current role, and delivery focus.',
  path: '/',
})
