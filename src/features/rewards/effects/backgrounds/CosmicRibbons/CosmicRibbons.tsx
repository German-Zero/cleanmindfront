"use client"

import type { RewardEffectProps } from "../../core/types"
import EffectFrame from "../../renderers/dom/EffectFrame"
import WebGLEffectCanvas from "../../renderers/webgl/WebGLEffectCanvas"
import styles from "./CosmicRibbons.module.css"
import CosmicRibbonsScene from "./CosmicRibbonsScene"

export default function CosmicRibbons({
    item,
    preview = false,
    animated = true,
}: RewardEffectProps) {
    return (
        <EffectFrame
            className={styles.background}
            opacity={preview ? 0.94 : 0.74}
            preview={preview}
            animated={animated}
        >
            <span className={styles.nebula} />
            <WebGLEffectCanvas
                className={styles.webgl}
                animated={animated}
                fallback={<span className={styles.fallback} />}
            >
                <CosmicRibbonsScene colors={item.colors} />
            </WebGLEffectCanvas>
        </EffectFrame>
    )
}
