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
    "I'm William Blackie, a Full-stack Engineer with agency, freelance, and product experience across Python and TypeScript.",
}

export default function About() {
  return (
    <Container className="mt-16 sm:mt-32">
      <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
        <div className="lg:pl-20">
          <div className="max-w-xs px-2.5 lg:max-w-none">
            <Image
              src={portraitImage}
              alt="William Blackie"
              sizes="(min-width: 1024px) 32rem, 20rem"
              className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
            />
          </div>
        </div>
        <div className="lg:order-first lg:row-span-2">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
            Hi, I&apos;m William.
          </h1>
          <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
            <p>
              I&apos;m a Full-stack engineer working across Python
              (Django/FastAPI/Wagtail) and TypeScript (React/Next.js). My focus
              is building user-centred products that are accessible, reliable,
              and maintainable.
            </p>
            <p>
              I studied Computer Science at the University of the West of
              England, graduating with first-class honours. I then joined
              Torchbox in September 2019, where I spent over four years in
              agency delivery for charities and public-sector teams, including
              NHS and Samaritans.
            </p>
            <p>
              Agency life gave me a very strong delivery foundation: tight
              timelines, multi-disciplinary teams, and real user needs rather
              than abstract ticket queues. It also taught me to communicate
              clearly when priorities shift every five minutes and still keep
              people confident about where things are heading.
            </p>
            <p>
              In March 2024 I started Developerfy and moved into freelance and
              contract work. That included a contract with Google (August to
              December 2024), plus delivery work for Doc Society and
              ValeurSport. Most of that work was about unblocking delivery,
              stabilising systems, and keeping teams moving.
            </p>
            <p>
              In April 2025 I joined Mabyduck full-time. Moving from project
              cycles into product ownership has been a brilliant shift: same
              love of shipping, more room to compound improvements over time.
              Day to day, I focus on delivery quality, reducing engineering
              friction, and helping teams ship consistently.
            </p>
            <p>
              I still run Developerfy for selected side projects and
              experiments. I enjoy building from scratch, improving existing
              systems, and occasionally touching CSS on purpose.
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
