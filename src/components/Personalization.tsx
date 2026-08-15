"use client"

import BackgroundMotionPreview from "@/features/settings/components/BackgroundMotionPreview"
import { useTheme } from "@/features/settings/ThemeProvider"
import type { BackgroundMotion, Theme } from "@/features/settings/types"
import IconSelect from "./ui/icons/IconSelect"
import IconTheme from "./ui/icons/IconTheme"

const themes: Array<{
    id: Theme
    name: string
    mode: "Oscuro" | "Claro"
    description: string
    colors: [string, string, string]
}> = [
    {
        id: "LUNAR_MIND",
        name: "Lunar Mind",
        mode: "Oscuro",
        description: "Violetas profundos y foco sereno",
        colors: ["#0E0D16", "#363047", "#7C79E8"],
    },
    {
        id: "DEEP_SERENITY",
        name: "Deep Serenity",
        mode: "Oscuro",
        description: "Verdes suaves para bajar el ritmo",
        colors: ["#0A1418", "#30474E", "#46B89A"],
    },
    {
        id: "CALM_TECH",
        name: "Calm Tech",
        mode: "Oscuro",
        description: "Azules precisos y contraste limpio",
        colors: ["#0C111C", "#314154", "#6A9ED8"],
    },
    {
        id: "SOFT_DAWN",
        name: "Soft Dawn",
        mode: "Claro",
        description: "Crema cálida y lavanda liviana",
        colors: ["#F7F3EE", "#D8CBC1", "#D5C3F2"],
    },
    {
        id: "MINT_BREEZE",
        name: "Mint Breeze",
        mode: "Claro",
        description: "Menta suave para una mente despejada",
        colors: ["#EFF7F4", "#BFD5CC", "#A7DCCB"],
    },
    {
        id: "CLEAR_SKY",
        name: "Clear Sky",
        mode: "Claro",
        description: "Celeste limpio y luminosidad tranquila",
        colors: ["#F1F6FA", "#C0D2DF", "#B7D7ED"],
    },
]

const motions: Array<{
    id: BackgroundMotion
    name: string
    description: string
}> = [
    {
        id: "NONE",
        name: "Sin movimiento",
        description: "Un fondo completamente estable",
    },
    {
        id: "STAR_RAIN",
        name: "Lluvia de meteoros",
        description: "Destellos diagonales sobre un cielo profundo",
    },
    {
        id: "ORBITAL_GALAXY",
        name: "Nebulosa orbital",
        description: "Nubes cósmicas que giran lentamente",
    },
    {
        id: "SOFT_AURORA",
        name: "Aurora prismática",
        description: "Ondas luminosas que recorren el fondo",
    },
]

