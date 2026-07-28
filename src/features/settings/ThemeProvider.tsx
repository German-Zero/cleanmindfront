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

export function ThemeProvider({
    children,
    initialTheme,
}: {
    children: ReactNode
    initialTheme: Theme
}) {
    const [theme, setTheme] = useState<Theme>(initialTheme)
    const [pendingTheme, setPendingTheme] = useState<Theme | null>(null)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        applyTheme(initialTheme)
    }, [initialTheme])

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
                isLoading: false,
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
