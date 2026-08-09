"use client"

import type { CSSProperties } from "react"
import EffectFrame from "../../shared/EffectFrame"
import type { RewardEffectProps } from "../../types"
import styles from "./RainyWindow.module.css"

const raindrops = Array.from({ length: 30 }, (_, index) => ({
    left: (index * 37 + 9) % 100,
    delay: -((index * 0.41) % 4.6),
    duration: 2.7 + ((index * 17) % 15) / 10,
    length: 24 + ((index * 19) % 42),
    opacity: 0.34 + ((index * 13) % 42) / 100,
}))

export default function RainyWindow({ preview = false }: RewardEffectProps) {
    return (
        <EffectFrame
            className={styles.background}
            opacity={preview ? 0.92 : 0.72}
            preview={preview}
        >
            <span
                className={`${styles.rain} ${preview ? styles.preview : styles.fullscreen}`}
            >
                {raindrops.map((drop, index) => (
                    <span
                        key={index}
                        className={styles.drop}
                        style={{
                            "--rain-left": `${drop.left}%`,
                            "--rain-delay": `${drop.delay}s`,
                            "--rain-duration": `${drop.duration}s`,
                            "--rain-length": `${drop.length}px`,
                            "--rain-opacity": drop.opacity,
                        } as CSSProperties}
                    />
                ))}
            </span>
            <span className={styles.glass} />
            <span className={styles.reflection} />
        </EffectFrame>
    )
}
