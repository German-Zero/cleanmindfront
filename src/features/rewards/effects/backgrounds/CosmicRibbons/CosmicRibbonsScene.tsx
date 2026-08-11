"use client"

import { useMemo } from "react"
import { AdditiveBlending, Color } from "three"
import FullScreenShaderScene from "../../renderers/webgl/FullScreenShaderScene"
import { cosmicRibbonsFragmentShader } from "./shaders"

export default function CosmicRibbonsScene({ colors }: { colors: string[] }) {
    const uniforms = useMemo(() => ({
        uColorA: { value: new Color(colors[0] ?? "#6F63FF") },
        uColorB: { value: new Color(colors[1] ?? "#E46FD8") },
        uColorC: { value: new Color(colors[2] ?? "#9BE7FF") },
    }), [colors])

    return (
        <FullScreenShaderScene
            fragmentShader={cosmicRibbonsFragmentShader}
            uniforms={uniforms}
            speed={0.72}
            blending={AdditiveBlending}
        />
    )
}
