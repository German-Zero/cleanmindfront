"use client"

import type { RewardEffectProps } from "../../core/types"
import EffectFrame from "../../renderers/dom/EffectFrame"
import WebGLEffectCanvas from "../../renderers/webgl/WebGLEffectCanvas"
import FireflyScene from "./FireflyScene"
import styles from "./FireflyGarden.module.css"

export default function FireflyGarden({
    item,
    preview = false,
    animated = true,
}: RewardEffectProps) {
    return (
        <EffectFrame
            className={styles.background}
            opacity={preview ? 0.92 : 0.76}
            preview={preview}
            animated={animated}
        >
            <span className={styles.gardenGlow} />
            <WebGLEffectCanvas
                className={styles.webgl}
                animated={animated}
                fallback={<span className={styles.fallback} />}
            >
                <FireflyScene colors={item.colors} preview={preview} />
            </WebGLEffectCanvas>
        </EffectFrame>
    )
}
