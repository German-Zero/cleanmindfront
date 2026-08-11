"use client"

import { useMemo, useState } from "react"
import { useEffectActivity } from "./useEffectActivity"

interface DeviceCapabilities {
    isLowPower: boolean
    supportsWebGL: boolean
}

const initialCapabilities: DeviceCapabilities = {
    isLowPower: false,
    supportsWebGL: false,
}

function detectCapabilities(): DeviceCapabilities {
    const canvas = document.createElement("canvas")
    const supportsWebGL = Boolean(
        canvas.getContext("webgl2", { failIfMajorPerformanceCaveat: true })
        ?? canvas.getContext("webgl", { failIfMajorPerformanceCaveat: true }),
    )
    const navigatorWithMemory = navigator as Navigator & { deviceMemory?: number }
    const isLowPower = navigator.hardwareConcurrency <= 2
        || (navigatorWithMemory.deviceMemory ?? 8) <= 2

    return { isLowPower, supportsWebGL }
}

export function useEffectRuntime() {
    const activity = useEffectActivity()
    const [capabilities] = useState(() => (
        typeof document === "undefined" ? initialCapabilities : detectCapabilities()
    ))

    return useMemo(() => ({
        canUseWebGL: activity.shouldAnimate
            && capabilities.supportsWebGL
            && !capabilities.isLowPower,
        isLowPower: capabilities.isLowPower,
        shouldAnimate: activity.shouldAnimate,
        pixelRatio: capabilities.isLowPower
            ? ([1, 1] as [number, number])
            : ([1, 1.5] as [number, number]),
    }), [activity.shouldAnimate, capabilities])
}
