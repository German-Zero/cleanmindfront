"use client"

import { useId, useMemo } from "react"
import { createBioluminescentFlowerField } from "./flowerField"
import styles from "./BloomRing.module.css"

function Daisy() {
    return (
        <>
            {Array.from({ length: 10 }, (_, index) => (
                <ellipse
                    cx="0"
                    cy="-0.48"
                    fill="#FFF9E8"
                    key={index}
                    rx="0.12"
                    ry="0.34"
                    transform={`rotate(${index * 36})`}
                />
            ))}
            <circle fill="#E9B83E" r="0.22" />
        </>
    )
}

function Sunflower() {
    return (
        <>
            {Array.from({ length: 12 }, (_, index) => (
                <ellipse
                    cx="0"
                    cy="-0.48"
                    fill="#F2B43C"
                    key={index}
                    rx="0.1"
                    ry="0.34"
                    transform={`rotate(${index * 30})`}
                />
            ))}
            <circle fill="#69401F" r="0.34" />
            <circle
                fill="none"
                opacity="0.42"
                r="0.23"
                stroke="#E3A33A"
                strokeDasharray="0.05 0.07"
                strokeWidth="0.06"
            />
        </>
    )
}

function Rose() {
    return (
        <>
            <path
                d="M0 -0.9C0.38 -0.9 0.82 -0.55 0.88 -0.12C0.96 0.4 0.5 0.9 0 0.92C-0.52 0.9 -0.96 0.42 -0.88 -0.12C-0.82 -0.55 -0.38 -0.9 0 -0.9Z"
                fill="#E8799E"
            />
            <path
                d="M-0.52 -0.18C-0.12 -0.58 0.58 -0.38 0.5 0.08C0.44 0.5 -0.22 0.58 -0.4 0.25C-0.56 -0.02 -0.27 -0.28 0.02 -0.2C0.22 -0.14 0.2 0.12 0.05 0.18"
                fill="none"
                opacity="0.68"
                stroke="#FFD0DC"
                strokeLinecap="round"
                strokeWidth="0.14"
            />
        </>
    )
}

function Tulip() {
    return (
        <path
            d="M0 0.9C-0.58 0.7 -0.76 0.08 -0.54 -0.76C-0.22 -0.62 -0.06 -0.32 0 -0.08C0.06 -0.32 0.22 -0.62 0.54 -0.76C0.76 0.08 0.58 0.7 0 0.9Z"
            fill="#B77CE5"
        />
    )
}

function FallbackFlower({ type }: { type: number }) {
    if (type === 0) return <Daisy />
    if (type === 1) return <Sunflower />
    if (type === 2) return <Rose />
    return <Tulip />
}

export default function BloomRingFallback({
    preview,
}: {
    preview: boolean
}) {
    const id = useId().replaceAll(":", "")
    const field = useMemo(
        () => createBioluminescentFlowerField(preview, true),
        [preview],
    )
    const shadowId = `flower-shadow-${id}`

    return (
        <svg
            aria-hidden="true"
            className={styles.fallback}
            focusable="false"
            preserveAspectRatio="none"
            viewBox="0 0 100 100"
        >
            <defs>
                <filter
                    id={shadowId}
                    filterUnits="userSpaceOnUse"
                    x="-10"
                    y="-10"
                    width="120"
                    height="120"
                >
                    <feDropShadow
                        dx="0"
                        dy="0.25"
                        floodColor="#3B2130"
                        floodOpacity="0.22"
                        stdDeviation="0.28"
                    />
                </filter>
            </defs>
            <g filter={`url(#${shadowId})`}>
                {Array.from({ length: field.count }, (_, index) => {
                    const phase = field.phases[index]
                    const type = field.flowerTypes[index]
                    const x = ((field.positions[index * 3] + 1.08) / 2.16) * 100
                    const y = 3 + phase * 94
                    const scale = 1.28 + field.sizes[index] * 0.085
                    const rotation = field.rotations[index] * (180 / Math.PI)
                    const opacity = 0.48 + field.depths[index] * 0.34

                    return (
                        <g
                            key={index}
                            opacity={opacity}
                            transform={`translate(${x} ${y}) rotate(${rotation}) scale(${scale})`}
                        >
                            <FallbackFlower type={type} />
                        </g>
                    )
                })}
            </g>
        </svg>
    )
}
