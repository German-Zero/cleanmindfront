"use client"

import type { CSSProperties } from "react"
import type { Theme } from "@/features/settings/types"
import EffectFrame from "../../renderers/dom/EffectFrame"
import WebGLEffectCanvas from "../../renderers/webgl/WebGLEffectCanvas"
import OrbitalNebulaFallback from "./OrbitalNebulaFallback"
import styles from "./OrbitalNebula.module.css"
import OrbitalNebulaScene from "./OrbitalNebulaScene"
import { getOrbitalNebulaPalette } from "./palette"

type NebulaVariables = CSSProperties & {
    "--nebula-core": string
    "--nebula-cool": string
    "--nebula-warm": string
    "--nebula-dust": string
    "--nebula-atmosphere": string
}

export default function OrbitalNebula({
    theme,
    preview = false,
    animated = true,
}: {
    theme: Theme
    preview?: boolean
    animated?: boolean
}) {
    const palette = getOrbitalNebulaPalette(theme)
    const variables: NebulaVariables = {
        "--nebula-core": palette.core,
        "--nebula-cool": palette.cool,
        "--nebula-warm": palette.warm,
        "--nebula-dust": palette.dust,
        "--nebula-atmosphere": palette.atmosphere,
    }

    return (
        <EffectFrame
            className={styles.background}
            opacity={preview ? 1 : 0.95}
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
                    fallback={<OrbitalNebulaFallback palette={palette} />}
                >
                    <OrbitalNebulaScene palette={palette} preview={preview} />
                </WebGLEffectCanvas>
                <span className={styles.depthVeil} />
            </span>
        </EffectFrame>
    )
}
