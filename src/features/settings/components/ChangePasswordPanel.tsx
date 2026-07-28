"use client"

import { useState, type FormEvent } from "react"
import PasswordField from "@/components/forms/PasswordField"
import { useCurrentUser } from "@/features/auth/CurrentUserProvider"
import { ApiError } from "@/lib/api"
import {
    validateChangePassword,
    validateSetPassword,
} from "../security-validation"
import { accountSecurityService } from "../services/account-security.service"
import SecurityPanelShell from "./SecurityPanelShell"

interface ChangePasswordPanelProps {
    onBack: () => void
    onClose: () => void
    initialMode?: "change" | "set"
}

function passwordErrorMessage(
    error: unknown,
    mode: "change" | "set",
): string {
    if (error instanceof ApiError && error.status === 401) {
        return "La contraseña actual es incorrecta."
    }

    if (error instanceof ApiError && error.status === 400) {
        return mode === "change"
            ? "Esta cuenta no tiene una contraseña local configurada."
            : "Esta cuenta ya tiene una contraseña local configurada."
    }

    return error instanceof Error
        ? error.message
        : "No se pudo cambiar la contraseña."
}

export default function ChangePasswordPanel({
    onBack,
    onClose,
    initialMode = "change",
}: ChangePasswordPanelProps) {
    const mode = initialMode
    const { markPasswordCreated } = useCurrentUser()
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [message, setMessage] = useState<string | null>(null)

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const form = event.currentTarget
        const formData = new FormData(form)
        const confirmPassword = String(
            formData.get("confirmPassword") ?? "",
        )
        const currentPassword = String(
            formData.get("currentPassword") ?? "",
        )
        const newPassword = String(formData.get("newPassword") ?? "")
        const password = String(formData.get("password") ?? "")
        const validationError =
            mode === "change"
                ? validateChangePassword({
                      currentPassword,
                      newPassword,
                      confirmPassword,
                  })
                : validateSetPassword({ password, confirmPassword })

        if (validationError) {
            setError(validationError)
            setMessage(null)
            return
        }

        setIsPending(true)
        setError(null)
        setMessage(null)

        try {
            if (mode === "change") {
                await accountSecurityService.changePassword({
                    currentPassword,
                    newPassword,
                    confirmPassword,
                })
            } else {
                await accountSecurityService.setPassword({
                    password,
                    confirmPassword,
                })
                markPasswordCreated()
            }
            form.reset()
            setMessage(
                mode === "change"
                    ? "Contraseña actualizada correctamente."
                    : "Contraseña local creada correctamente.",
            )
        } catch (requestError: unknown) {
            setError(passwordErrorMessage(requestError, mode))
        } finally {
            setIsPending(false)
        }
    }

    return (
        <SecurityPanelShell
            title={
                mode === "change"
                    ? "Cambiar Contraseña"
                    : "Crear Contraseña"
            }
            description={
                mode === "change"
                    ? "Elige una contraseña nueva de al menos 8 caracteres."
                    : "Crea una contraseña local para tu cuenta de Google."
            }
            onBack={onBack}
            onClose={onClose}
        >
            <form
                onSubmit={handleSubmit}
                className="flex w-full flex-col gap-3.75"
            >
                {mode === "change" && (
                    <PasswordField
                        id="settings-current-password"
                        name="currentPassword"
                        label="Contraseña actual"
                        placeholder="Contraseña actual"
                        autoComplete="current-password"
                        disabled={isPending}
                    />
                )}
                <PasswordField
                    id="settings-new-password"
                    name={mode === "change" ? "newPassword" : "password"}
                    label="Nueva contraseña"
                    placeholder="Nueva contraseña"
                    autoComplete="new-password"
                    minLength={8}
                    disabled={isPending}
                />
                <PasswordField
                    id="settings-confirm-password"
                    name="confirmPassword"
                    label="Confirmar contraseña"
                    placeholder="Confirmar contraseña"
                    autoComplete="new-password"
                    minLength={8}
                    disabled={isPending}
                />

                {error && (
                    <p role="alert" className="text-xs text-error">
                        {error}
                    </p>
                )}
                {message && (
                    <p role="status" className="text-xs text-success">
                        {message}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={isPending}
                    className="h-11.75 rounded-sm border border-border bg-linear-to-r from-primary via-accent to-secondary text-sm text-text-primary disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {isPending
                        ? "Guardando…"
                        : mode === "change"
                          ? "Cambiar contraseña"
                          : "Crear contraseña"}
                </button>
            </form>
        </SecurityPanelShell>
    )
}
