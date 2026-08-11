"use client"

import type { RewardEffectProps } from "../../core/types"
import EffectFrame from "../../renderers/dom/EffectFrame"
import styles from "./FloatingBlooms.module.css"
import PetalField from "./PetalField"

export default function FloatingBlooms({
    item,
    preview = false,
    animated = true,
}: RewardEffectProps) {
    return (
        <EffectFrame
            className={styles.background}
            opacity={preview ? 0.92 : 0.72}
            preview={preview}
            animated={animated}
        >
            <span className={styles.light} />
            <PetalField colors={item.colors} />
            <span className={styles.softFocus} />
        </EffectFrame>
    )
}
