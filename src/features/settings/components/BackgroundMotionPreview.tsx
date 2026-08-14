"use client"

import PrismaticAurora from "@/features/rewards/effects/backgrounds/PrismaticAurora/PrismaticAurora"
import type { BackgroundMotion, Theme } from "../types"

const previewClassByMotion: Record<Exclude<BackgroundMotion, "SOFT_AURORA">, string> = {
    NONE: "none",
    STAR_RAIN: "meteors",
    ORBITAL_GALAXY: "nebula",
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

    return (
        <span
            className={`appearance-motion-preview appearance-motion-preview--${previewClassByMotion[motion]}`}
            aria-hidden="true"
        />
    )
}
