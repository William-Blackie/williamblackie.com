'use client'

import Image, { type ImageProps } from 'next/image'
import clsx from 'clsx'
import { motion } from 'framer-motion'
import { Container } from '@/components/Container'
import {
    GitHubIcon,
    MastodonIcon,
    LinkedInIcon,
} from '@/components/SocialIcons'
import { BriefcaseIcon, MailIcon } from '@/components/GeneralIcons'
import { SurfaceCard } from '@/components/PagePrimitives'
import { SocialLink } from '@/components/SocialLink'
import { InternalExternalLink } from '@/components/InternalExternalLink'

import image1 from '@/static/imgs/photos/paint-night.jpg'
import image2 from '@/static/imgs/photos/porto.jpg'
import image3 from '@/static/imgs/photos/sam-wedding.jpg'
import image4 from '@/static/imgs/photos/mabyduck.jpeg'
import image5 from '@/static/imgs/photos/djangocon-eu-2026.jpg'

import logoDeveloperfy from '@/static/imgs/logos/developerfy.svg'
import logoGoogle from '@/static/imgs/logos/google.svg'
import logoTorchbox from '@/static/imgs/logos/tbx.svg'
import logoMabyDuck from '@/static/imgs/logos/mabyduck.png'

import { workExperience } from '@/lib/profile-content'

interface RoleProps {
    company: string
    title: string
    logo: ImageProps['src']
    start: string | { label: string; dateTime: string }
    end: string | { label: string; dateTime: string }
    bullets?: string[]
}

function Role({ role }: { role: RoleProps }): React.ReactElement {
    const startLabel =
        typeof role.start === 'string' ? role.start : role.start.label
    const startDate =
        typeof role.start === 'string' ? role.start : role.start.dateTime

    const endLabel = typeof role.end === 'string' ? role.end : role.end.label
    const endDate = typeof role.end === 'string' ? role.end : role.end.dateTime

    return (
        <div className="group/role relative flex flex-col gap-3 rounded-xl p-3 -mx-3">
            <div className="flex items-start gap-4">
                <div className="bg-ctp-mantle shadow-ctp-crust/10 ring-ctp-surface0/80 relative flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md ring-1">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full p-1.5 dark:bg-ctp-text/90 dark:ring-ctp-text/15 dark:ring-1">
                        <Image
                            src={role.logo}
                            alt=""
                            sizes="2.5rem"
                            className="h-full w-full object-contain"
                        />
                    </div>
                </div>
                <dl className="flex flex-auto flex-wrap gap-x-3 sm:flex">
                    <dt className="sr-only">Company</dt>
                    <dd className="text-ctp-text w-full flex-none text-sm font-medium">
                        {role.company}
                    </dd>
                    <dt className="sr-only">Role</dt>
                    <dd className="text-ctp-subtext1 text-xs">{role.title}</dd>
                    <dt className="sr-only">Date</dt>
                    <dd
                        className="text-ctp-subtext1 ml-auto whitespace-nowrap text-xs"
                        aria-label={`${startLabel} until ${endLabel}`}
                    >
                        <time dateTime={startDate}>{startLabel}</time>{' '}
                        <span aria-hidden="true">—</span>{' '}
                        <time dateTime={endDate}>{endLabel}</time>
                    </dd>
                </dl>
            </div>
            {role.bullets && role.bullets.length > 0 && (
                <ul className="text-ctp-subtext1 ml-14 list-disc space-y-1.5 pl-4 text-sm">
                    {role.bullets.map((bullet, bulletIndex) => (
                        <li key={bulletIndex}>{bullet}</li>
                    ))}
                </ul>
            )}
        </div>
    )
}

function Resume(): React.ReactElement {
    const logos: Record<string, ImageProps['src']> = {
        mabyduck: logoMabyDuck,
        developerfy: logoDeveloperfy,
        google: logoGoogle,
        torchbox: logoTorchbox,
    }

    const resume: Array<RoleProps> = workExperience.map((role) => {
        const logo = logos[role.key]

        if (!logo) {
            throw new Error(`Missing logo for work experience: ${role.key}`)
        }

        return {
            company: role.company,
            title: role.title,
            logo,
            start: {
                label: role.startLabel,
                dateTime: role.startDateTime,
            },
            end: {
                label: role.endLabel,
                dateTime: role.endDateTime,
            },
            bullets: role.bullets || [],
        }
    })

    return (
        <SurfaceCard className="relative mx-auto max-w-2xl overflow-hidden p-6 sm:p-8">
            <h2 className="text-ctp-text mb-6 flex items-center text-sm font-semibold">
                <BriefcaseIcon className="h-5 w-5 flex-none" />
                <span className="ml-3">Work experience</span>
            </h2>
            <ol className="space-y-3">
                {resume.map((role, roleIndex) => (
                    <Role key={roleIndex} role={role} />
                ))}
            </ol>
        </SurfaceCard>
    )
}

