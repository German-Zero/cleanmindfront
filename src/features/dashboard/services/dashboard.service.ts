import { apiRequest } from "@/lib/api"
import type { DashboardBootstrap } from "../types"

export const dashboardService = {
    getBootstrap: () =>
        apiRequest<DashboardBootstrap>("/api/dashboard", {
            cache: "no-store",
        }),
}
