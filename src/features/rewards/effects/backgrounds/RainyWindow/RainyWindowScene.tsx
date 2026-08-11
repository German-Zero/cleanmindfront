"use client"

import { useMemo } from "react"
import { Color } from "three"
import FullScreenShaderScene from "../../renderers/webgl/FullScreenShaderScene"
import { rainyWindowFragmentShader } from "./shaders"

export default function RainyWindowScene({ colors }: { colors: string[] }) {
    const uniforms = useMemo(() => ({
        uColorA: { value: new Color(colors[0] ?? "#13283A") },
        uColorB: { value: new Color(colors[1] ?? "#78B4D2") },
    }), [colors])

    return (
        <FullScreenShaderScene
            fragmentShader={rainyWindowFragmentShader}
            uniforms={uniforms}
            speed={0.86}
        />
    )
}
