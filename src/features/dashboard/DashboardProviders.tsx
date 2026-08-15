"use client"

import { useEffect, useState, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { ApiError } from "@/lib/api"
import { CurrentUserProvider } from "@/features/auth/CurrentUserProvider"
import { ThemeProvider } from "@/features/settings/ThemeProvider"
import { TasksProvider } from "@/features/tasks/TasksProvider"
import { dashboardService } from "./services/dashboard.service"
import type { DashboardBootstrap } from "./types"

export function DashboardProviders({ children }: { children: ReactNode }) {
    const router = useRouter()
    const [bootstrap, setBootstrap] =
        useState<DashboardBootstrap | null>(null)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        let isCurrent = true

        void dashboardService
            .getBootstrap()
            .then((data) => {
                if (isCurrent) setBootstrap(data)
            })
            .catch((requestError: unknown) => {
                if (!isCurrent) return

                if (
                    requestError instanceof ApiError &&
                    requestError.status === 401
                ) {
                    router.replace("/login")
                    router.refresh()
                    return
                }

                if (
                    requestError instanceof ApiError &&
                    requestError.status === 403
                ) {
                    router.replace("/terms")
                    router.refresh()
                    return
                }

                setError(
                    requestError instanceof Error
                        ? requestError.message
                        : "No se pudo cargar el dashboard.",
                )
            })

        return () => {
            isCurrent = false
        }
    }, [router])

    if (!bootstrap) {
        return (
            <main className="grid min-h-dvh place-items-center bg-background px-6 text-center">
                <p
                    role={error ? "alert" : "status"}
                    className={error ? "text-error" : "text-text-secondary"}
                >
                    {error ?? "Preparando tu espacio…"}
                </p>
            </main>
        )
    }

    return (
        <CurrentUserProvider initialUser={bootstrap.user}>
            <ThemeProvider
                initialTheme={bootstrap.settings.theme}
                initialBackgroundMotion={
                    bootstrap.settings.backgroundMotion
                }
            >
                <TasksProvider initialTasks={bootstrap.tasks}>
                    {children}
                </TasksProvider>
            </ThemeProvider>
        </CurrentUserProvider>
    )
}
