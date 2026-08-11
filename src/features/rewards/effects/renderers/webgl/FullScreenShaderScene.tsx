"use client"

import { useFrame } from "@react-three/fiber"
import { useMemo, useRef } from "react"
import {
    NormalBlending,
    ShaderMaterial,
    type Blending,
    type IUniform,
} from "three"
import { fullScreenVertexShader } from "./shaders/fullscreen"

export default function FullScreenShaderScene({
    fragmentShader,
    uniforms = {},
    speed = 1,
    blending = NormalBlending,
}: {
    fragmentShader: string
    uniforms?: Record<string, IUniform>
    speed?: number
    blending?: Blending
}) {
    const materialRef = useRef<ShaderMaterial>(null)
    const resolvedUniforms = useMemo(() => ({
        uTime: { value: 0 },
        uAspect: { value: 1 },
        ...uniforms,
    }), [uniforms])

    useFrame(({ clock, size }) => {
        if (!materialRef.current) return
        materialRef.current.uniforms.uTime.value = clock.getElapsedTime() * speed
        materialRef.current.uniforms.uAspect.value = size.width / Math.max(size.height, 1)
    })

    return (
        <mesh frustumCulled={false}>
            <planeGeometry args={[2, 2]} />
            <shaderMaterial
                ref={materialRef}
                uniforms={resolvedUniforms}
                vertexShader={fullScreenVertexShader}
                fragmentShader={fragmentShader}
                transparent
                depthWrite={false}
                blending={blending}
            />
        </mesh>
    )
}
