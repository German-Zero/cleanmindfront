"use client"

import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react"
import { requestErrorMessage } from "@/lib/api"
import { settingsService } from "./services/settings.service"
import type { Theme } from "./types"

const defaultTheme: Theme = "LUNAR_MIND"

interface ThemeContextValue {
    theme: Theme
    isLoading: boolean
    pendingTheme: Theme | null
    error: string | null
    selectTheme: (theme: Theme) => Promise<void>
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

function applyTheme(theme: Theme) {
    document.documentElement.dataset.theme = theme
}

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<Theme>(defaultTheme)
    const [isLoading, setIsLoading] = useState(true)
    const [pendingTheme, setPendingTheme] = useState<Theme | null>(null)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        let isCurrent = true

        void settingsService
            .getSettings()
            .then((settings) => {
                if (!isCurrent) return
                setTheme(settings.theme)
                applyTheme(settings.theme)
            })
            .catch((requestError: unknown) => {
                if (!isCurrent) return
                setError(requestErrorMessage(
                    requestError,
                    "No pudimos cargar tu tema.",
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

    const selectTheme = async (nextTheme: Theme) => {
        if (nextTheme === theme || pendingTheme) return

        const previousTheme = theme
        setPendingTheme(nextTheme)
        setError(null)
        setTheme(nextTheme)
        applyTheme(nextTheme)

        try {
            const updated = await settingsService.updateTheme(nextTheme)
            setTheme(updated.theme)
            applyTheme(updated.theme)
        } catch (requestError: unknown) {
            setTheme(previousTheme)
            applyTheme(previousTheme)
            setError(requestErrorMessage(
                requestError,
                "No pudimos guardar el tema.",
                {
                    400: "El tema seleccionado no es válido.",
                    401: "Tu sesión venció. Inicia sesión nuevamente.",
                },
            ))
        } finally {
            setPendingTheme(null)
        }
    }

    return (
        <ThemeContext
            value={{
                theme,
                isLoading,
                pendingTheme,
                error,
                selectTheme,
            }}
        >
            {children}
        </ThemeContext>
    )
}

export function useTheme(): ThemeContextValue {
    const context = useContext(ThemeContext)

    if (!context) {
        throw new Error("useTheme debe usarse dentro de ThemeProvider")
    }

    return context
}
