"use client"

import { useState, type FormEvent } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import PasswordField from "@/components/forms/PasswordField"
import { requestErrorMessage } from "@/lib/api"
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
            setError(requestErrorMessage(
                requestError,
                "No pudimos crear tu cuenta.",
                {
                    400: "Revisa los datos ingresados.",
                    409: "Ya existe una cuenta con este email.",
                    429: "Creaste varias cuentas en poco tiempo. Espera un momento.",
                },
            ))
        } finally {
            setIsPending(false)
        }
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
