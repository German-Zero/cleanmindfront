"use client"

import { useEffect, useState } from "react"
import { requestErrorMessage } from "@/lib/api"
import { useRewards } from "../RewardsProvider"
import { rewardsService } from "../services/rewards.service"
import type {
    StorefrontResponse,
    StoreItem,
    StoreItemCategory,
    StoreItemId,
} from "../types"
import RewardPreviewDialog from "./RewardPreviewDialog"
import RewardVisualPreview from "./RewardVisualPreview"

const categories: Array<{
    id: StoreItemCategory
    title: string
    description: string
}> = [
    {
        id: "PALETTE",
        title: "Paletas de colores",
        description: "Nuevos tonos para todo el ambiente de CleanMind.",
    },
    {
        id: "BACKGROUND",
        title: "Fondos animados",
        description: "Movimiento ambiental sutil para acompañar el enfoque.",
    },
    {
        id: "BORDER",
        title: "Bordes con gradiente",
        description: "Contornos suaves para paneles y tarjetas.",
    },
    {
        id: "EFFECT",
        title: "Efectos visuales",
        description: "Acabados especiales para las superficies de la interfaz.",
    },
    {
        id: "POMODORO",
        title: "Decoraciones Pomodoro",
        description: "Detalles visuales exclusivos para tu cronómetro de enfoque.",
    },
    {
        id: "CALENDAR",
        title: "Decoraciones de Calendario",
        description: "Animaciones premium que transforman la vista de planificación.",
    },
]

const categoryLabels: Record<StoreItemCategory, string> = {
    PALETTE: "Paleta",
    BACKGROUND: "Fondo",
    BORDER: "Borde",
    EFFECT: "Efecto",
    POMODORO: "Pomodoro",
    CALENDAR: "Calendario",
}

