import { getAllArticles, getArticleSourceBySlug } from '@/lib/articles'
import {
  clientProjects,
  highlightedProjects,
  openSourceContributions,
  resumeAwards,
  resumeSkills,
  volunteering,
  workExperience,
} from '@/lib/profile-content'
import {
  absoluteUrl,
  markdownPathForRoute,
  markdownUrlForRoute,
  optionalProfileLinks,
  siteName,
  siteSummary,
} from '@/lib/site'

type LlmsSection = 'Profile' | 'Work' | 'Writing'

interface LlmsPage {
  path: string
  title: string
  description: string
  section: LlmsSection
  renderMarkdown: () => Promise<string> | string
}

const llmsIntro =
  'Use the markdown URLs below for the cleanest version of each page. About, Resume, Projects, and the article pages contain the highest-signal information about background, working style, delivery approach, and technical focus.'

function normalizeRoute(path: string) {
  if (!path || path === '/') {
    return '/'
  }

  const normalized = path.replace(/\/+$/, '')
  return normalized.startsWith('/') ? normalized : `/${normalized}`
}

function toMarkdownDocument({
  title,
  description,
  path,
  body,
}: {
  title: string
  description: string
  path: string
  body: string
}) {
  return [
    `# ${title}`,
    '',
    `> ${description}`,
    '',
    `Canonical URL: [${absoluteUrl(path)}](${absoluteUrl(path)})`,
    '',
    body.trim(),
  ]
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
}

function renderExperienceList() {
  return workExperience
    .map(
      (role) =>
        `- **${role.company}** (${role.startLabel} to ${role.endLabel}) - ${role.title}`,
    )
    .join('\n')
}

function renderProjectList(
  projects: Array<{ name: string; description: string; href: string }>,
) {
  return projects
    .map(
      (project) =>
        `- [${project.name}](${project.href}): ${project.description}`,
    )
    .join('\n')
}

