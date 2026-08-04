"use client"

import { useState, type FormEvent } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import IconGoogle from "@/components/forms/IconGoogle"
import PasswordField from "@/components/forms/PasswordField"
import { requestErrorMessage } from "@/lib/api"
import AuthWelcome from "./AuthWelcome"
import { isMfaCodeValid, normalizeMfaCode } from "../mfa-code"
import { authService } from "../services/auth.service"
import type { MfaRequiredResponse } from "../types"

interface LoginFormProps {
    initialChallenge?: MfaRequiredResponse | null
}

export default function LoginForm({
    initialChallenge = null,
}: LoginFormProps) {
    const router = useRouter()
    const [challenge, setChallenge] =
        useState<MfaRequiredResponse | null>(initialChallenge)
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [welcomeName, setWelcomeName] = useState<string | null>(null)

    const finishLogin = (
        name: string,
        requiresTermsAcceptance: boolean,
    ) => {
        setWelcomeName(name)
        const delay = window.matchMedia("(prefers-reduced-motion: reduce)")
            .matches
            ? 0
            : 1100

        window.setTimeout(() => {
            router.replace(
                requiresTermsAcceptance
                    ? "/terms"
                    : "/dashboard/calendar",
            )
            router.refresh()
        }, delay)
    }

    const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)

        setIsPending(true)
        setError(null)

        try {
            const response = await authService.login({
                email: String(formData.get("email") ?? ""),
                password: String(formData.get("password") ?? ""),
            })

            if (response.mfaRequired) {
                setChallenge(response)
                return
            }

            finishLogin(
                response.user.name,
                response.user.requiresTermsAcceptance,
            )
        } catch (requestError: unknown) {
            setError(
                requestErrorMessage(
                    requestError,
                    "No pudimos iniciar sesión.",
                    {
                        400: "Revisa el email y la contraseña.",
                        401: "El email o la contraseña son incorrectos.",
                        429: "Demasiados intentos. Espera un momento y vuelve a probar.",
                    },
                ),
            )
        } finally {
            setIsPending(false)
        }
    }

    const handleMfaVerification = async (
        event: FormEvent<HTMLFormElement>,
    ) => {
        event.preventDefault()
        if (!challenge) return

        const formData = new FormData(event.currentTarget)
        const code = normalizeMfaCode(
            String(formData.get("code") ?? ""),
        )

        if (!isMfaCodeValid(code)) {
            setError(
                "Ingresa un código de seis dígitos o un código de recuperación válido.",
            )
            return
        }

        setIsPending(true)
        setError(null)

        try {
            const response = await authService.verifyMfa({
                challengeToken: challenge.challengeToken,
                code,
            })
            finishLogin(
                response.user.name,
                response.user.requiresTermsAcceptance,
            )
        } catch (requestError: unknown) {
            setError(
                requestErrorMessage(
                    requestError,
                    "No pudimos verificar el código.",
                    {
                        400: "Ingresa un código válido.",
                        401: "El código es incorrecto o la verificación venció.",
                        429: "Demasiados intentos. Espera un momento y vuelve a probar.",
                    },
                ),
            )
        } finally {
            setIsPending(false)
        }
    }

    if (welcomeName) {
        return <AuthWelcome mode="login" name={welcomeName} />
    }

    if (challenge) {
        return (
            <div className="flex h-auto w-full max-w-100 items-center justify-center">
                <div className="flex w-full flex-col gap-6 px-0 py-8 sm:gap-7.5 sm:px-6.25 sm:py-12.5">
                    <button
                        type="button"
                        disabled={isPending}
                        onClick={() => {
                            setChallenge(null)
                            setError(null)
                        }}
                        className="min-h-11 self-start rounded-[10px] px-3 text-[11px] text-text-secondary hover:bg-card hover:text-text-primary disabled:opacity-50"
                    >
                        ← Volver
                    </button>
                    <div className="flex flex-col items-center gap-2.5 text-center">
                        <h2 className="text-[24px] font-semibold text-text-primary">
                            Verificación en dos pasos
                        </h2>
                        <p className="max-w-80 text-[11px] font-semibold tracking-wider text-text-secondary">
                            Ingresa el código de tu autenticador o uno de tus
                            códigos de recuperación. El desafío vence en{" "}
                            {challenge.expiresIn} segundos.
                        </p>
                    </div>
                    <form
                        onSubmit={handleMfaVerification}
                        className="flex flex-col gap-3.75"
                    >
                        <div className="flex flex-col gap-1">
                            <label
                                htmlFor="login-mfa-code"
                                className="text-sm text-text-primary"
                            >
                                Código de verificación
                            </label>
                            <input
                                id="login-mfa-code"
                                name="code"
                                required
                                autoFocus
                                autoComplete="one-time-code"
                                autoCapitalize="characters"
                                maxLength={22}
                                disabled={isPending}
                                className="calm-input text-[13px]"
                            />
                        </div>
                        {error && (
                            <p role="alert" className="calm-feedback text-error">
                                {error}
                            </p>
                        )}
                        <button
                            type="submit"
                            disabled={isPending}
                            className="calm-button disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {isPending ? "Verificando…" : "Verificar código"}
                        </button>
                    </form>
                </div>
            </div>
        )
    }

    return (
        <div className="flex h-auto w-full max-w-100 items-center justify-center">
            <div className="flex w-full flex-col gap-6 px-0 py-8 sm:gap-7.5 sm:px-6.25 sm:py-12.5">
                <form
                    className="flex flex-col gap-3.75"
                    onSubmit={handleLogin}
                >
                    <div className="flex flex-col gap-1">
                        <label
                            htmlFor="email"
                            className="text-[14px] text-text-primary"
                        >
                            Email
                        </label>
                        <input
                            required
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            disabled={isPending}
                            placeholder="Email"
                            className="calm-input pr-10 text-[13px]"
                        />
                    </div>
                    <PasswordField
                        id="password"
                        name="password"
                        label="Contraseña"
                        placeholder="Contraseña"
                        autoComplete="current-password"
                        minLength={8}
                        disabled={isPending}
                    />
                    <div className="flex justify-end">
                        <Link
                            href="/forgot-password"
                            className="min-h-11 py-3 text-xs text-primary sm:text-[10px]"
                        >
                            ¿Olvidaste tu contraseña?
                        </Link>
                    </div>
                    {error && (
                        <p role="alert" className="calm-feedback text-error">
                            {error}
                        </p>
                    )}
                    <button
                        type="submit"
                        disabled={isPending}
                        className="calm-button disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {isPending ? "Ingresando…" : "Iniciar Sesión"}
                    </button>
                </form>
                <div className="flex items-center">
                    <div className="grow border-t border-text-secondary" />
                    <span className="mx-3 shrink text-center text-[10px] text-text-primary sm:mx-4">
                        o continúa con
                    </span>
                    <div className="grow border-t border-text-secondary" />
                </div>
                <a
                    href="/api/auth/google"
                    className="calm-button-secondary flex min-h-11 items-center justify-center gap-1.25 text-[13px]"
                >
                    <IconGoogle />
                    Google
                </a>
                <div className="flex flex-wrap justify-center gap-x-0.5 gap-y-1 text-center">
                    <span className="text-[13px] text-text-primary">
                        ¿No tienes una cuenta?
                    </span>
                    <Link
                        href="/register"
                        className="text-[13px] text-primary"
                    >
                        Regístrate
                    </Link>
                </div>
            </div>
        </div>
    )
}
