"use client"

import { backgroundEffectRegistry } from "../../effects/registry"
import type { RewardPreviewProps } from "./preview.types"
import { previewHeight } from "./preview.types"

export default function BackgroundRewardPreview({ item, expanded }: RewardPreviewProps) {
    const BackgroundEffect = backgroundEffectRegistry[item.id]

    return (
        <div
            className={`relative ${previewHeight(expanded)} overflow-hidden rounded-[14px] border border-white/10 bg-[#0B1020]`}
            aria-hidden="true"
        >
            {BackgroundEffect && <BackgroundEffect item={item} preview />}
        </div>
    )
}
