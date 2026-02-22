import { type Metadata } from 'next'
import Image from 'next/image'

import { Container } from '@/components/Container'
import { GitHubIcon, LinkedInIcon } from '@/components/SocialIcons'
import portraitImage from '@/images/photos/image-3.jpg'
import { SocialLink } from '@/components/SocialLink'

function MailIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        d="M6 5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6Zm.245 2.187a.75.75 0 0 0-.99 1.126l6.25 5.5a.75.75 0 0 0 .99 0l6.25-5.5a.75.75 0 0 0-.99-1.126L12 12.251 6.245 7.187Z"
      />
    </svg>
  )
}

export const metadata: Metadata = {
  title: 'About',
  description:
    'I’m William Blackie, a Staff Engineer in Bristol, UK. I build full-stack products and help teams ship with confidence.',
}

export default function About() {
  return (
    <Container className="mt-16 sm:mt-32">
      <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
        <div className="lg:pl-20">
          <div className="max-w-xs px-2.5 lg:max-w-none">
            <Image
              src={portraitImage}
              alt=""
              sizes="(min-width: 1024px) 32rem, 20rem"
              className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
            />
          </div>
        </div>
        <div className="lg:order-first lg:row-span-2">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
            I&apos;m William Blackie.
          </h1>
          <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
            <p>
              I&apos;m a Staff Engineer at MabyDuck, based in Bristol, UK. I
              work across product and platform engineering, helping teams ship
              software that is reliable, maintainable, and fast to iterate on.
            </p>
            <p>
              I studied Computer Science at the University of the West of
              England, graduating with first-class honours, then joined Torchbox
              in Bristol where I delivered projects for charities and
              public-sector organisations including NHS and Samaritans.
            </p>
            <p>
              After Torchbox, I moved into freelance and contract work, building
              products and platforms for organisations including Google,
              Doc Society, and ValeurSport.
            </p>
            <p>
              That path eventually led me to my current role at MabyDuck, where
              I spend most of my time solving systems problems, improving
              delivery practices, and mentoring engineers.
            </p>
            <p>
              I still run Developerfy for selective consulting and advisory work,
              but my primary focus is now long-term product engineering inside
              one team.
            </p>
            <p>
              Outside work, I climb, ride motorcycles, and spend too much money
              on great food and coffee.
            </p>
          </div>
        </div>
        <div className="lg:pl-20">
          <ul role="list">
            <SocialLink href="https://github.com/William-Blackie" icon={GitHubIcon} className="mt-4">
              Follow on GitHub
            </SocialLink>
            <SocialLink href="https://www.linkedin.com/in/william-blackie/" icon={LinkedInIcon} className="mt-4">
              Follow on LinkedIn
            </SocialLink>
            <SocialLink
              href="mailto:will@developerfy.com"
              icon={MailIcon} className="mt-4">
              will@developerfy.com
            </SocialLink>
          </ul>
        </div>
      </div>
    </Container>
  )
}
