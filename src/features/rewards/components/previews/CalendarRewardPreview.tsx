"use client"

import RewardEffectRenderer from "../../effects/runtime/RewardEffectRenderer"
import type { RewardPreviewProps } from "./preview.types"
import { previewHeight } from "./preview.types"

export default function CalendarRewardPreview({ item, expanded }: RewardPreviewProps) {
    return (
        <div className={`relative ${previewHeight(expanded)} overflow-hidden rounded-[14px] border border-white/10 bg-[#0B1724] p-3.5`} aria-hidden="true">
            <RewardEffectRenderer item={item} slot="CALENDAR" preview animated={Boolean(expanded)} />
            <span className="relative z-1 flex h-full flex-col rounded-[10px] border border-cyan-100/18 bg-[#132536]/88 p-2.5">
                <span className="mb-2 flex items-center justify-between">
                    <span className="h-1.25 w-[34%] rounded-full bg-cyan-100/55" />
                    <span className="size-2.75 rounded-sm bg-blue-300/45" />
                </span>
                <span className="grid flex-1 grid-cols-4 grid-rows-3 gap-0.75">
                    {Array.from({ length: 12 }, (_, index) => (
                        <span key={index} className="rounded-[3px] border border-cyan-100/12 bg-white/6" />
                    ))}
                </span>
            </span>
        </div>
    )
}
