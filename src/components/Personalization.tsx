"use client"

import { useState } from "react"
import RewardOptionCollection from "@/features/rewards/components/RewardOptionCollection"
import RewardPreviewDialog from "@/features/rewards/components/RewardPreviewDialog"
import { useRewards } from "@/features/rewards/RewardsProvider"
import type { StoreItem, StoreItemId } from "@/features/rewards/types"
import BackgroundMotionPreview from "@/features/settings/components/BackgroundMotionPreview"
import { useTheme } from "@/features/settings/ThemeProvider"
import type { BackgroundMotion, Theme } from "@/features/settings/types"
import { requestErrorMessage } from "@/lib/api"
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
    const { storeItems, setStoreItemEquipped } = useRewards()
    const [previewItem, setPreviewItem] = useState<StoreItem | null>(null)
    const [pendingRewardId, setPendingRewardId] =
        useState<StoreItemId | null>(null)
    const [rewardError, setRewardError] = useState<string | null>(null)

    const ownedPalettes = storeItems.filter(
        (item) => item.owned && item.category === "PALETTE",
    )
    const ownedBackgrounds = storeItems.filter(
        (item) => item.owned && item.category === "BACKGROUND",
    )
    const ownedBorders = storeItems.filter(
        (item) => item.owned && item.category === "BORDER",
    )
    const ownedEffects = storeItems.filter(
        (item) => item.owned && item.category === "EFFECT",
    )
    const ownedPomodoroDecorations = storeItems.filter(
        (item) => item.owned && item.category === "POMODORO",
    )
    const ownedCalendarDecorations = storeItems.filter(
        (item) => item.owned && item.category === "CALENDAR",
    )
    const equippedPalette = ownedPalettes.find((item) => item.equipped)
    const equippedBackground = ownedBackgrounds.find((item) => item.equipped)
    const currentPreviewItem = previewItem
        ? storeItems.find((item) => item.id === previewItem.id) ?? previewItem
        : null
    const isPending = pendingTheme !== null || pendingMotion !== null
    const isBusy = isPending || pendingRewardId !== null

    const toggleReward = async (item: StoreItem) => {
        if (isBusy) return

        setPendingRewardId(item.id)
        setRewardError(null)
        try {
            await setStoreItemEquipped(item.id, !item.equipped)
        } catch (requestError: unknown) {
            setRewardError(
                requestErrorMessage(
                    requestError,
                    "No pudimos aplicar esta personalización.",
                    {
                        403: "Esta recompensa todavía no pertenece a tu colección.",
                        404: "La recompensa seleccionada ya no está disponible.",
                    },
                ),
            )
        } finally {
            setPendingRewardId(null)
        }
    }

    const selectFreeTheme = async (nextTheme: Theme) => {
        if (isBusy) return

        setRewardError(null)
        try {
            if (nextTheme !== theme) await selectTheme(nextTheme)
            if (equippedPalette) {
                await setStoreItemEquipped(equippedPalette.id, false)
            }
        } catch (requestError: unknown) {
            setRewardError(
                requestErrorMessage(
                    requestError,
                    "No pudimos cambiar la paleta activa.",
                ),
            )
        }
    }

    const selectFreeMotion = async (nextMotion: BackgroundMotion) => {
        if (isBusy) return

        setRewardError(null)
        try {
            if (nextMotion !== backgroundMotion) {
                await selectBackgroundMotion(nextMotion)
            }
            if (equippedBackground) {
                await setStoreItemEquipped(equippedBackground.id, false)
            }
        } catch (requestError: unknown) {
            setRewardError(
                requestErrorMessage(
                    requestError,
                    "No pudimos cambiar el fondo activo.",
                ),
            )
        }
    }

    return (
        <div className="calm-panel flex w-full min-w-0 max-w-295 flex-col gap-9 px-5 py-7 text-text-primary sm:px-8 sm:py-9.5">
            <header className="flex max-w-155 flex-col gap-2">
                <span className="calm-eyebrow">Tu ambiente</span>
                <h1 className="text-[30px] font-semibold tracking-[-0.4px] sm:text-[36px]">
                    Personalización
                </h1>
                <p className="text-[13px] leading-5.25 text-text-secondary">
                    Ajusta la luz, el movimiento y los detalles de tu espacio
                    sin perder claridad.
                </p>
                {(error || rewardError) && (
                    <p role="alert" className="calm-feedback mt-1 text-error">
                        {rewardError ?? error}
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
                        Elige una paleta gratuita o una adquirida en la tienda.
                    </p>
                </div>

                <div className="mb-3">
                    <h3 className="text-[13px] font-semibold">Incluidas</h3>
                    <p className="mt-0.75 text-[11px] text-text-secondary">
                        Tres opciones oscuras y tres claras.
                    </p>
                </div>
                <div className="grid grid-cols-1 gap-3.5 md:grid-cols-2 xl:grid-cols-3">
                    {themes.map((option) => {
                        const isSelected =
                            theme === option.id && !equippedPalette
                        const optionIsPending = pendingTheme === option.id

                        return (
                            <button
                                key={option.id}
                                type="button"
                                aria-pressed={isSelected}
                                aria-busy={optionIsPending}
                                disabled={isLoading || isBusy}
                                onClick={() => void selectFreeTheme(option.id)}
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

                <RewardOptionCollection
                    title="Canjeadas"
                    description="Paletas que desbloqueaste con tus puntos. Solo una puede estar activa."
                    items={ownedPalettes}
                    emptyMessage="Aún no canjeaste paletas. Puedes encontrarlas en la tienda de puntos."
                    pendingItemId={pendingRewardId}
                    onPreview={setPreviewItem}
                    onToggle={(item) => void toggleReward(item)}
                    className="mt-6"
                />
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

                <div className="mb-3">
                    <h3 className="text-[13px] font-semibold">Incluidos</h3>
                    <p className="mt-0.75 text-[11px] text-text-secondary">
                        Movimientos disponibles desde el inicio.
                    </p>
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
                    {motions.map((option) => {
                        const isSelected =
                            backgroundMotion === option.id &&
                            !equippedBackground
                        const optionIsPending = pendingMotion === option.id

                        return (
                            <button
                                key={option.id}
                                type="button"
                                aria-pressed={isSelected}
                                aria-busy={optionIsPending}
                                disabled={isLoading || isBusy}
                                onClick={() => void selectFreeMotion(option.id)}
                                className={`relative flex min-h-35.5 flex-col rounded-xl border p-3 text-left disabled:cursor-wait disabled:opacity-70 ${
                                    isSelected
                                        ? "border-primary/60 bg-primary/8"
                                        : "border-border/60 bg-card/48 hover:border-accent/35 hover:bg-card/68"
                                }`}
                            >
                                <BackgroundMotionPreview
                                    motion={option.id}
                                    theme={theme}
                                />
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

                <RewardOptionCollection
                    title="Canjeados"
                    description="Fondos animados que desbloqueaste. Al activar uno, reemplaza el movimiento incluido."
                    items={ownedBackgrounds}
                    emptyMessage="Aún no canjeaste fondos animados. Puedes encontrarlos en la tienda de puntos."
                    pendingItemId={pendingRewardId}
                    onPreview={setPreviewItem}
                    onToggle={(item) => void toggleReward(item)}
                    className="mt-6"
                />
            </section>

            <section aria-labelledby="border-options-title">
                <h2
                    id="border-options-title"
                    className="text-[16px] font-semibold"
                >
                    Bordes
                </h2>
                <p className="mt-0.75 text-[12px] text-text-secondary">
                    Gradientes sutiles para destacar paneles y tarjetas.
                </p>
                <RewardOptionCollection
                    title="Canjeados"
                    description="Solo un estilo de borde puede estar activo a la vez."
                    items={ownedBorders}
                    emptyMessage="Aún no canjeaste bordes. Puedes encontrarlos en la tienda de puntos."
                    pendingItemId={pendingRewardId}
                    onPreview={setPreviewItem}
                    onToggle={(item) => void toggleReward(item)}
                    className="mt-3.5"
                />
            </section>

            <section aria-labelledby="effect-options-title">
                <h2
                    id="effect-options-title"
                    className="text-[16px] font-semibold"
                >
                    Efectos visuales
                </h2>
                <p className="mt-0.75 text-[12px] text-text-secondary">
                    Acabados que modifican la superficie de los componentes.
                </p>
                <RewardOptionCollection
                    title="Canjeados"
                    description="Activa o quita tus efectos sin modificar la paleta elegida."
                    items={ownedEffects}
                    emptyMessage="Aún no canjeaste efectos. Puedes encontrarlos en la tienda de puntos."
                    pendingItemId={pendingRewardId}
                    onPreview={setPreviewItem}
                    onToggle={(item) => void toggleReward(item)}
                    className="mt-3.5"
                />
            </section>

            <section aria-labelledby="pomodoro-decoration-title">
                <h2
                    id="pomodoro-decoration-title"
                    className="text-[16px] font-semibold"
                >
                    Decoraciones Pomodoro
                </h2>
                <p className="mt-0.75 text-[12px] text-text-secondary">
                    Detalles exclusivos para acompañar el cronómetro de enfoque.
                </p>
                <RewardOptionCollection
                    title="Canjeadas"
                    description="Activa o quita la decoración que rodea tu temporizador."
                    items={ownedPomodoroDecorations}
                    emptyMessage="Aún no canjeaste decoraciones Pomodoro. Puedes encontrarlas en la tienda de puntos."
                    pendingItemId={pendingRewardId}
                    onPreview={setPreviewItem}
                    onToggle={(item) => void toggleReward(item)}
                    className="mt-3.5"
                />
            </section>

            <section aria-labelledby="calendar-decoration-title">
                <h2
                    id="calendar-decoration-title"
                    className="text-[16px] font-semibold"
                >
                    Decoraciones de Calendario
                </h2>
                <p className="mt-0.75 text-[12px] text-text-secondary">
                    Animaciones más elaboradas para la vista de planificación.
                </p>
                <RewardOptionCollection
                    title="Canjeadas"
                    description="Estas decoraciones premium tienen un costo mayor por su complejidad."
                    items={ownedCalendarDecorations}
                    emptyMessage="Aún no canjeaste decoraciones de Calendario. Puedes encontrarlas en la tienda de puntos."
                    pendingItemId={pendingRewardId}
                    onPreview={setPreviewItem}
                    onToggle={(item) => void toggleReward(item)}
                    className="mt-3.5"
                />
            </section>

            <RewardPreviewDialog
                item={currentPreviewItem}
                onClose={() => setPreviewItem(null)}
                actionLabel={
                    currentPreviewItem?.equipped
                        ? "Quitar del ambiente"
                        : "Aplicar al ambiente"
                }
                actionPending={pendingRewardId === currentPreviewItem?.id}
                onAction={
                    currentPreviewItem
                        ? () => void toggleReward(currentPreviewItem)
                        : undefined
                }
            />
        </div>
    )
}
