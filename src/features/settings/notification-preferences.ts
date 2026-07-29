import type {
    NotificationPreferenceChanges,
    UpdateNotificationPreferencesRequest,
    UserSettings,
} from "./types"

export function toNotificationPreferencesRequest(
    settings: UserSettings,
    changes: NotificationPreferenceChanges,
): UpdateNotificationPreferencesRequest {
    return {
        emailNotifications:
            changes.emailNotifications ?? settings.emailNotifications,
        whatsappNotifications: settings.whatsappNotifications,
        discordNotifications:
            changes.discordNotifications ?? settings.discordNotifications,
        taskNotificationFrequency:
            changes.taskNotificationFrequency ??
            settings.taskNotificationFrequency,
    }
}
