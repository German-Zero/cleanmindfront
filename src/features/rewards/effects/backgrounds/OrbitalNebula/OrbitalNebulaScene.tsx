"use client"

import { useMemo } from "react"
import { Color } from "three"
import FullScreenShaderScene from "../../renderers/webgl/FullScreenShaderScene"
import type { OrbitalNebulaPalette } from "./palette"
import { orbitalNebulaFragmentShader } from "./shaders"

export default function OrbitalNebulaScene({
    palette,
    preview,
}: {
    palette: OrbitalNebulaPalette
    preview: boolean
}) {
    const uniforms = useMemo(() => ({
        uColorCore: { value: new Color(palette.core) },
        uColorCool: { value: new Color(palette.cool) },
        uColorWarm: { value: new Color(palette.warm) },
        uColorDust: { value: new Color(palette.dust) },
        uIntensity: {
            value: preview
                ? (palette.light ? 1.08 : 1.34)
                : (palette.light ? 0.82 : 1.08),
        },
        uLightMode: { value: palette.light ? 1 : 0 },
        uStarScale: { value: preview ? 0.82 : 1 },
    }), [palette, preview])

    return (
        <FullScreenShaderScene
            fragmentShader={orbitalNebulaFragmentShader}
            uniforms={uniforms}
            speed={preview ? 0.66 : 0.48}
        />
    )
}
