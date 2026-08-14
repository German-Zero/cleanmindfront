"use client"

import { useMemo } from "react"
import { Color } from "three"
import FullScreenShaderScene from "../../renderers/webgl/FullScreenShaderScene"
import type { MeteorShowerPalette } from "./palette"
import { meteorShowerFragmentShader } from "./shaders"

export default function MeteorShowerScene({
    palette,
    preview,
    meteorCount,
    meteorSeed,
}: {
    palette: MeteorShowerPalette
    preview: boolean
    meteorCount: number
    meteorSeed: number
}) {
    const uniforms = useMemo(() => ({
        uColorHead: { value: new Color(palette.head) },
        uColorCool: { value: new Color(palette.cool) },
        uColorWarm: { value: new Color(palette.warm) },
        uColorStar: { value: new Color(palette.star) },
        uIntensity: {
            value: preview
                ? (palette.light ? 1.04 : 1.16)
                : (palette.light ? 0.74 : 0.94),
        },
        uLightMode: { value: palette.light ? 1 : 0 },
        uStarScale: { value: preview ? 0.82 : 1 },
        uMeteorCount: { value: meteorCount },
        uMeteorSeed: { value: meteorSeed },
    }), [meteorCount, meteorSeed, palette, preview])

    return (
        <FullScreenShaderScene
            fragmentShader={meteorShowerFragmentShader}
            uniforms={uniforms}
            speed={preview ? 0.72 : 0.55}
        />
    )
}
