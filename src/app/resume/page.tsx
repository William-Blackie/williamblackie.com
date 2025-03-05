import { type Metadata } from 'next'
import { Container } from '@/components/Container'

export const metadata: Metadata = {
  title: 'Resume',
  description: "William Blackie's Resume",
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
          William Blackie | Python / Django Full-Stack Software Engineer
        </h1>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          Remote (Bristol, UK) | will@developerfy.com
        </p>

        <SectionTitle>About</SectionTitle>
        <p className="mt-4 text-base text-zinc-600 dark:text-zinc-400">
          Highly motivated Senior Software Developer with 5+ years of experience
          working in fast-paced teams, designing, implementing, and
          leading projects for high-profile UK and US clients (GOs, NGOs, large
          enterprises). Key interests in testing (TDD, visual regression,
          integration). Past clients include Google, Samaritans, Oxfam, and NHS.
        </p>

        <SectionTitle>Skills / Technologies</SectionTitle>
        <ul className="mt-4 space-y-2 text-base text-zinc-600 dark:text-zinc-400 list-disc list-inside">
          <li>Python, JavaScript, HTML, CSS (Tailwind, SASS/SCSS)</li>
          <li>Django, Wagtail, React, Next.js, TypeScript</li>
          <li>Docker, Linux, AWS, GCP, Heroku, fly.io, Netlify</li>
          <li>SQL, PostgreSQL</li>
          <li>Testing: TDD, Pytest, unittest, Backstop.js</li>
        </ul>

        <SectionTitle>Highlighted Projects</SectionTitle>
        <div className="mt-4 space-y-4 text-base text-zinc-600 dark:text-zinc-400">
          <div>
            <strong>Google: DeepMind</strong> – External FullStack Contractor
            <ul className="list-disc list-inside">
              <li>Led BE development across UK/US time zones</li>
              <li>Implemented custom CI/CD pipelines for zero-downtime releases</li>
              <li>Provided clear technical direction for stakeholders</li>
            </ul>
          </div>
          <div>
            <strong>Resource for the Future</strong> – Technical Lead
            <ul className="list-disc list-inside">
              <li>Led cross-functional teams delivering robust solutions</li>
              <li>Ensured best practices and alignment with org goals</li>
            </ul>
          </div>
          <div>
            <strong>The National Archives</strong> – External FullStack Contractor
            <ul className="list-disc list-inside">
              <li>Implemented new features and guidelines (GDS, WCAG)</li>
              <li>Consulted on dev processes and front-end accessibility</li>
            </ul>
          </div>
          <div>
            <strong>Samaritans UK</strong> – Contributor
            <ul className="list-disc list-inside">
              <li>Scoped and maintained features over 4+ years</li>
              <li>Multiple Wagtail upgrades and donation processing solutions</li>
            </ul>
          </div>
        </div>

        <SectionTitle>Experience</SectionTitle>
        <div className="mt-4 space-y-4 text-base text-zinc-600 dark:text-zinc-400">
          <div>
            <strong>Developerfy</strong>, Bristol / Remote – Owner
            <span className="block text-sm text-zinc-500 dark:text-zinc-400">
              March 2024 – Current
            </span>
            <ul className="list-disc list-inside mt-1">
              <li>Leading/managing development projects with timely delivery</li>
              <li>
                Providing technical consultancy for enhanced digital presence
              </li>
              <li>Coordinating with clients for tailored solutions</li>
            </ul>
          </div>
          <div>
            <strong>Torchbox</strong>, Bristol / Remote – Developer
            <span className="block text-sm text-zinc-500 dark:text-zinc-400">
              September 2019 – March 2024
            </span>
            <ul className="list-disc list-inside mt-1">
              <li>Led projects for Resources for the Future and NHS England</li>
              <li>Contributed to core Wagtail features and feedback</li>
              <li>
                Mentored junior developers, fostering cross-team knowledge
                sharing
              </li>
            </ul>
          </div>
        </div>

        <SectionTitle>Education</SectionTitle>
        <div className="mt-4 text-base text-zinc-600 dark:text-zinc-400">
          <strong>BSc (Hons) Computer Science</strong>, The University of The
          West of England, Bristol
          <br />
          (September 2016 – May 2019, First-Class Honours)
        </div>

        <SectionTitle>Awards</SectionTitle>
        <ul className="mt-4 space-y-2 text-base text-zinc-600 dark:text-zinc-400 list-disc list-inside">
          <li>
            The University of The West of England, Dean&apos;s list for academic
            excellence
          </li>
          <li>NMI - Award for innovative use of AI</li>
        </ul>

        <SectionTitle>Volunteering</SectionTitle>
        <div className="mt-4 text-base text-zinc-600 dark:text-zinc-400">
          <strong>Coach – Coders of Colour</strong> (October 2021)
          <ul className="list-disc list-inside">
            <li>Mentoring and coaching underrepresented young coders</li>
            <li>Facilitating workshops to inspire the next generation</li>
          </ul>
        </div>
      </div>
    </Container>
  )
}