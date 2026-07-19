export interface ExperienceItem {
    key: string
    company: string
    title: string
    startLabel: string
    startDateTime: string
    endLabel: string
    endDateTime: string
    location?: string
    bullets?: string[]
}

export interface ProjectItem {
    key: string
    name: string
    description: string
    href: string
    label: string
}

export const workExperience: ExperienceItem[] = [
    {
        key: 'mabyduck',
        company: 'Mabyduck',
        title: 'Staff Engineer',
        startLabel: 'April 2025',
        startDateTime: '2025-04',
        endLabel: 'Present',
        endDateTime: new Date().getFullYear().toString(),
        location: 'London Area, UK',
        bullets: [
            'Lead delivery quality and release engineering for product work.',
            'Reduce engineering friction across the stack.',
        ],
    },
    {
        key: 'developerfy',
        company: 'Developerfy',
        title: 'Owner',
        startLabel: 'March 2024',
        startDateTime: '2024-03',
        endLabel: 'Present',
        endDateTime: new Date().getFullYear().toString(),
        location: 'Greater Bristol Area, UK',
        bullets: ['Take on selected contract and consulting work.'],
    },
    {
        key: 'google',
        company: 'Google',
        title: 'Full-stack Developer - Contract',
        startLabel: 'August 2024',
        startDateTime: '2024-08',
        endLabel: 'December 2024',
        endDateTime: '2024-12',
        location: 'London Area, UK',
        bullets: [
            'Contributed to the DeepMind Django and Wagtail codebase.',
            'Worked on CMS structure, frontend components, and search.',
        ],
    },
    {
        key: 'torchbox',
        company: 'Torchbox',
        title: 'Software Developer',
        startLabel: 'September 2019',
        startDateTime: '2019-09',
        endLabel: 'March 2024',
        endDateTime: '2024-03',
        location: 'Greater Bristol Area, UK',
        bullets: [
            'Four years of Django and Wagtail delivery for charities and public-sector teams.',
            'Long-running work for the NHS and Samaritans across content and donation journeys.',
        ],
    },
]

export const clientProjects: ProjectItem[] = [
    {
        key: 'mabyduck',
        name: 'Mabyduck',
        description:
            'Product and platform work focused on reliability and steady shipping.',
        href: 'https://mabyduck.com',
        label: 'mabyduck.com',
    },
    {
        key: 'google',
        name: 'Google DeepMind',
        description:
            'Django and Wagtail work on deepmind.google: CMS structure, frontend components, search, and releases.',
        href: 'https://deepmind.google/',
        label: 'deepmind.google',
    },
    {
        key: 'valeursport',
        name: 'ValeurSport',
        description:
            'Django and Next.js platform supporting fair-pay advocacy in women’s sport, with practical editorial workflows.',
        href: 'http://www.app.valeursport.com',
        label: 'app.valeursport.com',
    },
    {
        key: 'docsociety',
        name: 'The Doc Society',
        description:
            'Django and Wagtail CMS work to smooth out publishing workflows.',
        href: 'https://docsociety.org/',
        label: 'docsociety.org',
    },
    {
        key: 'rff',
        name: 'Resource for the Future',
        description:
            'Django and Wagtail delivery for a policy and research platform with complex publishing requirements.',
        href: 'https://rff.org/',
        label: 'rff.org',
    },
    {
        key: 'tna',
        name: 'The National Archives',
        description:
            'Frontend behaviour, CMS features, and content modelling on nationalarchives.gov.uk.',
        href: 'https://www.nationalarchives.gov.uk/',
        label: 'nationalarchives.gov.uk',
    },
    {
        key: 'samaritans',
        name: 'Samaritans UK (Torchbox)',
        description:
            'Long-running Django and Wagtail work across content operations, donation journeys, and platform maintenance.',
        href: 'https://www.samaritans.org/',
        label: 'www.samaritans.org',
    },
]

