"use client"

import type { CSSProperties } from "react"
import type { RewardEffectProps } from "../../core/types"
import EffectFrame from "../../renderers/dom/EffectFrame"
import styles from "./FloatingBlooms.module.css"
import PetalField from "./PetalField"

export default function FloatingBlooms({
    item,
    preview = false,
    animated = true,
}: RewardEffectProps) {
    const [deep = "#1B1020", rose = "#E58AAE", peach = "#F6C9B8"] = item.colors
    const atmosphereStyle = {
        "--bloom-deep": deep,
        "--bloom-rose": rose,
        "--bloom-peach": peach,
    } as CSSProperties

    return (
        <EffectFrame
            className={styles.background}
            opacity={preview ? 0.96 : 0.84}
            preview={preview}
            animated={animated}
        >
            <span className={styles.atmosphere} style={atmosphereStyle} />
            <span className={styles.light} />
            <PetalField colors={item.colors} preview={preview} />
            <span className={styles.softFocus} />
        </EffectFrame>
    )
}
