"use client"

import type { RewardEffectProps } from "../../core/types"
import WebGLEffectCanvas from "../../renderers/webgl/WebGLEffectCanvas"
import BioluminescentFlowerScene from "./BioluminescentFlowerScene"
import styles from "./BloomRing.module.css"
import BloomRingFallback from "./BloomRingFallback"

export default function BloomRing({
    item,
    preview = false,
    animated = true,
}: RewardEffectProps) {
    return (
        <span
            aria-hidden="true"
            className={[styles.ring, preview ? styles.preview : styles.timer].join(" ")}
        >
            <WebGLEffectCanvas
                animated={animated}
                className={styles.webgl}
                fallback={<BloomRingFallback preview={preview} />}
            >
                <BioluminescentFlowerScene
                    colors={item.colors}
                    preview={preview}
                />
            </WebGLEffectCanvas>
        </span>
    )
}
