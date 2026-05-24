'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'

export function Layout({
    children,
}: {
    children: React.ReactNode
}): React.ReactElement {
    const pathname = usePathname()

    return (
        <>
            <div className="fixed inset-0 flex justify-center sm:px-8">
                <div className="flex w-full max-w-7xl lg:px-8">
                    <div className="site-shell w-full" />
                </div>
            </div>
            <div className="relative flex w-full flex-col">
                <Header />
                <AnimatePresence mode="wait">
                    <motion.main
                        key={pathname}
                        id="main-content"
                        tabIndex={-1}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.3,
                            ease: 'easeInOut',
                        }}
                        className="flex-auto focus:outline-none"
                    >
                        {children}
                    </motion.main>
                </AnimatePresence>
                <Footer />
            </div>
        </>
    )
}
