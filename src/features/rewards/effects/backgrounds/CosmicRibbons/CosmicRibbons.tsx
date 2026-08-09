"use client"

import EffectFrame from "../../shared/EffectFrame"
import type { RewardEffectProps } from "../../types"
import styles from "./CosmicRibbons.module.css"

export default function CosmicRibbons({ preview = false }: RewardEffectProps) {
    return (
        <EffectFrame
            className={styles.background}
            opacity={preview ? 0.88 : 0.68}
            preview={preview}
        >
            <span className={styles.ribbons} />
            <span className={styles.dust} />
        </EffectFrame>
    )
}
