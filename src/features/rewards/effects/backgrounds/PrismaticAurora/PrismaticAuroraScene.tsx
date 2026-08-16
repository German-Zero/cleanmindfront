"use client"

import { useMemo } from "react"
import { Color } from "three"
import FullScreenShaderScene from "../../renderers/webgl/FullScreenShaderScene"
import type { PrismaticAuroraPalette } from "./palette"
import { prismaticAuroraFragmentShader } from "./shaders"

export default function PrismaticAuroraScene({
    palette,
    preview,
}: {
    palette: PrismaticAuroraPalette
    preview: boolean
}) {
    const uniforms = useMemo(() => ({
        uColorBoreal: { value: new Color(palette.boreal) },
        uColorPrimary: { value: new Color(palette.primary) },
        uColorSecondary: { value: new Color(palette.secondary) },
        uColorAccent: { value: new Color(palette.accent) },
        uIntensity: {
            value: preview
                ? (palette.light ? 1.22 : 1.36)
                : (palette.light ? 0.9 : 1.08),
        },
        uLightMode: { value: palette.light ? 1 : 0 },
    }), [palette, preview])

    return (
        <FullScreenShaderScene
            fragmentShader={prismaticAuroraFragmentShader}
            uniforms={uniforms}
            speed={preview ? 0.95 : 0.72}
        />
    )
}
