"use client"

import { motion } from "motion/react"
import type { CSSProperties, ReactNode } from "react"
import { rewardMotionTokens } from "../../motion/tokens"
import { useEffectActivity } from "../../runtime/useEffectActivity"
import styles from "./EffectFrame.module.css"

export default function EffectFrame({
    children,
    className,
    opacity,
    preview = false,
    animated = true,
}: {
    children?: ReactNode
    className: string
    opacity: number
    preview?: boolean
    animated?: boolean
}) {
    const { shouldAnimate } = useEffectActivity()
    const isActive = animated && shouldAnimate

    return (
        <motion.div
            aria-hidden="true"
            className={`${styles.frame} ${preview ? styles.preview : styles.dashboard} ${className}`}
            style={{
                "--reward-animation-state": isActive ? "running" : "paused",
            } as CSSProperties}
            initial={{ opacity }}
            animate={{ opacity }}
            exit={{ opacity: 0 }}
            transition={{
                duration: preview
                    ? rewardMotionTokens.duration.fast
                    : rewardMotionTokens.duration.slow,
                ease: rewardMotionTokens.easing.smooth,
            }}
        >
            {children}
        </motion.div>
    )
}
