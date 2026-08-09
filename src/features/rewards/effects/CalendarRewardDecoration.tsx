"use client"

import { MotionConfig } from "motion/react"
import { useRewards } from "../RewardsProvider"
import { calendarEffectRegistry } from "./registry"

export default function CalendarRewardDecoration() {
    const { equippedRewards } = useRewards()
    const item = equippedRewards.CALENDAR
    const Decoration = item ? calendarEffectRegistry[item.id] : undefined
    if (!item || !Decoration) return null

    return <MotionConfig reducedMotion="user"><Decoration item={item} /></MotionConfig>
}
