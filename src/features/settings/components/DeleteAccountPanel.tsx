"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { requestErrorMessage } from "@/lib/api"
import { accountSecurityService } from "../services/account-security.service"
import SecurityPanelShell from "./SecurityPanelShell"

interface DeleteAccountPanelProps {
    onBack: () => void
    onClose: () => void
    onCloseLockChange: (locked: boolean) => void
}

export default function DeleteAccountPanel({
    onBack,
    onClose,
    onCloseLockChange,
}: DeleteAccountPanelProps) {
    const router = useRouter()
    const [isConfirmed, setIsConfirmed] = useState(false)
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const deleteAccount = async () => {
        if (!isConfirmed || isPending) return

        setIsPending(true)
        setError(null)
        onCloseLockChange(true)

        try {
            await accountSecurityService.deleteAccount()
            router.replace("/login")
            router.refresh()
        } catch (requestError: unknown) {
            setError(requestErrorMessage(
                requestError,
                "No pudimos eliminar tu cuenta. Inténtalo nuevamente.",
                {
                    401: "Tu sesión venció. Inicia sesión nuevamente.",
                    404: "No encontramos la cuenta que intentas eliminar.",
                },
            ))
        } finally {
            setIsPending(false)
            onCloseLockChange(false)
        }
    }

    return (
        <SecurityPanelShell
            title="Eliminar mi cuenta"
            description="Esta acción elimina de forma permanente tu cuenta y tus espacios de trabajo."
            onBack={isPending ? undefined : onBack}
            onClose={onClose}
            canClose={!isPending}
        >
            <div className="flex flex-col gap-4.5">
                <div className="rounded-[10px] border border-warning/35 bg-warning/8 p-3.5 text-[11px] leading-4.5 text-text-primary">
                    Se eliminarán tus tareas, sesiones Pomodoro, pizarra,
                    preferencias y conexiones. Esta acción no se puede
                    deshacer.
                </div>

                <label className="flex cursor-pointer items-start gap-2.5 text-[11px] leading-4.5 text-text-secondary">
                    <input
                        type="checkbox"
                        checked={isConfirmed}
                        disabled={isPending}
                        onChange={(event) =>
                            setIsConfirmed(event.target.checked)
                        }
                        className="themed-checkbox mt-px"
                    />
                    Entiendo que mi cuenta y todos sus datos se eliminarán
                    de forma permanente.
                </label>

                {error && (
                    <p role="alert" className="calm-feedback text-error">
                        {error}
                    </p>
                )}

                <button
                    type="button"
                    aria-busy={isPending}
                    disabled={!isConfirmed || isPending}
                    onClick={() => void deleteAccount()}
                    className="
                        min-h-11 rounded-[10px] border border-error/45
                        bg-error/10 px-4 text-[13px] font-semibold
                        text-error hover:bg-error/16
                        disabled:cursor-not-allowed disabled:opacity-45
                    "
                >
                    {isPending ? "Eliminando cuenta…" : "Eliminar mi cuenta"}
                </button>
            </div>
        </SecurityPanelShell>
    )
}