export const openSourceContributions: ProjectItem[] = [
    {
        key: 'lazydjango',
        name: 'lazydjango',
        description:
            'Keyboard-first TUI for Django projects, focused on day-to-day workflows and data operations.',
        href: 'https://github.com/William-Blackie/lazydjango',
        label: 'github.com/William-Blackie/lazydjango',
    },
    {
        key: 'chromeappcap',
        name: 'chromeappcap',
        description:
            'CLI for clean app-window screenshots: native macOS capture with a Playwright fallback for other platforms.',
        href: 'https://github.com/William-Blackie/chromeappcap',
        label: 'github.com/William-Blackie/chromeappcap',
    },
    {
        key: 'django-storybook',
        name: 'django-storybook',
        description:
            'Package for bringing Storybook-style component workflows into Django and template-led teams.',
        href: 'https://github.com/William-Blackie/django_storybook',
        label: 'github.com/William-Blackie/django_storybook',
    },
    {
        key: 'wagtail-org',
        name: 'wagtail/wagtail.org',
        description:
            'Feature and frontend contributions to Wagtail’s main website repository.',
        href: 'https://github.com/wagtail/wagtail.org',
        label: 'github.com/wagtail/wagtail.org',
    },
    {
        key: 'wagtail-torchbox',
        name: 'torchbox/wagtail-torchbox',
        description:
            'Wagtail delivery and frontend behaviour on the Torchbox website codebase.',
        href: 'https://github.com/torchbox/wagtail-torchbox',
        label: 'github.com/torchbox/wagtail-torchbox',
    },
    {
        key: 'wagtail',
        name: 'wagtail/wagtail',
        description:
            'Upstream contributions to Wagtail CMS, including search query handling and platform behaviour.',
        href: 'https://github.com/wagtail/wagtail',
        label: 'github.com/wagtail/wagtail',
    },
    {
        key: 'django-pattern-library',
        name: 'torchbox/django-pattern-library',
        description:
            'Django template tooling and pattern-library workflows used by content teams.',
        href: 'https://github.com/torchbox/django-pattern-library',
        label: 'github.com/torchbox/django-pattern-library',
    },
]

export const resumeSkills = [
    'Python, TypeScript, JavaScript, HTML, CSS (Tailwind, Sass/SCSS)',
    'Django, Wagtail, DRF, React, Next.js, HTMX',
    'PostgreSQL, Redis, SQL, background job systems',
    'Docker, Linux, AWS, GCP, GitHub Actions, Sentry',
    'Testing and quality: Pytest, Ruff, ESLint, Stylelint, Prettier',
]

export const highlightedProjects = [
    {
        name: 'Google DeepMind',
        role: 'Full-stack Contract Engineer',
        bullets: [
            'Contributed to CMS and platform delivery across a large Django/Wagtail codebase.',
            'Supported release quality through stronger delivery practices and technical alignment.',
        ],
    },
    {
        name: 'Resource for the Future',
        role: 'Technical Lead',
        bullets: [
            'Led engineering delivery for a content-heavy policy and research platform.',
            'Improved maintainability through pragmatic architecture and editorial workflows.',
        ],
    },
    {
        name: 'The National Archives',
        role: 'Contract Engineer',
        bullets: [
            'Delivered frontend behaviour and CMS features on the ds-wagtail platform.',
            'Supported accessibility and design-system consistency for public services.',
        ],
    },
    {
        name: 'Samaritans UK',
        role: 'Contributor',
        bullets: [
            'Delivered long-running Django/Wagtail improvements across content and donation journeys.',
            'Supported ongoing platform upgrades and maintenance for sustainable delivery.',
        ],
    },
]

export const resumeAwards = [
    "University of the West of England, Dean's List for academic excellence",
    'NMI - Award for innovative use of AI',
]

export const volunteering = {
    role: 'Coach – Coders of Colour',
    date: 'October 2021',
    bullets: [
        'Mentoring and coaching under-represented young coders.',
        'Facilitating workshops to inspire the next generation.',
    ],
}
