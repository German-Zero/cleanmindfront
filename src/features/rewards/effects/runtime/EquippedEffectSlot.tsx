"use client"

import { AnimatePresence } from "motion/react"
import { Fragment, type ReactNode } from "react"
import { useRewards } from "../../RewardsProvider"
import type { StoreItemCategory } from "../../types"
import RewardEffectRenderer from "./RewardEffectRenderer"

type EquippedEffectCategory = Extract<
    StoreItemCategory,
    "BACKGROUND" | "CALENDAR" | "POMODORO"
>

export default function EquippedEffectSlot({
    slot,
    fallback = null,
}: {
    slot: EquippedEffectCategory
    fallback?: ReactNode
}) {
    const { equippedRewards } = useRewards()
    const item = equippedRewards[slot]

    return (
        <AnimatePresence initial={false} mode="wait">
            {item ? (
                <RewardEffectRenderer
                    key={`${slot}:${item.id}`}
                    item={item}
                    slot={slot}
                    fallback={fallback}
                />
            ) : (
                <Fragment key={`${slot}:fallback`}>{fallback}</Fragment>
            )}
        </AnimatePresence>
    )
}
