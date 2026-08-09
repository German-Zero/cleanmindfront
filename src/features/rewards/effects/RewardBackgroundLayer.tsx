"use client"

import { AnimatePresence, MotionConfig } from "motion/react"
import { useRewards } from "../RewardsProvider"
import { backgroundEffectRegistry } from "./registry"

export default function RewardBackgroundLayer() {
    const { equippedRewards } = useRewards()
    const item = equippedRewards.BACKGROUND
    const BackgroundEffect = item ? backgroundEffectRegistry[item.id] : undefined

    if (!item || !BackgroundEffect) {
        return <div className="ambient-background" aria-hidden="true" />
    }

    return (
        <MotionConfig reducedMotion="user">
            <AnimatePresence initial={false} mode="wait">
                <BackgroundEffect key={item.id} item={item} />
            </AnimatePresence>
        </MotionConfig>
    )
}
