# williamblackie.com

Personal website and writing site built with Next.js, MDX, and Tailwind CSS.

## Stack

- Next.js `16`
- React `19`
- TypeScript
- Tailwind CSS
- MDX
- `rehype-pretty-code`

## Prerequisites

- Node.js `20+`
- npm

## Setup

```bash
npm install
```

Create `.env.local` in the project root:

```bash
NEXT_PUBLIC_SITE_URL=https://www.williamblackie.com
NEXT_PUBLIC_GISCUS_REPO=owner/repo
NEXT_PUBLIC_GISCUS_REPO_ID=R_kgDOExample
NEXT_PUBLIC_GISCUS_CATEGORY=General
NEXT_PUBLIC_GISCUS_CATEGORY_ID=DIC_kwDOExample4CExample
# Optional:
# NEXT_PUBLIC_GISCUS_MAPPING=pathname
# NEXT_PUBLIC_GISCUS_STRICT=0
# NEXT_PUBLIC_GISCUS_REACTIONS_ENABLED=1
# NEXT_PUBLIC_GISCUS_EMIT_METADATA=0
# NEXT_PUBLIC_GISCUS_INPUT_POSITION=top
# NEXT_PUBLIC_GISCUS_LANG=en
```

`repoId` and `categoryId` come from the giscus setup flow:
[https://giscus.app](https://giscus.app)

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Commands

npm scripts:

- `npm run dev`
- `npm run lint`
- `npm run build`
- `npm run start`

Make targets:

- `make help`
- `make install`
- `make dev`
- `make lint`
- `make build`
- `make start`
- `make outdated`
- `make audit`
- `make update`

## Content layout

- `src/app/articles/*` - published articles
- `src/app/projects/page.tsx` - projects
- `src/app/about/page.tsx` - about
- `src/app/tech/page.tsx` - tech
- `src/content/blog-drafts/*` - article drafts and series planning

## Writing workflow

1. Write in `src/content/blog-drafts/`.
2. Refine to publishable quality.
3. Move/adapt into `src/app/articles/<slug>/page.mdx`.
4. Validate with `npm run lint` and `npm run build`.
