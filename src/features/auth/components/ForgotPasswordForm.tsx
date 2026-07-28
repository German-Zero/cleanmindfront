"use client"

import { useState, type FormEvent } from "react"
import Link from "next/link"
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
        } catch {
            setError(
                "No pudimos enviar el enlace. Inténtalo nuevamente.",
            )
        } finally {
            setIsPending(false)
        }
    }

    return (
        <div className="flex h-auto w-full max-w-100 items-center justify-center rounded-xl border border-border bg-surface">
            <div className="flex w-full flex-col gap-6 px-5 py-8 sm:gap-7.5 sm:px-6.25 sm:py-12.5">
                <div className="flex flex-col items-center gap-2.5">
                    <h1 className="bg-linear-to-br from-primary via-secondary to-accent bg-clip-text text-center text-xl font-semibold text-transparent sm:text-[23px]">
                        ¿Olvidaste tu Contraseña?
                    </h1>
                    <p className="w-full max-w-80 text-center text-[13px] font-semibold tracking-wider text-text-secondary">
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
                            className="w-full rounded-sm border border-border bg-card/70 px-3.75 py-3.75 text-base text-text-primary placeholder:text-base placeholder:text-text-secondary disabled:opacity-50 sm:text-[13px] sm:placeholder:text-[13px]"
                        />
                    </div>
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
                        className="h-11.75 rounded-sm border border-border bg-linear-to-r from-primary via-accent to-secondary text-sm text-text-primary disabled:cursor-wait disabled:opacity-50"
                    >
                        {isPending ? "Enviando…" : "Enviar enlace"}
                    </button>
                    <Link
                        href="/login"
                        className="flex h-11.75 items-center justify-center rounded-sm border border-border bg-secondary/60 text-sm text-text-primary"
                    >
                        Atrás
                    </Link>
                </form>
            </div>
        </div>
    )
}
