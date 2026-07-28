"use client"

import { useState, type FormEvent } from "react"
import Link from "next/link"
import { requestErrorMessage } from "@/lib/api"
import { authService } from "../services/auth.service"

export default function ForgotPasswordForm() {
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [message, setMessage] = useState<string | null>(null)

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const form = event.currentTarget
        const email = String(new FormData(form).get("email") ?? "")

        setIsPending(true)
        setError(null)
        setMessage(null)

        try {
            await authService.forgotPassword({ email })
            form.reset()
            setMessage(
                "Si existe una cuenta con ese email, recibirás un enlace válido durante 30 minutos.",
            )
        } catch (requestError: unknown) {
            setError(requestErrorMessage(
                requestError,
                "No pudimos enviar el enlace. Inténtalo nuevamente.",
                {
                    400: "Ingresa un email válido.",
                    429: "Solicitaste varios enlaces. Espera un momento antes de intentarlo nuevamente.",
                },
            ))
        } finally {
            setIsPending(false)
        }
    }

    return (
        <div className="calm-panel flex h-auto w-full max-w-[420px] items-center justify-center">
            <div className="flex w-full flex-col gap-[24px] px-[22px] py-[34px] sm:px-[30px] sm:py-[42px]">
                <div className="flex flex-col items-center gap-[8px]">
                    <h1 className="text-center text-[23px] font-semibold text-text-primary">
                        ¿Olvidaste tu Contraseña?
                    </h1>
                    <p className="w-full max-w-[320px] text-center text-[12px] leading-[19px] text-text-secondary">
                        Te enviaremos un enlace para restablecer tu contraseña.
                    </p>
                </div>
                <form
                    className="flex w-full flex-col gap-3.75"
                    onSubmit={handleSubmit}
                >
                    <div className="flex flex-col gap-1">
                        <label
                            htmlFor="forgot-email"
                            className="text-[14px] text-text-primary"
                        >
                            Email
                        </label>
                        <input
                            required
                            id="forgot-email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            disabled={isPending}
                            placeholder="tu@email.com"
                            className="calm-input text-[13px] disabled:opacity-50"
                        />
                    </div>
                    {error && (
                        <p role="alert" className="calm-feedback text-error">
                            {error}
                        </p>
                    )}
                    {message && (
                        <p role="status" className="calm-feedback text-success">
                            {message}
                        </p>
                    )}
                    <button
                        type="submit"
                        disabled={isPending}
                        className="calm-button disabled:cursor-wait disabled:opacity-50"
                    >
                        {isPending ? "Enviando…" : "Enviar enlace"}
                    </button>
                    <Link
                        href="/login"
                        className="calm-button-secondary flex items-center justify-center"
                    >
                        Atrás
                    </Link>
                </form>
            </div>
        </div>
    )
}
