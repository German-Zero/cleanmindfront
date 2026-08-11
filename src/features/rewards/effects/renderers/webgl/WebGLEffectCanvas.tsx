"use client"

import { AdaptiveDpr } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import type { ReactNode } from "react"
import { useEffectRuntime } from "../../runtime/useEffectRuntime"
import styles from "./WebGLEffectCanvas.module.css"

export default function WebGLEffectCanvas({
    children,
    className = "",
    fallback = null,
    animated = true,
}: {
    children: ReactNode
    className?: string
    fallback?: ReactNode
    animated?: boolean
}) {
    const runtime = useEffectRuntime()

    if (!animated || !runtime.canUseWebGL) return fallback

    return (
        <span className={`${styles.canvas} ${className}`} aria-hidden="true">
            <Canvas
                dpr={runtime.pixelRatio}
                frameloop={runtime.shouldAnimate ? "always" : "demand"}
                gl={{
                    alpha: true,
                    antialias: !runtime.isLowPower,
                    powerPreference: "low-power",
                }}
                orthographic
                camera={{ position: [0, 0, 1], zoom: 1 }}
                onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
            >
                <AdaptiveDpr pixelated />
                {children}
            </Canvas>
        </span>
    )
}
