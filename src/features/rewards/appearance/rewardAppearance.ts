import type { StoreItem, StoreItemCategory } from "../types"

export type EquippedRewards = Partial<Record<StoreItemCategory, StoreItem>>

const ROOT_REWARD_ATTRIBUTES = [
    "data-reward-palette",
    "data-reward-background",
    "data-reward-border",
    "data-reward-effect",
    "data-reward-pomodoro",
    "data-reward-calendar",
] as const

const ROOT_REWARD_CLASSES = [
    "reward-border--aurora",
    "reward-border--sunset",
    "reward-border--ocean-pulse",
    "reward-border--gilded-moss",
    "reward-effect--serene-glass",
    "reward-effect--soft-glow",
    "reward-effect--paper-grain",
] as const

const rewardRootClasses = {
    BORDER_AURORA: "reward-border--aurora",
    BORDER_SUNSET: "reward-border--sunset",
    BORDER_OCEAN_PULSE: "reward-border--ocean-pulse",
    BORDER_GILDED_MOSS: "reward-border--gilded-moss",
    EFFECT_SERENE_GLASS: "reward-effect--serene-glass",
    EFFECT_SOFT_GLOW: "reward-effect--soft-glow",
    EFFECT_PAPER_GRAIN: "reward-effect--paper-grain",
} as const

const paletteTokens = {
    PALETTE_LAVENDER_NIGHT: {
        "--background": "#0A1820", "--surface": "#10242D",
        "--card": "#193846", "--card-hover": "#214858",
        "--border": "#326172", "--primary": "#D98645",
        "--secondary": "#E39A58", "--accent": "#F0A35C",
        "--text-primary": "#F4FAFC", "--text-secondary": "#A6C0C9",
        "--error": "#FF7B7F", "--success": "#63C49A",
        "--warning": "#E6B85F", "--now": "#E28B4B",
        "--plan": "#4F9AAF", "--delegate": "#8A7EB1",
        "--delete": "#78909A",
    },
    PALETTE_CLEAR_SAGE: {
        "--background": "#FFF5EC", "--surface": "#FFFAF5",
        "--card": "#F6E3D5", "--card-hover": "#EFD6C4",
        "--border": "#DFBCA6", "--primary": "#B7654A",
        "--secondary": "#C67A5D", "--accent": "#9E4F39",
        "--text-primary": "#3D2922", "--text-secondary": "#7A5E53",
        "--error": "#B33A52", "--success": "#327A58",
        "--warning": "#9A681C", "--now": "#B7654A",
        "--plan": "#A57A52", "--delegate": "#936D85",
        "--delete": "#8B746A",
    },
    PALETTE_ABYSS_CORAL: {
        "--background": "#0A1220", "--surface": "#111D2D",
        "--card": "#263B52", "--card-hover": "#304A64",
        "--border": "#45627D", "--primary": "#E6656B",
        "--secondary": "#CA7182", "--accent": "#FF7A7A",
        "--text-primary": "#F2F7FC", "--text-secondary": "#A8BED0",
        "--error": "#FF6B78", "--success": "#58C99C",
        "--warning": "#EDBF62", "--now": "#E6656B",
        "--plan": "#5C9BC4", "--delegate": "#9A7DCC",
        "--delete": "#8294A6",
    },
    PALETTE_COFFEE_BLOOM: {
        "--background": "#17110F", "--surface": "#211916",
        "--card": "#382823", "--card-hover": "#46322B",
        "--border": "#684B40", "--primary": "#B97759",
        "--secondary": "#C98A6D", "--accent": "#D89A76",
        "--text-primary": "#FFF4EC", "--text-secondary": "#C8AAA0",
        "--error": "#F2787D", "--success": "#72BE8C",
        "--warning": "#DDB563", "--now": "#C5795F",
        "--plan": "#A58B62", "--delegate": "#A87991",
        "--delete": "#947A70",
    },
    PALETTE_ARCTIC_BERRY: {
        "--background": "#F4F7FB", "--surface": "#FCFDFF",
        "--card": "#E5ECF5", "--card-hover": "#D9E4F2",
        "--border": "#BBCBDD", "--primary": "#B05A8C",
        "--secondary": "#8B6FA0", "--accent": "#91456F",
        "--text-primary": "#263647", "--text-secondary": "#62768B",
        "--error": "#B43F56", "--success": "#2F795E",
        "--warning": "#91641A", "--now": "#B05A8C",
        "--plan": "#5E83A3", "--delegate": "#80699B",
        "--delete": "#738396",
    },
    PALETTE_CITRUS_PAPER: {
        "--background": "#FFF9E8", "--surface": "#FFFCF2",
        "--card": "#F7EBC7", "--card-hover": "#F3E1A6",
        "--border": "#DDC982", "--primary": "#D8793B",
        "--secondary": "#C58B42", "--accent": "#A85B2E",
        "--text-primary": "#44331F", "--text-secondary": "#79684D",
        "--error": "#B43D4F", "--success": "#347858",
        "--warning": "#946119", "--now": "#D8793B",
        "--plan": "#A58A3C", "--delegate": "#8D718F",
        "--delete": "#83745E",
    },
} as const

type PaletteId = keyof typeof paletteTokens
type PaletteToken = keyof (typeof paletteTokens)[PaletteId]

const PALETTE_TOKEN_NAMES = Object.keys(
    paletteTokens.PALETTE_LAVENDER_NIGHT,
) as PaletteToken[]

export function selectEquippedRewards(items: StoreItem[]): EquippedRewards {
    return items.reduce<EquippedRewards>((equipped, item) => {
        if (item.equipped) equipped[item.category] = item
        return equipped
    }, {})
}

export function applyRewardAppearance(items: StoreItem[]): void {
    const root = document.documentElement
    const equipped = selectEquippedRewards(items)

    ROOT_REWARD_ATTRIBUTES.forEach((attribute) => root.removeAttribute(attribute))
    root.classList.remove(...ROOT_REWARD_CLASSES)
    PALETTE_TOKEN_NAMES.forEach((token) => root.style.removeProperty(token))

    const palette = equipped.PALETTE
    if (palette && palette.id in paletteTokens) {
        const tokens = paletteTokens[palette.id as PaletteId]
        Object.entries(tokens).forEach(([token, value]) => {
            root.style.setProperty(token, value)
        })
    }

    const equippedStyleItems = [equipped.BORDER, equipped.EFFECT]
    equippedStyleItems.forEach((item) => {
        if (!item) return
        const className = rewardRootClasses[
            item.id as keyof typeof rewardRootClasses
        ]
        if (className) root.classList.add(className)
    })
}
