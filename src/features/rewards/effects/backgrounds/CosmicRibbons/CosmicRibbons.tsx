"use client"

import type { CSSProperties } from "react"
import type { RewardEffectProps } from "../../core/types"
import EffectFrame from "../../renderers/dom/EffectFrame"
import WebGLEffectCanvas from "../../renderers/webgl/WebGLEffectCanvas"
import styles from "./CosmicRibbons.module.css"
import CosmicRibbonsScene from "./CosmicRibbonsScene"

type CosmicPaletteProperties = CSSProperties & {
    "--cosmic-base": string
    "--cosmic-cool": string
    "--cosmic-warm": string
}

export default function CosmicRibbons({
    item,
    preview = false,
    animated = true,
}: RewardEffectProps) {
    const palette: CosmicPaletteProperties = {
        "--cosmic-base": item.colors[0] ?? "#090D1F",
        "--cosmic-cool": item.colors[1] ?? "#6F63FF",
        "--cosmic-warm": item.colors[2] ?? "#E46FD8",
    }

    return (
        <EffectFrame
            className={styles.background}
            opacity={preview ? 0.96 : 0.78}
            preview={preview}
            animated={animated}
        >
            <span className={styles.cosmos} style={palette} />
            <span className={styles.nebula} style={palette} />
            <WebGLEffectCanvas
                className={styles.webgl}
                animated={animated}
                fallback={<span className={styles.fallback} style={palette} />}
            >
                <CosmicRibbonsScene colors={item.colors} preview={preview} />
            </WebGLEffectCanvas>
            <span className={styles.depthVeil} />
        </EffectFrame>
    )
}
