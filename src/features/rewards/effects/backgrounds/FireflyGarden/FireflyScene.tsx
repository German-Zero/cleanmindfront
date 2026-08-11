"use client"

import { useFrame } from "@react-three/fiber"
import { useMemo, useRef } from "react"
import { AdditiveBlending, Color, ShaderMaterial } from "three"
import { fireflyFragmentShader, fireflyVertexShader } from "./shaders"

function seededValue(index: number, salt: number) {
    const value = Math.sin(index * 9283.31 + salt * 77.13) * 43758.5453
    return value - Math.floor(value)
}

export default function FireflyScene({
    colors,
    preview,
}: {
    colors: string[]
    preview: boolean
}) {
    const materialRef = useRef<ShaderMaterial>(null)
    const count = preview ? 34 : 68
    const geometry = useMemo(() => {
        const positions = new Float32Array(count * 3)
        const sizes = new Float32Array(count)
        const phases = new Float32Array(count)

        for (let index = 0; index < count; index += 1) {
            positions[index * 3] = seededValue(index, 1) * 2.2 - 1.1
            positions[index * 3 + 1] = seededValue(index, 2) * 2.2 - 1.1
            positions[index * 3 + 2] = 0
            sizes[index] = 3.2 + seededValue(index, 3) * (preview ? 5.5 : 8)
            phases[index] = seededValue(index, 4) * Math.PI * 2
        }

        return { positions, sizes, phases }
    }, [count, preview])
    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uColorA: { value: new Color(colors[0] ?? "#77E8B5") },
        uColorB: { value: new Color(colors[1] ?? "#FFD978") },
    }), [colors])

    useFrame(({ clock }) => {
        if (materialRef.current) {
            materialRef.current.uniforms.uTime.value = clock.getElapsedTime()
        }
    })

    return (
        <points frustumCulled={false}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[geometry.positions, 3]} />
                <bufferAttribute attach="attributes-aSize" args={[geometry.sizes, 1]} />
                <bufferAttribute attach="attributes-aPhase" args={[geometry.phases, 1]} />
            </bufferGeometry>
            <shaderMaterial
                ref={materialRef}
                uniforms={uniforms}
                vertexShader={fireflyVertexShader}
                fragmentShader={fireflyFragmentShader}
                transparent
                depthWrite={false}
                blending={AdditiveBlending}
            />
        </points>
    )
}
