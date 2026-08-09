"use client"

import { MotionConfig } from "motion/react"
import { useRewards } from "../RewardsProvider"
import { pomodoroEffectRegistry } from "./registry"

export default function PomodoroRewardDecoration() {
    const { equippedRewards } = useRewards()
    const item = equippedRewards.POMODORO
    const Decoration = item ? pomodoroEffectRegistry[item.id] : undefined
    if (!item || !Decoration) return null

    return <MotionConfig reducedMotion="user"><Decoration item={item} /></MotionConfig>
}
