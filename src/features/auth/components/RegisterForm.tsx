"use client"

import { useState, type FormEvent } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import PasswordField from "@/components/forms/PasswordField"
import { ApiError } from "@/lib/api"
import { validatePasswordConfirmation } from "../password-validation"
import { authService } from "../services/auth.service"

export default function RegisterForm() {
    const router = useRouter()
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState<string | null>(null)

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

        setIsPending(true)
        setError(null)

        try {
            await authService.register({ name, email, password })
            router.replace(
                `/verify-email?email=${encodeURIComponent(email)}`,
            )
        } catch (requestError: unknown) {
            setError(
                requestError instanceof ApiError &&
                    requestError.status === 409
                    ? "Ya existe una cuenta con ese email."
                    : requestError instanceof Error
                      ? requestError.message
                      : "No pudimos crear tu cuenta.",
            )
        } finally {
            setIsPending(false)
        }
    }

    return (
        <div className="flex h-auto w-full max-w-100 items-center justify-center">
            <div className="flex w-full flex-col gap-6 px-0 py-8 sm:gap-7.5 sm:px-6.25 sm:py-12.5">
                <form
                    className="flex flex-col gap-3.75"
                    onSubmit={handleSubmit}
                >
                    <div className="flex flex-col gap-1">
                        <label
                            htmlFor="register-name"
                            className="text-[14px] text-text-primary"
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
                            className="w-full rounded-sm border border-border bg-card/70 py-3.75 pr-10 pl-3.75 text-base text-text-primary placeholder:text-base placeholder:text-text-secondary disabled:opacity-50 sm:text-[13px] sm:placeholder:text-[13px]"
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label
                            htmlFor="register-email"
                            className="text-[14px] text-text-primary"
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
                            className="w-full rounded-sm border border-border bg-card/70 py-3.75 pr-10 pl-3.75 text-base text-text-primary placeholder:text-base placeholder:text-text-secondary disabled:opacity-50 sm:text-[13px] sm:placeholder:text-[13px]"
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
                        {isPending ? "Creando cuenta…" : "Registrarse"}
                    </button>
                </form>
                <div className="flex flex-wrap justify-center gap-x-0.5 gap-y-1 text-center">
                    <span className="text-[13px] text-text-primary">
                        ¿Ya tienes una cuenta?
                    </span>
                    <Link href="/login" className="text-[13px] text-primary">
                        Inicia Sesión
                    </Link>
                </div>
            </div>
        </div>
    )
}
