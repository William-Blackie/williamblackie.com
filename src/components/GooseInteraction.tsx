'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function GooseInteraction() {
    const [isHonking, setIsHonking] = useState(false)

    const honk = () => {
        if (isHonking) return
        setIsHonking(true)
        setTimeout(() => setIsHonking(false), 1500)
    }

    return (
        <div className="relative flex items-center justify-center">
            <AnimatePresence>
                {isHonking && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.5 }}
                        animate={{ opacity: 1, y: -25, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        className="absolute -top-8 left-1/2 -translate-x-1/2 pointer-events-none"
                        role="status"
                        aria-live="polite"
                    >
                        <div className="bg-ctp-surface0 text-ctp-text px-2 py-1 rounded-lg text-xs font-bold border border-ctp-surface1 shadow-sm whitespace-nowrap">
                            HONK!
                        </div>
                        <div className="w-2 h-2 bg-ctp-surface0 border-r border-b border-ctp-surface1 rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2" />
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                type="button"
                onClick={honk}
                whileHover={{
                    y: [0, -2, 0, -2, 0],
                    rotate: [0, -5, 5, -5, 0],
                }}
                transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    repeatType: 'mirror',
                }}
                className="text-2xl cursor-pointer select-none opacity-40 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
                aria-label="Mabyduck goose. Click for a honk."
                title="Mabyduck Goose"
            >
                <span aria-hidden="true">🪿</span>
            </motion.button>
        </div>
    )
}
