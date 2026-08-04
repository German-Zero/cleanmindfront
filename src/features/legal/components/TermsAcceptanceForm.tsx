'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { authService } from '@/features/auth/services/auth.service'
import { requestErrorMessage } from '@/lib/api'
import { termsService } from '../services/terms.service'
import type { TermsStatus } from '../types'

export default function TermsAcceptanceForm() {
    const router = useRouter()
    const [terms, setTerms] = useState<TermsStatus | null>(null)
    const [accepted, setAccepted] = useState(false)
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        let isCurrent = true

        void termsService
            .getCurrent()
            .then((status) => {
                if (!isCurrent) return

                if (status.accepted) {
                    router.replace('/dashboard/calendar')
                    router.refresh()
                    return
                }

                setTerms(status)
            })
            .catch((requestError: unknown) => {
                if (!isCurrent) return
                setError(requestErrorMessage(
                    requestError,
                    'No pudimos cargar los términos vigentes.',
                    { 401: 'Tu sesión venció. Inicia sesión nuevamente.' },
                ))
            })

        return () => {
            isCurrent = false
        }
    }, [router])

    const acceptTerms = async () => {
        if (!accepted || isPending) return

        setIsPending(true)
        setError(null)

        try {
            await termsService.acceptCurrent()
            router.replace('/dashboard/calendar')
            router.refresh()
        } catch (requestError: unknown) {
            setError(requestErrorMessage(
                requestError,
                'No pudimos guardar tu aceptación.',
                {
                    401: 'Tu sesión venció. Inicia sesión nuevamente.',
                    503: 'Los términos no están disponibles por el momento.',
                },
            ))
            setIsPending(false)
        }
    }

    const logout = async () => {
        if (isPending) return

        setIsPending(true)
        try {
            await authService.logout()
        } finally {
            router.replace('/login')
            router.refresh()
        }
    }

    if (!terms && !error) {
        return (
            <p role="status" className="text-center text-[13px] text-text-secondary">
                Cargando condiciones vigentes…
            </p>
        )
    }

    return (
        <div className="calm-panel mx-auto w-full max-w-130 px-5.5 py-7 sm:px-8.5 sm:py-9">
            <div className="flex flex-col gap-2.5">
                <span className="calm-eyebrow self-start">Antes de continuar</span>
                <h1 className="text-[27px] leading-8.5 font-semibold text-text-primary">
                    Revisa las condiciones de CleanMind
                </h1>
                <p className="text-[13px] leading-5 text-text-secondary">
                    Necesitamos tu aceptación para terminar de preparar tu cuenta.
                    Si las condiciones cambian, volveremos a mostrártelas.
                </p>
            </div>

            {terms && (
                <div className="calm-card mt-6 px-4 py-3.75">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                        <p className="text-[13px] font-medium text-text-primary">
                            {terms.title}
                        </p>
                        <span className="rounded-full border border-border px-2.25 py-1 text-[10px] text-text-secondary">
                            {terms.version}
                        </span>
                    </div>
                    <p className="mt-1.75 text-[11px] text-text-secondary">
                        Vigente desde el{' '}
                        {new Intl.DateTimeFormat('es-AR', {
                            dateStyle: 'long',
                        }).format(new Date(terms.effectiveAt))}
                    </p>
                    <Link
                        href={terms.documentUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-3.25 inline-flex min-h-11 items-center text-[12px] font-medium text-accent hover:underline"
                    >
                        Leer el documento completo
                    </Link>
                </div>
            )}

            {terms && (
                <label className="mt-4.5 flex cursor-pointer items-start gap-2.75 rounded-[10px] border border-border/70 bg-card/35 px-3.25 py-3">
                    <input
                        type="checkbox"
                        checked={accepted}
                        disabled={isPending}
                        onChange={(event) => setAccepted(event.target.checked)}
                        className="themed-checkbox mt-px shrink-0"
                    />
                    <span className="text-[12px] leading-4.5 text-text-secondary">
                        Confirmo que leí y acepto esta versión de los términos,
                        condiciones y política de privacidad.
                    </span>
                </label>
            )}

            {error && (
                <p role="alert" className="calm-feedback mt-4 text-error">
                    {error}
                </p>
            )}

            <div className="mt-5.5 flex flex-col gap-2.25 sm:flex-row-reverse">
                <button
                    type="button"
                    disabled={!terms || !accepted || isPending}
                    onClick={acceptTerms}
                    className="calm-button flex-1 disabled:cursor-not-allowed disabled:opacity-45"
                >
                    {isPending ? 'Guardando…' : 'Aceptar y continuar'}
                </button>
                <button
                    type="button"
                    disabled={isPending}
                    onClick={logout}
                    className="calm-button-secondary flex-1 disabled:opacity-45"
                >
                    Salir
                </button>
            </div>
        </div>
    )
}
