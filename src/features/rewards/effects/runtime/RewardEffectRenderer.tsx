"use client"

import { MotionConfig } from "motion/react"
import { getRewardEffectDefinition } from "../core/registry"
import type { RewardEffectRendererProps } from "../core/types"
import EffectErrorBoundary from "./EffectErrorBoundary"

export default function RewardEffectRenderer({
    item,
    slot,
    preview = false,
    animated = true,
    fallback = null,
}: RewardEffectRendererProps) {
    const definition = getRewardEffectDefinition(item.id, slot)
    if (!definition) return fallback

    const Effect = definition.component

    return (
        <EffectErrorBoundary fallback={fallback} resetKey={`${slot}:${item.id}`}>
            <MotionConfig reducedMotion="user">
                <Effect item={item} preview={preview} animated={animated} />
            </MotionConfig>
        </EffectErrorBoundary>
    )
}
