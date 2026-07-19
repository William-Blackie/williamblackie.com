import { Card } from '@/components/Card'
import { InternalExternalLink } from '@/components/InternalExternalLink'
import { JsonLd } from '@/components/JsonLd'
import { Section } from '@/components/Section'
import { SimpleLayout } from '@/components/SimpleLayout'
import { createPageMetadata, createPageSchema } from '@/lib/metadata'
import { Metadata } from 'next'

function ToolsSection({
    children,
    ...props
}: React.ComponentPropsWithoutRef<typeof Section>): React.ReactElement {
    return (
        <Section {...props}>
            <ul role="list" aria-label="Tools" className="space-y-10">
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
}): React.ReactElement {
    return (
        <Card as="li">
            <Card.Title as="h3" href={href} className="text-base">
                {title}
            </Card.Title>
            <Card.Description>{children}</Card.Description>
        </Card>
    )
}

export const metadata: Metadata = createPageMetadata({
    title: 'Tech',
    description: 'The tools and local setup I use each week for delivery.',
    path: '/tech',
})

export default function Tech(): React.ReactElement {
    return (
        <>
            <JsonLd
                id="tech-page-schema"
                data={createPageSchema({
                    title: 'Tech',
                    description: metadata.description as string,
                    path: '/tech',
                    type: 'CollectionPage',
                })}
            />
            <SimpleLayout
                title="Tools I use each week."
                intro="The stack and local setup I rely on for day-to-day delivery."
            >
                <div className="space-y-16">
                    <ToolsSection title="Core Stack">
                        <Tool title="Backend: Python, Django, Wagtail and DRF">
                            Python-first. Django and Wagtail for product and
                            CMS-heavy systems, with DRF for API services.
                        </Tool>
                        <Tool title="Frontend: TypeScript, React, Next.js, HTMX and Webpack">
                            React and Next.js for application work, HTMX when
                            server-rendered interactions are simpler.
                        </Tool>
                        <Tool title="Data and platform: PostgreSQL, Redis, RQ and Stripe">
                            PostgreSQL and Redis for core data and queue
                            workflows, plus Stripe for billing.
                        </Tool>
                        <Tool title="Quality and delivery: Pytest, Ruff, ESLint, Stylelint, Prettier">
                            Testing, linting, and formatting checks for fast
                            feedback without blocking delivery.
                        </Tool>
                        <Tool title="Operational tooling: Docker, uv, GitHub Actions, Sentry and Codecov">
                            Docker for local parity, uv for Python environments,
                            CI with coverage and error tracking.
                        </Tool>
                    </ToolsSection>
                    <ToolsSection title="Local Workflow">
                        <Tool title=".dotfiles: Zsh, tmux, Neovim, Starship, fzf and ripgrep">
                            Versioned in{' '}
                            <InternalExternalLink
                                href="https://github.com/William-Blackie/.dotfiles"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                github.com/William-Blackie/.dotfiles
                            </InternalExternalLink>
                            . Keeps shell, editor, and terminal workflows
                            consistent across projects.
                        </Tool>
                        <Tool title="Support tools: Storybook, Redocly and Make">
                            Storybook for component work, Redocly for API
                            checks, Make targets for repeatable commands.
                        </Tool>
                    </ToolsSection>
                    <ToolsSection title="Hardware">
                        <Tool title="14” MacBook Pro, M3 Pro, 18GB RAM (2023)">
                            macOS for day-to-day work, Linux for server and
                            container environments.
                        </Tool>
                    </ToolsSection>
                </div>
            </SimpleLayout>
        </>
    )
}
