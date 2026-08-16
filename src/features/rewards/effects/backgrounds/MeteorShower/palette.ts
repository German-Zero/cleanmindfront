import type { Theme } from "@/features/settings/types"

export interface MeteorShowerPalette {
    head: string
    cool: string
    warm: string
    star: string
    atmosphere: string
    light: boolean
}

const palettes: Record<Theme, MeteorShowerPalette> = {
    LUNAR_MIND: {
        head: "#FFF5D6",
        cool: "#79CFFF",
        warm: "#C48CFF",
        star: "#DFEAFF",
        atmosphere: "#11162B",
        light: false,
    },
    DEEP_SERENITY: {
        head: "#F0FFF8",
        cool: "#55D7C1",
        warm: "#7898F0",
        star: "#D5FFF4",
        atmosphere: "#071F22",
        light: false,
    },
    CALM_TECH: {
        head: "#F2F8FF",
        cool: "#6DBBFF",
        warm: "#A486FF",
        star: "#D8ECFF",
        atmosphere: "#0A1628",
        light: false,
    },
    SOFT_DAWN: {
        head: "#8B4A26",
        cool: "#4D65AA",
        warm: "#9A4C7F",
        star: "#6E6480",
        atmosphere: "#EFE6F0",
        light: true,
    },
    MINT_BREEZE: {
        head: "#246D59",
        cool: "#287B8D",
        warm: "#5A5794",
        star: "#527A72",
        atmosphere: "#DFEFEA",
        light: true,
    },
    CLEAR_SKY: {
        head: "#356C91",
        cool: "#2879AD",
        warm: "#6553A5",
        star: "#55778E",
        atmosphere: "#E2EDF7",
        light: true,
    },
}

export function getMeteorShowerPalette(theme: Theme) {
    return palettes[theme]
}
