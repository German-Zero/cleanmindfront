"use client"

import {
    LazyMotion,
    MotionConfig,
    domAnimation,
    m,
    useReducedMotion,
} from "motion/react"
import type { ReactNode } from "react"
import {
    landingMotionTokens,
    landingViewport,
} from "../motion/tokens"
import styles from "./LandingMotion.module.css"

interface RevealProps {
    children: ReactNode
    className?: string
    delay?: number
}

export function ScrollProgress() {
    return (
        <div className={styles.scrollTrack} aria-hidden="true">
            <span className={styles.scrollFill} />
        </div>
    )
}

export function Reveal({
    children,
    className = "",
    delay = 0,
}: RevealProps) {
    const prefersReducedMotion = Boolean(useReducedMotion())
    const safeDelay = Math.min(Math.max(delay, 0), 0.48)

    return (
        <LazyMotion features={domAnimation} strict>
            <MotionConfig reducedMotion="user">
                <m.div
                    className={`${styles.reveal} ${className}`.trim()}
                    initial={prefersReducedMotion
                        ? { opacity: 1 }
                        : {
                            opacity: 0,
                            y: landingMotionTokens.distance.reveal,
                        }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={landingViewport}
                    transition={{
                        duration: prefersReducedMotion
                            ? landingMotionTokens.duration.fast
                            : landingMotionTokens.duration.normal,
                        ease: landingMotionTokens.easing.smooth,
                        delay: prefersReducedMotion ? 0 : safeDelay,
                    }}
                >
                    {children}
                </m.div>
            </MotionConfig>
        </LazyMotion>
    )
}
