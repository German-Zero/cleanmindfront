"use client"

import { MotionConfig } from "motion/react"
import type { ComponentType } from "react"
import type { StoreItemCategory } from "../types"
import BackgroundRewardPreview from "./previews/BackgroundRewardPreview"
import BorderRewardPreview from "./previews/BorderRewardPreview"
import CalendarRewardPreview from "./previews/CalendarRewardPreview"
import PaletteRewardPreview from "./previews/PaletteRewardPreview"
import PomodoroRewardPreview from "./previews/PomodoroRewardPreview"
import type { RewardPreviewProps } from "./previews/preview.types"
import SurfaceEffectRewardPreview from "./previews/SurfaceEffectRewardPreview"

const previewByCategory: Record<StoreItemCategory, ComponentType<RewardPreviewProps>> = {
    PALETTE: PaletteRewardPreview,
    BACKGROUND: BackgroundRewardPreview,
    BORDER: BorderRewardPreview,
    EFFECT: SurfaceEffectRewardPreview,
    POMODORO: PomodoroRewardPreview,
    CALENDAR: CalendarRewardPreview,
}

export default function RewardVisualPreview(props: RewardPreviewProps) {
    const Preview = previewByCategory[props.item.category]

    return (
        <MotionConfig reducedMotion="user">
            <Preview {...props} />
        </MotionConfig>
    )
}
