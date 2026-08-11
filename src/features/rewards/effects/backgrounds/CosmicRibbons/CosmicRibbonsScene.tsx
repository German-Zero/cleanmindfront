"use client"

import { useMemo } from "react"
import { AdditiveBlending, Color } from "three"
import FullScreenShaderScene from "../../renderers/webgl/FullScreenShaderScene"
import { cosmicRibbonsFragmentShader } from "./shaders"

export default function CosmicRibbonsScene({
    colors,
    preview,
}: {
    colors: string[]
    preview: boolean
}) {
    const uniforms = useMemo(() => {
        const cool = new Color(colors[1] ?? "#6F63FF")
        const warm = new Color(colors[2] ?? "#E46FD8")
        const highlight = cool.clone().lerp(new Color("#DDF5FF"), 0.42)

        return {
            uColorCool: { value: cool },
            uColorWarm: { value: warm },
            uColorHighlight: { value: highlight },
            uIntensity: { value: preview ? 1.08 : 0.78 },
            uStarScale: { value: preview ? 0.82 : 1 },
        }
    }, [colors, preview])

    return (
        <FullScreenShaderScene
            fragmentShader={cosmicRibbonsFragmentShader}
            uniforms={uniforms}
            speed={preview ? 0.62 : 0.46}
            blending={AdditiveBlending}
        />
    )
}
