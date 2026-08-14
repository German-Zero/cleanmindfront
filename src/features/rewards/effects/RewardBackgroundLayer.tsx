"use client"

import { useTheme } from "@/features/settings/ThemeProvider"
import PrismaticAurora from "./backgrounds/PrismaticAurora/PrismaticAurora"
import EquippedEffectSlot from "./runtime/EquippedEffectSlot"

export default function RewardBackgroundLayer() {
    const { backgroundMotion, theme } = useTheme()
    const ambientBackground = backgroundMotion === "SOFT_AURORA"
        ? <PrismaticAurora theme={theme} />
        : <div className="ambient-background" aria-hidden="true" />

    return (
        <EquippedEffectSlot
            slot="BACKGROUND"
            fallback={ambientBackground}
        />
    )
}
