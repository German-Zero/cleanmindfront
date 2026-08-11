"use client"

import { useMemo } from "react"
import { Color } from "three"
import FullScreenShaderScene from "../../renderers/webgl/FullScreenShaderScene"
import { rainyWindowFragmentShader } from "./shaders"

export default function RainyWindowScene({
    colors,
    preview,
}: {
    colors: string[]
    preview: boolean
}) {
    const uniforms = useMemo(() => ({
        uIntensity: { value: preview ? 1.08 : 0.96 },
        uColorA: { value: new Color(colors[0] ?? "#0C1724") },
        uColorB: { value: new Color(colors[1] ?? "#4C8FB8") },
        uColorC: { value: new Color(colors[2] ?? "#A9D8E8") },
    }), [colors, preview])

    return (
        <FullScreenShaderScene
            fragmentShader={rainyWindowFragmentShader}
            uniforms={uniforms}
            speed={preview ? 0.96 : 0.72}
        />
    )
}
