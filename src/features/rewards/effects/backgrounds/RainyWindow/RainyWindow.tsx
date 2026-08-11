"use client"

import type { RewardEffectProps } from "../../core/types"
import EffectFrame from "../../renderers/dom/EffectFrame"
import WebGLEffectCanvas from "../../renderers/webgl/WebGLEffectCanvas"
import styles from "./RainyWindow.module.css"
import RainyWindowScene from "./RainyWindowScene"

export default function RainyWindow({
    item,
    preview = false,
    animated = true,
}: RewardEffectProps) {
    return (
        <EffectFrame
            className={styles.background}
            opacity={preview ? 0.95 : 0.78}
            preview={preview}
            animated={animated}
        >
            <span className={styles.cityGlow} />
            <WebGLEffectCanvas
                className={styles.webgl}
                animated={animated}
                fallback={<span className={styles.fallback} />}
            >
                <RainyWindowScene colors={item.colors} />
            </WebGLEffectCanvas>
            <span className={styles.glassHighlight} />
        </EffectFrame>
    )
}
