"use client"

import { useFrame } from "@react-three/fiber"
import { useMemo, useRef } from "react"
import { AdditiveBlending, Color, ShaderMaterial } from "three"
import { createFireflyField, FIREFLY_GARDEN_SETTINGS } from "./fireflyField"
import { fireflyFragmentShader, fireflyVertexShader } from "./shaders"

export default function FireflyScene({
    colors,
    preview,
}: {
    colors: string[]
    preview: boolean
}) {
    const materialRef = useRef<ShaderMaterial>(null)
    const geometry = useMemo(() => createFireflyField(preview), [preview])
    const uniforms = useMemo(() => {
        const cool = new Color(colors[1] ?? "#77E8B5")
        const warm = new Color(colors[2] ?? "#FFD978")

        return {
            uTime: { value: 0 },
            uColorCool: { value: cool },
            uColorWarm: { value: warm },
            uColorSoft: { value: warm.clone().lerp(new Color("#FFFBE1"), 0.58) },
            uIntensity: { value: preview ? 1.08 : 0.82 },
        }
    }, [colors, preview])
    const speed = preview
        ? FIREFLY_GARDEN_SETTINGS.speed.preview
        : FIREFLY_GARDEN_SETTINGS.speed.dashboard

    useFrame(({ clock }) => {
        if (!materialRef.current) return
        materialRef.current.uniforms.uTime.value = clock.getElapsedTime() * speed
    })

    return (
        <points frustumCulled={false}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[geometry.positions, 3]} />
                <bufferAttribute attach="attributes-aSize" args={[geometry.sizes, 1]} />
                <bufferAttribute attach="attributes-aPhase" args={[geometry.phases, 1]} />
                <bufferAttribute attach="attributes-aDrift" args={[geometry.drifts, 2]} />
                <bufferAttribute attach="attributes-aDepth" args={[geometry.depths, 1]} />
                <bufferAttribute attach="attributes-aColorMix" args={[geometry.colorMixes, 1]} />
                <bufferAttribute attach="attributes-aPulseRate" args={[geometry.pulseRates, 1]} />
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