function renderStaticPages(): LlmsPage[] {
  return [
    {
      path: '/',
      title: 'Home',
      description: 'Introduction, current role, and delivery focus.',
      section: 'Profile',
      renderMarkdown: () =>
        toMarkdownDocument({
          title: siteName,
          description: 'Introduction, current role, and delivery focus.',
          path: '/',
          body: `
William Blackie is a full-stack software engineer based in Bristol and London, UK.

He works as Staff Engineer at [Mabyduck](https://mabyduck.com) and also runs Developerfy for selected side projects and consulting work.

His background spans agency delivery at Torchbox, contract work including Google DeepMind, and product engineering focused on reliable delivery systems.

## Core focus

- Python: Django, Wagtail, FastAPI
- TypeScript: React, Next.js
- Accessible product engineering
- Reliable delivery and release quality

## Recent experience

${renderExperienceList()}
          `,
        }),
    },
    {
      path: '/about',
      title: 'About',
      description:
        'Background, career path, and working style for William Blackie.',
      section: 'Profile',
      renderMarkdown: () =>
        toMarkdownDocument({
          title: 'About William Blackie',
          description:
            'Background, career path, and working style for William Blackie.',
          path: '/about',
          body: `
William Blackie is a full-stack engineer working across Python and TypeScript, with a focus on accessible, reliable, and maintainable products.

He studied Computer Science at the University of the West of England, then joined Torchbox in September 2019 and spent over four years in agency delivery for charities and public-sector teams including NHS and Samaritans.

In March 2024 he started Developerfy and moved into freelance and contract work. That included work for Google DeepMind, Doc Society, and ValeurSport, usually focused on unblocking delivery, stabilising systems, and helping teams keep moving.

In April 2025 he joined Mabyduck full-time as Staff Engineer. Current work focuses on delivery quality, reducing engineering friction, and helping teams ship consistently over time.

Outside work he climbs, rides motorcycles, and spends too much money on food and coffee.
          `,
        }),
    },
    {
      path: '/resume',
      title: 'Resume',
      description: 'Resume and delivery history for William Blackie.',
      section: 'Profile',
      renderMarkdown: () =>
        toMarkdownDocument({
          title: 'Resume',
          description: 'Resume and delivery history for William Blackie.',
          path: '/resume',
          body: `
Full-stack engineer with experience across agency, consultancy, and product teams. Focused on reliable systems, delivery standards, and helping teams ship confidently.

## Skills

${resumeSkills.map((skill) => `- ${skill}`).join('\n')}

## Highlighted projects

${highlightedProjects
  .map(
    (project) =>
      `### ${project.name} - ${project.role}\n\n${project.bullets
        .map((bullet) => `- ${bullet}`)
        .join('\n')}`,
  )
  .join('\n\n')}

## Experience

${workExperience
  .map((role) => {
    const bullets = role.bullets?.length
      ? `\n${role.bullets.map((bullet) => `- ${bullet}`).join('\n')}`
      : ''

    return `### ${role.company} - ${role.title}\n\n${role.location ? `${role.location}\n\n` : ''}${role.startLabel} to ${role.endLabel}${bullets}`
  })
  .join('\n\n')}

## Education

- **BSc (Hons) Computer Science**, University of the West of England, Bristol
- September 2016 to May 2019, First-Class Honours

## Awards

${resumeAwards.map((award) => `- ${award}`).join('\n')}

## Volunteering

### ${volunteering.role}

- ${volunteering.date}
${volunteering.bullets.map((bullet) => `- ${bullet}`).join('\n')}
          `,
        }),
    },
    {
      path: '/projects',
      title: 'Projects',
      description: 'Selected delivery work and open-source contributions.',
      section: 'Work',
      renderMarkdown: () =>
        toMarkdownDocument({
          title: 'Projects',
          description: 'Selected delivery work and open-source contributions.',
          path: '/projects',
          body: `
## Client and product work

${renderProjectList(clientProjects)}

## Open-source contributions

${renderProjectList(openSourceContributions)}
          `,
        }),
    },
    {
      path: '/tech',
      title: 'Tech',
      description: 'Tools I use each week to ship product and platform work.',
      section: 'Work',
      renderMarkdown: () =>
        toMarkdownDocument({
          title: 'Tech',
          description:
            'Tools I use each week to ship product and platform work.',
          path: '/tech',
          body: `
## Core stack

- **Backend:** Python, Django, Wagtail, and DRF for product and CMS-heavy systems.
- **Frontend:** TypeScript, React, Next.js, HTMX, and Webpack.
- **Data and platform:** PostgreSQL, Redis, RQ, and Stripe.
- **Quality and delivery:** Pytest, Ruff, ESLint, Stylelint, and Prettier.
- **Operational tooling:** Docker, uv, GitHub Actions, Sentry, and Codecov.

## Local workflow

- **Dotfiles:** Zsh, tmux, Neovim, Starship, fzf, and ripgrep. Repository: [github.com/William-Blackie/.dotfiles](https://github.com/William-Blackie/.dotfiles)
- **Support tools:** Storybook, Redocly, and Make-driven workflows.

## Hardware

- 14-inch MacBook Pro, M3 Pro, 18GB RAM (2023)
          `,
        }),
    },
  ]
}

function extractArticleBody(source: string) {
  const match = source.match(
    /<ArticleLayout[^>]*>\s*([\s\S]*?)\s*<\/ArticleLayout>/,
  )

  if (!match) {
    throw new Error('Unable to extract markdown body from article source.')
  }

  return match[1].trim()
}

async function renderArticleMarkdown(article: {
  slug: string
  title: string
  description: string
  author: string
  date: string
}) {
  const source = await getArticleSourceBySlug(article.slug)
  const body = extractArticleBody(source)

  return toMarkdownDocument({
    title: article.title,
    description: article.description,
    path: `/articles/${article.slug}`,
    body: `
- Published: ${article.date}
- Author: ${article.author}

${body}
    `,
  })
}

async function renderArticlesIndexMarkdown() {
  const articles = await getAllArticles()

  return toMarkdownDocument({
    title: 'Articles',
    description:
      'Writing by William Blackie on software engineering, delivery, and tooling.',
    path: '/articles',
    body: `
Practical write-ups from agency, freelance, and product work.

## Articles

${articles
  .map(
    (article) =>
      `- [${article.title}](${markdownUrlForRoute(`/articles/${article.slug}`)}): ${article.description} Published ${article.date}.`,
  )
  .join('\n')}
    `,
  })
}

async function getArticlePages(): Promise<LlmsPage[]> {
  const articles = await getAllArticles()

  return articles.map((article) => ({
    path: `/articles/${article.slug}`,
    title: article.title,
    description: article.description,
    section: 'Writing',
    renderMarkdown: () => renderArticleMarkdown(article),
  }))
}

export async function getLlmsPages() {
  return [
    ...renderStaticPages(),
    {
      path: '/articles',
      title: 'Articles',
      description:
        'Writing by William Blackie on software engineering, delivery, and tooling.',
      section: 'Writing' as const,
      renderMarkdown: renderArticlesIndexMarkdown,
    },
    ...(await getArticlePages()),
  ]
}

export async function renderLlmsTxt() {
  const pages = await getLlmsPages()
  const groupedSections: LlmsSection[] = ['Profile', 'Work', 'Writing']

  const sections = groupedSections
    .map((section) => {
      const items = pages.filter((page) => page.section === section)

      if (!items.length) {
        return ''
      }

      return [
        `## ${section}`,
        '',
        ...items.map(
          (page) =>
            `- [${page.title}](${markdownUrlForRoute(page.path)}): ${page.description}`,
        ),
      ].join('\n')
    })
    .filter(Boolean)

  const optionalSection = [
    '## Optional',
    '',
    ...optionalProfileLinks.map(
      (item) => `- [${item.title}](${item.url}): ${item.description}`,
    ),
  ].join('\n')

  return [
    `# ${siteName}`,
    '',
    `> ${siteSummary}`,
    '',
    llmsIntro,
    '',
    ...sections.flatMap((section) => [section, '']),
    optionalSection,
  ]
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

