import type { StoreItem } from "../types"
import RewardVisualPreview from "./RewardVisualPreview"

interface RewardOptionCardProps {
    item: StoreItem
    pending?: boolean
    onPreview: () => void
    onToggle: () => void
}

export default function RewardOptionCard({
    item,
    pending = false,
    onPreview,
    onToggle,
}: RewardOptionCardProps) {
    return (
        <article
            className={`flex min-h-73 flex-col rounded-[14px] border p-3.5 transition-colors ${
                item.equipped
                    ? "border-primary/60 bg-primary/8"
                    : "border-border/60 bg-card/48"
            }`}
        >
            <RewardVisualPreview item={item} />
            <div className="flex flex-1 flex-col pt-3.25">
                <div className="flex items-start justify-between gap-2.5">
                    <div className="min-w-0">
                        <span className="text-[9px] font-semibold uppercase tracking-[1px] text-accent">
                            Recompensa canjeada
                        </span>
                        <h3 className="mt-0.75 truncate text-[15px] font-semibold">
                            {item.name}
                        </h3>
                    </div>
                    <span className="shrink-0 rounded-full border border-border/55 bg-surface/55 px-2 py-0.75 text-[9px] font-semibold text-text-secondary">
                        {item.equipped ? "Activa" : "Adquirida"}
                    </span>
                </div>
                <p className="mt-1.75 flex-1 text-[11px] leading-4.25 text-text-secondary">
                    {item.description}
                </p>
                <div className="mt-3.25 grid grid-cols-2 gap-2">
                    <button
                        type="button"
                        onClick={onPreview}
                        className="calm-button-secondary min-h-10 px-2.5 py-2 text-[11px]"
                    >
                        Vista previa
                    </button>
                    <button
                        type="button"
                        disabled={pending}
                        aria-busy={pending}
                        onClick={onToggle}
                        className="calm-button min-h-10 px-2.5 py-2 text-[11px] disabled:cursor-wait disabled:opacity-60"
                    >
                        {pending
                            ? "Guardando…"
                            : item.equipped
                              ? "Quitar"
                              : "Aplicar"}
                    </button>
                </div>
            </div>
        </article>
    )
}
