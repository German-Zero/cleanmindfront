"use client"

import { useId } from "react"
import type { PrismaticAuroraPalette } from "./palette"
import styles from "./PrismaticAurora.module.css"

const mainRays = [
    { d: "M22 56 C36 150 20 242 42 356", width: 18, opacity: 0.32, tone: "boreal" },
    { d: "M66 56 C81 140 58 252 79 360", width: 28, opacity: 0.42, tone: "boreal" },
    { d: "M118 54 C136 153 105 246 126 354", width: 15, opacity: 0.3, tone: "secondary" },
    { d: "M158 52 C174 146 148 260 169 368", width: 34, opacity: 0.46, tone: "boreal" },
    { d: "M216 50 C229 147 209 238 228 354", width: 22, opacity: 0.37, tone: "boreal" },
    { d: "M264 48 C281 156 251 257 278 370", width: 14, opacity: 0.3, tone: "secondary" },
    { d: "M306 48 C327 144 292 252 318 365", width: 36, opacity: 0.48, tone: "boreal" },
    { d: "M368 46 C381 151 361 252 380 368", width: 23, opacity: 0.38, tone: "boreal" },
    { d: "M416 44 C432 148 407 246 430 360", width: 15, opacity: 0.31, tone: "secondary" },
    { d: "M458 44 C477 154 447 258 471 374", width: 31, opacity: 0.45, tone: "boreal" },
    { d: "M516 42 C528 144 509 247 530 361", width: 19, opacity: 0.35, tone: "boreal" },
    { d: "M558 42 C577 152 548 255 574 370", width: 12, opacity: 0.28, tone: "secondary" },
    { d: "M598 40 C616 145 586 252 611 369", width: 35, opacity: 0.47, tone: "boreal" },
    { d: "M660 38 C674 148 651 242 672 356", width: 21, opacity: 0.36, tone: "boreal" },
    { d: "M706 38 C721 142 697 252 718 366", width: 14, opacity: 0.29, tone: "secondary" },
    { d: "M748 36 C765 146 739 246 760 358", width: 27, opacity: 0.41, tone: "boreal" },
    { d: "M790 36 C808 150 780 247 802 360", width: 18, opacity: 0.32, tone: "boreal" },
] as const

const rearRays = [
    "M52 74 C68 152 49 216 67 304",
    "M144 67 C162 152 137 222 158 314",
    "M244 66 C260 146 239 221 258 310",
    "M346 62 C360 143 341 218 360 306",
    "M448 58 C465 144 441 218 461 310",
    "M550 55 C567 142 542 215 563 304",
    "M652 52 C668 138 647 213 666 302",
    "M754 48 C771 137 747 211 768 300",
] as const

