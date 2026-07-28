"use client"

import { useState, type FormEvent } from "react"
import Link from "next/link"
import PasswordField from "@/components/forms/PasswordField"
import { requestErrorMessage } from "@/lib/api"
import { validatePasswordConfirmation } from "../password-validation"
import { authService } from "../services/auth.service"

export default function RecoverPasswordForm({
    token,
}: {
    token: string | null
}) {
    const [isPending, setIsPending] = useState(false)
    const [isComplete, setIsComplete] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (!token) return

        const formData = new FormData(event.currentTarget)
        const password = String(formData.get("password") ?? "")
        const confirmPassword = String(
            formData.get("confirmPassword") ?? "",
        )
        const validationError = validatePasswordConfirmation(
            password,
            confirmPassword,
        )

        if (validationError) {
            setError(validationError)
            return
        }

        setIsPending(true)
        setError(null)

        try {
            await authService.resetPassword({ token, password })
            setIsComplete(true)
        } catch (requestError: unknown) {
            setError(requestErrorMessage(
                requestError,
                "No pudimos restablecer la contraseña.",
                {
                    400: "La contraseña debe tener al menos 8 caracteres.",
                    401: "El enlace no es válido o ya venció.",
                },
            ))
        } finally {
            setIsPending(false)
        }
    }

    return (
        <div className="flex h-auto w-full max-w-100 items-center justify-center rounded-xl border border-border bg-surface">
            <div className="flex w-full flex-col gap-6 px-5 py-8 sm:gap-7.5 sm:px-6.25 sm:py-12.5">
                <div className="flex flex-col items-center gap-2.5">
                    <h1 className="bg-linear-to-br from-primary via-secondary to-accent bg-clip-text text-center text-2xl font-semibold text-transparent sm:text-[30px]">
                        Recuperar Contraseña
                    </h1>
                    <p className="w-full max-w-80 text-center text-[13px] font-semibold tracking-wider text-text-secondary">
                        {isComplete
                            ? "Tu contraseña fue actualizada correctamente."
                            : "Elige una nueva contraseña para tu cuenta."}
                    </p>
                </div>

                {!token && (
                    <p role="alert" className="text-center text-xs text-error">
                        El enlace de recuperación no es válido.
                    </p>
                )}

                {!isComplete && token && (
                    <form
                        className="flex w-full flex-col gap-3.75"
                        onSubmit={handleSubmit}
                    >
                        <PasswordField
                            id="recover-password"
                            name="password"
                            label="Nueva Contraseña"
                            placeholder="Nueva Contraseña"
                            autoComplete="new-password"
                            minLength={8}
                            disabled={isPending}
                        />
                        <PasswordField
                            id="recover-confirm-password"
                            name="confirmPassword"
                            label="Confirmar Contraseña"
                            placeholder="Confirmar Contraseña"
                            autoComplete="new-password"
                            minLength={8}
                            disabled={isPending}
                        />
                        {error && (
                            <p role="alert" className="text-xs text-error">
                                {error}
                            </p>
                        )}
                        <button
                            type="submit"
                            disabled={isPending}
                            className="h-11.75 rounded-sm border border-border bg-linear-to-r from-primary via-accent to-secondary text-sm text-text-primary disabled:cursor-wait disabled:opacity-50"
                        >
                            {isPending
                                ? "Guardando…"
                                : "Recuperar Contraseña"}
                        </button>
                    </form>
                )}

                <Link
                    href={token && !isComplete ? "/forgot-password" : "/login"}
                    className="flex h-11.75 items-center justify-center rounded-sm border border-border bg-secondary/60 text-sm text-text-primary"
                >
                    {token && !isComplete
                        ? "Solicitar otro enlace"
                        : "Volver al inicio de sesión"}
                </Link>
            </div>
        </div>
    )
}
