"use client"

import EffectFrame from "../../shared/EffectFrame"
import type { RewardEffectProps } from "../../types"
import styles from "./FireflyGarden.module.css"

export default function FireflyGarden({ preview = false }: RewardEffectProps) {
    return (
        <EffectFrame
            className={styles.background}
            opacity={preview ? 0.9 : 0.72}
            preview={preview}
        >
            <span className={styles.fireflies} />
            <span className={styles.glow} />
        </EffectFrame>
    )
}
