'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'

function clamp(number: number, a: number, b: number): number {
    const min = Math.min(a, b)
    const max = Math.max(a, b)
    return Math.min(Math.max(number, min), max)
}

export function useHeaderScroll(): {
    headerRef: React.RefObject<HTMLDivElement | null>
    avatarRef: React.RefObject<HTMLDivElement | null>
    isHomePage: boolean
} {
    const isHomePage = usePathname() === '/'
    const headerRef = useRef<HTMLDivElement>(null)
    const avatarRef = useRef<HTMLDivElement>(null)
    const isInitial = useRef(true)

    useEffect(() => {
        const upDelay = 64

        function getDownDelay(): number {
            return avatarRef.current?.offsetTop ?? 0
        }

        function setProperty(property: string, value: string): void {
            document.documentElement.style.setProperty(property, value)
        }

        function removeProperty(property: string): void {
            document.documentElement.style.removeProperty(property)
        }

        function updateHeaderStyles(): void {
            if (!headerRef.current) {
                return
            }

            const downDelay = getDownDelay()
            const { top, height } = headerRef.current.getBoundingClientRect()
            const scrollY = clamp(
                window.scrollY,
                0,
                document.body.scrollHeight - window.innerHeight,
            )

            if (isInitial.current) {
                setProperty('--header-position', 'sticky')
            }

            setProperty('--content-offset', `${downDelay}px`)

            if (isInitial.current || scrollY < downDelay) {
                setProperty('--header-height', `${downDelay + height}px`)
                setProperty('--header-mb', `${-downDelay}px`)
            } else if (top + height < -upDelay) {
                const offset = Math.max(height, scrollY - upDelay)
                setProperty('--header-height', `${offset}px`)
                setProperty('--header-mb', `${height - offset}px`)
            } else if (top === 0) {
                setProperty('--header-height', `${scrollY + height}px`)
                setProperty('--header-mb', `${-scrollY}px`)
            }

            if (top === 0 && scrollY > 0 && scrollY >= downDelay) {
                setProperty('--header-inner-position', 'fixed')
                removeProperty('--header-top')
                removeProperty('--avatar-top')
            } else {
                removeProperty('--header-inner-position')
                setProperty('--header-top', '0px')
                setProperty('--avatar-top', '0px')
            }
        }

        function updateAvatarStyles(): void {
            const downDelay = getDownDelay()

            if (!isHomePage || downDelay <= 0) {
                removeProperty('--avatar-image-transform')
                removeProperty('--avatar-border-transform')
                removeProperty('--avatar-border-opacity')
                return
            }

            const fromScale = 1
            const toScale = 36 / 64
            const fromX = 0
            const toX = 2 / 16

            const scrollY = downDelay - window.scrollY

            let scale = (scrollY * (fromScale - toScale)) / downDelay + toScale
            scale = clamp(scale, fromScale, toScale)

            let x = (scrollY * (fromX - toX)) / downDelay + toX
            x = clamp(x, fromX, toX)

            setProperty(
                '--avatar-image-transform',
                `translate3d(${x}rem, 0, 0) scale(${scale})`,
            )

            const borderScale = 1 / (toScale / scale)
            const borderX = (-toX + x) * borderScale
            const borderTransform = `translate3d(${borderX}rem, 0, 0) scale(${borderScale})`

            setProperty('--avatar-border-transform', borderTransform)
            setProperty(
                '--avatar-border-opacity',
                scale === toScale ? '1' : '0',
            )
        }

        function updateStyles(): void {
            updateHeaderStyles()
            updateAvatarStyles()
            isInitial.current = false
        }

        updateStyles()
        window.addEventListener('scroll', updateStyles, { passive: true })
        window.addEventListener('resize', updateStyles)

        return () => {
            window.removeEventListener('scroll', updateStyles)
            window.removeEventListener('resize', updateStyles)
        }
    }, [isHomePage])

    return { headerRef, avatarRef, isHomePage }
}

export function useMounted(): boolean {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        const frame = requestAnimationFrame(() => setMounted(true))
        return () => cancelAnimationFrame(frame)
    }, [])

    return mounted
}
