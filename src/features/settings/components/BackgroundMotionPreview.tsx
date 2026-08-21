"use client"

import MeteorShower from "@/features/rewards/effects/backgrounds/MeteorShower/MeteorShower"
import OrbitalNebula from "@/features/rewards/effects/backgrounds/OrbitalNebula/OrbitalNebula"
import PrismaticAurora from "@/features/rewards/effects/backgrounds/PrismaticAurora/PrismaticAurora"
import type { BackgroundMotion, Theme } from "../types"

export default function BackgroundMotionPreview({
    motion,
    theme,
}: {
    motion: BackgroundMotion
    theme: Theme
}) {
    if (motion === "SOFT_AURORA") {
        return (
            <span className="appearance-motion-preview" aria-hidden="true">
                <PrismaticAurora theme={theme} preview />
            </span>
        )
    }

    if (motion === "ORBITAL_GALAXY") {
        return (
            <span className="appearance-motion-preview" aria-hidden="true">
                <OrbitalNebula theme={theme} preview />
            </span>
        )
    }

    if (motion === "STAR_RAIN") {
        return (
            <span className="appearance-motion-preview" aria-hidden="true">
                <MeteorShower theme={theme} preview />
            </span>
        )
    }

    return (
        <span
            className="appearance-motion-preview appearance-motion-preview--none"
            aria-hidden="true"
        />
    )
}
