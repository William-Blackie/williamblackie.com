'use client'

import { motion, useScroll, useSpring } from 'framer-motion'

export function ScrollGoose() {
    const { scrollYProgress } = useScroll()
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    })

    // Removed state and useEffect for mounting as Framer Motion handles it
    // and it avoids the setState-in-effect error.

    return (
        <div className="fixed top-0 left-0 right-0 h-1 z-[100] pointer-events-none">
            <motion.div
                className="h-full bg-ctp-blue dark:bg-ctp-pink origin-left"
                style={{ scaleX }}
            />
            <motion.div
                className="absolute top-0 text-xl -mt-2"
                style={{
                    left: '100%',
                    x: '-50%',
                }}
                animate={{
                    rotate: [0, -10, 10, -10, 0],
                    y: [0, -2, 2, -2, 0],
                }}
                transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: 'linear',
                }}
            >
                🪿
            </motion.div>
        </div>
    )
}
