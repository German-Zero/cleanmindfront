"use client"

import { useEffect, useState } from "react"
import { requestErrorMessage } from "@/lib/api"
import { accountSecurityService } from "../services/account-security.service"
import type { MfaStatus } from "../types"

export function useMfaStatus() {
    const [status, setStatus] = useState<MfaStatus | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        let isCurrent = true

        accountSecurityService
            .getMfaStatus()
            .then((nextStatus) => {
                if (isCurrent) setStatus(nextStatus)
            })
            .catch((requestError: unknown) => {
                if (!isCurrent) return
                setError(requestErrorMessage(
                    requestError,
                    "No pudimos consultar la verificación en dos pasos.",
                    {
                        401: "Tu sesión venció. Inicia sesión nuevamente.",
                    },
                ))
            })
            .finally(() => {
                if (isCurrent) setIsLoading(false)
            })

        return () => {
            isCurrent = false
        }
    }, [])

    return { status, isLoading, error }
}
