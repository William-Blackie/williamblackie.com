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
  description: 'I’m William Blackie. I live in Bristol, UK, I code and stuff.',
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
              I&apos;m a Software Engineer and Freelancer based in Manchester/Bristol, UK.
              Before freelancing, I received first-class honours in BSc Computer Science from the University of
              the West of England.
            </p>
            <p>
              After graduating, I worked at Torchbox, a digital agency in Bristol, where I worked with some of the UK&apos;s largest charities and non-profits.
              I led projects for the NHS, Samaritans, and even ran incident response for the whole company on occasion.
            </p>
            <p>
              I then moved to Manchester and started freelancing, working with clients like the DocSociety, ValeurSport, and Google.
            </p>
            <p>
              I have a strong background in creating full-stack web applications from the smallest non-profits to the largest tech giants.
              I&apos;m currently exploring the world of freelancing and contracting, so if you have a project you&apos;d like to discuss, feel free to reach
              out.
            </p>
            <p>
              Today, I&apos;m the founder of Developerfy, my freelance agency where I help clients build
              and scale their products.
            </p>
            <p> 
              Outside of work, I like to climb, ride my motorcycle, and spend way too much money on nice food. Often
              found in nice coffee shops and hunting for vintage.
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