"use client"

import { useTheme } from "@/features/settings/ThemeProvider"
import OrbitalNebula from "./backgrounds/OrbitalNebula/OrbitalNebula"
import PrismaticAurora from "./backgrounds/PrismaticAurora/PrismaticAurora"
import EquippedEffectSlot from "./runtime/EquippedEffectSlot"

export default function RewardBackgroundLayer() {
    const { backgroundMotion, theme } = useTheme()
    const ambientBackground = backgroundMotion === "SOFT_AURORA"
        ? <PrismaticAurora theme={theme} />
        : backgroundMotion === "ORBITAL_GALAXY"
            ? <OrbitalNebula theme={theme} />
            : <div className="ambient-background" aria-hidden="true" />

    return (
        <EquippedEffectSlot
            slot="BACKGROUND"
            fallback={ambientBackground}
        />
    )
}