export async function renderLlmsFullMarkdown() {
  const pages = await getLlmsPages()
  const documents = await Promise.all(
    pages.map((page) => page.renderMarkdown()),
  )

  return [
    `# ${siteName} llms-full`,
    '',
    `> Expanded markdown context for the primary pages linked from ${absoluteUrl('/llms.txt')}.`,
    '',
    'This file combines the site-level markdown equivalents into a single document for LLM ingestion.',
    '',
    ...documents.flatMap((document, index) =>
      index === 0 ? [document] : ['---', '', document],
    ),
  ]
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

export async function renderMarkdownForRoute(route: string) {
  const normalizedRoute = normalizeRoute(route)
  const pages = await getLlmsPages()
  const page = pages.find((entry) => entry.path === normalizedRoute)

  return page ? page.renderMarkdown() : null
}

export function resolveMarkdownRoute(pathname: string) {
  if (pathname === '/index.html.md') {
    return '/'
  }

  if (pathname.endsWith('/index.html.md')) {
    return normalizeRoute(pathname.slice(0, -'/index.html.md'.length))
  }

  if (pathname.endsWith('.html.md')) {
    return normalizeRoute(pathname.slice(0, -'.html.md'.length))
  }

  if (pathname.endsWith('.md')) {
    const route = normalizeRoute(pathname.slice(0, -'.md'.length))

    return route === '/llms-full' ? null : route
  }

  return null
}

export function getMarkdownPathnameForRoute(route: string) {
  return markdownPathForRoute(route)
}
