import type { Theme } from "@/features/settings/types"

export interface OrbitalNebulaPalette {
    core: string
    cool: string
    warm: string
    dust: string
    atmosphere: string
    light: boolean
}

const palettes: Record<Theme, OrbitalNebulaPalette> = {
    LUNAR_MIND: {
        core: "#FFF2D2",
        cool: "#746CFF",
        warm: "#D965C8",
        dust: "#63DDF4",
        atmosphere: "#171127",
        light: false,
    },
    DEEP_SERENITY: {
        core: "#E9FFF4",
        cool: "#42C9A7",
        warm: "#6A83E7",
        dust: "#89F1D8",
        atmosphere: "#071F22",
        light: false,
    },
    CALM_TECH: {
        core: "#EAF5FF",
        cool: "#4E9EF1",
        warm: "#9B68E9",
        dust: "#67D9F1",
        atmosphere: "#0A1628",
        light: false,
    },
    SOFT_DAWN: {
        core: "#B66B37",
        cool: "#6250B7",
        warm: "#A94787",
        dust: "#277E9B",
        atmosphere: "#EFE6F0",
        light: true,
    },
    MINT_BREEZE: {
        core: "#2E8068",
        cool: "#267F94",
        warm: "#6552A7",
        dust: "#24846D",
        atmosphere: "#DFEFEA",
        light: true,
    },
    CLEAR_SKY: {
        core: "#3A79A0",
        cool: "#2A75AA",
        warm: "#7251AD",
        dust: "#2587A2",
        atmosphere: "#E2EDF7",
        light: true,
    },
}

export function getOrbitalNebulaPalette(theme: Theme) {
    return palettes[theme]
}
