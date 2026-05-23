'use client'

import Image from 'next/image'
import Link from 'next/link'
import type { Route } from 'next'
import { useState } from 'react'
import { useTheme } from 'next-themes'
import clsx from 'clsx'

import { usePathname } from 'next/navigation'

import { Container } from '@/components/Container'
import avatarImage from '@/static/imgs/photos/image-3.jpg'
import {
    CloseIcon,
    ChevronDownIcon,
    MoonIcon,
    SunIcon,
} from '@/components/GeneralIcons'
import { useHeaderScroll, useMounted } from '@/hooks/useHeaderScroll'

function MobileNavItem({
    href,
    children,
    onClick,
}: {
    href: Route
    children: React.ReactNode
    onClick: () => void
}): React.ReactElement {
    return (
        <li>
            <Link href={href} className="block py-2" onClick={onClick}>
                {children}
            </Link>
        </li>
    )
}

function MobileNavigation(
    props: React.ComponentPropsWithoutRef<'div'>,
): React.ReactElement {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div {...props}>
            <button
                type="button"
                aria-expanded={isOpen}
                aria-controls="mobile-navigation"
                className="group bg-ctp-mantle/90 text-ctp-text shadow-ctp-crust/10 ring-ctp-surface0/80 hover:ring-ctp-blue/40 dark:hover:ring-ctp-pink/40 flex items-center rounded-full px-4 py-2 text-sm font-medium shadow-lg ring-1 backdrop-blur"
                onClick={() => setIsOpen(true)}
            >
                Menu
                <ChevronDownIcon className="stroke-ctp-subtext1 group-hover:stroke-ctp-blue dark:group-hover:stroke-ctp-pink ml-3 h-auto w-2" />
            </button>
            {isOpen && (
                <>
                    <button
                        type="button"
                        aria-label="Close menu"
                        className="bg-ctp-crust/75 fixed inset-0 z-50 backdrop-blur-sm"
                        onClick={() => setIsOpen(false)}
                    />
                    <div
                        id="mobile-navigation"
                        className="bg-ctp-mantle ring-ctp-surface0/80 fixed inset-x-4 top-8 z-50 origin-top rounded-3xl p-8 ring-1"
                    >
                        <div className="flex flex-row-reverse items-center justify-between">
                            <button
                                type="button"
                                aria-label="Close menu"
                                className="-m-1 p-1"
                                onClick={() => setIsOpen(false)}
                            >
                                <CloseIcon className="text-ctp-subtext1 h-6 w-6" />
                            </button>
                            <h2 className="text-ctp-subtext1 text-sm font-medium">
                                Navigation
                            </h2>
                        </div>
                        <nav className="mt-6">
                            <ul className="divide-ctp-surface0 text-ctp-text -my-2 divide-y text-base">
                                <MobileNavItem
                                    href="/about"
                                    onClick={() => setIsOpen(false)}
                                >
                                    About
                                </MobileNavItem>
                                <MobileNavItem
                                    href="/projects"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Projects
                                </MobileNavItem>
                                <MobileNavItem
                                    href="/articles"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Blog
                                </MobileNavItem>
                                <MobileNavItem
                                    href="/tech"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Tech
                                </MobileNavItem>
                            </ul>
                        </nav>
                    </div>
                </>
            )}
        </div>
    )
}

function NavItem({
    href,
    children,
}: {
    href: Route
    children: React.ReactNode
}): React.ReactElement {
    const pathname = usePathname()
    const isActive = pathname === href || pathname.startsWith(`${href}/`)

    return (
        <li>
            <Link
                href={href}
                className={clsx(
                    'relative block px-3 py-2 transition',
                    isActive ?
                        'text-ctp-text font-semibold'
                    :   'hover:text-ctp-blue dark:hover:text-ctp-pink',
                )}
            >
                {children}
                {isActive && (
                    <span className="from-ctp-blue/0 via-ctp-blue/45 to-ctp-blue/0 dark:from-ctp-pink/0 dark:via-ctp-pink/40 dark:to-ctp-pink/0 absolute inset-x-1 -bottom-px h-px bg-linear-to-r" />
                )}
            </Link>
        </li>
    )
}

function DesktopNavigation(
    props: React.ComponentPropsWithoutRef<'nav'>,
): React.ReactElement {
    return (
        <nav {...props}>
            <ul className="bg-ctp-mantle/90 text-ctp-text shadow-ctp-crust/10 ring-ctp-surface0/80 flex rounded-full px-3 text-sm font-medium shadow-lg ring-1 backdrop-blur">
                <NavItem href="/about">About</NavItem>
                <NavItem href="/projects">Projects</NavItem>
                <NavItem href="/articles">Blog</NavItem>
                <NavItem href="/tech">Tech</NavItem>
            </ul>
        </nav>
    )
}

