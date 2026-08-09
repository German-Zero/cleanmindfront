import type { StoreItem, StoreItemId } from "../types"
import RewardOptionCard from "./RewardOptionCard"

interface RewardOptionCollectionProps {
    title: string
    description: string
    items: StoreItem[]
    emptyMessage: string
    pendingItemId: StoreItemId | null
    onPreview: (item: StoreItem) => void
    onToggle: (item: StoreItem) => void
    className?: string
}

export default function RewardOptionCollection({
    title,
    description,
    items,
    emptyMessage,
    pendingItemId,
    onPreview,
    onToggle,
    className = "",
}: RewardOptionCollectionProps) {
    return (
        <div className={className}>
            <div className="mb-3">
                <h3 className="text-[13px] font-semibold">{title}</h3>
                <p className="mt-0.75 text-[11px] leading-4.25 text-text-secondary">
                    {description}
                </p>
            </div>

            {items.length === 0 ? (
                <div className="calm-card px-4 py-4.5 text-[11px] leading-4.25 text-text-secondary">
                    {emptyMessage}
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-3.5 md:grid-cols-2 xl:grid-cols-3">
                    {items.map((item) => (
                        <RewardOptionCard
                            key={item.id}
                            item={item}
                            pending={pendingItemId === item.id}
                            onPreview={() => onPreview(item)}
                            onToggle={() => onToggle(item)}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}
