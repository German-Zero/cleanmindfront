"use client"

import { pomodoroEffectRegistry } from "../../effects/registry"
import type { RewardPreviewProps } from "./preview.types"
import { previewHeight } from "./preview.types"

export default function PomodoroRewardPreview({ item, expanded }: RewardPreviewProps) {
    const Decoration = pomodoroEffectRegistry[item.id]

    return (
        <div className={`relative grid ${previewHeight(expanded)} place-items-center overflow-hidden rounded-[14px] border border-white/10 bg-[#171223]`} aria-hidden="true">
            <span className="absolute inset-[12%] rounded-full bg-fuchsia-300/10 blur-xl" />
            <span className="relative grid size-22 place-items-center rounded-full border-[5px] border-primary/28">
                {Decoration && <Decoration item={item} preview />}
                <span className="relative z-1 text-[17px] font-semibold text-white/90">25:00</span>
            </span>
        </div>
    )
}