function Photos(): React.ReactElement {
    const rotations = [
        'rotate-2',
        '-rotate-2',
        'rotate-2',
        'rotate-2',
        '-rotate-2',
    ]

    const photoData = [
        {
            image: image2,
            caption: 'Porto',
            details:
                'Probably one of my favourite cities, green wine and sunsets.',
            date: 'March 2023',
        },
        {
            image: image1,
            caption: 'Paint-night',
            details: 'An evening of badly painting a raccoon, with wine.',
            date: 'November 2024',
        },
        {
            image: image3,
            caption: 'A good friend’s wedding',
            details:
                'Best man for a good friend, which meant dressing up for once.',
            date: 'Summer 2025',
        },
        {
            image: image4,
            caption: 'Mabyduck',
            details: 'New team photos. The duck outfit was not optional.',
            date: 'Feb 2026',
        },
        {
            image: image5,
            caption: 'Djangocon Athens',
            details: 'Great talks, and I got to meet old friends.',
            date: '2026',
        },
    ]

    const cardVariants = {
        initial: { y: 0 },
        hover: {
            y: -10,
            zIndex: 10,
            transition: {
                type: 'spring' as const,
                stiffness: 360,
                damping: 28,
            },
        },
    }

    const overlayVariants = {
        initial: { opacity: 0, y: 12 },
        hover: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.22, ease: 'easeOut' as const },
        },
    }

    return (
        <div className="mt-12 sm:mt-16">
            <div className="-my-4 flex justify-center gap-4 overflow-hidden py-4 sm:gap-6">
                {photoData.map((data, index) => (
                    <motion.div
                        key={data.image.src}
                        initial="initial"
                        whileHover="hover"
                        variants={cardVariants}
                        className={clsx(
                            'photo-card group/photo relative aspect-[3/4] w-40 flex-none transform-gpu will-change-transform sm:w-64',
                            rotations[index % rotations.length],
                        )}
                    >
                        <div className="photo-card-frame">
                            <Image
                                src={data.image}
                                alt=""
                                sizes="(min-width: 640px) 16rem, 10rem"
                                className="photo-card-image"
                            />
                            <div className="photo-card-scrim" />
                            <div className="photo-card-sheen" />
                            <motion.div
                                variants={overlayVariants}
                                className="photo-card-caption"
                            >
                                <span className="text-[10px] font-bold tracking-widest text-ctp-blue uppercase dark:text-ctp-pink">
                                    {data.date}
                                </span>
                                <h4 className="mt-1 text-sm font-semibold text-white sm:text-base">
                                    {data.caption}
                                </h4>
                                <p className="mt-1 line-clamp-2 text-xs text-white/80 sm:line-clamp-none">
                                    {data.details}
                                </p>
                            </motion.div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}

export function HomeContent(): React.ReactElement {
    return (
        <>
            <Container className="mt-12 sm:mt-20">
                <div className="max-w-2xl">
                    <h1 className="text-ctp-text text-4xl font-bold tracking-tight sm:text-5xl">
                        William Blackie
                    </h1>
                    <p className="text-ctp-subtext1 mt-6 text-base">
                        I&apos;m a full-stack engineer based in Bristol and
                        London. I build product and platform software with
                        Python (Django, Wagtail) and TypeScript (React,
                        Next.js).
                    </p>
                    <p className="text-ctp-subtext1 mt-6 text-base">
                        I currently work as Staff Engineer at{' '}
                        <InternalExternalLink
                            href="https://mabyduck.com"
                            rel="noopener noreferrer"
                            target="_blank"
                            text="Mabyduck"
                        />
                        , after four years at{' '}
                        <InternalExternalLink
                            href="https://www.torchbox.com"
                            rel="noopener noreferrer"
                            target="_blank"
                            text="Torchbox"
                        />
                        , a contract with Google DeepMind, and freelance work
                        through Developerfy.
                    </p>
                    <p className="text-ctp-subtext1 mt-6 text-base">
                        I write about delivery, tooling, and lessons from real
                        projects on the{' '}
                        <InternalExternalLink href="/articles">
                            blog
                        </InternalExternalLink>
                        .
                    </p>

                    <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
                        <SocialLink
                            href="mailto:will@developerfy.com"
                            srLabel="Send me an email"
                            icon={MailIcon}
                        />
                        <SocialLink
                            href="https://github.com/William-Blackie"
                            srLabel="Follow on GitHub"
                            icon={GitHubIcon}
                        />
                        <SocialLink
                            href="https://www.linkedin.com/in/william-blackie/"
                            srLabel="Follow on LinkedIn"
                            icon={LinkedInIcon}
                        />
                        <SocialLink
                            href="https://mastodon.social/@williamblackie"
                            srLabel="Follow on Mastodon"
                            icon={MastodonIcon}
                        />
                    </ul>
                </div>
            </Container>
            <Photos />
            <Container className="mt-16 sm:mt-24">
                <Resume />
            </Container>
        </>
    )
}
