"use client"

import type { CSSProperties } from "react"
import type { Theme } from "@/features/settings/types"
import EffectFrame from "../../renderers/dom/EffectFrame"
import WebGLEffectCanvas from "../../renderers/webgl/WebGLEffectCanvas"
import { getPrismaticAuroraPalette } from "./palette"
import PrismaticAuroraFallback from "./PrismaticAuroraFallback"
import styles from "./PrismaticAurora.module.css"
import PrismaticAuroraScene from "./PrismaticAuroraScene"

type AuroraVariables = CSSProperties & {
    "--aurora-boreal": string
    "--aurora-primary": string
    "--aurora-secondary": string
    "--aurora-accent": string
    "--aurora-atmosphere": string
}

export default function PrismaticAurora({
    theme,
    preview = false,
    animated = true,
}: {
    theme: Theme
    preview?: boolean
    animated?: boolean
}) {
    const palette = getPrismaticAuroraPalette(theme)
    const variables: AuroraVariables = {
        "--aurora-boreal": palette.boreal,
        "--aurora-primary": palette.primary,
        "--aurora-secondary": palette.secondary,
        "--aurora-accent": palette.accent,
        "--aurora-atmosphere": palette.atmosphere,
    }

    return (
        <EffectFrame
            className={styles.background}
            opacity={preview ? 1 : 0.93}
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
                    fallback={<PrismaticAuroraFallback palette={palette} />}
                >
                    <PrismaticAuroraScene palette={palette} preview={preview} />
                </WebGLEffectCanvas>
                <span className={styles.veil} />
            </span>
        </EffectFrame>
    )
}
