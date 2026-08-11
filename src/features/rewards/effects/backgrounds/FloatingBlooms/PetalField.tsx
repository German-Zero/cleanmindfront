"use client"

import Petal from "./Petal"
import styles from "./FloatingBlooms.module.css"
import { petalPresets } from "./petal.config"

export default function PetalField({
    colors,
    preview,
}: {
    colors: string[]
    preview: boolean
}) {
    const palette = [
        colors[1] ?? "#E58AAE",
        colors[2] ?? "#F6C9B8",
    ]

    return (
        <span
            className={styles.petalField}
            data-preview={preview ? "true" : "false"}
            aria-hidden="true"
        >
            {petalPresets.map((preset) => (
                <Petal
                    key={preset.id}
                    preset={preset}
                    color={palette[preset.colorIndex]}
                />
            ))}
        </span>
    )
}
