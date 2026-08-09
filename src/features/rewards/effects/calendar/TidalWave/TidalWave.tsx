"use client"

import { motion, useReducedMotion } from "motion/react"
import type { RewardEffectProps } from "../../types"
import styles from "./TidalWave.module.css"

export default function TidalWave({ item, preview = false }: RewardEffectProps) {
    const shouldReduceMotion = useReducedMotion()
    const gradient = `linear-gradient(90deg, transparent 0%, ${item.colors[0]}22 24%, ${item.colors[1]}58 58%, ${item.colors[2]}32 78%, transparent 100%)`

    return (
        <motion.span
            aria-hidden="true"
            className={`${styles.wave} ${preview ? styles.preview : styles.calendar}`}
            style={{ background: gradient }}
            initial={{ opacity: 0 }}
            animate={shouldReduceMotion ? { opacity: 0.16 } : {
                opacity: [0, 0, 0.22, 0.46, 0],
                x: ["0%", "0%", "70%", "300%", "440%"],
            }}
            transition={shouldReduceMotion ? { duration: 0.2 } : {
                duration: preview ? 4.4 : 16,
                times: preview ? [0, 0.18, 0.4, 0.7, 1] : [0, 0.66, 0.7, 0.84, 1],
                ease: "easeInOut",
                repeat: Infinity,
            }}
        />
    )
}
