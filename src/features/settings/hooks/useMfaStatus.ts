"use client"

import { useEffect, useState } from "react"
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
                setError(
                    requestError instanceof Error
                        ? requestError.message
                        : "No se pudo consultar la verificación en dos pasos.",
                )
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
