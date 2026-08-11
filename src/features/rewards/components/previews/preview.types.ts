import type { StoreItem } from "../../types"

export interface RewardPreviewProps {
    item: StoreItem
    expanded?: boolean
}

export function previewHeight(expanded = false): string {
    return expanded ? "h-[280px]" : "h-[124px]"
}
