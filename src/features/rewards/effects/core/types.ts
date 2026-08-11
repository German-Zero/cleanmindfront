import type { ComponentType, ReactNode } from "react"
import type { StoreItem, StoreItemCategory, StoreItemId } from "../../types"

export type RewardEffectSlot =
    | Extract<StoreItemCategory, "BACKGROUND" | "CALENDAR" | "POMODORO">
    | "USER_CARD"
    | "PARTICLES"

export type RewardEffectEngine = "css" | "motion" | "webgl"

export interface RewardEffectProps {
    item: StoreItem
    preview?: boolean
    animated?: boolean
}

export interface RewardEffectDefinition {
    id: StoreItemId
    slot: RewardEffectSlot
    engine: RewardEffectEngine
    component: ComponentType<RewardEffectProps>
}

export interface RewardEffectRendererProps extends RewardEffectProps {
    slot: RewardEffectSlot
    fallback?: ReactNode
}
