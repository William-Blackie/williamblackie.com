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
  title: 'Tech',
  description: 'Tools I use each week to ship product and platform work.',
}

export default function Tech() {
  return (
    <SimpleLayout
      title="Tools I use every week."
      intro="The stack and setup I rely on for day-to-day delivery."
    >
      <div className="space-y-20">
        <ToolsSection title="Core Stack">
          <Tool title="Backend: Python, Django, Wagtail and DRF">
            Most backend work is Python-first. Django and Wagtail for product
            and CMS-heavy systems, with DRF for API services.
          </Tool>
          <Tool title="Frontend: TypeScript, React, Next.js, HTMX and Webpack">
            React and Next.js for application work, plus HTMX when
            server-rendered interactions are faster and simpler.
          </Tool>
          <Tool title="Data and platform: PostgreSQL, Redis, RQ and Stripe">
            PostgreSQL and Redis for core data and queue workflows, plus Stripe
            for billing systems.
          </Tool>
          <Tool title="Quality and delivery: Pytest, Ruff, ESLint, Stylelint, Prettier">
            Fast feedback loops through testing, linting, and formatting checks
            to keep quality high without blocking delivery.
          </Tool>
          <Tool title="Operational tooling: Docker, uv, GitHub Actions, Sentry and Codecov">
            Docker for local parity, uv for Python environments, and CI with
            coverage and error tracking.
          </Tool>
        </ToolsSection>
        <ToolsSection title="Local Workflow">
          <Tool title=".dotfiles: Zsh, tmux, Neovim, Starship, fzf and ripgrep">
            My local setup is versioned in{' '}
            <a
              href="https://github.com/William-Blackie/.dotfiles"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
            >
              github.com/William-Blackie/.dotfiles
            </a>
            . It keeps shell, editor, and terminal workflows consistent across
            projects.
          </Tool>
          <Tool title="Support tools: Storybook, Redocly and Make-driven workflows">
            Storybook for component work, Redocly for API checks, and Make
            targets for repeatable commands.
          </Tool>
        </ToolsSection>
        <ToolsSection title="Hardware">
          <Tool title="14” MacBook Pro, M3 Pro, 18GB RAM (2023)">
            I use macOS for day-to-day work and Linux for server and container
            environments. This setup has been a good balance between local speed
            and production parity.
          </Tool>
        </ToolsSection>
      </div>
    </SimpleLayout>
  )
}