export default function RewardsStoreView() {
    const { updateStore } = useRewards()
    const [store, setStore] = useState<StorefrontResponse | null>(null)
    const [previewItem, setPreviewItem] = useState<StoreItem | null>(null)
    const [pendingItemId, setPendingItemId] = useState<StoreItemId | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [confirmation, setConfirmation] = useState<string | null>(null)

    useEffect(() => {
        let isCurrent = true

        void rewardsService
            .getStore()
            .then((response) => {
                if (!isCurrent) return
                setStore(response)
                updateStore(response)
            })
            .catch((requestError: unknown) => {
                if (!isCurrent) return
                setError(
                    requestErrorMessage(
                        requestError,
                        "No pudimos cargar la tienda.",
                    ),
                )
            })

        return () => {
            isCurrent = false
        }
    }, [updateStore])

    useEffect(() => {
        if (!confirmation) return

        const timeout = window.setTimeout(() => setConfirmation(null), 5000)
        return () => window.clearTimeout(timeout)
    }, [confirmation])

    const purchase = async (itemId: StoreItemId) => {
        if (!store || pendingItemId) return

        setPendingItemId(itemId)
        setError(null)
        setConfirmation(null)

        try {
            const result = await rewardsService.purchase(itemId)
            const refreshedStore = await rewardsService.getStore()
            setStore(refreshedStore)
            updateStore(refreshedStore)
            setConfirmation(
                result.purchased
                    ? `${result.item.name} ya forma parte de tu colección.`
                    : `${result.item.name} ya estaba en tu colección.`,
            )
        } catch (requestError: unknown) {
            setError(
                requestErrorMessage(
                    requestError,
                    "No pudimos completar el canje.",
                    {
                        404: "La recompensa ya no está disponible.",
                    },
                ),
            )
        } finally {
            setPendingItemId(null)
        }
    }

    if (!store) {
        return (
            <div className="calm-panel grid min-h-80 w-full max-w-280 place-items-center px-6 py-8">
                <p
                    role={error ? "alert" : "status"}
                    className={error ? "text-error" : "text-text-secondary"}
                >
                    {error ?? "Preparando la tienda…"}
                </p>
            </div>
        )
    }

    const progress = Math.min(
        100,
        (store.summary.earnedThisMonth / store.summary.monthlyLimit) * 100,
    )
    const currentPreviewItem = previewItem
        ? store.items.find((item) => item.id === previewItem.id) ?? previewItem
        : null
    const previewMissingPoints = currentPreviewItem
        ? Math.max(0, currentPreviewItem.cost - store.summary.balance)
        : 0

    return (
        <div className="calm-panel flex w-full min-w-0 max-w-280 flex-col gap-7 px-4.5 py-6 text-text-primary sm:px-7 sm:py-8">
            <header className="flex flex-col gap-4.5 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-155">
                    <span className="calm-eyebrow">Recompensas</span>
                    <h1 className="mt-1.5 text-[30px] font-semibold tracking-[-0.4px] sm:text-[36px]">
                        Tienda de puntos
                    </h1>
                    <p className="mt-1.5 text-[13px] leading-5.25 text-text-secondary">
                        Canjea el enfoque acumulado por detalles visuales para
                        tu espacio. Puedes revisar cada elemento antes de
                        adquirirlo.
                    </p>
                </div>

                <div className="min-w-60 rounded-[14px] border border-border/60 bg-card/55 px-4 py-3.5">
                    <div className="flex items-baseline justify-between gap-4">
                        <span className="text-[10px] font-semibold uppercase tracking-[1.2px] text-text-secondary">
                            Saldo disponible
                        </span>
                        <strong className="text-[22px] font-semibold text-accent">
                            {store.summary.balance} pts
                        </strong>
                    </div>
                    <div className="mt-2.5 h-1.25 overflow-hidden rounded-full bg-border/55">
                        <span
                            className="block h-full rounded-full bg-accent transition-[width] duration-300"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                    <p className="mt-1.75 text-[10px] text-text-secondary">
                        {store.summary.earnedThisMonth} de {store.summary.monthlyLimit}{" "}
                        puntos obtenidos este mes
                    </p>
                </div>
            </header>

            {(error || confirmation) && (
                <p
                    role={error ? "alert" : "status"}
                    className={`calm-feedback ${error ? "text-error" : "text-success"}`}
                >
                    {error ?? confirmation}
                </p>
            )}

            <div className="flex flex-col gap-8">
                {categories.map((category) => {
                    const items = store.items.filter(
                        (item) => item.category === category.id,
                    )

                    if (items.length === 0) return null

                    return (
                        <section
                            key={category.id}
                            aria-labelledby={`store-category-${category.id}`}
                        >
                            <div className="mb-3.5">
                                <h2
                                    id={`store-category-${category.id}`}
                                    className="text-[17px] font-semibold"
                                >
                                    {category.title}
                                </h2>
                                <p className="mt-0.75 text-[12px] text-text-secondary">
                                    {category.description}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 gap-3.5 md:grid-cols-2 xl:grid-cols-3">
                                {items.map((item) => {
                                    const missingPoints = Math.max(
                                        0,
                                        item.cost - store.summary.balance,
                                    )
                                    const pending = pendingItemId === item.id

                                    return (
                                        <article
                                            key={item.id}
                                            className="flex min-h-82.5 flex-col rounded-[15px] border border-border/60 bg-card/48 p-3.5"
                                        >
                                            <RewardVisualPreview item={item} />
                                            <div className="flex flex-1 flex-col pt-3.25">
                                                <div className="flex items-start justify-between gap-2.5">
                                                    <div className="min-w-0">
                                                        <span className="text-[9px] font-semibold uppercase tracking-[1px] text-accent">
                                                            {categoryLabels[item.category]}
                                                        </span>
                                                        <h3 className="mt-0.75 text-[15px] font-semibold">
                                                            {item.name}
                                                        </h3>
                                                    </div>
                                                    <span className="shrink-0 rounded-full border border-border/55 bg-surface/55 px-2 py-0.75 text-[9px] font-semibold text-text-secondary">
                                                        {item.owned
                                                            ? "Adquirida"
                                                            : `${item.cost} pts`}
                                                    </span>
                                                </div>
                                                <p className="mt-1.75 flex-1 text-[11px] leading-4.25 text-text-secondary">
                                                    {item.description}
                                                </p>
                                                <div className="mt-3.25 grid grid-cols-2 gap-2">
                                                    <button
                                                        type="button"
                                                        onClick={() => setPreviewItem(item)}
                                                        className="calm-button-secondary min-h-10 px-2.5 py-2 text-[11px]"
                                                    >
                                                        Vista previa
                                                    </button>
                                                    <button
                                                        type="button"
                                                        disabled={
                                                            item.owned ||
                                                            !item.canAfford ||
                                                            pendingItemId !== null
                                                        }
                                                        aria-busy={pending}
                                                        onClick={() => void purchase(item.id)}
                                                        className="calm-button min-h-10 px-2.5 py-2 text-[11px] disabled:cursor-not-allowed disabled:opacity-55"
                                                    >
                                                        {pending
                                                            ? "Canjeando…"
                                                            : item.owned
                                                              ? "Adquirida"
                                                              : item.canAfford
                                                                ? "Canjear"
                                                                : `Faltan ${missingPoints} pts`}
                                                    </button>
                                                </div>
                                            </div>
                                        </article>
                                    )
                                })}
                            </div>
                        </section>
                    )
                })}
            </div>

            <RewardPreviewDialog
                item={currentPreviewItem}
                onClose={() => setPreviewItem(null)}
                actionLabel={
                    currentPreviewItem?.owned
                        ? undefined
                        : currentPreviewItem?.canAfford
                          ? `Canjear por ${currentPreviewItem.cost} pts`
                          : `Te faltan ${previewMissingPoints} pts`
                }
                actionPending={pendingItemId === currentPreviewItem?.id}
                actionDisabled={
                    !currentPreviewItem?.canAfford || pendingItemId !== null
                }
                onAction={
                    currentPreviewItem && !currentPreviewItem.owned
                        ? () => void purchase(currentPreviewItem.id)
                        : undefined
                }
            />
        </div>
    )
}
