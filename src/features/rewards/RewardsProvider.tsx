"use client"

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react"
import { rewardsService } from "./services/rewards.service"
import type {
    RewardGrant,
    RewardSummary,
    StorefrontResponse,
    StoreItem,
    StoreItemId,
} from "./types"

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
    updateSummary: (summary: RewardSummary) => void
    storeItems: StoreItem[]
    updateStore: (store: StorefrontResponse) => void
    setStoreItemEquipped: (
        itemId: StoreItemId,
        equipped: boolean,
    ) => Promise<void>
    registerReward: (reward: RewardGrant, feedback: RewardFeedback) => void
}

const RewardsContext = createContext<RewardsContextValue | null>(null)

export function RewardsProvider({
    children,
    initialSummary,
    initialItems,
}: {
    children: ReactNode
    initialSummary: RewardSummary
    initialItems: StoreItem[]
}) {
    const [summary, setSummary] = useState(initialSummary)
    const [storeItems, setStoreItems] = useState(initialItems)
    const [notice, setNotice] = useState<RewardNotice | null>(null)

    const applyStoreAppearance = useCallback((items: StoreItem[]) => {
        const root = document.documentElement
        const attributes = {
            PALETTE: "data-reward-palette",
            BACKGROUND: "data-reward-background",
            BORDER: "data-reward-border",
            EFFECT: "data-reward-effect",
            POMODORO: "data-reward-pomodoro",
            CALENDAR: "data-reward-calendar",
        } as const

        Object.values(attributes).forEach((attribute) => {
            root.removeAttribute(attribute)
        })
        items
            .filter((item) => item.equipped)
            .forEach((item) => {
                root.setAttribute(attributes[item.category], item.id)
            })
    }, [])

    useEffect(() => {
        applyStoreAppearance(storeItems)
    }, [applyStoreAppearance, storeItems])

    const updateSummary = useCallback((nextSummary: RewardSummary) => {
        setSummary(nextSummary)
        setStoreItems((items) =>
            items.map((item) => ({
                ...item,
                canAfford: item.owned || nextSummary.balance >= item.cost,
            })),
        )
    }, [])

    const updateStore = useCallback((store: StorefrontResponse) => {
        setSummary(store.summary)
        setStoreItems(store.items)
    }, [])

    const setStoreItemEquipped = useCallback(
        async (itemId: StoreItemId, equipped: boolean) => {
            const store = equipped
                ? await rewardsService.equip(itemId)
                : await rewardsService.unequip(itemId)
            updateStore(store)
        },
        [updateStore],
    )

    useEffect(() => {
        if (!notice) return

        const timeout = window.setTimeout(() => setNotice(null), 5000)
        return () => window.clearTimeout(timeout)
    }, [notice])

    const registerReward = useCallback(
        (reward: RewardGrant, feedback: RewardFeedback) => {
            updateSummary(reward)
            setNotice({
                id: Date.now(),
                reward,
                ...feedback,
            })
        },
        [updateSummary],
    )

    const rewardLabel = notice
        ? notice.reward.pointsAwarded > 0
            ? `+${notice.reward.pointsAwarded} puntos`
            : notice.reward.remainingThisMonth === 0
              ? "Límite mensual alcanzado"
              : "Puntos ya otorgados"
        : ""

    return (
        <RewardsContext
            value={{
                summary,
                updateSummary,
                storeItems,
                updateStore,
                setStoreItemEquipped,
                registerReward,
            }}
        >
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
