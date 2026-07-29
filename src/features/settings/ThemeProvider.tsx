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
import type { BackgroundMotion, Theme } from "./types"

interface ThemeContextValue {
    theme: Theme
    backgroundMotion: BackgroundMotion
    isLoading: boolean
    pendingTheme: Theme | null
    pendingMotion: BackgroundMotion | null
    error: string | null
    selectTheme: (theme: Theme) => Promise<void>
    selectBackgroundMotion: (motion: BackgroundMotion) => Promise<void>
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

function applyAppearance(theme: Theme, motion: BackgroundMotion) {
    document.documentElement.dataset.theme = theme
    document.documentElement.dataset.motion = motion
}

export function ThemeProvider({
    children,
    initialTheme,
    initialBackgroundMotion,
}: {
    children: ReactNode
    initialTheme: Theme
    initialBackgroundMotion: BackgroundMotion
}) {
    const [theme, setTheme] = useState<Theme>(initialTheme)
    const [backgroundMotion, setBackgroundMotion] =
        useState<BackgroundMotion>(initialBackgroundMotion)
    const [pendingTheme, setPendingTheme] = useState<Theme | null>(null)
    const [pendingMotion, setPendingMotion] =
        useState<BackgroundMotion | null>(null)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        applyAppearance(initialTheme, initialBackgroundMotion)
    }, [initialBackgroundMotion, initialTheme])

    const saveAppearance = async (
        nextTheme: Theme,
        nextMotion: BackgroundMotion,
    ) => {
        const previousTheme = theme
        const previousMotion = backgroundMotion
        setError(null)
        setTheme(nextTheme)
        setBackgroundMotion(nextMotion)
        applyAppearance(nextTheme, nextMotion)

        try {
            const updated = await settingsService.updateAppearance(
                nextTheme,
                nextMotion,
            )
            setTheme(updated.theme)
            setBackgroundMotion(updated.backgroundMotion)
            applyAppearance(updated.theme, updated.backgroundMotion)
        } catch (requestError: unknown) {
            setTheme(previousTheme)
            setBackgroundMotion(previousMotion)
            applyAppearance(previousTheme, previousMotion)
            setError(requestErrorMessage(
                requestError,
                "No pudimos guardar tu apariencia.",
                {
                    400: "La apariencia seleccionada no es válida.",
                    401: "Tu sesión venció. Inicia sesión nuevamente.",
                },
            ))
        }
    }

    const selectTheme = async (nextTheme: Theme) => {
        if (
            nextTheme === theme ||
            pendingTheme ||
            pendingMotion
        ) return

        setPendingTheme(nextTheme)
        await saveAppearance(nextTheme, backgroundMotion)
        setPendingTheme(null)
    }

    const selectBackgroundMotion = async (
        nextMotion: BackgroundMotion,
    ) => {
        if (
            nextMotion === backgroundMotion ||
            pendingTheme ||
            pendingMotion
        ) return

        setPendingMotion(nextMotion)
        await saveAppearance(theme, nextMotion)
        setPendingMotion(null)
    }

    return (
        <ThemeContext
            value={{
                theme,
                backgroundMotion,
                isLoading: false,
                pendingTheme,
                pendingMotion,
                error,
                selectTheme,
                selectBackgroundMotion,
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