function ThemeToggle(): React.ReactElement {
    const { resolvedTheme, setTheme } = useTheme()
    const mounted = useMounted()

    function toggleTheme(): void {
        setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
    }

    const isLight = resolvedTheme !== 'dark'
    const label = isLight ? 'Latte (light)' : 'Mocha (dark)'
    const nextLabel = isLight ? 'Mocha (dark)' : 'Latte (light)'

    return (
        <button
            type="button"
            aria-label={
                mounted ?
                    `Current: ${label}. Click for ${nextLabel}`
                :   'Toggle theme'
            }
            title={mounted ? `Catppuccin ${label}` : undefined}
            className="group bg-ctp-mantle/90 shadow-ctp-crust/10 ring-ctp-surface0/80 hover:ring-ctp-blue/50 dark:hover:ring-ctp-pink/50 flex h-10 w-10 items-center justify-center rounded-full shadow-lg ring-1 backdrop-blur transition hover:cursor-pointer"
            onClick={toggleTheme}
        >
            {mounted ?
                isLight ?
                    <SunIcon className="fill-ctp-yellow stroke-ctp-subtext1 group-hover:fill-ctp-peach group-hover:stroke-ctp-blue dark:group-hover:stroke-ctp-pink h-6 w-6 transition" />
                :   <MoonIcon className="fill-ctp-lavender stroke-ctp-subtext1 group-hover:stroke-ctp-blue dark:group-hover:stroke-ctp-pink h-6 w-6 transition" />

            :   <SunIcon className="fill-ctp-yellow stroke-ctp-subtext1 h-6 w-6" />
            }
        </button>
    )
}

function AvatarContainer({
    className,
    ...props
}: React.ComponentPropsWithoutRef<'div'>): React.ReactElement {
    return (
        <div
            className={clsx(
                className,
                'bg-ctp-mantle/90 shadow-ctp-crust/10 ring-ctp-surface0/80 h-10 w-10 rounded-full p-0.5 shadow-lg ring-1 backdrop-blur',
            )}
            {...props}
        />
    )
}

function Avatar({
    large = false,
    className,
    ...props
}: Omit<React.ComponentPropsWithoutRef<typeof Link>, 'href'> & {
    large?: boolean
}): React.ReactElement {
    return (
        <Link
            href="/"
            aria-label="Home"
            className={clsx(className, 'pointer-events-auto')}
            {...props}
        >
            <Image
                src={avatarImage}
                alt=""
                sizes={large ? '4rem' : '2.25rem'}
                className={clsx(
                    'bg-ctp-surface0 rounded-full object-cover',
                    large ? 'h-16 w-16' : 'h-9 w-9',
                )}
            />
        </Link>
    )
}

export function Header(): React.ReactElement {
    const { headerRef, avatarRef, isHomePage } = useHeaderScroll()

    return (
        <>
            <header
                className="pointer-events-none relative z-50 flex flex-none flex-col"
                style={{
                    height: 'var(--header-height)',
                    marginBottom: 'var(--header-mb)',
                }}
            >
                {isHomePage && (
                    <>
                        <div
                            ref={avatarRef}
                            className="order-last mt-[calc(--spacing(16)-(--spacing(3)))]"
                        />
                        <Container
                            className="top-0 order-last -mb-3 pt-3"
                            style={{
                                position:
                                    'var(--header-position)' as React.CSSProperties['position'],
                            }}
                        >
                            <div
                                className="top-(--avatar-top,--spacing(3)) w-full"
                                style={{
                                    position:
                                        'var(--header-inner-position)' as React.CSSProperties['position'],
                                }}
                            >
                                <div className="relative">
                                    <AvatarContainer
                                        className="absolute top-3 left-0 origin-left transition-opacity"
                                        style={{
                                            opacity:
                                                'var(--avatar-border-opacity, 0)',
                                            transform:
                                                'var(--avatar-border-transform)',
                                        }}
                                    />
                                    <Avatar
                                        large
                                        className="block h-16 w-16 origin-left"
                                        style={{
                                            transform:
                                                'var(--avatar-image-transform)',
                                        }}
                                    />
                                </div>
                            </div>
                        </Container>
                    </>
                )}
                <div
                    ref={headerRef}
                    className="top-0 z-10 h-16 pt-6"
                    style={{
                        position:
                            'var(--header-position)' as React.CSSProperties['position'],
                    }}
                >
                    <Container
                        className="top-(--header-top,--spacing(6)) w-full"
                        style={{
                            position:
                                'var(--header-inner-position)' as React.CSSProperties['position'],
                        }}
                    >
                        <div className="relative flex gap-4">
                            <div className="flex flex-1">
                                {!isHomePage && (
                                    <AvatarContainer>
                                        <Avatar />
                                    </AvatarContainer>
                                )}
                            </div>
                            <div className="flex flex-1 justify-end md:justify-center">
                                <MobileNavigation className="pointer-events-auto md:hidden" />
                                <DesktopNavigation className="pointer-events-auto hidden md:block" />
                            </div>
                            <div className="flex justify-end md:flex-1">
                                <div className="pointer-events-auto">
                                    <ThemeToggle />
                                </div>
                            </div>
                        </div>
                    </Container>
                </div>
            </header>
            {isHomePage && (
                <div
                    className="flex-none"
                    style={{ height: 'var(--content-offset)' }}
                />
            )}
        </>
    )
}
