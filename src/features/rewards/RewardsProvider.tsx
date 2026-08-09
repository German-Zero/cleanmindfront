"use client"

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
    type ReactNode,
} from "react"
import {
    applyRewardAppearance,
    selectEquippedRewards,
    type EquippedRewards,
} from "./appearance/rewardAppearance"
import RewardToast, { type RewardNotice } from "./components/RewardToast"
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

interface RewardsContextValue {
    summary: RewardSummary
    equippedRewards: EquippedRewards
    updateSummary: (summary: RewardSummary) => void
    storeItems: StoreItem[]
    updateStore: (store: StorefrontResponse) => void
    setStoreItemEquipped: (itemId: StoreItemId, equipped: boolean) => Promise<void>
    registerReward: (reward: RewardGrant, feedback: RewardFeedback) => void
}

const RewardsContext = createContext<RewardsContextValue | null>(null)

export function RewardsProvider({ children, initialSummary, initialItems }: {
    children: ReactNode
    initialSummary: RewardSummary
    initialItems: StoreItem[]
}) {
    const [summary, setSummary] = useState(initialSummary)
    const [storeItems, setStoreItems] = useState(initialItems)
    const [notice, setNotice] = useState<RewardNotice | null>(null)
    const equippedRewards = useMemo(
        () => selectEquippedRewards(storeItems),
        [storeItems],
    )

    useEffect(() => {
        applyRewardAppearance(storeItems)
    }, [storeItems])

    const updateSummary = useCallback((nextSummary: RewardSummary) => {
        setSummary(nextSummary)
        setStoreItems((items) => items.map((item) => ({
            ...item,
            canAfford: item.owned || nextSummary.balance >= item.cost,
        })))
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

    const registerReward = useCallback(
        (reward: RewardGrant, feedback: RewardFeedback) => {
            updateSummary(reward)
            setNotice({ id: Date.now(), reward, ...feedback })
        },
        [updateSummary],
    )

    const dismissNotice = useCallback(() => setNotice(null), [])

    return (
        <RewardsContext value={{
            summary,
            equippedRewards,
            updateSummary,
            storeItems,
            updateStore,
            setStoreItemEquipped,
            registerReward,
        }}>
            {children}
            <RewardToast notice={notice} onDismiss={dismissNotice} />
        </RewardsContext>
    )
}

export function useRewards(): RewardsContextValue {
    const context = useContext(RewardsContext)
    if (!context) throw new Error("useRewards debe usarse dentro de RewardsProvider")
    return context
}
