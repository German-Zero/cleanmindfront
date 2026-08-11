"use client"

import { useMemo, type CSSProperties } from "react"
import { createFireflyField } from "./fireflyField"
import styles from "./FireflyGarden.module.css"

type FireflyStyle = CSSProperties & {
    "--firefly-x": string
    "--firefly-y": string
    "--firefly-size": string
    "--firefly-delay": string
    "--firefly-duration": string
    "--firefly-travel-x": string
    "--firefly-travel-y": string
    "--firefly-color": string
}

export default function FireflyFallback({
    colors,
    preview,
}: {
    colors: string[]
    preview: boolean
}) {
    const field = useMemo(() => createFireflyField(preview, true), [preview])
    const cool = colors[1] ?? "#77E8B5"
    const warm = colors[2] ?? "#FFD978"

    return (
        <span className={styles.fallback}>
            {Array.from({ length: field.count }, (_, index) => {
                const x = field.positions[index * 3]
                const y = field.positions[index * 3 + 1]
                const phase = field.phases[index]
                const pulseRate = field.pulseRates[index]
                const style: FireflyStyle = {
                    "--firefly-x": `${((x + 1.12) / 2.24) * 100}%`,
                    "--firefly-y": `${(1 - ((y + 1.02) / 1.9)) * 100}%`,
                    "--firefly-size": `${field.sizes[index]}px`,
                    "--firefly-delay": `${-(phase / (Math.PI * 2)) * 11}s`,
                    "--firefly-duration": `${9 + pulseRate * 5}s`,
                    "--firefly-travel-x": `${field.drifts[index * 2] * 420}px`,
                    "--firefly-travel-y": `${field.drifts[index * 2 + 1] * 360}px`,
                    "--firefly-color": field.colorMixes[index] > 0.55 ? warm : cool,
                }

                return <span className={styles.fallbackFirefly} key={index} style={style} />
            })}
        </span>
    )
}
