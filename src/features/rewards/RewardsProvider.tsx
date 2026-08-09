"use client"

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react"
import type { RewardGrant, RewardSummary } from "./types"

interface RewardFeedback {
    title: string
    description: string
}

interface RewardNotice extends RewardFeedback {
    id: number
    reward: RewardGrant
}

interface RewardsContextValue {
    summary: RewardSummary
    registerReward: (
        reward: RewardGrant,
        feedback: RewardFeedback,
    ) => void
}

const RewardsContext = createContext<RewardsContextValue | null>(null)

export function RewardsProvider({
    children,
    initialSummary,
}: {
    children: ReactNode
    initialSummary: RewardSummary
}) {
    const [summary, setSummary] = useState(initialSummary)
    const [notice, setNotice] = useState<RewardNotice | null>(null)

    useEffect(() => {
        if (!notice) return

        const timeout = window.setTimeout(() => setNotice(null), 5000)
        return () => window.clearTimeout(timeout)
    }, [notice])

    const registerReward = useCallback(
        (reward: RewardGrant, feedback: RewardFeedback) => {
            setSummary(reward)
            setNotice({
                id: Date.now(),
                reward,
                ...feedback,
            })
        },
        [],
    )

    const rewardLabel = notice
        ? notice.reward.pointsAwarded > 0
            ? `+${notice.reward.pointsAwarded} puntos`
            : notice.reward.remainingThisMonth === 0
              ? "Límite mensual alcanzado"
              : "Puntos ya otorgados"
        : ""

    return (
        <RewardsContext value={{ summary, registerReward }}>
            {children}
            {notice && (
                <aside
                    key={notice.id}
                    role="status"
                    aria-live="polite"
                    aria-atomic="true"
                    className="reward-toast fixed right-4 bottom-22 left-4 z-90 flex items-center gap-3 rounded-[14px] border border-success/30 bg-surface/95 px-4 py-3.25 shadow-[0_16px_40px_rgb(0_0_0/24%)] backdrop-blur sm:right-6 sm:bottom-6 sm:left-auto sm:w-85"
                >
                    <span
                        aria-hidden="true"
                        className="grid size-8 shrink-0 place-items-center rounded-full bg-success/14 text-[16px] font-semibold text-success"
                    >
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
                </aside>
            )}
        </RewardsContext>
    )
}

export function useRewards(): RewardsContextValue {
    const context = useContext(RewardsContext)

    if (!context) {
        throw new Error("useRewards debe usarse dentro de RewardsProvider")
    }

    return context
}
