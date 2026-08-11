"use client"

import { useId } from "react"
import styles from "./TidalWave.module.css"

const bubbles = [
    [126, 332, 2], [282, 312, 3], [454, 346, 2], [636, 318, 2],
    [824, 342, 3], [1018, 316, 2],
] as const

const foamFragments = [
    "M72 307c18-10 35-8 47 2-17 5-33 5-47-2Z",
    "M218 319c24-13 44-9 60 3-23 5-42 5-60-3Z",
    "M392 298c20-12 43-10 60 2-21 5-42 6-60-2Z",
    "M584 314c27-15 50-10 69 3-25 6-48 5-69-3Z",
    "M794 292c22-12 47-8 63 3-24 5-44 4-63-3Z",
    "M982 308c26-13 49-8 66 4-25 5-47 4-66-4Z",
] as const

export default function TidalWaveArtwork({
    colors,
    preview,
    animated,
}: {
    colors: string[]
    preview: boolean
    animated: boolean
}) {
    const [deep = "#0E6070", water = "#51CED2", foam = "#DDFBF7"] = colors
    const instanceId = useId().replaceAll(":", "")
    const waterGradientId = `${instanceId}-tidal-water`

    return (
        <svg
            aria-hidden="true"
            className={`${styles.artwork} ${preview ? styles.previewArtwork : styles.calendarArtwork}`}
            data-animated={animated}
            viewBox="0 0 1200 400"
            preserveAspectRatio="none"
            focusable="false"
        >
            <defs>
                <linearGradient id={waterGradientId} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor={foam} stopOpacity="0.07" />
                    <stop offset="0.26" stopColor={water} stopOpacity="0.09" />
                    <stop offset="1" stopColor={deep} stopOpacity="0.055" />
                </linearGradient>
            </defs>

            <g className={styles.frontWave}>
                <path
                    d="M-120 312C30 252 164 332 310 294c143-38 244 25 391-16 160-45 292 2 432-36 74-20 143-10 219 17v181H-120Z"
                    fill={`url(#${waterGradientId})`}
                />
                <path
                    className={styles.foamRibbon}
                    d="M-104 303c146-56 256 24 405-15 143-38 246 26 393-15 160-44 291 4 431-34 73-20 141-10 219 17l-1 7c-79-25-146-34-217-14-141 38-270-10-429 34-148 41-250-23-394 15-149 40-258-40-405 16Z"
                    fill={foam}
                />
            </g>

            <g className={styles.foamFragments} fill={foam}>
                {foamFragments.map((path) => <path key={path} d={path} />)}
            </g>

            <g className={styles.glints} fill="none" stroke={foam} strokeLinecap="round">
                <path d="M88 354c48-9 87 5 132-2" />
                <path d="M474 338c57-11 98 6 151-3" />
                <path d="M886 351c51-10 91 4 140-3" />
            </g>

            <g className={styles.bubbles} fill="none" stroke={foam}>
                {bubbles.map(([cx, cy, radius]) => (
                    <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={radius} />
                ))}
            </g>
        </svg>
    )
}
