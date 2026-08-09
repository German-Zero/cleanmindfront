"use client"

import { motion } from "motion/react"
import type { ReactNode } from "react"
import styles from "./EffectFrame.module.css"

export default function EffectFrame({
    children,
    className,
    opacity,
    preview = false,
}: {
    children?: ReactNode
    className: string
    opacity: number
    preview?: boolean
}) {
    return (
        <motion.div
            aria-hidden="true"
            className={`${styles.frame} ${preview ? styles.preview : styles.dashboard} ${className}`}
            initial={{ opacity: 0 }}
            animate={{ opacity }}
            exit={{ opacity: 0 }}
            transition={{ duration: preview ? 0.25 : 0.55, ease: "easeOut" }}
        >
            {children}
        </motion.div>
    )
}
