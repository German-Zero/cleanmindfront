"use client"

import OrbitalNebula from "@/features/rewards/effects/backgrounds/OrbitalNebula/OrbitalNebula"
import PrismaticAurora from "@/features/rewards/effects/backgrounds/PrismaticAurora/PrismaticAurora"
import type { BackgroundMotion, Theme } from "../types"

const previewClassByMotion: Record<
    Exclude<BackgroundMotion, "SOFT_AURORA" | "ORBITAL_GALAXY">,
    string
> = {
    NONE: "none",
    STAR_RAIN: "meteors",
}

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

    return (
        <span
            className={`appearance-motion-preview appearance-motion-preview--${previewClassByMotion[motion]}`}
            aria-hidden="true"
        />
    )
}
