"use client"

import RewardEffectRenderer from "../../effects/runtime/RewardEffectRenderer"
import type { RewardPreviewProps } from "./preview.types"
import { previewHeight } from "./preview.types"

export default function PomodoroRewardPreview({ item, expanded }: RewardPreviewProps) {
    const timerSize = expanded ? "size-[152px]" : "size-22"
    const timeSize = expanded ? "text-[24px]" : "text-[17px]"

    return (
        <div className={`relative grid ${previewHeight(expanded)} place-items-center overflow-hidden rounded-[14px] border border-white/10 bg-[#171223]`} aria-hidden="true">
            <RewardEffectRenderer item={item} slot="POMODORO" preview animated={Boolean(expanded)} />
            <span className="absolute inset-[12%] rounded-full bg-fuchsia-300/8 blur-xl" />
            <span className={`relative z-1 grid place-items-center rounded-full border-[5px] border-primary/28 bg-[#171223]/62 ${timerSize}`}>
                <span className={`relative z-1 font-semibold text-white/90 ${timeSize}`}>25:00</span>
            </span>
        </div>
    )
}
