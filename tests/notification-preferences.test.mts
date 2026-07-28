import assert from "node:assert/strict"
import test from "node:test"
import { toNotificationPreferencesRequest } from "../src/features/settings/notification-preferences.ts"

const settings = {
    theme: "LUNAR_MIND" as const,
    emailNotifications: true,
    whatsappNotifications: false,
    discordNotifications: true,
    taskNotificationFrequency: "DAILY" as const,
    motivationalMessages: true,
    motivationFrequency: "WEEKLY" as const,
    createdAt: "2026-07-27T00:00:00.000Z",
    updatedAt: "2026-07-27T00:00:00.000Z",
}

test("preserva el DTO completo al cambiar una sola preferencia", () => {
    assert.deepEqual(
        toNotificationPreferencesRequest(settings, {
            emailNotifications: false,
        }),
        {
            emailNotifications: false,
            whatsappNotifications: false,
            discordNotifications: true,
            taskNotificationFrequency: "DAILY",
        },
    )
})

test("cambia la frecuencia sin alterar los canales", () => {
    assert.deepEqual(
        toNotificationPreferencesRequest(settings, {
            taskNotificationFrequency: "WEEKLY",
        }),
        {
            emailNotifications: true,
            whatsappNotifications: false,
            discordNotifications: true,
            taskNotificationFrequency: "WEEKLY",
        },
    )
})