export default function PrismaticAuroraFallback({
    palette,
}: {
    palette: PrismaticAuroraPalette
}) {
    const uniqueId = useId().replaceAll(":", "")
    const spectrumId = `aurora-spectrum-${uniqueId}`
    const mainFadeId = `aurora-main-fade-${uniqueId}`
    const rearFadeId = `aurora-rear-fade-${uniqueId}`
    const mainMaskId = `aurora-main-mask-${uniqueId}`
    const rearMaskId = `aurora-rear-mask-${uniqueId}`
    const edgeId = `aurora-edge-${uniqueId}`
    const glowId = `aurora-glow-${uniqueId}`
    const mainShape = "M-30 111 C67 63 139 136 236 91 S411 124 535 72 S701 112 830 49 L830 362 C706 335 624 367 518 333 S333 368 220 338 S68 362 -30 326 Z"
    const rearShape = "M-30 154 C81 104 171 166 280 118 S466 154 585 101 S731 132 830 82 L830 311 C718 284 638 310 552 281 S382 312 278 285 S86 309 -30 278 Z"
    const mainEdge = "M-30 111 C67 63 139 136 236 91 S411 124 535 72 S701 112 830 49"

    return (
        <svg
            className={styles.fallback}
            viewBox="0 0 800 500"
            preserveAspectRatio="none"
            aria-hidden="true"
        >
            <defs>
                <linearGradient id={spectrumId} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="800" y2="0">
                    <stop offset="0" stopColor={palette.accent} stopOpacity="0.14" />
                    <stop offset="0.18" stopColor={palette.boreal} stopOpacity="0.76" />
                    <stop offset="0.48" stopColor={palette.boreal} stopOpacity="0.88" />
                    <stop offset="0.7" stopColor={palette.secondary} stopOpacity="0.72" />
                    <stop offset="0.88" stopColor={palette.boreal} stopOpacity="0.66" />
                    <stop offset="1" stopColor={palette.primary} stopOpacity="0.12" />
                </linearGradient>
                <linearGradient id={mainFadeId} gradientUnits="userSpaceOnUse" x1="0" y1="65" x2="0" y2="365">
                    <stop offset="0" stopColor="white" stopOpacity="0.98" />
                    <stop offset="0.24" stopColor="white" stopOpacity="0.83" />
                    <stop offset="0.66" stopColor="white" stopOpacity="0.28" />
                    <stop offset="1" stopColor="black" />
                </linearGradient>
                <linearGradient id={rearFadeId} gradientUnits="userSpaceOnUse" x1="0" y1="95" x2="0" y2="315">
                    <stop offset="0" stopColor="white" stopOpacity="0.7" />
                    <stop offset="0.55" stopColor="white" stopOpacity="0.22" />
                    <stop offset="1" stopColor="black" />
                </linearGradient>
                <linearGradient id={edgeId} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="800" y2="0">
                    <stop offset="0" stopColor={palette.accent} stopOpacity="0" />
                    <stop offset="0.2" stopColor={palette.boreal} stopOpacity="0.66" />
                    <stop offset="0.55" stopColor={palette.secondary} stopOpacity="0.72" />
                    <stop offset="0.84" stopColor={palette.boreal} stopOpacity="0.55" />
                    <stop offset="1" stopColor={palette.primary} stopOpacity="0" />
                </linearGradient>
                <mask id={mainMaskId} maskUnits="userSpaceOnUse" x="-40" y="30" width="880" height="360">
                    <path d={mainShape} fill={`url(#${mainFadeId})`} />
                </mask>
                <mask id={rearMaskId} maskUnits="userSpaceOnUse" x="-40" y="70" width="880" height="270">
                    <path d={rearShape} fill={`url(#${rearFadeId})`} />
                </mask>
                <filter id={glowId} x="-20%" y="-60%" width="140%" height="220%">
                    <feGaussianBlur stdDeviation="4.5" result="blur" />
                    <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>

            <g mask={`url(#${rearMaskId})`} opacity="0.58">
                <rect x="-30" y="70" width="860" height="270" fill={palette.primary} opacity="0.18" />
                <g className={styles.fallbackRays}>
                    {rearRays.map((path) => (
                        <path
                            key={path}
                            d={path}
                            fill="none"
                            stroke={palette.accent}
                            strokeLinecap="round"
                            strokeWidth="24"
                            opacity="0.3"
                        />
                    ))}
                </g>
            </g>

            <g className={styles.fallbackSheet} mask={`url(#${mainMaskId})`}>
                <rect x="-30" y="35" width="860" height="350" fill={`url(#${spectrumId})`} opacity="0.3" />
                <g className={styles.fallbackRays}>
                    {mainRays.map((ray) => (
                        <path
                            key={ray.d}
                            d={ray.d}
                            fill="none"
                            stroke={palette[ray.tone]}
                            strokeLinecap="round"
                            strokeWidth={ray.width}
                            opacity={ray.opacity}
                        />
                    ))}
                </g>
            </g>

            <path
                d={mainEdge}
                fill="none"
                stroke={`url(#${edgeId})`}
                strokeLinecap="round"
                strokeWidth="2.4"
                opacity="0.82"
                filter={`url(#${glowId})`}
            />
        </svg>
    )
}
