"use client"

import RewardEffectRenderer from "../../effects/runtime/RewardEffectRenderer"
import type { RewardPreviewProps } from "./preview.types"
import { previewHeight } from "./preview.types"

export default function BackgroundRewardPreview({ item, expanded }: RewardPreviewProps) {
    return (
        <div
            className={`relative ${previewHeight(expanded)} overflow-hidden rounded-[14px] border border-white/10 bg-[#0B1020]`}
            aria-hidden="true"
        >
            <RewardEffectRenderer
                item={item}
                slot="BACKGROUND"
                preview
                animated={Boolean(expanded)}
            />
        </div>
    )
}
