"use client"

import dynamic from "next/dynamic"
import type { StoreItemId } from "../../types"
import type { RewardEffectDefinition } from "./types"

type RewardEffectRegistry = Partial<Record<StoreItemId, RewardEffectDefinition>>

export const rewardEffectRegistry: RewardEffectRegistry = {
    BACKGROUND_FIREFLY_GARDEN: {
        id: "BACKGROUND_FIREFLY_GARDEN",
        slot: "BACKGROUND",
        engine: "css",
        component: dynamic(() => import("../backgrounds/FireflyGarden/FireflyGarden"), { ssr: false }),
    },
    BACKGROUND_COSMIC_RIBBONS: {
        id: "BACKGROUND_COSMIC_RIBBONS",
        slot: "BACKGROUND",
        engine: "webgl",
        component: dynamic(() => import("../backgrounds/CosmicRibbons/CosmicRibbons"), { ssr: false }),
    },
    BACKGROUND_RAINY_WINDOW: {
        id: "BACKGROUND_RAINY_WINDOW",
        slot: "BACKGROUND",
        engine: "webgl",
        component: dynamic(() => import("../backgrounds/RainyWindow/RainyWindow"), { ssr: false }),
    },
    BACKGROUND_FLOATING_BLOOMS: {
        id: "BACKGROUND_FLOATING_BLOOMS",
        slot: "BACKGROUND",
        engine: "css",
        component: dynamic(() => import("../backgrounds/FloatingBlooms/FloatingBlooms"), { ssr: false }),
    },
    CALENDAR_TIDAL_WAVE: {
        id: "CALENDAR_TIDAL_WAVE",
        slot: "CALENDAR",
        engine: "webgl",
        component: dynamic(() => import("../calendar/TidalWave/TidalWave"), { ssr: false }),
    },
    POMODORO_BLOOM_RING: {
        id: "POMODORO_BLOOM_RING",
        slot: "POMODORO",
        engine: "motion",
        component: dynamic(() => import("../pomodoro/BloomRing/BloomRing"), { ssr: false }),
    },
}

export function getRewardEffectDefinition(
    itemId: StoreItemId,
    slot: RewardEffectDefinition["slot"],
): RewardEffectDefinition | undefined {
    const definition = rewardEffectRegistry[itemId]
    return definition?.slot === slot ? definition : undefined
}
