"use client"

import { useId } from "react"
import type { OrbitalNebulaPalette } from "./palette"
import styles from "./OrbitalNebula.module.css"

const stars = [
    [74, 92, 1.2, 0.48], [128, 188, 0.9, 0.36], [176, 54, 1.5, 0.56],
    [223, 246, 1.1, 0.42], [268, 117, 0.8, 0.34], [307, 326, 1.4, 0.52],
    [354, 75, 1, 0.4], [392, 218, 1.7, 0.62], [428, 39, 0.8, 0.34],
    [465, 286, 1.1, 0.46], [503, 104, 1.3, 0.54], [532, 374, 0.9, 0.38],
    [567, 48, 1.5, 0.6], [596, 253, 0.8, 0.32], [625, 112, 1.2, 0.48],
    [655, 321, 1.6, 0.58], [688, 72, 0.9, 0.38], [714, 224, 1.3, 0.5],
    [746, 139, 0.8, 0.34], [772, 348, 1.1, 0.44], [91, 405, 1.4, 0.5],
    [191, 366, 0.8, 0.34], [278, 432, 1.1, 0.4], [432, 414, 1.3, 0.48],
] as const

const orbitNodes = [
    [385, 116, 2.8],
    [493, 53, 2.1],
    [682, 101, 2.6],
    [735, 193, 1.9],
    [588, 276, 2.4],
] as const

export default function OrbitalNebulaFallback({
    palette,
}: {
    palette: OrbitalNebulaPalette
}) {
    const uniqueId = useId().replaceAll(":", "")
    const coreId = `orbital-core-${uniqueId}`
    const coolCloudId = `orbital-cool-${uniqueId}`
    const warmCloudId = `orbital-warm-${uniqueId}`
    const orbitId = `orbital-ring-${uniqueId}`
    const cloudFilterId = `orbital-cloud-filter-${uniqueId}`
    const glowId = `orbital-glow-${uniqueId}`

    return (
        <svg
            className={styles.fallback}
            viewBox="0 0 800 500"
            preserveAspectRatio="none"
            aria-hidden="true"
        >
            <defs>
                <radialGradient id={coreId}>
                    <stop offset="0" stopColor={palette.core} stopOpacity="0.96" />
                    <stop offset="0.14" stopColor={palette.core} stopOpacity="0.72" />
                    <stop offset="0.42" stopColor={palette.cool} stopOpacity="0.28" />
                    <stop offset="1" stopColor={palette.cool} stopOpacity="0" />
                </radialGradient>
                <radialGradient id={coolCloudId} cx="56%" cy="46%" rx="54%" ry="62%">
                    <stop offset="0" stopColor={palette.dust} stopOpacity="0.46" />
                    <stop offset="0.34" stopColor={palette.cool} stopOpacity="0.38" />
                    <stop offset="0.76" stopColor={palette.cool} stopOpacity="0.12" />
                    <stop offset="1" stopColor={palette.cool} stopOpacity="0" />
                </radialGradient>
                <radialGradient id={warmCloudId} cx="48%" cy="52%" rx="58%" ry="58%">
                    <stop offset="0" stopColor={palette.warm} stopOpacity="0.44" />
                    <stop offset="0.48" stopColor={palette.warm} stopOpacity="0.24" />
                    <stop offset="1" stopColor={palette.warm} stopOpacity="0" />
                </radialGradient>
                <linearGradient id={orbitId} gradientUnits="userSpaceOnUse" x1="300" y1="80" x2="790" y2="250">
                    <stop offset="0" stopColor={palette.cool} stopOpacity="0" />
                    <stop offset="0.22" stopColor={palette.dust} stopOpacity="0.72" />
                    <stop offset="0.52" stopColor={palette.core} stopOpacity="0.5" />
                    <stop offset="0.78" stopColor={palette.warm} stopOpacity="0.66" />
                    <stop offset="1" stopColor={palette.warm} stopOpacity="0" />
                </linearGradient>
                <filter id={cloudFilterId} x="-30%" y="-60%" width="160%" height="220%">
                    <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.008 0.018"
                        numOctaves="3"
                        seed="11"
                        result="noise"
                    />
                    <feDisplacementMap
                        in="SourceGraphic"
                        in2="noise"
                        scale="34"
                        xChannelSelector="R"
                        yChannelSelector="B"
                        result="warped"
                    />
                    <feGaussianBlur in="warped" stdDeviation="8" />
                </filter>
                <filter id={glowId} x="-40%" y="-80%" width="180%" height="260%">
                    <feGaussianBlur stdDeviation="3.2" result="blur" />
                    <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>

            <g transform="rotate(-11 582 166)" filter={`url(#${cloudFilterId})`}>
                <ellipse cx="572" cy="170" rx="326" ry="116" fill={`url(#${warmCloudId})`} />
                <ellipse cx="596" cy="158" rx="278" ry="94" fill={`url(#${coolCloudId})`} />
                <ellipse cx="521" cy="190" rx="214" ry="72" fill={palette.cool} opacity="0.13" />
            </g>

            <g transform="rotate(-11 582 166)" fill="none" stroke={`url(#${orbitId})`} filter={`url(#${glowId})`}>
                <ellipse cx="582" cy="166" rx="178" ry="49" strokeWidth="1.6" strokeDasharray="235 42 86 68" />
                <ellipse cx="582" cy="166" rx="258" ry="78" strokeWidth="1.2" strokeDasharray="182 54 294 92" opacity="0.82" />
                <ellipse cx="582" cy="166" rx="338" ry="108" strokeWidth="0.9" strokeDasharray="312 96 174 122" opacity="0.58" />
            </g>

            <ellipse cx="582" cy="166" rx="92" ry="68" fill={`url(#${coreId})`} filter={`url(#${glowId})`} />
            <circle cx="582" cy="166" r="5.5" fill={palette.core} opacity="0.92" filter={`url(#${glowId})`} />

            <g fill={palette.dust} filter={`url(#${glowId})`}>
                {orbitNodes.map(([cx, cy, radius]) => (
                    <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={radius} opacity="0.74" />
                ))}
            </g>

            <g fill={palette.core}>
                {stars.map(([cx, cy, radius, opacity]) => (
                    <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={radius} opacity={opacity} />
                ))}
            </g>
        </svg>
    )
}
