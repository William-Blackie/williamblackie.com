export const siteUrl = 'https://williamblackie.com'
export const siteName = 'William Blackie'
export const siteTitle = 'William Blackie - Full-stack Engineer'
export const siteSummary =
  'Personal site for William Blackie, a full-stack software engineer based in Bristol and London, UK. Covers professional background, delivery work, tooling, and writing on software engineering.'
export const siteDescription =
  'William Blackie is a full-stack software engineer based in Bristol and London, UK. He builds product and platform software with Python (Django, Wagtail, FastAPI) and TypeScript (React, Next.js). Currently Staff Engineer at Mabyduck. Previously at Torchbox and Google DeepMind.'
export const shortSiteDescription =
  'Full-stack engineer building product and platform software with Python and TypeScript. Based in Bristol and London, UK. Staff Engineer at Mabyduck.'

export const personSchemaId = `${siteUrl}/#person`
export const websiteSchemaId = `${siteUrl}/#website`

export const optionalProfileLinks = [
  {
    title: 'GitHub',
    url: 'https://github.com/William-Blackie',
    description: 'Open-source work and public repositories.',
  },
  {
    title: 'LinkedIn',
    url: 'https://www.linkedin.com/in/william-blackie/',
    description: 'Professional profile and career history.',
  },
  {
    title: 'Mastodon',
    url: 'https://mastodon.social/@williamblackie',
    description: 'Social profile on Mastodon.',
  },
  {
    title: 'Email',
    url: 'mailto:will@developerfy.com',
    description: 'Direct contact for consulting or engineering work.',
  },
] as const

export const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': personSchemaId,
  name: siteName,
  url: siteUrl,
  jobTitle: 'Staff Engineer',
  worksFor: {
    '@type': 'Organization',
    name: 'Mabyduck',
    url: 'https://mabyduck.com',
  },
  alumniOf: [
    {
      '@type': 'Organization',
      name: 'Torchbox',
      url: 'https://torchbox.com',
    },
    {
      '@type': 'Organization',
      name: 'Google DeepMind',
      url: 'https://deepmind.google',
    },
    {
      '@type': 'CollegeOrUniversity',
      name: 'University of the West of England, Bristol',
    },
  ],
  knowsAbout: [
    'Python',
    'Django',
    'Wagtail',
    'FastAPI',
    'TypeScript',
    'React',
    'Next.js',
    'Software Engineering',
    'Full-stack Development',
    'Product Engineering',
    'Platform Engineering',
    'Web Accessibility',
    'Software Delivery',
  ],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Bristol',
    addressCountry: 'GB',
  },
  sameAs: optionalProfileLinks
    .map((link) => link.url)
    .filter((url) => url.startsWith('https://')),
  email: 'will@developerfy.com',
}

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': websiteSchemaId,
  name: siteName,
  url: siteUrl,
  description: siteDescription,
  inLanguage: 'en-GB',
  about: {
    '@id': personSchemaId,
  },
}

export function absoluteUrl(path = '/') {
  return new URL(path, siteUrl).toString()
}

export function markdownPathForRoute(path: string) {
  if (path === '/') {
    return '/index.html.md'
  }

  return `${path.replace(/\/$/, '')}/index.html.md`
}

export function markdownUrlForRoute(path: string) {
  return absoluteUrl(markdownPathForRoute(path))
}
