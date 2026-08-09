"use client"

import { AnimatePresence, motion, MotionConfig } from "motion/react"
import { useEffect } from "react"
import type { RewardGrant } from "../types"

export interface RewardNotice {
    id: number
    title: string
    description: string
    reward: RewardGrant
}

export default function RewardToast({
    notice,
    onDismiss,
}: {
    notice: RewardNotice | null
    onDismiss: () => void
}) {
    useEffect(() => {
        if (!notice) return
        const timeout = window.setTimeout(onDismiss, 5000)
        return () => window.clearTimeout(timeout)
    }, [notice, onDismiss])

    const rewardLabel = notice
        ? notice.reward.pointsAwarded > 0
            ? `+${notice.reward.pointsAwarded} puntos`
            : notice.reward.remainingThisMonth === 0
              ? "Límite mensual alcanzado"
              : "Puntos ya otorgados"
        : ""

    return (
        <MotionConfig reducedMotion="user">
            <AnimatePresence>
                {notice && (
                    <motion.aside
                        key={notice.id}
                        role="status"
                        aria-live="polite"
                        aria-atomic="true"
                        className="fixed right-4 bottom-22 left-4 z-90 flex items-center gap-3 rounded-[14px] border border-success/30 bg-surface/95 px-4 py-3.25 shadow-[0_16px_40px_rgb(0_0_0/24%)] backdrop-blur sm:right-6 sm:bottom-6 sm:left-auto sm:w-85"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                    >
                        <span aria-hidden="true" className="grid size-8 shrink-0 place-items-center rounded-full bg-success/14 text-[16px] font-semibold text-success">
                            ✓
                        </span>
                        <span className="min-w-0 flex-1">
                            <strong className="block text-[12px] font-semibold text-text-primary">
                                {notice.title}
                            </strong>
                            <span className="block truncate text-[10px] text-text-secondary">
                                {notice.description}
                            </span>
                        </span>
                        <span className="shrink-0 rounded-full bg-accent/12 px-2.25 py-1.25 text-[10px] font-semibold text-accent">
                            {rewardLabel}
                        </span>
                    </motion.aside>
                )}
            </AnimatePresence>
        </MotionConfig>
    )
}
