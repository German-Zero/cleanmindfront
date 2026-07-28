"use client"

import { useState, type FormEvent } from "react"
import Link from "next/link"
import { ApiError } from "@/lib/api"
import { authService } from "../services/auth.service"

export default function VerifyEmailForm({
    email,
}: {
    email: string | null
}) {
    const [code, setCode] = useState("")
    const [isPending, setIsPending] = useState(false)
    const [isResending, setIsResending] = useState(false)
    const [isVerified, setIsVerified] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [message, setMessage] = useState<string | null>(null)

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (!/^\d{6}$/.test(code)) {
            setError("Ingresa el código de seis dígitos.")
            return
        }

        setIsPending(true)
        setError(null)
        setMessage(null)

        try {
            await authService.verifyEmail({ code })
            setIsVerified(true)
        } catch (requestError: unknown) {
            setError(
                requestError instanceof ApiError &&
                    requestError.status === 401
                    ? "El código no es válido o ya venció."
                    : "No pudimos verificar tu email.",
            )
        } finally {
            setIsPending(false)
        }
    }

    const resendCode = async () => {
        setIsResending(true)
        setError(null)
        setMessage(null)

        try {
            await authService.resendVerificationEmail()
            setCode("")
            setMessage("Enviamos un código nuevo a tu email.")
        } catch {
            setError(
                "No pudimos reenviar el código. Inicia sesión e inténtalo nuevamente.",
            )
        } finally {
            setIsResending(false)
        }
    }

    return (
        <div className="relative w-full max-w-115 overflow-hidden rounded-3xl border border-border bg-surface/95 p-1 shadow-2xl shadow-primary/10 backdrop-blur">
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-24 -right-20 size-56 rounded-full bg-primary/15 blur-3xl"
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-28 -left-20 size-56 rounded-full bg-secondary/15 blur-3xl"
            />

            <div className="relative flex flex-col items-center gap-7 rounded-[20px] border border-border/60 bg-card/35 px-6 py-10 text-center sm:px-10 sm:py-12">
                <div className="grid size-16 place-items-center rounded-2xl border border-primary/30 bg-primary/10 text-primary shadow-lg shadow-primary/10">
                    {isVerified ? (
                        <span className="text-3xl" aria-hidden="true">
                            ✓
                        </span>
                    ) : (
                        <svg
                            aria-hidden="true"
                            viewBox="0 0 24 24"
                            className="size-8"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.7"
                        >
                            <rect x="3" y="5" width="18" height="14" rx="3" />
                            <path d="m4 7 8 6 8-6" />
                        </svg>
                    )}
                </div>

                <div className="flex flex-col items-center gap-2">
                    <span className="rounded-full border border-border bg-surface/70 px-3 py-1 text-[10px] font-semibold tracking-[0.18em] text-text-secondary uppercase">
                        Seguridad de la cuenta
                    </span>
                    <h1 className="bg-linear-to-br from-primary via-secondary to-accent bg-clip-text text-3xl font-semibold text-transparent sm:text-4xl">
                        {isVerified ? "Email verificado" : "Revisa tu correo"}
                    </h1>
                    <p className="max-w-85 text-[13px] font-medium leading-6 text-text-secondary">
                        {isVerified
                            ? "Tu cuenta está lista. Ya puedes continuar a CleanMind."
                            : "Escribe el código de seis dígitos que enviamos a"}
                    </p>
                    {!isVerified && email && (
                        <p className="max-w-full truncate text-sm font-semibold text-text-primary">
                            {email}
                        </p>
                    )}
                </div>

                {!isVerified ? (
                    <form
                        className="flex w-full flex-col gap-4"
                        onSubmit={handleSubmit}
                    >
                        <label htmlFor="verification-code" className="sr-only">
                            Código de verificación
                        </label>
                        <input
                            id="verification-code"
                            name="code"
                            required
                            autoFocus
                            value={code}
                            onChange={(event) =>
                                setCode(
                                    event.target.value
                                        .replace(/\D/g, "")
                                        .slice(0, 6),
                                )
                            }
                            type="text"
                            inputMode="numeric"
                            pattern="[0-9]{6}"
                            maxLength={6}
                            autoComplete="one-time-code"
                            disabled={isPending || isResending}
                            placeholder="000000"
                            className="h-16 w-full rounded-xl border border-border bg-surface/80 px-4 text-center text-2xl font-semibold tracking-[0.45em] text-text-primary outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10 disabled:opacity-50"
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
                            disabled={isPending || isResending}
                            className="h-12 rounded-xl border border-border bg-linear-to-r from-primary via-accent to-secondary text-sm font-semibold text-text-primary shadow-lg shadow-primary/10 disabled:cursor-wait disabled:opacity-50"
                        >
                            {isPending ? "Verificando…" : "Verificar email"}
                        </button>
                        <button
                            type="button"
                            disabled={isPending || isResending}
                            onClick={resendCode}
                            className="min-h-11 rounded-xl px-4 text-xs text-primary transition hover:bg-primary/10 disabled:cursor-wait disabled:opacity-50"
                        >
                            {isResending
                                ? "Reenviando…"
                                : "No recibí el código · Reenviar"}
                        </button>
                    </form>
                ) : (
                    <Link
                        href="/dashboard/calendar"
                        className="flex h-12 w-full items-center justify-center rounded-xl border border-border bg-linear-to-r from-primary via-accent to-secondary text-sm font-semibold text-text-primary shadow-lg shadow-primary/10"
                    >
                        Continuar al calendario
                    </Link>
                )}

                <Link
                    href="/login"
                    className="text-xs text-text-secondary transition hover:text-primary"
                >
                    Volver al inicio de sesión
                </Link>
            </div>
        </div>
    )
}
