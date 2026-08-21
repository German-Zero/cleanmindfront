import type { Theme } from "@/features/settings/types"

export interface PrismaticAuroraPalette {
    boreal: string
    primary: string
    secondary: string
    accent: string
    atmosphere: string
    light: boolean
}

const palettes: Record<Theme, PrismaticAuroraPalette> = {
    LUNAR_MIND: {
        boreal: "#6EF2B7",
        primary: "#8F84FF",
        secondary: "#55D9EE",
        accent: "#E27ACB",
        atmosphere: "#13142D",
        light: false,
    },
    DEEP_SERENITY: {
        boreal: "#72F3B7",
        primary: "#6BE2B5",
        secondary: "#50CEE2",
        accent: "#A592FF",
        atmosphere: "#092523",
        light: false,
    },
    CALM_TECH: {
        boreal: "#69E8B7",
        primary: "#62C9FF",
        secondary: "#918AFF",
        accent: "#D77DEB",
        atmosphere: "#101B30",
        light: false,
    },
    SOFT_DAWN: {
        boreal: "#2E9B72",
        primary: "#7561CF",
        secondary: "#278FA8",
        accent: "#B84F97",
        atmosphere: "#EFE8F7",
        light: true,
    },
    MINT_BREEZE: {
        boreal: "#238D67",
        primary: "#268E71",
        secondary: "#2688A4",
        accent: "#7561BC",
        atmosphere: "#DDEFEA",
        light: true,
    },
    CLEAR_SKY: {
        boreal: "#2A9875",
        primary: "#2877AA",
        secondary: "#6558BE",
        accent: "#AA4B8B",
        atmosphere: "#E2EDF7",
        light: true,
    },
}

export function getPrismaticAuroraPalette(theme: Theme) {
    return palettes[theme]
}
