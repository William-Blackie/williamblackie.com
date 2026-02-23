import { type Metadata } from 'next'
import { Container } from '@/components/Container'

export const metadata: Metadata = {
  title: 'Resume',
  description: 'Resume and delivery history for William Blackie.',
  robots: {
    index: false,
    follow: false,
  },
}

export const dynamic = 'force-static'
export const revalidate = 0

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-8 text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
      {children}
    </h2>
  )
}

export default function Resume() {
  return (
    <Container className="mt-16 sm:mt-32">
      <div className="max-w-3xl">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-3xl">
          William Blackie | Full-stack Software Engineer
        </h1>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          London and Bristol, UK (remote-friendly) | will@developerfy.com
        </p>

        <SectionTitle>About</SectionTitle>
        <p className="mt-4 text-base text-zinc-600 dark:text-zinc-400">
          Full-stack engineer with experience across agency, consultancy, and
          product teams. I design and deliver reliable systems, improve delivery
          standards, and help teams keep shipping confidently. Past work
          includes delivery for Google, public-sector organisations, and major
          UK charities.
        </p>

        <SectionTitle>Skills / Technologies</SectionTitle>
        <ul className="mt-4 space-y-2 text-base text-zinc-600 dark:text-zinc-400 list-disc list-inside">
          <li>Python, TypeScript, JavaScript, HTML, CSS (Tailwind, Sass/SCSS)</li>
          <li>Django, Wagtail, DRF, React, Next.js, HTMX</li>
          <li>PostgreSQL, Redis, SQL, background job systems</li>
          <li>Docker, Linux, AWS, GCP, GitHub Actions, Sentry</li>
          <li>Testing and quality: Pytest, Ruff, ESLint, Stylelint, Prettier</li>
        </ul>

        <SectionTitle>Highlighted Projects</SectionTitle>
        <div className="mt-4 space-y-4 text-base text-zinc-600 dark:text-zinc-400">
          <div>
            <strong>Google DeepMind</strong> – Full-stack Contract Engineer
            <ul className="list-disc list-inside">
              <li>
                Contributed to CMS and platform delivery across a large
                Django/Wagtail codebase.
              </li>
              <li>
                Supported release quality through stronger delivery practices
                and technical alignment.
              </li>
            </ul>
          </div>
          <div>
            <strong>Resource for the Future</strong> – Technical Lead
            <ul className="list-disc list-inside">
              <li>
                Led engineering delivery for a content-heavy policy and research
                platform.
              </li>
              <li>
                Improved maintainability through pragmatic architecture and
                editorial workflows.
              </li>
            </ul>
          </div>
          <div>
            <strong>The National Archives</strong> – Contract Engineer
            <ul className="list-disc list-inside">
              <li>
                Delivered frontend behaviour and CMS features on the ds-wagtail
                platform.
              </li>
              <li>
                Supported accessibility and design-system consistency for public
                services.
              </li>
            </ul>
          </div>
          <div>
            <strong>Samaritans UK</strong> – Contributor
            <ul className="list-disc list-inside">
              <li>
                Delivered long-running Django/Wagtail improvements across
                content and donation journeys.
              </li>
              <li>
                Supported ongoing platform upgrades and maintenance for
                sustainable delivery.
              </li>
            </ul>
          </div>
        </div>

        <SectionTitle>Experience</SectionTitle>
        <div className="mt-4 space-y-4 text-base text-zinc-600 dark:text-zinc-400">
          <div>
            <strong>Mabyduck</strong>, London Area, UK - Staff Engineer
            <span className="block text-sm text-zinc-500 dark:text-zinc-400">
              April 2025 – Present
            </span>
          </div>
          <div>
            <strong>Developerfy</strong>, Greater Bristol Area, UK - Owner
            <span className="block text-sm text-zinc-500 dark:text-zinc-400">
              March 2024 – Present
            </span>
            <ul className="list-disc list-inside mt-1">
              <li>Ongoing product and platform work through Developerfy</li>
              <li>Delivered full-stack product development for startup teams</li>
              <li>
                Provided technical direction, architecture, and delivery support
              </li>
            </ul>
          </div>
          <div>
            <strong>Google</strong>, London Area, UK - Full-stack Developer
            <span className="block text-sm text-zinc-500 dark:text-zinc-400">
              August 2024 – December 2024
            </span>
          </div>
          <div>
            <strong>Torchbox</strong>, Greater Bristol Area, UK - Software Developer
            <span className="block text-sm text-zinc-500 dark:text-zinc-400">
              September 2019 – March 2024
            </span>
            <ul className="list-disc list-inside mt-1">
              <li>Led projects for Resource for the Future and NHS England</li>
              <li>Contributed to core Wagtail features and community feedback</li>
              <li>
                Mentored junior engineers and supported cross-team knowledge
                sharing
              </li>
            </ul>
          </div>
        </div>

        <SectionTitle>Education</SectionTitle>
        <div className="mt-4 text-base text-zinc-600 dark:text-zinc-400">
          <strong>BSc (Hons) Computer Science</strong>, University of the West
          of England, Bristol
          <br />
          (September 2016 – May 2019, First-Class Honours)
        </div>

        <SectionTitle>Awards</SectionTitle>
        <ul className="mt-4 space-y-2 text-base text-zinc-600 dark:text-zinc-400 list-disc list-inside">
          <li>
            University of the West of England, Dean&apos;s List for academic
            excellence
          </li>
          <li>NMI - Award for innovative use of AI</li>
        </ul>

        <SectionTitle>Volunteering</SectionTitle>
        <div className="mt-4 text-base text-zinc-600 dark:text-zinc-400">
          <strong>Coach – Coders of Colour</strong> (October 2021)
          <ul className="list-disc list-inside">
            <li>Mentoring and coaching under-represented young coders</li>
            <li>Facilitating workshops to inspire the next generation</li>
          </ul>
        </div>
      </div>
    </Container>
  )
}
