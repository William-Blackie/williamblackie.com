'use client'

import Link from 'next/link'

import { ContainerInner, ContainerOuter } from '@/components/Container'
import { GooseInteraction } from '@/components/GooseInteraction'

export function Footer(): React.ReactElement {
    return (
        <footer className="mt-16 flex-none sm:mt-24">
            <ContainerOuter>
                <div className="border-ctp-surface0/70 border-t pt-10 pb-12">
                    <ContainerInner>
                        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
                            <nav aria-label="Footer navigation">
                                <ul className="text-ctp-text flex flex-wrap justify-center gap-x-6 gap-y-1 text-sm font-medium">
                                    <li>
                                        <Link
                                            href="/about"
                                            className="theme-focus hover:text-ctp-blue dark:hover:text-ctp-pink rounded-md px-1 transition-colors duration-300"
                                        >
                                            About
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/projects"
                                            className="theme-focus hover:text-ctp-blue dark:hover:text-ctp-pink rounded-md px-1 transition-colors duration-300"
                                        >
                                            Projects
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/articles"
                                            className="theme-focus hover:text-ctp-blue dark:hover:text-ctp-pink rounded-md px-1 transition-colors duration-300"
                                        >
                                            Blog
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/tech"
                                            className="theme-focus hover:text-ctp-blue dark:hover:text-ctp-pink rounded-md px-1 transition-colors duration-300"
                                        >
                                            Tech
                                        </Link>
                                    </li>
                                </ul>
                            </nav>
                            <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
                                <GooseInteraction />
                                <p className="text-ctp-subtext1 text-sm">
                                    &copy; {new Date().getFullYear()} William
                                    Blackie. All rights reserved.
                                </p>
                            </div>
                        </div>
                    </ContainerInner>
                </div>
            </ContainerOuter>
        </footer>
    )
}
