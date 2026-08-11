"use client"

import { motion } from "motion/react"
import type { RewardEffectProps } from "../../core/types"
import { rewardMotionTokens } from "../../motion/tokens"
import { useEffectActivity } from "../../runtime/useEffectActivity"
import styles from "./BloomRing.module.css"

const flowers = [
    [50, 4, 0], [82, 18, 42], [97, 49, 88], [82, 82, 132],
    [50, 97, 180], [18, 82, 224], [3, 49, 270], [18, 18, 314],
] as const

export default function BloomRing({
    item,
    preview = false,
    animated = true,
}: RewardEffectProps) {
    const { shouldAnimate } = useEffectActivity()
    const isActive = animated && shouldAnimate
    const [leaf = "#82D8C2", blossom = "#F3A6C8", center = "#FFE7A3"] = item.colors

    return (
        <motion.svg
            aria-hidden="true"
            className={`${styles.ring} ${preview ? styles.preview : styles.timer}`}
            viewBox="-14 -14 128 128"
            focusable="false"
            initial={false}
            animate={!isActive ? {
                opacity: rewardMotionTokens.opacity.rest,
                scale: rewardMotionTokens.scale.rest,
            } : {
                opacity: [...rewardMotionTokens.opacity.bloom],
                scale: [...rewardMotionTokens.scale.bloom],
            }}
            transition={!isActive ? {
                duration: rewardMotionTokens.duration.fast,
            } : {
                duration: rewardMotionTokens.duration.ambientBloom,
                ease: rewardMotionTokens.easing.standard,
                repeat: Infinity,
            }}
        >
            <defs>
                <radialGradient id="bloom-halo">
                    <stop offset="0" stopColor={blossom} stopOpacity="0.18" />
                    <stop offset="0.62" stopColor={leaf} stopOpacity="0.08" />
                    <stop offset="1" stopColor={leaf} stopOpacity="0" />
                </radialGradient>
            </defs>

            <circle cx="50" cy="50" r="61" fill="url(#bloom-halo)" />
            <motion.g
                className={styles.botanicalLayer}
                initial={false}
                animate={isActive ? {
                    rotate: [...rewardMotionTokens.rotation.bloom],
                } : {
                    rotate: rewardMotionTokens.rotation.rest,
                }}
                transition={isActive ? {
                    duration: rewardMotionTokens.duration.ambientLong,
                    ease: rewardMotionTokens.easing.standard,
                    repeat: Infinity,
                } : {
                    duration: rewardMotionTokens.duration.fast,
                }}
                style={{ transformOrigin: "50px 50px" }}
            >
                <circle
                    cx="50"
                    cy="50"
                    r="48"
                    fill="none"
                    stroke={leaf}
                    strokeOpacity="0.24"
                    strokeWidth="1.2"
                    strokeDasharray="2 7"
                />
                <path
                    d="M16 54C22 27 41 13 62 14c22 1 38 18 39 39 1 24-16 43-39 46-24 3-44-13-48-35"
                    fill="none"
                    stroke={leaf}
                    strokeOpacity="0.34"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                />

                {flowers.map(([x, y, rotation], index) => {
                    const color = item.colors[index % item.colors.length] ?? blossom
                    return (
                        <g
                            key={`${x}-${y}`}
                            className={styles.flower}
                            transform={`translate(${x} ${y}) rotate(${rotation})`}
                            style={{ color }}
                        >
                            <ellipse cx="0" cy="-4.4" rx="2.5" ry="4.5" />
                            <ellipse cx="0" cy="-4.4" rx="2.5" ry="4.5" transform="rotate(72)" />
                            <ellipse cx="0" cy="-4.4" rx="2.5" ry="4.5" transform="rotate(144)" />
                            <ellipse cx="0" cy="-4.4" rx="2.5" ry="4.5" transform="rotate(216)" />
                            <ellipse cx="0" cy="-4.4" rx="2.5" ry="4.5" transform="rotate(288)" />
                            <circle r="2.1" fill={center} />
                        </g>
                    )
                })}

                <g className={styles.leaves} fill={leaf}>
                    <ellipse cx="27" cy="20" rx="2.3" ry="5.2" transform="rotate(-42 27 20)" />
                    <ellipse cx="75" cy="17" rx="2.3" ry="5.2" transform="rotate(38 75 17)" />
                    <ellipse cx="91" cy="67" rx="2.3" ry="5.2" transform="rotate(68 91 67)" />
                    <ellipse cx="31" cy="91" rx="2.3" ry="5.2" transform="rotate(48 31 91)" />
                </g>
            </motion.g>
        </motion.svg>
    )
}
