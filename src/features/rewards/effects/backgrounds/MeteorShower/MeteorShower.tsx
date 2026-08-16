"use client"

import { useId, useMemo, type CSSProperties } from "react"
import type { Theme } from "@/features/settings/types"
import EffectFrame from "../../renderers/dom/EffectFrame"
import WebGLEffectCanvas from "../../renderers/webgl/WebGLEffectCanvas"
import { createMeteorInstanceConfig } from "./meteorConfig"
import MeteorShowerFallback from "./MeteorShowerFallback"
import styles from "./MeteorShower.module.css"
import MeteorShowerScene from "./MeteorShowerScene"
import { getMeteorShowerPalette } from "./palette"

type MeteorVariables = CSSProperties & {
    "--meteor-head": string
    "--meteor-cool": string
    "--meteor-warm": string
    "--meteor-star": string
    "--meteor-atmosphere": string
}

export default function MeteorShower({
    theme,
    preview = false,
    animated = true,
}: {
    theme: Theme
    preview?: boolean
    animated?: boolean
}) {
    const instanceId = useId()
    const instanceConfig = useMemo(
        () => createMeteorInstanceConfig(instanceId),
        [instanceId],
    )
    const palette = getMeteorShowerPalette(theme)
    const variables: MeteorVariables = {
        "--meteor-head": palette.head,
        "--meteor-cool": palette.cool,
        "--meteor-warm": palette.warm,
        "--meteor-star": palette.star,
        "--meteor-atmosphere": palette.atmosphere,
    }

    return (
        <EffectFrame
            className={styles.background}
            opacity={preview ? 1 : 0.94}
            preview={preview}
            animated={animated}
        >
            <span
                className={`${styles.composition} ${palette.light ? styles.light : styles.dark}`}
                style={variables}
            >
                <span className={styles.atmosphere} />
                <WebGLEffectCanvas
                    className={styles.webgl}
                    animated={animated}
                    fallback={(
                        <MeteorShowerFallback
                            palette={palette}
                            meteorCount={instanceConfig.count}
                        />
                    )}
                >
                    <MeteorShowerScene
                        palette={palette}
                        preview={preview}
                        meteorCount={instanceConfig.count}
                        meteorSeed={instanceConfig.seed}
                    />
                </WebGLEffectCanvas>
                <span className={styles.depthVeil} />
            </span>
        </EffectFrame>
    )
}
