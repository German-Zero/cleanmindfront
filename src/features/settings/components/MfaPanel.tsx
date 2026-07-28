"use client"

import { useState, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import PasswordField from "@/components/forms/PasswordField"
import IconPhone from "@/components/ui/icons/IconPhone"
import IconShield from "@/components/ui/icons/IconShield"
import {
    isMfaCodeValid,
    normalizeMfaCode,
} from "@/features/auth/mfa-code"
import { useCurrentUser } from "@/features/auth/CurrentUserProvider"
import { authService } from "@/features/auth/services/auth.service"
import { ApiError } from "@/lib/api"
import { accountSecurityService } from "../services/account-security.service"
import type { MfaSetup } from "../types"
import SecurityPanelShell from "./SecurityPanelShell"

type MfaStep =
    | "method"
    | "reauthenticate"
    | "verify"
    | "recovery"
    | "disable-reauthenticate"
    | "disable-verify"
    | "disable"

interface MfaPanelProps {
    enabled: boolean
    onBack: () => void
    onClose: () => void
    onCloseLockChange: (locked: boolean) => void
    onRequestPassword: () => void
}

const stepCopy: Record<
    MfaStep,
    { title: string; description: string }
> = {
    method: {
        title: "Activar la verificación en dos pasos",
        description:
            "Confirma que eres tú mediante un código de verificación.",
    },
    reauthenticate: {
        title: "Confirma tu identidad",
        description:
            "Vuelve a ingresar tu contraseña para continuar con la configuración.",
    },
    verify: {
        title: "Configura tu autenticador",
        description:
            "Agrega CleanMind a tu aplicación y confirma el código de seis dígitos.",
    },
    recovery: {
        title: "Guarda tus códigos de recuperación",
        description:
            "Cada código puede usarse una sola vez si pierdes acceso a tu autenticador.",
    },
    "disable-reauthenticate": {
        title: "Confirma tu acceso local",
        description:
            "Verifica tu contraseña antes de desactivar la protección.",
    },
    "disable-verify": {
        title: "Confirma tu sesión",
        description:
            "Ingresa un código para completar la reautenticación.",
    },
    disable: {
        title: "Desactivar verificación",
        description:
            "Usa un código nuevo para desactivar la verificación en dos pasos.",
    },
}

function mfaErrorMessage(
    error: unknown,
    fallback = "No se pudo completar la configuración.",
): string {
    if (error instanceof ApiError && error.status === 403) {
        return "Debes verificar tu email antes de activar esta función."
    }

    if (error instanceof ApiError && error.status === 409) {
        return "La verificación ya está activa o la configuración no fue iniciada."
    }

    if (error instanceof ApiError && error.status === 401) {
        return "El código o las credenciales ingresadas no son válidos."
    }

    return error instanceof Error ? error.message : fallback
}

export default function MfaPanel({
    enabled,
    onBack,
    onClose,
    onCloseLockChange,
    onRequestPassword,
}: MfaPanelProps) {
    const router = useRouter()
    const { user } = useCurrentUser()
    const [step, setStep] = useState<MfaStep>(
        enabled ? "disable-reauthenticate" : "method",
    )
    const [setup, setSetup] = useState<MfaSetup | null>(null)
    const email = user?.email ?? ""
    const [challengeToken, setChallengeToken] = useState<string | null>(
        null,
    )
    const [recoveryCodes, setRecoveryCodes] = useState<string[]>([])
    const [hasSavedCodes, setHasSavedCodes] = useState(false)
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [message, setMessage] = useState<string | null>(null)

    const showReauthentication = () => {
        setError(null)

        if (!email) {
            setError("No se pudo verificar tu sesión actual.")
            return
        }

        setStep("reauthenticate")
    }

    const handleReauthentication = async (
        event: FormEvent<HTMLFormElement>,
    ) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const password = String(formData.get("password") ?? "")

        setIsPending(true)
        setError(null)

        try {
            const login = await accountSecurityService.reauthenticate({
                email,
                password,
            })

            if (enabled) {
                if (!login.mfaRequired) {
                    setError(
                        "La verificación ya no está activa. Vuelve a abrir Configuración.",
                    )
                    return
                }

                setChallengeToken(login.challengeToken)
                setStep("disable-verify")
                return
            }

            if (login.mfaRequired) {
                router.replace("/login")
                router.refresh()
                return
            }

            const nextSetup = await accountSecurityService.setupMfa()
            setSetup(nextSetup)
            setStep("verify")
        } catch (requestError: unknown) {
            setError(
                mfaErrorMessage(
                    requestError,
                    "No se pudo confirmar tu identidad.",
                ),
            )
        } finally {
            setIsPending(false)
        }
    }

    const handleDisableSessionVerification = async (
        event: FormEvent<HTMLFormElement>,
    ) => {
        event.preventDefault()
        if (!challengeToken) return

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
        setMessage(null)

        try {
            await authService.verifyMfa({ challengeToken, code })
            setChallengeToken(null)
            setMessage(
                "Sesión confirmada. Espera el próximo código de tu autenticador antes de continuar.",
            )
            setStep("disable")
        } catch (requestError: unknown) {
            setError(
                mfaErrorMessage(
                    requestError,
                    "No se pudo confirmar tu sesión.",
                ),
            )
        } finally {
            setIsPending(false)
        }
    }

    const handleEnable = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const code = normalizeMfaCode(
            String(formData.get("code") ?? ""),
        )

        if (!/^\d{6}$/.test(code)) {
            setError("Ingresa el código de seis dígitos de tu autenticador.")
            return
        }

        setIsPending(true)
        setError(null)

        try {
            const result = await accountSecurityService.enableMfa({ code })
            onCloseLockChange(true)
            setRecoveryCodes(result.recoveryCodes)
            setStep("recovery")
        } catch (requestError: unknown) {
            setError(mfaErrorMessage(requestError))
        } finally {
            setIsPending(false)
        }
    }

    const handleDisable = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
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
            await accountSecurityService.disableMfa({ code })
            router.replace("/login")
            router.refresh()
        } catch (requestError: unknown) {
            setError(mfaErrorMessage(requestError))
            setIsPending(false)
        }
    }

    const copyText = async (value: string, successMessage: string) => {
        try {
            await navigator.clipboard.writeText(value)
            setMessage(successMessage)
        } catch {
            setMessage("No se pudo copiar. Selecciona el texto manualmente.")
        }
    }

    const finishEnrollment = () => {
        onCloseLockChange(false)
        router.replace("/login")
        router.refresh()
    }

    const goBack = () => {
        setError(null)
        setMessage(null)

        if (
            step === "method" ||
            step === "disable-reauthenticate" ||
            step === "disable"
        ) {
            onBack()
        } else if (step === "disable-verify") {
            setChallengeToken(null)
            setStep("disable-reauthenticate")
        } else {
            setStep("method")
        }
    }

    const { title, description } = stepCopy[step]

    return (
        <SecurityPanelShell
            title={title}
            description={description}
            onBack={step === "recovery" ? undefined : goBack}
            onClose={onClose}
            canClose={step !== "recovery" || hasSavedCodes}
        >
            {step === "method" && (
                <div className="flex flex-col gap-3.5">
                    <button
                        type="button"
                        disabled={isPending}
                        onClick={showReauthentication}
                        className="flex min-h-18 items-center gap-2.5 rounded-xl border border-border bg-linear-to-r from-primary/50 via-accent/50 to-secondary/50 p-2.5 text-left disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <IconShield />
                        <span>
                            <span className="block text-[13px] text-text-primary">
                                Código de autenticación
                            </span>
                            <span className="block text-[10px] text-text-secondary">
                                Usa una aplicación como Google Authenticator,
                                Microsoft Authenticator o Authy.
                            </span>
                        </span>
                    </button>
                    <button
                        type="button"
                        disabled
                        aria-describedby="mfa-phone-unavailable"
                        className="flex min-h-18 items-center gap-2.5 rounded-xl border border-border bg-card/50 p-2.5 text-left opacity-50"
                    >
                        <IconPhone />
                        <span>
                            <span className="block text-[13px] text-text-primary">
                                Envíame un código
                            </span>
                            <span
                                id="mfa-phone-unavailable"
                                className="block text-[10px] text-text-secondary"
                            >
                                Disponible próximamente.
                            </span>
                        </span>
                    </button>
                </div>
            )}

            {(step === "reauthenticate" ||
                step === "disable-reauthenticate") && (
                <form
                    onSubmit={handleReauthentication}
                    className="flex flex-col gap-3.75"
                >
                    <p className="text-center text-xs text-text-secondary">
                        {email}
                    </p>
                    <PasswordField
                        id="mfa-current-password"
                        name="password"
                        label="Tu contraseña"
                        placeholder="Tu contraseña"
                        autoComplete="current-password"
                        minLength={8}
                        disabled={isPending}
                    />
                    <button
                        type="submit"
                        disabled={isPending || !email}
                        className="h-11.75 rounded-sm border border-border bg-linear-to-r from-primary via-accent to-secondary text-sm text-text-primary disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {isPending ? "Verificando…" : "Siguiente"}
                    </button>
                    <button
                        type="button"
                        disabled={isPending}
                        onClick={onRequestPassword}
                        className="min-h-11 rounded-sm border border-border bg-card px-3 py-3 text-center text-xs text-text-primary hover:bg-card-hover disabled:opacity-50"
                    >
                        ¿Ingresas con Google? Crea una contraseña local
                    </button>
                </form>
            )}

            {step === "verify" && setup && (
                <form
                    onSubmit={handleEnable}
                    className="flex flex-col gap-4"
                >
                    <a
                        href={setup.otpauthUri}
                        className="rounded-sm border border-border bg-card px-3 py-2 text-center text-xs text-text-primary hover:bg-card-hover"
                    >
                        Abrir en mi aplicación de autenticación
                    </a>
                    <div className="rounded-lg border border-border bg-card/60 p-3">
                        <p className="mb-1 text-[10px] text-text-secondary">
                            Clave para ingreso manual
                        </p>
                        <code className="block break-all text-xs">
                            {setup.secret}
                        </code>
                        <button
                            type="button"
                            onClick={() =>
                                copyText(
                                    setup.secret,
                                    "Clave copiada.",
                                )
                            }
                            className="mt-2 min-h-10 rounded-sm border border-border px-3 text-xs"
                        >
                            Copiar clave
                        </button>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="mfa-enable-code" className="text-sm">
                            Código de seis dígitos
                        </label>
                        <input
                            id="mfa-enable-code"
                            name="code"
                            required
                            autoComplete="one-time-code"
                            inputMode="numeric"
                            pattern="[0-9]{6}"
                            maxLength={6}
                            disabled={isPending}
                            className="w-full rounded-sm border border-border bg-card/70 px-3.75 py-3.75 text-base tracking-[0.3em] text-text-primary"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isPending}
                        className="h-11.75 rounded-sm border border-border bg-linear-to-r from-primary via-accent to-secondary text-sm text-text-primary disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {isPending ? "Activando…" : "Activar verificación"}
                    </button>
                </form>
            )}

            {step === "recovery" && (
                <div className="flex flex-col gap-4">
                    <ul className="grid grid-cols-1 gap-2 rounded-lg border border-border bg-card/60 p-3 sm:grid-cols-2">
                        {recoveryCodes.map((code) => (
                            <li
                                key={code}
                                className="font-mono text-xs text-text-primary"
                            >
                                {code}
                            </li>
                        ))}
                    </ul>
                    <button
                        type="button"
                        onClick={() =>
                            copyText(
                                recoveryCodes.join("\n"),
                                "Códigos copiados.",
                            )
                        }
                        className="min-h-11 rounded-sm border border-border bg-card px-3 text-xs hover:bg-card-hover"
                    >
                        Copiar todos los códigos
                    </button>
                    <label className="flex items-start gap-2 text-xs text-text-secondary">
                        <input
                            type="checkbox"
                            checked={hasSavedCodes}
                            onChange={(event) => {
                                const isSaved = event.target.checked
                                setHasSavedCodes(isSaved)
                                onCloseLockChange(!isSaved)
                            }}
                            className="themed-checkbox mt-0.5"
                        />
                        Guardé estos códigos en un lugar seguro.
                    </label>
                    <button
                        type="button"
                        disabled={!hasSavedCodes}
                        onClick={finishEnrollment}
                        className="h-11.75 rounded-sm border border-border bg-linear-to-r from-primary via-accent to-secondary text-sm text-text-primary disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Ir a iniciar sesión
                    </button>
                </div>
            )}

            {step === "disable-verify" && (
                <form
                    onSubmit={handleDisableSessionVerification}
                    className="flex flex-col gap-4"
                >
                    <div className="flex flex-col gap-1">
                        <label
                            htmlFor="mfa-disable-session-code"
                            className="text-sm"
                        >
                            Código de autenticación o recuperación
                        </label>
                        <input
                            id="mfa-disable-session-code"
                            name="code"
                            required
                            autoFocus
                            autoComplete="one-time-code"
                            disabled={isPending}
                            className="w-full rounded-sm border border-border bg-card/70 px-3.75 py-3.75 text-sm text-text-primary"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isPending}
                        className="h-11.75 rounded-sm border border-border bg-linear-to-r from-primary via-accent to-secondary text-sm text-text-primary disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {isPending ? "Verificando…" : "Confirmar sesión"}
                    </button>
                </form>
            )}

            {step === "disable" && (
                <form
                    onSubmit={handleDisable}
                    className="flex flex-col gap-4"
                >
                    <div className="flex flex-col gap-1">
                        <label htmlFor="mfa-disable-code" className="text-sm">
                            Código de autenticación o recuperación
                        </label>
                        <input
                            id="mfa-disable-code"
                            name="code"
                            required
                            autoComplete="one-time-code"
                            disabled={isPending}
                            className="w-full rounded-sm border border-border bg-card/70 px-3.75 py-3.75 text-sm text-text-primary"
                        />
                    </div>
                    <p className="rounded-lg border border-warning/50 bg-warning/10 p-3 text-[11px] leading-5">
                        Al desactivarla se cerrarán todas tus sesiones. Usa
                        el próximo código de tu autenticador o un código de
                        recuperación distinto.
                    </p>
                    <button
                        type="submit"
                        disabled={isPending}
                        className="h-11.75 rounded-sm border border-error bg-error/40 text-sm text-text-primary disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {isPending
                            ? "Desactivando…"
                            : "Desactivar verificación"}
                    </button>
                </form>
            )}

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
        </SecurityPanelShell>
    )
}
