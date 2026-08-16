"use client"

import { useId } from "react"
import type { MeteorShowerPalette } from "./palette"
import styles from "./MeteorShower.module.css"

const stars = [
    [38, 72, 1.1, 0.48], [82, 194, 0.8, 0.34], [116, 34, 1.4, 0.56],
    [153, 287, 1, 0.42], [188, 126, 0.7, 0.3], [221, 405, 1.3, 0.5],
    [257, 62, 0.9, 0.38], [296, 238, 1.5, 0.58], [334, 111, 0.7, 0.32],
    [372, 354, 1, 0.44], [409, 44, 1.2, 0.52], [448, 184, 0.8, 0.34],
    [483, 427, 1.4, 0.54], [519, 92, 0.9, 0.38], [554, 274, 1.2, 0.48],
    [592, 36, 0.7, 0.32], [628, 378, 1.5, 0.58], [661, 155, 0.8, 0.34],
    [696, 306, 1.1, 0.46], [731, 78, 1.3, 0.54], [766, 221, 0.8, 0.34],
    [57, 451, 1.2, 0.44], [174, 466, 0.8, 0.32], [346, 471, 1.1, 0.42],
    [535, 462, 0.8, 0.34], [752, 438, 1.2, 0.46],
] as const

const meteors = [
    [647, 28, 524, 91, 2.5, 0.96],
    [352, 91, 278, 129, 1.6, 0.76],
    [771, 239, 650, 301, 2.1, 0.86],
    [472, 315, 400, 352, 1.4, 0.66],
    [221, 18, 132, 63, 1.8, 0.78],
    [584, 164, 495, 211, 1.5, 0.72],
    [789, 381, 694, 430, 1.9, 0.82],
    [322, 225, 253, 260, 1.3, 0.64],
    [716, 84, 651, 117, 1.2, 0.62],
    [447, 45, 382, 78, 1.5, 0.7],
    [190, 340, 101, 386, 1.7, 0.74],
    [561, 396, 494, 430, 1.2, 0.6],
] as const

export default function MeteorShowerFallback({
    palette,
    meteorCount,
}: {
    palette: MeteorShowerPalette
    meteorCount: number
}) {
    const uniqueId = useId().replaceAll(":", "")
    const tailId = `meteor-tail-${uniqueId}`
    const glowId = `meteor-glow-${uniqueId}`

    return (
        <svg
            className={styles.fallback}
            viewBox="0 0 800 500"
            preserveAspectRatio="none"
            aria-hidden="true"
        >
            <defs>
                <linearGradient id={tailId} x1="100%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0" stopColor={palette.cool} stopOpacity="0" />
                    <stop offset="0.5" stopColor={palette.cool} stopOpacity="0.34" />
                    <stop offset="0.82" stopColor={palette.warm} stopOpacity="0.72" />
                    <stop offset="1" stopColor={palette.head} stopOpacity="1" />
                </linearGradient>
                <filter id={glowId} x="-60%" y="-100%" width="220%" height="300%">
                    <feGaussianBlur stdDeviation="2.8" result="blur" />
                    <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>

            <g fill={palette.star}>
                {stars.map(([cx, cy, radius, opacity]) => (
                    <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={radius} opacity={opacity} />
                ))}
            </g>

            <g stroke={`url(#${tailId})`} strokeLinecap="round" filter={`url(#${glowId})`}>
                {meteors.slice(0, meteorCount).map(([x1, y1, x2, y2, width, opacity]) => (
                    <g key={`${x1}-${y1}`} opacity={opacity}>
                        <line x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth={width} />
                        <circle cx={x2} cy={y2} r={width * 1.35} fill={palette.head} stroke="none" />
                    </g>
                ))}
            </g>
        </svg>
    )
}
