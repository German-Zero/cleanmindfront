"use client"

import type { CSSProperties } from "react"
import type { RewardEffectProps } from "../../core/types"
import EffectFrame from "../../renderers/dom/EffectFrame"
import WebGLEffectCanvas from "../../renderers/webgl/WebGLEffectCanvas"
import FireflyFallback from "./FireflyFallback"
import FireflyScene from "./FireflyScene"
import styles from "./FireflyGarden.module.css"

type GardenPaletteProperties = CSSProperties & {
    "--garden-base": string
    "--garden-cool": string
    "--garden-warm": string
}

export default function FireflyGarden({
    item,
    preview = false,
    animated = true,
}: RewardEffectProps) {
    const palette: GardenPaletteProperties = {
        "--garden-base": item.colors[0] ?? "#0B1020",
        "--garden-cool": item.colors[1] ?? "#77E8B5",
        "--garden-warm": item.colors[2] ?? "#FFD978",
    }

    return (
        <EffectFrame
            className={styles.background}
            opacity={preview ? 0.96 : 0.8}
            preview={preview}
            animated={animated}
        >
            <span className={styles.atmosphere} style={palette} />
            <span className={styles.canopy} />
            <span className={styles.gardenFloor} style={palette} />
            <WebGLEffectCanvas
                className={styles.webgl}
                animated={animated}
                fallback={<FireflyFallback colors={item.colors} preview={preview} />}
            >
                <FireflyScene colors={item.colors} preview={preview} />
            </WebGLEffectCanvas>
            <span className={styles.depthVeil} />
        </EffectFrame>
    )
}
