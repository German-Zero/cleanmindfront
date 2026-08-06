"use client"

import { useEffect, useState, type FormEvent } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import PasswordField from "@/components/forms/PasswordField"
import { requestErrorMessage } from "@/lib/api"
import AuthWelcome from "./AuthWelcome"
import { validatePasswordConfirmation } from "../password-validation"
import { authService } from "../services/auth.service"
import type { RegistrationStatus } from "../types"

export default function RegisterForm() {
    const router = useRouter()
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [welcomeName, setWelcomeName] = useState<string | null>(null)
    const [registrationStatus, setRegistrationStatus] =
        useState<RegistrationStatus | null>(null)
    const [registrationStatusError, setRegistrationStatusError] =
        useState(false)

    useEffect(() => {
        let cancelled = false

        authService.getRegistrationStatus()
            .then((status) => {
                if (!cancelled) setRegistrationStatus(status)
            })
            .catch(() => {
                if (!cancelled) setRegistrationStatusError(true)
            })

        return () => {
            cancelled = true
        }
    }, [])

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const name = String(formData.get("name") ?? "").trim()
        const email = String(formData.get("email") ?? "")
            .trim()
            .toLowerCase()
        const password = String(formData.get("password") ?? "")
        const confirmPassword = String(
            formData.get("confirmPassword") ?? "",
        )
        const acceptedTerms = formData.get("acceptedTerms") === "on"
        const validationError = validatePasswordConfirmation(
            password,
            confirmPassword,
        )

        if (name.length < 2) {
            setError("Ingresa tu nombre completo.")
            return
        }

        if (validationError) {
            setError(validationError)
            return
        }

        if (!acceptedTerms) {
            setError(
                "Debes aceptar las condiciones de participación en la beta.",
            )
            return
        }

        setIsPending(true)
        setError(null)

        try {
            const response = await authService.register({
                name,
                email,
                password,
                acceptedTerms,
            })
            setWelcomeName(response.user.name)
            const delay = window.matchMedia(
                "(prefers-reduced-motion: reduce)",
            ).matches
                ? 0
                : 1100

            window.setTimeout(() => {
                router.replace(
                    `/verify-email?email=${encodeURIComponent(email)}`,
                )
            }, delay)
        } catch (requestError: unknown) {
            setError(requestErrorMessage(
                requestError,
                "No pudimos crear tu cuenta.",
                {
                    400: "Revisa los datos y confirma la aceptación del aviso de la beta.",
                    403: "El registro está disponible únicamente para testers autorizados y mientras queden cupos.",
                    409: "Ya existe una cuenta con este email.",
                    429: "Creaste varias cuentas en poco tiempo. Espera un momento.",
                },
            ))
        } finally {
            setIsPending(false)
        }
    }

    if (welcomeName) {
        return <AuthWelcome mode="register" name={welcomeName} />
    }

    if (!registrationStatus && !registrationStatusError) {
        return (
            <div className="flex w-full max-w-100 flex-col gap-3 text-center">
                <h2 className="text-[24px] font-semibold text-text-primary">
                    Consultando disponibilidad
                </h2>
                <p className="text-[12px] leading-5 text-text-secondary">
                    Estamos comprobando los cupos de la beta privada.
                </p>
            </div>
        )
    }

    if (registrationStatusError || !registrationStatus?.acceptsNewUsers) {
        return (
            <div className="flex w-full max-w-100 flex-col gap-4 text-center">
                <h2 className="text-[24px] font-semibold text-text-primary">
                    Registro cerrado
                </h2>
                <p className="text-[12px] leading-5 text-text-secondary">
                    {registrationStatusError
                        ? "No pudimos comprobar la disponibilidad. Recarga la página para volver a intentarlo."
                        : "El registro de la beta está cerrado por ahora. Las cuentas existentes pueden seguir ingresando."}
                </p>
                <Link
                    href="/login"
                    className="calm-button inline-flex min-h-11 items-center justify-center"
                >
                    Ir al inicio de sesión
                </Link>
            </div>
        )
    }

    return (
        <div className="flex w-full max-w-100 flex-col">
            <div className="mb-7 flex flex-col gap-2">
                <h2 className="text-[26px] font-semibold text-text-primary">
                    Crear una cuenta
                </h2>
                <p className="text-[13px] leading-5 text-text-secondary">
                    Organiza tus tareas y recupera espacio mental.
                </p>
                <p className="text-[11px] leading-4 text-text-secondary">
                    Beta privada para correos autorizados. Quedan{" "}
                    {registrationStatus.remaining} de{" "}
                    {registrationStatus.maxUsers} cupos.
                </p>
            </div>
            <div className="flex w-full flex-col gap-6">
                <form
                    className="flex flex-col gap-4"
                    onSubmit={handleSubmit}
                >
                    <div className="flex flex-col gap-1.5">
                        <label
                            htmlFor="register-name"
                            className="text-[13px] font-medium text-text-primary"
                        >
                            Nombre completo
                        </label>
                        <input
                            required
                            id="register-name"
                            name="name"
                            type="text"
                            autoComplete="name"
                            minLength={2}
                            disabled={isPending}
                            placeholder="Nombre completo"
                            className="h-12 w-full rounded-[10px] border border-border bg-card/45 px-3.5 text-[13px] text-text-primary outline-none transition-[border-color,background-color,box-shadow] duration-150 placeholder:text-[13px] placeholder:text-text-secondary hover:bg-card/60 focus:border-primary focus:ring-[3px] focus:ring-primary/10 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <label
                            htmlFor="register-email"
                            className="text-[13px] font-medium text-text-primary"
                        >
                            Email
                        </label>
                        <input
                            required
                            id="register-email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            disabled={isPending}
                            placeholder="tu@email.com"
                            className="h-12 w-full rounded-[10px] border border-border bg-card/45 px-3.5 text-[13px] text-text-primary outline-none transition-[border-color,background-color,box-shadow] duration-150 placeholder:text-[13px] placeholder:text-text-secondary hover:bg-card/60 focus:border-primary focus:ring-[3px] focus:ring-primary/10 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                    </div>
                    <PasswordField
                        id="register-password"
                        name="password"
                        label="Contraseña"
                        placeholder="Contraseña"
                        autoComplete="new-password"
                        minLength={8}
                        disabled={isPending}
                    />
                    <PasswordField
                        id="register-confirm-password"
                        name="confirmPassword"
                        label="Confirmar Contraseña"
                        placeholder="Confirmar Contraseña"
                        autoComplete="new-password"
                        minLength={8}
                        disabled={isPending}
                    />
                    <div className="rounded-[10px] border border-border/70 bg-card/35 px-3 py-2.5 transition-colors hover:border-primary/35 hover:bg-card/50">
                        <label
                            htmlFor="register-beta-terms"
                            className="group flex cursor-pointer items-start gap-2.5 has-disabled:cursor-not-allowed has-disabled:opacity-60"
                        >
                            <input
                                required
                                id="register-beta-terms"
                                name="acceptedTerms"
                                type="checkbox"
                                disabled={isPending}
                                className="peer absolute h-px w-px overflow-hidden opacity-0"
                            />
                            <span
                                aria-hidden="true"
                                className="mt-px grid h-5 w-5 shrink-0 place-items-center rounded-md border border-border bg-background/65 text-transparent shadow-[inset_0_1px_0_rgb(255_255_255/0.05)] transition-[background-color,border-color,color,box-shadow] peer-checked:border-primary peer-checked:bg-primary peer-checked:text-white peer-focus-visible:ring-[3px] peer-focus-visible:ring-primary/25"
                            >
                                <svg
                                    viewBox="0 0 20 20"
                                    className="h-3.25 w-3.25"
                                    fill="none"
                                    aria-hidden="true"
                                >
                                    <path
                                        d="m4.75 10.25 3.25 3.25 7.25-7.25"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </span>
                            <span className="text-[11px] leading-4.25 text-text-secondary">
                                Confirmo que tengo al menos 16 años y acepto
                                participar en la beta privada.
                            </span>
                        </label>
                        <p className="mt-1.25 pl-7.5 text-[10px] leading-4 text-text-secondary">
                            He leído el{" "}
                            <Link
                                href="/beta"
                                target="_blank"
                                rel="noreferrer"
                                className="font-medium text-accent hover:underline"
                            >
                                aviso de privacidad y participación
                            </Link>
                            .
                        </p>
                    </div>
                    {error && (
                        <p role="alert" className="text-[12px] leading-4.5 text-error">
                            {error}
                        </p>
                    )}
                    <button
                        type="submit"
                        disabled={isPending}
                        className="mt-0.5 h-12 rounded-[10px] border border-primary bg-primary text-[13px] font-semibold text-text-primary transition-[background-color,opacity] duration-150 hover:bg-primary/90 disabled:cursor-wait disabled:opacity-50"
                    >
                        {isPending ? "Creando cuenta…" : "Registrarse"}
                    </button>
                </form>
                <div className="flex flex-wrap justify-center gap-1 text-center">
                    <span className="text-[12px] text-text-secondary">
                        ¿Ya tienes una cuenta?
                    </span>
                    <Link
                        href="/login"
                        className="text-[12px] font-medium text-primary hover:underline"
                    >
                        Inicia Sesión
                    </Link>
                </div>
            </div>
        </div>
    )
}
