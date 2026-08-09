"use client"

import { useEffect } from "react"
import type { StoreItem } from "../types"
import RewardVisualPreview from "./RewardVisualPreview"

const categoryLabels = {
    PALETTE: "Paleta de colores",
    BACKGROUND: "Fondo animado",
    BORDER: "Borde con gradiente",
    EFFECT: "Efecto visual",
    POMODORO: "Decoración Pomodoro",
    CALENDAR: "Decoración de Calendario",
} as const

interface RewardPreviewDialogProps {
    item: StoreItem | null
    onClose: () => void
    actionLabel?: string
    actionPending?: boolean
    actionDisabled?: boolean
    onAction?: () => void
}

export default function RewardPreviewDialog({
    item,
    onClose,
    actionLabel,
    actionPending = false,
    actionDisabled = false,
    onAction,
}: RewardPreviewDialogProps) {
    useEffect(() => {
        if (!item) return

        const closeOnEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") onClose()
        }

        window.addEventListener("keydown", closeOnEscape)
        return () => window.removeEventListener("keydown", closeOnEscape)
    }, [item, onClose])

    if (!item) return null

    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="reward-preview-title"
            className="fixed inset-0 z-100 grid place-items-center bg-black/72 px-3.5 py-6 backdrop-blur-[6px]"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) onClose()
            }}
        >
            <div className="calm-panel no-scrollbar max-h-full w-full max-w-160 overflow-y-auto p-4.5 sm:p-6">
                <div className="mb-3.75 flex items-start justify-between gap-3.5">
                    <div>
                        <span className="calm-eyebrow">
                            {categoryLabels[item.category]}
                        </span>
                        <h3
                            id="reward-preview-title"
                            className="mt-1 text-[22px] font-semibold"
                        >
                            {item.name}
                        </h3>
                    </div>
                    <button
                        type="button"
                        aria-label="Cerrar vista previa"
                        onClick={onClose}
                        className="calm-icon-button shrink-0 bg-card/70 text-[20px] text-text-primary"
                    >
                        <span aria-hidden="true">×</span>
                    </button>
                </div>

                <RewardVisualPreview item={item} expanded />
                <p className="mt-3.5 text-[12px] leading-4.75 text-text-secondary">
                    {item.description}
                </p>

                <div className="mt-4.5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                    <button
                        type="button"
                        onClick={onClose}
                        className="calm-button-secondary"
                    >
                        Cerrar
                    </button>
                    {onAction && actionLabel && (
                        <button
                            type="button"
                            disabled={actionDisabled || actionPending}
                            aria-busy={actionPending}
                            onClick={onAction}
                            className="calm-button disabled:cursor-not-allowed disabled:opacity-55"
                        >
                            {actionPending ? "Guardando…" : actionLabel}
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}
