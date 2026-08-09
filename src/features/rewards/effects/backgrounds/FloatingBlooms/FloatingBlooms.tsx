"use client"

import EffectFrame from "../../shared/EffectFrame"
import type { RewardEffectProps } from "../../types"
import styles from "./FloatingBlooms.module.css"

export default function FloatingBlooms({ preview = false }: RewardEffectProps) {
    return (
        <EffectFrame
            className={styles.background}
            opacity={preview ? 0.88 : 0.64}
            preview={preview}
        >
            <span className={styles.petals} />
            <span className={styles.light} />
        </EffectFrame>
    )
}
