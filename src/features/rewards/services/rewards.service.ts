import { apiRequest } from "@/lib/api"
import type {
    StorefrontResponse,
    StoreItemId,
    StorePurchaseResponse,
} from "../types"

export const rewardsService = {
    getStore: () =>
        apiRequest<StorefrontResponse>("/api/rewards/store", {
            cache: "no-store",
        }),

    purchase: (itemId: StoreItemId) =>
        apiRequest<StorePurchaseResponse>(
            `/api/rewards/store/${itemId}/purchase`,
            { method: "POST" },
        ),

    equip: (itemId: StoreItemId) =>
        apiRequest<StorefrontResponse>(
            `/api/rewards/store/${itemId}/equip`,
            { method: "PUT" },
        ),

    unequip: (itemId: StoreItemId) =>
        apiRequest<StorefrontResponse>(
            `/api/rewards/store/${itemId}/equip`,
            { method: "DELETE" },
        ),
}

