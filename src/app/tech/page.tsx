import { Card } from '@/components/Card'
import { Section } from '@/components/Section'
import { SimpleLayout } from '@/components/SimpleLayout'

function ToolsSection({
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof Section>) {
  return (
    <Section {...props}>
      <ul role="list" className="space-y-16">
        {children}
      </ul>
    </Section>
  )
}

function Tool({
  title,
  href,
  children,
}: {
  title: string
  href?: string
  children: React.ReactNode
}) {
  return (
    <Card as="li">
      <Card.Title as="h3" href={href}>
        {title}
      </Card.Title>
      <Card.Description>{children}</Card.Description>
    </Card>
  )
}

export const metadata = {
  title: "Tech'",
  description: 'Software I use.',
}

export default function Tech() {
  return (
    <SimpleLayout
      title="Software I use, gadgets I love, and other things I recommend."
      intro="I get asked a lot about the things I use to build software, stay productive. Here’s a big list of all of my favorite stuff."
    >
      <div className="space-y-20">
      <ToolsSection title="Tech' stack">
          <Tool title="Python: Wagtail CMS, Django, FastAPI and Flask">
            I’ve been using Python for years and it’s my go-to language for
            building web applications, APIs, and data processing pipelines.
          </Tool>
          <Tool title="JavaScript: React, Next.JS and Vanilla">
            I use JavaScript for building web applications, and I’m a big fan of
            TypeScript for larger projects.
          </Tool>
          <Tool title="Styling: Sass, CSS and Tailwind">
            I’ve been using Tailwind CSS for a while now and I love how it
            allows me to build beautiful, responsive designs quickly.
          </Tool>
          <Tool title="Database: PostgreSQL, SQLite and Redis">
            I use PostgreSQL for most of my projects, but I also use SQLite for
            smaller projects and Redis for caching.
          </Tool>
          <Tool title="DevOps: Docker, Linux, AWS, Heroku, fly.io and Netlify">
            I use Docker for containerization, Kubernetes for orchestration, and
            GitHub Actions for CI/CD.
          </Tool>
        </ToolsSection>
        <ToolsSection title="Hardware">
          <Tool title="14” MacBook Pro, M3 Pro, 18GB RAM (2023)">
            I recently transitioned to using a MacOS after being a Linux user for the last decade.
            I still use Linux for my servers and development environments, but I’m enjoying the MacOS experience so far.
          </Tool>
        </ToolsSection>
      </div>
    </SimpleLayout>
  )
}
