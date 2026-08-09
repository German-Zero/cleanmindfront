"use client"

import EffectFrame from "../../shared/EffectFrame"
import type { RewardEffectProps } from "../../types"
import styles from "./RainyWindow.module.css"

export default function RainyWindow({ preview = false }: RewardEffectProps) {
    return (
        <EffectFrame
            className={styles.background}
            opacity={preview ? 0.92 : 0.72}
            preview={preview}
        >
            <span className={styles.rain} />
            <span className={styles.reflection} />
        </EffectFrame>
    )
}
