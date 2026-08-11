"use client"

import EquippedEffectSlot from "./runtime/EquippedEffectSlot"

export default function RewardBackgroundLayer() {
    return (
        <EquippedEffectSlot
            slot="BACKGROUND"
            fallback={<div className="ambient-background" aria-hidden="true" />}
        />
    )
}