export default function Personalization() {
    const {
        theme,
        backgroundMotion,
        isLoading,
        pendingTheme,
        pendingMotion,
        error,
        selectTheme,
        selectBackgroundMotion,
    } = useTheme()
    const isBusy = pendingTheme !== null || pendingMotion !== null

    return (
        <div className="calm-panel flex w-full min-w-0 max-w-295 flex-col gap-9 px-5 py-7 text-text-primary sm:px-8 sm:py-9.5">
            <header className="flex max-w-155 flex-col gap-2">
                <span className="calm-eyebrow">Tu ambiente</span>
                <h1 className="text-[30px] font-semibold tracking-[-0.4px] sm:text-[36px]">
                    Personalización
                </h1>
                <p className="text-[13px] leading-5.25 text-text-secondary">
                    Ajusta la luz y el movimiento de tu espacio sin perder
                    claridad.
                </p>
                {error && (
                    <p role="alert" className="calm-feedback mt-1 text-error">
                        {error}
                    </p>
                )}
            </header>

            <section aria-labelledby="theme-options-title">
                <div className="mb-3.5">
                    <h2
                        id="theme-options-title"
                        className="text-[16px] font-semibold"
                    >
                        Paletas de colores
                    </h2>
                    <p className="mt-0.75 text-[12px] text-text-secondary">
                        Elige entre tres opciones oscuras y tres claras.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-3.5 md:grid-cols-2 xl:grid-cols-3">
                    {themes.map((option) => {
                        const isSelected = theme === option.id
                        const optionIsPending = pendingTheme === option.id

                        return (
                            <button
                                key={option.id}
                                type="button"
                                aria-pressed={isSelected}
                                aria-busy={optionIsPending}
                                disabled={isLoading || isBusy}
                                onClick={() => void selectTheme(option.id)}
                                className={`relative flex min-h-46 w-full min-w-0 flex-col justify-between gap-6.5 rounded-xl border p-4.5 text-left disabled:cursor-wait disabled:opacity-70 ${
                                    isSelected
                                        ? "border-primary/60 bg-primary/8 shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--primary)_18%,transparent)]"
                                        : "border-border/60 bg-card/48 hover:border-accent/35 hover:bg-card/68"
                                }`}
                            >
                                <span className="flex items-start justify-between gap-3">
                                    <span className="grid size-10 place-items-center rounded-[10px] bg-accent/10 text-accent ring-1 ring-accent/22">
                                        <IconTheme theme={option.id} />
                                    </span>
                                    <span className="rounded-full border border-border/55 bg-surface/55 px-2 py-0.75 text-[9px] font-semibold uppercase tracking-[1px] text-text-secondary">
                                        {option.mode}
                                    </span>
                                </span>

                                {isSelected && (
                                    <span className="absolute top-12 right-3.5">
                                        <IconSelect />
                                    </span>
                                )}

                                <span className="flex flex-col gap-3.5">
                                    <span className="grid w-full grid-cols-3 gap-1.25">
                                        {option.colors.map((color) => (
                                            <span
                                                key={color}
                                                className="h-1.5 min-w-0 rounded-full opacity-85"
                                                style={{ backgroundColor: color }}
                                            />
                                        ))}
                                    </span>
                                    <span className="flex flex-col gap-1.25">
                                        <span className="text-[16px] font-semibold">
                                            {option.name}
                                        </span>
                                        <span className="text-[12px] leading-4.5 text-text-secondary">
                                            {optionIsPending
                                                ? "Guardando…"
                                                : option.description}
                                        </span>
                                    </span>
                                </span>
                            </button>
                        )
                    })}
                </div>
            </section>

            <section aria-labelledby="motion-options-title">
                <div className="mb-3.5">
                    <h2
                        id="motion-options-title"
                        className="text-[16px] font-semibold"
                    >
                        Fondos y movimiento
                    </h2>
                    <p className="mt-0.75 text-[12px] text-text-secondary">
                        Los efectos respetan la reducción de movimiento del
                        dispositivo.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
                    {motions.map((option) => {
                        const isSelected = backgroundMotion === option.id
                        const optionIsPending = pendingMotion === option.id

                        return (
                            <button
                                key={option.id}
                                type="button"
                                aria-pressed={isSelected}
                                aria-busy={optionIsPending}
                                disabled={isLoading || isBusy}
                                onClick={() =>
                                    void selectBackgroundMotion(option.id)
                                }
                                className={`relative flex min-h-35.5 flex-col rounded-xl border p-3 text-left disabled:cursor-wait disabled:opacity-70 ${
                                    isSelected
                                        ? "border-primary/60 bg-primary/8"
                                        : "border-border/60 bg-card/48 hover:border-accent/35 hover:bg-card/68"
                                }`}
                            >
                                <BackgroundMotionPreview motion={option.id} />
                                <span className="mt-2.75 flex items-start justify-between gap-2">
                                    <span>
                                        <span className="block text-[13px] font-semibold">
                                            {option.name}
                                        </span>
                                        <span className="mt-0.75 block text-[10px] leading-3.75 text-text-secondary">
                                            {optionIsPending
                                                ? "Guardando…"
                                                : option.description}
                                        </span>
                                    </span>
                                    {isSelected && (
                                        <span className="shrink-0">
                                            <IconSelect />
                                        </span>
                                    )}
                                </span>
                            </button>
                        )
                    })}
                </div>
            </section>
        </div>
    )
}
