"use client"

import { useState } from "react"
import { useCurrentUser } from "@/features/auth/CurrentUserProvider"
import { useMfaStatus } from "../hooks/useMfaStatus"
import { useNotificationSettings } from "../hooks/useNotificationSettings"
import {
    notificationFrequencies,
    type NotificationFrequency,
} from "../types"
import ChangePasswordPanel from "./ChangePasswordPanel"
import DeleteAccountPanel from "./DeleteAccountPanel"
import MfaPanel from "./MfaPanel"

type SettingsView =
    | "settings"
    | "password"
    | "set-password"
    | "mfa"
    | "delete"

const frequencyLabels: Record<NotificationFrequency, string> = {
    IMMEDIATE: "Inmediata",
    DAILY: "Diaria",
    WEEKLY: "Semanal",
    DISABLED: "Desactivada",
}

interface SettingsModalProps {
    onClose: () => void
    onCloseLockChange: (locked: boolean) => void
}

export default function SettingsModal({
    onClose,
    onCloseLockChange,
}: SettingsModalProps) {
    const [view, setView] = useState<SettingsView>("settings")
    const { user, isLoading: isUserLoading } = useCurrentUser()
    const {
        settings,
        discordConnection,
        isLoading,
        pendingAction,
        error,
        message,
        setEmailNotifications,
        setDiscordNotifications,
        setTaskNotificationFrequency,
        connectDiscord,
        disconnectDiscord,
    } = useNotificationSettings()
    const {
        status: mfaStatus,
        isLoading: isMfaLoading,
        error: mfaError,
    } = useMfaStatus()

    const emailNotifications = settings?.emailNotifications ?? false
    const discordNotifications =
        discordConnection?.connected &&
        (settings?.discordNotifications ?? false)
    const discordName =
        discordConnection?.connected &&
        (discordConnection.globalName || discordConnection.username)

    if (view === "password" || view === "set-password") {
        return (
            <ChangePasswordPanel
                onBack={() => setView("settings")}
                onClose={onClose}
                initialMode={
                    view === "set-password" ? "set" : "change"
                }
            />
        )
    }

    if (view === "mfa" && mfaStatus) {
        return (
            <MfaPanel
                enabled={mfaStatus.enabled}
                onBack={() => setView("settings")}
                onClose={onClose}
                onCloseLockChange={onCloseLockChange}
                onRequestPassword={() => setView("set-password")}
            />
        )
    }

    if (view === "delete") {
        return (
            <DeleteAccountPanel
                onBack={() => setView("settings")}
                onClose={onClose}
                onCloseLockChange={onCloseLockChange}
            />
        )
    }

    return (
        <div className="calm-panel no-scrollbar relative mx-auto flex max-h-[calc(100dvh-32px)] w-full max-w-180 overflow-y-auto text-text-primary">
            <button
                type="button"
                aria-label="Cerrar configuración"
                onClick={onClose}
                className="
                    calm-icon-button absolute top-3 right-3
                    text-[22px] leading-none
                "
            >
                <span aria-hidden="true">×</span>
            </button>

            <div className="flex w-full flex-col gap-8 p-5 pt-14 sm:p-8 sm:pt-12 lg:p-10">
                <div className="flex flex-col gap-1.25">
                    <span className="calm-eyebrow">Tu cuenta</span>
                    <h1 id="settings-title" className="text-[26px] font-semibold">
                        Perfil
                    </h1>
                    <p
                        id="settings-description"
                        className="text-sm text-text-secondary"
                    >
                        Gestiona tu perfil y tus datos de inicio de sesión
                    </p>
                </div>

                <div className="flex flex-col gap-3.75">
                    <div className="flex flex-col gap-0.5">
                        <h2 className="text-sm font-semibold">
                            Seguridad de la cuenta
                        </h2>
                        <div className="h-px w-full bg-primary" />
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex w-full min-w-0 flex-col gap-1.25 sm:max-w-97.5">
                            <h3 className="text-[13px]">Contraseña</h3>
                            <p className="text-[11px] text-text-secondary">
                                {user?.hasPassword
                                    ? "Cambia la contraseña que utilizas para iniciar sesión"
                                    : "Crea una contraseña local para iniciar sesión sin Google"}
                            </p>
                        </div>
                        <button
                            type="button"
                            disabled={isUserLoading || !user}
                            onClick={() =>
                                setView(
                                    user?.hasPassword
                                        ? "password"
                                        : "set-password",
                                )
                            }
                            className="calm-button-secondary self-start text-[11px] disabled:cursor-not-allowed disabled:opacity-50 sm:shrink-0 sm:self-auto"
                        >
                            {user?.hasPassword
                                ? "Cambiar Contraseña"
                                : "Crear Contraseña"}
                        </button>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex w-full min-w-0 flex-col gap-1.25 sm:max-w-97.5">
                            <h3 className="text-[13px]">
                                Verificación de dos pasos
                            </h3>
                            <p className="text-[11px] text-text-secondary">
                                {mfaError
                                    ? mfaError
                                    : isMfaLoading
                                      ? "Consultando el estado…"
                                      : mfaStatus?.enabled
                                        ? "La verificación está activa"
                                        : "Agrega otra capa de seguridad a tu cuenta"}
                            </p>
                        </div>
                        <button
                            type="button"
                            disabled={
                                isMfaLoading ||
                                Boolean(mfaError) ||
                                !mfaStatus
                            }
                            onClick={() => setView("mfa")}
                            className="calm-button-secondary self-start text-left text-[11px] disabled:cursor-not-allowed disabled:opacity-50 sm:shrink-0 sm:self-auto"
                        >
                            {mfaStatus?.enabled
                                ? "Administrar Verificación"
                                : "Agregar un Método de Verificación"}
                        </button>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex w-full min-w-0 flex-col gap-1.25 sm:max-w-97.5">
                            <h3 className="text-[13px]">
                                Eliminar mi cuenta
                            </h3>
                            <p className="text-[11px] text-text-secondary">
                                Elimina tu cuenta de forma permanente. Ya no
                                podrás acceder a tus páginas ni a ninguno de
                                tus espacios de trabajo.
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={() => setView("delete")}
                            className="min-h-11 self-start rounded-[10px] border border-error/45 bg-error/8 px-4 py-2.5 text-[11px] font-medium text-error hover:bg-error/14 sm:shrink-0 sm:self-auto"
                        >
                            Eliminar mi Cuenta
                        </button>
                    </div>
                </div>

                <div className="flex flex-col gap-1.25">
                    <h2 className="text-[22px] font-semibold">Notificaciones</h2>
                    <p className="text-sm text-text-secondary">
                        Decide cuándo y cómo quieres recibir notificaciones
                    </p>
                    {isLoading && (
                        <p role="status" className="text-[11px] text-secondary">
                            Cargando preferencias…
                        </p>
                    )}
                    {error && (
                        <p role="alert" className="text-[11px] text-error">
                            {error}
                        </p>
                    )}
                    {message && (
                        <p
                            role="status"
                            className="text-[11px] text-success"
                        >
                            {message}
                        </p>
                    )}
                </div>

                <div className="flex flex-col gap-3.75">
                    <div className="flex flex-col gap-0.5">
                        <h3 className="text-sm font-semibold">
                            Notificaciones en la App
                        </h3>
                        <div className="h-px w-full bg-primary" />
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex w-full min-w-0 flex-col gap-1.25 sm:max-w-97.5">
                            <h4 className="text-[13px]">
                                Notificaciones de Email
                            </h4>
                            <p className="text-[11px] text-text-secondary">
                                Recibe emails sobre la actividad en tu espacio
                                de trabajo de CleanMind
                            </p>
                        </div>
                        <button
                            type="button"
                            role="switch"
                            aria-label="Notificaciones de email"
                            aria-checked={emailNotifications}
                            aria-busy={pendingAction === "email"}
                            disabled={
                                isLoading ||
                                !settings ||
                                pendingAction !== null
                            }
                            onClick={() =>
                                setEmailNotifications(!emailNotifications)
                            }
                            className={`
                                flex h-6 w-11 shrink-0 self-start rounded-full
                                ring ring-border transition-colors sm:self-auto
                                disabled:cursor-not-allowed disabled:opacity-50
                                ${
                                    emailNotifications
                                        ? "justify-end bg-primary"
                                        : "justify-start bg-card-hover"
                                }
                            `}
                        >
                            <span className="size-6 rounded-full bg-text-primary ring ring-border" />
                        </button>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex w-full min-w-0 flex-col gap-1.25 sm:max-w-97.5">
                            <h4 className="text-[13px]">
                                Notificaciones de Discord
                            </h4>
                            <p className="text-[11px] text-text-secondary">
                                {discordConnection?.connected
                                    ? `Cuenta vinculada: ${discordName}. Notificaciones ${discordNotifications ? "activadas" : "desactivadas"}`
                                    : "Vincula Discord para recibir notificaciones en tu cuenta"}
                            </p>
                        </div>
                        <div className="flex shrink-0 items-center gap-[10px] self-start sm:self-auto">
                            {discordConnection?.connected && (
                                <button
                                    type="button"
                                    role="switch"
                                    aria-label="Notificaciones de Discord"
                                    aria-checked={discordNotifications}
                                    aria-busy={
                                        pendingAction ===
                                        "discordNotifications"
                                    }
                                    disabled={
                                        isLoading ||
                                        !settings ||
                                        pendingAction !== null
                                    }
                                    onClick={() =>
                                        setDiscordNotifications(
                                            !discordNotifications,
                                        )
                                    }
                                    className={`
                                        flex h-[24px] w-[44px] shrink-0 rounded-full
                                        ring ring-border transition-colors
                                        disabled:cursor-not-allowed disabled:opacity-50
                                        ${
                                            discordNotifications
                                                ? "justify-end bg-primary"
                                                : "justify-start bg-card-hover"
                                        }
                                    `}
                                >
                                    <span className="size-[24px] rounded-full bg-text-primary ring ring-border" />
                                </button>
                            )}
                            <button
                            type="button"
                            aria-busy={pendingAction === "discord"}
                            disabled={
                                isLoading ||
                                !discordConnection ||
                                pendingAction !== null
                            }
                            onClick={
                                discordConnection?.connected
                                    ? disconnectDiscord
                                    : connectDiscord
                            }
                            className={`
                                self-start text-[11px]
                                disabled:cursor-not-allowed disabled:opacity-50
                                sm:shrink-0 sm:self-auto
                                ${
                                    discordConnection?.connected
                                        ? "min-h-11 rounded-[10px] border border-error/35 bg-error/8 px-4 py-2.5 font-medium text-error hover:bg-error/14"
                                        : "calm-button-secondary"
                                }
                            `}
                        >
                            {pendingAction === "discord"
                                ? discordConnection?.connected
                                    ? "Desvinculando…"
                                    : "Redirigiendo…"
                                : discordConnection?.connected
                                  ? "Desvincular"
                                  : "Vincular"}
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex w-full min-w-0 flex-col gap-1.25 sm:max-w-97.5">
                            <h4 className="text-[13px]">Frecuencia</h4>
                            <p className="text-[11px] text-text-secondary">
                                Cambia la frecuencia de las notificaciones de
                                tus tareas.
                            </p>
                        </div>
                        <select
                            aria-label="Frecuencia de notificaciones"
                            aria-busy={pendingAction === "frequency"}
                            value={
                                settings?.taskNotificationFrequency ?? "DAILY"
                            }
                            disabled={
                                isLoading ||
                                !settings ||
                                pendingAction !== null
                            }
                            onChange={(event) =>
                                setTaskNotificationFrequency(
                                    event.target
                                        .value as NotificationFrequency,
                                )
                            }
                            className="
                                calm-input w-auto self-start px-3 text-[11px]
                                disabled:cursor-not-allowed disabled:opacity-50
                                sm:shrink-0 sm:self-auto
                            "
                        >
                            {notificationFrequencies.map((frequency) => (
                                <option key={frequency} value={frequency}>
                                    {frequencyLabels[frequency]}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
        </div>
    )
}
