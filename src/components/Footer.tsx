import Link from 'next/link'

import { ContainerInner, ContainerOuter } from '@/components/Container'

function NavLink({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className="hover:text-ctp-blue mocha:hover:text-ctp-pink transition"
    >
      {children}
    </Link>
  )
}

export function Footer() {
  return (
    <footer className="mt-32 flex-none">
      <ContainerOuter>
        <div className="border-ctp-surface0/70 border-t pt-10 pb-16">
          <ContainerInner>
            <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
              <div className="text-ctp-text flex flex-wrap justify-center gap-x-6 gap-y-1 text-sm font-medium">
                <NavLink href="/about">About</NavLink>
                <NavLink href="/projects">Projects</NavLink>
                <NavLink href="/articles">Blog</NavLink>
                <NavLink href="/tech">Tech</NavLink>
              </div>
              <p className="text-ctp-subtext1 text-sm">
                &copy; {new Date().getFullYear()} William Blackie. All rights
                reserved.
              </p>
            </div>
          </ContainerInner>
        </div>
      </ContainerOuter>
    </footer>
  )
}
