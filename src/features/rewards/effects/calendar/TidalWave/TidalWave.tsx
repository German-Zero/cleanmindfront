"use client"

import type { RewardEffectProps } from "../../core/types"
import WebGLEffectCanvas from "../../renderers/webgl/WebGLEffectCanvas"
import styles from "./TidalWave.module.css"
import TidalWaveArtwork from "./TidalWaveArtwork"
import TidalWaveScene from "./TidalWaveScene"

export default function TidalWave({
    item,
    preview = false,
    animated = true,
}: RewardEffectProps) {
    const [primary = "#0E6070", secondary = "#51CED2", highlight = "#DDFBF7"] = item.colors
    const placementClass = preview ? styles.preview : styles.calendar
    const fallback = (
        <>
            <span
                aria-hidden="true"
                className={`${styles.effect} ${placementClass} ${styles.fallback}`}
                style={{
                    background: `linear-gradient(180deg, transparent 42%, ${highlight}0F 58%, ${secondary}18 72%, ${primary}20 100%)`,
                }}
            />
            <TidalWaveArtwork
                colors={item.colors}
                preview={preview}
                animated={animated}
            />
        </>
    )

    return (
        <WebGLEffectCanvas
            className={`${styles.effect} ${placementClass}`}
            fallback={fallback}
            animated={animated}
        >
            <TidalWaveScene colors={item.colors} preview={preview} />
        </WebGLEffectCanvas>
    )
}
