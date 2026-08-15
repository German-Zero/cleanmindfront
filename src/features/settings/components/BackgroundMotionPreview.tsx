"use client"

import type { BackgroundMotion } from "../types"

const previewClass: Record<BackgroundMotion, string> = {
    NONE: "appearance-motion-preview--none",
    STAR_RAIN: "appearance-motion-preview--star-rain",
    ORBITAL_GALAXY: "appearance-motion-preview--orbital-galaxy",
    SOFT_AURORA: "appearance-motion-preview--soft-aurora",
}

export default function BackgroundMotionPreview({
    motion,
}: {
    motion: BackgroundMotion
}) {
    return (
        <span
            className={`appearance-motion-preview ${previewClass[motion]}`}
            aria-hidden="true"
        />
    )
}
