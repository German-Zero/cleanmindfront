"use client"

import dynamic from "next/dynamic"
import type { ComponentType } from "react"
import type { StoreItemId } from "../types"
import type { RewardEffectProps } from "./types"

type EffectRegistry = Partial<Record<StoreItemId, ComponentType<RewardEffectProps>>>

export const backgroundEffectRegistry: EffectRegistry = {
    BACKGROUND_FIREFLY_GARDEN: dynamic(() => import("./backgrounds/FireflyGarden/FireflyGarden")),
    BACKGROUND_COSMIC_RIBBONS: dynamic(() => import("./backgrounds/CosmicRibbons/CosmicRibbons")),
    BACKGROUND_RAINY_WINDOW: dynamic(() => import("./backgrounds/RainyWindow/RainyWindow")),
    BACKGROUND_FLOATING_BLOOMS: dynamic(() => import("./backgrounds/FloatingBlooms/FloatingBlooms")),
}

export const calendarEffectRegistry: EffectRegistry = {
    CALENDAR_TIDAL_WAVE: dynamic(() => import("./calendar/TidalWave/TidalWave")),
}

export const pomodoroEffectRegistry: EffectRegistry = {
    POMODORO_BLOOM_RING: dynamic(() => import("./pomodoro/BloomRing/BloomRing")),
}
