import { apiRequest } from "@/lib/api"
import type {
    DiscordAuthorizationResponse,
    DiscordConnection,
    UpdateNotificationPreferencesRequest,
    Theme,
    UserSettings,
} from "../types"

export const settingsService = {
    getSettings: () =>
        apiRequest<UserSettings>("/api/settings", { cache: "no-store" }),

    updateTheme: (theme: Theme) =>
        apiRequest<UserSettings>("/api/settings/theme", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ theme }),
        }),

    updateNotificationPreferences: (
        request: UpdateNotificationPreferencesRequest,
    ) =>
        apiRequest<UserSettings>("/api/settings/notifications", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(request),
        }),

    getDiscordConnection: () =>
        apiRequest<DiscordConnection>(
            "/api/notifications/discord/connection",
            { cache: "no-store" },
        ),

    createDiscordConnection: () =>
        apiRequest<DiscordAuthorizationResponse>(
            "/api/notifications/discord/connection",
            { method: "POST" },
        ),
}
