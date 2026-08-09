"use client"

import { motion, useReducedMotion } from "motion/react"
import type { RewardEffectProps } from "../../types"
import styles from "./BloomRing.module.css"

const flowerPositions = [
    ["50%", "0%"], ["84%", "16%"], ["100%", "50%"], ["78%", "88%"],
    ["48%", "100%"], ["12%", "82%"], ["0%", "46%"], ["18%", "14%"],
] as const

export default function BloomRing({ item, preview = false }: RewardEffectProps) {
    const shouldReduceMotion = useReducedMotion()

    return (
        <motion.span
            aria-hidden="true"
            className={`${styles.ring} ${preview ? styles.preview : styles.timer}`}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={shouldReduceMotion ? { opacity: 0.82, scale: 1, rotate: 0 } : {
                opacity: [0.72, 1, 0.72],
                scale: [0.97, 1.03, 0.97],
                rotate: [-2, 2, -2],
            }}
            exit={{ opacity: 0 }}
            transition={shouldReduceMotion ? { duration: 0.2 } : {
                duration: 6,
                ease: "easeInOut",
                repeat: Infinity,
            }}
        >
            <span className={styles.orbit} />
            {flowerPositions.map(([left, top], index) => (
                <span
                    key={`${left}-${top}`}
                    className={styles.flower}
                    style={{
                        left,
                        top,
                        color: item.colors[index % item.colors.length],
                    }}
                >
                    <span />
                </span>
            ))}
        </motion.span>
    )
}
