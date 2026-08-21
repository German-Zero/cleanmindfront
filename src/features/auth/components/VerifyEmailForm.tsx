"use client"

import { useState, type FormEvent } from "react"
import Link from "next/link"
import { requestErrorMessage } from "@/lib/api"
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
            setError(requestErrorMessage(
                requestError,
                "No pudimos verificar tu email.",
                {
                    400: "El código debe tener 6 dígitos.",
                    401: "El código no es válido o ya venció.",
                    429: "Realizaste varios intentos. Espera un momento.",
                },
            ))
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
        } catch (requestError: unknown) {
            setError(requestErrorMessage(
                requestError,
                "No pudimos reenviar el código.",
                {
                    401: "Tu sesión venció. Inicia sesión nuevamente para reenviar el código.",
                    404: "No encontramos tu cuenta. Inicia sesión nuevamente.",
                    429: "Solicitaste varios códigos. Espera un momento antes de pedir otro.",
                },
            ))
        } finally {
            setIsResending(false)
        }
    }

    return (
        <div className="calm-panel w-full max-w-105 px-7 py-8 sm:px-9 sm:py-9.5">
            <div className="flex flex-col items-center text-center">
                <div className="mb-5.5 grid h-13 w-13 place-items-center rounded-xl border border-border bg-card text-primary">
                    {isVerified ? (
                        <svg
                            aria-hidden="true"
                            viewBox="0 0 24 24"
                            className="h-6.25 w-6.25"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                        >
                            <path d="m5 12 4 4L19 6" />
                        </svg>
                    ) : (
                        <svg
                            aria-hidden="true"
                            viewBox="0 0 24 24"
                            className="h-6.25 w-6.25"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.6"
                        >
                            <rect x="3" y="5" width="18" height="14" rx="3" />
                            <path d="m4 7 8 6 8-6" />
                        </svg>
                    )}
                </div>

                <h1 className="text-[26px] font-semibold text-text-primary">
                    {isVerified ? "Email verificado" : "Verifica tu email"}
                </h1>
                <p className="mt-2 max-w-82.5 text-[13px] leading-5 text-text-secondary">
                    {isVerified
                        ? "Tu cuenta está lista. Ya puedes continuar a CleanMind."
                        : "Ingresa el código de seis dígitos que enviamos a tu correo."}
                </p>
                {!isVerified && email && (
                    <p className="mt-1.5 max-w-full truncate text-[13px] font-medium text-text-primary">
                        {email}
                    </p>
                )}

                {!isVerified ? (
                    <form
                        className="mt-6.5 flex w-full flex-col"
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
                            className="h-14.5 w-full rounded-[10px] border border-border bg-card/45 px-4 text-center text-[22px] font-semibold tracking-[6px] text-text-primary outline-none transition-[border-color,box-shadow] duration-150 focus:border-primary focus:ring-[3px] focus:ring-primary/10 disabled:opacity-50"
                        />

                        {error && (
                            <p
                                role="alert"
                                className="mt-3 text-[12px] leading-4.5 text-error"
                            >
                                {error}
                            </p>
                        )}
                        {message && (
                            <p
                                role="status"
                                className="mt-3 text-[12px] leading-4.5 text-success"
                            >
                                {message}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={isPending || isResending}
                            className="mt-4 h-11.5 rounded-[10px] border border-primary bg-primary text-[13px] font-semibold text-text-primary transition-[background-color,opacity] duration-150 hover:bg-primary/90 disabled:cursor-wait disabled:opacity-50"
                        >
                            {isPending ? "Verificando…" : "Verificar email"}
                        </button>
                        <button
                            type="button"
                            disabled={isPending || isResending}
                            onClick={resendCode}
                            className="mt-2.5 min-h-10 rounded-lg px-3 text-[12px] text-primary transition-colors duration-150 hover:bg-primary/8 disabled:cursor-wait disabled:opacity-50"
                        >
                            {isResending
                                ? "Reenviando…"
                                : "No recibí el código · Reenviar"}
                        </button>
                    </form>
                ) : (
                    <Link
                        href="/dashboard"
                        className="mt-6.5 flex h-11.5 w-full items-center justify-center rounded-[10px] border border-primary bg-primary text-[13px] font-semibold text-text-primary hover:bg-primary/90"
                    >
                        Ir a mi espacio
                    </Link>
                )}

                <Link
                    href="/login"
                    className="mt-5 text-[12px] text-text-secondary transition-colors duration-150 hover:text-text-primary"
                >
                    Volver al inicio de sesión
                </Link>
            </div>
        </div>
    )
}
