import type { StoreItemId } from "../../types"

export type BorderRewardId = Extract<
    StoreItemId,
    | "BORDER_AURORA"
    | "BORDER_SUNSET"
    | "BORDER_OCEAN_PULSE"
    | "BORDER_GILDED_MOSS"
>

export interface BorderEffectProfile {
    variant: "aurora" | "sunset" | "ocean" | "moss"
    gradient: string
    sheen: string
    glow: string
    duration: string
}

const borderProfiles: Record<BorderRewardId, BorderEffectProfile> = {
    BORDER_AURORA: {
        variant: "aurora",
        gradient: "linear-gradient(118deg, #3FA89F 0%, #A8E8DC 16%, #7870E6 38%, #D47AB7 61%, #72D8C8 82%, #3FA89F 100%)",
        sheen: "radial-gradient(circle at 50% 50%, rgb(228 255 249 / 76%) 0 2%, transparent 18%)",
        glow: "rgb(126 117 232 / 30%)",
        duration: "15s",
    },
    BORDER_SUNSET: {
        variant: "sunset",
        gradient: "linear-gradient(112deg, #7B385F 0%, #E66082 19%, #FFD18A 41%, #F58B5C 58%, #6C62CE 81%, #7B385F 100%)",
        sheen: "linear-gradient(102deg, transparent 32%, rgb(255 240 195 / 72%) 48%, transparent 64%)",
        glow: "rgb(230 96 130 / 28%)",
        duration: "13s",
    },
    BORDER_OCEAN_PULSE: {
        variant: "ocean",
        gradient: "linear-gradient(104deg, #173B8F 0%, #286FE1 22%, #19BFD6 45%, #BDF8EF 54%, #37D5B5 68%, #286FE1 84%, #173B8F 100%)",
        sheen: "linear-gradient(108deg, transparent 37%, rgb(238 255 252 / 92%) 48%, rgb(93 230 245 / 44%) 54%, transparent 65%)",
        glow: "rgb(25 191 214 / 32%)",
        duration: "9s",
    },
    BORDER_GILDED_MOSS: {
        variant: "moss",
        gradient: "linear-gradient(126deg, #173B31 0%, #4F7547 22%, #C7A845 43%, #FFF0A7 52%, #8CA45C 69%, #315B42 84%, #173B31 100%)",
        sheen: "repeating-linear-gradient(112deg, transparent 0 34px, rgb(255 239 166 / 48%) 38px, transparent 43px 82px)",
        glow: "rgb(199 168 69 / 25%)",
        duration: "17s",
    },
}

const fallbackProfile: BorderEffectProfile = {
    variant: "aurora",
    gradient: "linear-gradient(118deg, #68D5C8, #9B8CFF, #E993C8, #68D5C8)",
    sheen: "linear-gradient(110deg, transparent 36%, rgb(255 255 255 / 56%) 50%, transparent 64%)",
    glow: "rgb(155 140 255 / 26%)",
    duration: "15s",
}

export function getBorderEffectProfile(itemId: StoreItemId): BorderEffectProfile {
    return borderProfiles[itemId as BorderRewardId] ?? fallbackProfile
}
