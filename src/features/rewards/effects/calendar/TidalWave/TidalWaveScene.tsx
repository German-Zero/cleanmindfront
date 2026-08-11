"use client"

import { useMemo } from "react"
import { Color } from "three"
import FullScreenShaderScene from "../../renderers/webgl/FullScreenShaderScene"
import { tidalWaveFragmentShader } from "./shaders"

export default function TidalWaveScene({
    colors,
    preview,
}: {
    colors: string[]
    preview: boolean
}) {
    const uniforms = useMemo(() => ({
        uIntensity: { value: preview ? 1.1 : 1 },
        uColorA: { value: new Color(colors[0] ?? "#0E6070") },
        uColorB: { value: new Color(colors[1] ?? "#51CED2") },
        uColorC: { value: new Color(colors[2] ?? "#DDFBF7") },
    }), [colors, preview])

    return (
        <FullScreenShaderScene
            fragmentShader={tidalWaveFragmentShader}
            uniforms={uniforms}
            speed={preview ? 0.88 : 0.6}
        />
    )
}
