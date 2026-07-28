"use client"

import { useEffect, useState } from "react"
import { requestErrorMessage } from "@/lib/api"
import { toNotificationPreferencesRequest } from "../notification-preferences"
import { settingsService } from "../services/settings.service"
import type {
    DiscordConnection,
    NotificationFrequency,
    NotificationPreferenceChanges,
    UserSettings,
} from "../types"

type PendingSettingsAction = "email" | "frequency" | "discord" | null

export function useNotificationSettings() {
    const [settings, setSettings] = useState<UserSettings | null>(null)
    const [discordConnection, setDiscordConnection] =
        useState<DiscordConnection | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [pendingAction, setPendingAction] =
        useState<PendingSettingsAction>(null)
    const [loadError, setLoadError] = useState<string | null>(null)
    const [actionError, setActionError] = useState<string | null>(null)
    const [message, setMessage] = useState<string | null>(null)

    useEffect(() => {
        let isCurrent = true

        Promise.allSettled([
            settingsService.getSettings(),
            settingsService.getDiscordConnection(),
        ])
            .then(([settingsResult, discordResult]) => {
                if (!isCurrent) return

                const loadErrors: string[] = []

                if (settingsResult.status === "fulfilled") {
                    setSettings(settingsResult.value)
                } else {
                    loadErrors.push("No se pudieron cargar tus preferencias.")
                }

                if (discordResult.status === "fulfilled") {
                    setDiscordConnection(discordResult.value)
                } else {
                    loadErrors.push(
                        "No se pudo consultar la conexión con Discord.",
                    )
                }

                if (loadErrors.length > 0) {
                    setLoadError(loadErrors.join(" "))
                }
            })
            .finally(() => {
                if (isCurrent) setIsLoading(false)
            })

        return () => {
            isCurrent = false
        }
    }, [])

    const saveNotificationPreferences = async (
        changes: NotificationPreferenceChanges,
        action: Exclude<PendingSettingsAction, "discord" | null>,
    ) => {
        if (!settings || pendingAction) return

        setPendingAction(action)
        setActionError(null)
        setMessage(null)

        try {
            const request = toNotificationPreferencesRequest(
                settings,
                changes,
            )
            const updated =
                await settingsService.updateNotificationPreferences(request)
            setSettings(updated)
            setMessage("Preferencias actualizadas.")
        } catch (requestError: unknown) {
            setActionError(requestErrorMessage(
                requestError,
                "No pudimos guardar tus preferencias.",
                {
                    400: "Revisa la frecuencia seleccionada.",
                    401: "Tu sesión venció. Inicia sesión nuevamente.",
                },
            ))
        } finally {
            setPendingAction(null)
        }
    }

    const setEmailNotifications = (enabled: boolean) =>
        saveNotificationPreferences(
            { emailNotifications: enabled },
            "email",
        )

    const setTaskNotificationFrequency = (
        frequency: NotificationFrequency,
    ) =>
        saveNotificationPreferences(
            { taskNotificationFrequency: frequency },
            "frequency",
        )

    const connectDiscord = async () => {
        if (discordConnection?.connected || pendingAction) return

        setPendingAction("discord")
        setActionError(null)
        setMessage(null)

        try {
            const { authorizationUrl } =
                await settingsService.createDiscordConnection()
            window.location.assign(authorizationUrl)
        } catch (requestError: unknown) {
            setActionError(requestErrorMessage(
                requestError,
                "No pudimos iniciar la vinculación con Discord.",
                {
                    401: "Tu sesión venció. Inicia sesión nuevamente.",
                    409: "La cuenta de Discord ya está vinculada.",
                },
            ))
            setPendingAction(null)
        }
    }

    const error = [loadError, actionError].filter(Boolean).join(" ") || null

    return {
        settings,
        discordConnection,
        isLoading,
        pendingAction,
        error,
        message,
        setEmailNotifications,
        setTaskNotificationFrequency,
        connectDiscord,
    }
}
