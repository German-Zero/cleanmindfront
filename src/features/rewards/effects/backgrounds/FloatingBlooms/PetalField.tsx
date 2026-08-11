"use client"

import type { CSSProperties } from "react"
import styles from "./FloatingBlooms.module.css"

const petals = Array.from({ length: 18 }, (_, index) => ({
    x: (index * 31 + 7) % 100,
    y: (index * 47 + 13) % 100,
    size: 8 + (index * 7) % 11,
    delay: -((index * 1.37) % 12),
    duration: 13 + (index * 5) % 9,
    drift: 18 + (index * 11) % 32,
    rotate: (index * 43) % 180,
}))

export default function PetalField({ colors }: { colors: string[] }) {
    const palette = colors.length > 0 ? colors : ["#E58AAE", "#F6C9B8"]

    return (
        <span className={styles.petalField} aria-hidden="true">
            {petals.map((petal, index) => (
                <span
                    key={`${petal.x}-${petal.y}`}
                    className={styles.petal}
                    style={{
                        "--petal-x": `${petal.x}%`,
                        "--petal-y": `${petal.y}%`,
                        "--petal-size": `${petal.size}px`,
                        "--petal-delay": `${petal.delay}s`,
                        "--petal-duration": `${petal.duration}s`,
                        "--petal-drift": `${petal.drift}px`,
                        "--petal-from-x": `${petal.drift * -0.32}px`,
                        "--petal-from-y": `${petal.drift * 0.46}px`,
                        "--petal-to-y": `${petal.drift * -1}px`,
                        "--petal-rotation": `${petal.rotate}deg`,
                        "--petal-end-rotation": `${petal.rotate + 92}deg`,
                        "--petal-color": palette[index % palette.length],
                    } as CSSProperties}
                >
                    <svg viewBox="0 0 24 24" focusable="false">
                        <path d="M12 20C5.5 16.1 3.4 11.5 5.8 8.7c1.6-1.9 4.2-1.3 6.2 1.2 2-2.5 4.6-3.1 6.2-1.2 2.4 2.8.3 7.4-6.2 11.3Z" />
                    </svg>
                </span>
            ))}
        </span>
    )
}
