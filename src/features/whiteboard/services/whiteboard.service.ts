import { apiRequest } from "@/lib/api"
import type {
    SaveWhiteboardDocument,
    WhiteboardDocument,
} from "../types"

const endpoint = "/api/whiteboard"

export const whiteboardService = {
    get: () =>
        apiRequest<WhiteboardDocument>(endpoint, {
            cache: "no-store",
        }),
    save: (document: SaveWhiteboardDocument) =>
        apiRequest<WhiteboardDocument>(endpoint, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(document),
        }),
}
