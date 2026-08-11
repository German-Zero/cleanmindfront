"use client"

import type { CSSProperties } from "react"
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
    const [deep = "#0C1724", rain = "#4C8FB8", highlight = "#A9D8E8"] = item.colors
    const atmosphereStyle = {
        "--rain-deep": deep,
        "--rain-color": rain,
        "--rain-highlight": highlight,
    } as CSSProperties

    return (
        <EffectFrame
            className={styles.background}
            opacity={preview ? 0.96 : 0.84}
            preview={preview}
            animated={animated}
        >
            <span className={styles.atmosphere} style={atmosphereStyle} />
            <span className={styles.cityGlow} />
            <WebGLEffectCanvas
                className={styles.webgl}
                animated={animated}
                fallback={<span className={styles.fallback} />}
            >
                <RainyWindowScene colors={item.colors} preview={preview} />
            </WebGLEffectCanvas>
            <span className={styles.glassHighlight} />
        </EffectFrame>
    )
}
