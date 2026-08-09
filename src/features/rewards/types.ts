export interface RewardSummary {
    balance: number
    earnedThisMonth: number
    monthlyLimit: number
    remainingThisMonth: number
}

export interface RewardGrant extends RewardSummary {
    pointsAwarded: number
}

export type RewardedResponse<T> = T & {
    reward: RewardGrant
}

export type StoreItemCategory =
    | "PALETTE"
    | "BACKGROUND"
    | "BORDER"
    | "EFFECT"
    | "POMODORO"
    | "CALENDAR"

export type StoreItemId =
    | "PALETTE_LAVENDER_NIGHT"
    | "PALETTE_CLEAR_SAGE"
    | "PALETTE_ABYSS_CORAL"
    | "PALETTE_COFFEE_BLOOM"
    | "PALETTE_ARCTIC_BERRY"
    | "PALETTE_CITRUS_PAPER"
    | "BACKGROUND_FIREFLY_GARDEN"
    | "BACKGROUND_COSMIC_RIBBONS"
    | "BACKGROUND_RAINY_WINDOW"
    | "BACKGROUND_FLOATING_BLOOMS"
    | "BORDER_AURORA"
    | "BORDER_SUNSET"
    | "BORDER_OCEAN_PULSE"
    | "BORDER_GILDED_MOSS"
    | "EFFECT_SERENE_GLASS"
    | "EFFECT_SOFT_GLOW"
    | "EFFECT_PAPER_GRAIN"
    | "POMODORO_BLOOM_RING"
    | "CALENDAR_TIDAL_WAVE"

export interface StoreItem {
    id: StoreItemId
    category: StoreItemCategory
    name: string
    description: string
    cost: number
    colors: string[]
    owned: boolean
    canAfford: boolean
    equipped: boolean
}

export interface StorefrontResponse {
    summary: RewardSummary
    items: StoreItem[]
}

export interface StorePurchaseResponse {
    summary: RewardSummary
    item: StoreItem
    purchased: boolean
}
