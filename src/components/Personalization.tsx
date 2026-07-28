"use client"

import { useTheme } from "@/features/settings/ThemeProvider"
import type { Theme } from "@/features/settings/types"
import IconSelect from "./ui/icons/IconSelect"
import IconTheme from "./ui/icons/IconTheme"

const themes: Array<{
    id: Theme
    name: string
    description: string
    colors: [string, string, string]
}> = [
    {
        id: "LUNAR_MIND",
        name: "Lunar Mind",
        description: "Violetas profundos y foco sereno",
        colors: ["#0D0B1A", "#3C3261", "#6366F1"],
    },
    {
        id: "DEEP_SERENITY",
        name: "Deep Serenity",
        description: "Verdes suaves para bajar el ritmo",
        colors: ["#08141A", "#29515F", "#10B981"],
    },
    {
        id: "CALM_TECH",
        name: "Calm Tech",
        description: "Azules precisos y contraste limpio",
        colors: ["#0B1020", "#2D3B55", "#60A5FA"],
    },
]

export default function Personalization() {
    const { theme, isLoading, pendingTheme, error, selectTheme } = useTheme()

    return (
        <div className="flex w-full min-w-0 max-w-7xl flex-col gap-8 px-4 py-16 text-text-primary sm:gap-10 sm:px-6 xl:gap-10 xl:px-8 xl:py-0">
            <div className="flex flex-col gap-2.5">
                <h3 className="text-sm font-semibold uppercase tracking-[30%] text-primary">
                    Tu Ambiente
                </h3>
                <h1 className="text-3xl font-semibold tracking-wide sm:text-4xl">
                    Personalización
                </h1>
                <p className="text-sm text-text-secondary">
                    Elige la atmósfera visual que mejor acompaña tu forma de
                    pensar
                </p>
                {error && (
                    <p role="alert" className="text-xs text-error">
                        {error}
                    </p>
                )}
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                {themes.map((option) => {
                    const isSelected = theme === option.id
                    const isPending = pendingTheme === option.id

                    return (
                        <button
                            key={option.id}
                            type="button"
                            aria-pressed={isSelected}
                            aria-busy={isPending}
                            disabled={isLoading || pendingTheme !== null}
                            onClick={() => void selectTheme(option.id)}
                            className={`
                                relative flex w-full min-w-0 flex-col gap-8
                                rounded-lg p-4 text-left transition-colors
                                sm:gap-10 sm:p-6
                                disabled:cursor-wait disabled:opacity-70
                                ${
                                    isSelected
                                        ? "bg-card-hover ring ring-primary"
                                        : "bg-card/80 ring ring-border hover:bg-card"
                                }
                            `}
                        >
                            <span
                                className="
                                    grid size-10 place-items-center rounded-lg
                                    bg-accent/15 text-accent ring ring-accent/30
                                "
                            >
                                <IconTheme theme={option.id} />
                            </span>

                            {isSelected && (
                                <span className="absolute top-3 right-3">
                                    <IconSelect />
                                </span>
                            )}

                            <span className="flex flex-col gap-5">
                                <span className="grid w-full grid-cols-3 gap-1.25">
                                    {option.colors.map((color) => (
                                        <span
                                            key={color}
                                            className="h-2 min-w-0 rounded-full"
                                            style={{ backgroundColor: color }}
                                        />
                                    ))}
                                </span>
                                <span className="flex flex-col gap-1">
                                    <span className="text-lg font-semibold">
                                        {option.name}
                                    </span>
                                    <span className="text-[13px] text-text-secondary">
                                        {isPending
                                            ? "Guardando…"
                                            : option.description}
                                    </span>
                                </span>
                            </span>
                        </button>
                    )
                })}
            </div>
        </div>
    )
}
