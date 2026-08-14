"use client"

import { useFrame } from "@react-three/fiber"
import { useMemo, useRef } from "react"
import { Color, ShaderMaterial } from "three"
import {
    BIOLUMINESCENT_FLOWER_SETTINGS,
    createBioluminescentFlowerField,
} from "./flowerField"
import {
    bioluminescentFlowerFragmentShader,
    bioluminescentFlowerVertexShader,
} from "./shaders"

function createFlowerPalette(colors: string[]) {
    return {
        daisy: new Color(colors[0] ?? "#FFF9E8"),
        daisyCenter: new Color("#E9B83E"),
        sunflower: new Color(colors[1] ?? "#F2B43C"),
        sunflowerCenter: new Color("#69401F"),
        rose: new Color(colors[2] ?? "#E8799E"),
        tulip: new Color(colors[3] ?? "#B77CE5"),
    }
}

export default function BioluminescentFlowerScene({
    colors,
    preview,
}: {
    colors: string[]
    preview: boolean
}) {
    const materialRef = useRef<ShaderMaterial>(null)
    const field = useMemo(
        () => createBioluminescentFlowerField(preview),
        [preview],
    )
    const palette = useMemo(
        () => createFlowerPalette(colors),
        [colors],
    )
    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uDaisy: { value: palette.daisy },
        uDaisyCenter: { value: palette.daisyCenter },
        uSunflower: { value: palette.sunflower },
        uSunflowerCenter: { value: palette.sunflowerCenter },
        uRose: { value: palette.rose },
        uTulip: { value: palette.tulip },
    }), [palette])
    const speed = preview
        ? BIOLUMINESCENT_FLOWER_SETTINGS.speed.preview
        : BIOLUMINESCENT_FLOWER_SETTINGS.speed.timer

    useFrame(({ clock }) => {
        if (!materialRef.current) return
        materialRef.current.uniforms.uTime.value = clock.getElapsedTime() * speed
    })

    return (
        <points frustumCulled={false}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[field.positions, 3]} />
                <bufferAttribute attach="attributes-aSize" args={[field.sizes, 1]} />
                <bufferAttribute attach="attributes-aPhase" args={[field.phases, 1]} />
                <bufferAttribute attach="attributes-aFallSpeed" args={[field.fallSpeeds, 1]} />
                <bufferAttribute attach="attributes-aDrift" args={[field.drifts, 2]} />
                <bufferAttribute attach="attributes-aRotation" args={[field.rotations, 1]} />
                <bufferAttribute attach="attributes-aSpinSpeed" args={[field.spinSpeeds, 1]} />
                <bufferAttribute attach="attributes-aFlowerType" args={[field.flowerTypes, 1]} />
                <bufferAttribute attach="attributes-aDepth" args={[field.depths, 1]} />
                <bufferAttribute attach="attributes-aPulseRate" args={[field.pulseRates, 1]} />
            </bufferGeometry>
            <shaderMaterial
                ref={materialRef}
                uniforms={uniforms}
                vertexShader={bioluminescentFlowerVertexShader}
                fragmentShader={bioluminescentFlowerFragmentShader}
                transparent
                depthTest={false}
                depthWrite={false}
                toneMapped={false}
            />
        </points>
    )
}
