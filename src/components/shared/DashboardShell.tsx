'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState, type ReactNode } from "react"
import SettingsModal from "@/features/settings/components/SettingsModal"
import NewTaskButton from "@/features/tasks/components/NewTaskButton"
import CalendarButton from "../ui/CalendarButton"
import MatrizButton from "../ui/MatrizButton"
import PomodoroButton from "../ui/PomodoroButton"
import WhiteboardButton from "../ui/WhiteboardButton"
import Sidebar from "./Sidebar"

const navigation = [
    {
        href: "/dashboard/calendar",
        label: "Calendario",
        position: "top-0 left-0",
        icon: <CalendarButton />,
    },
    {
        href: "/dashboard/matriz",
        label: "Matriz",
        position: "top-0 right-0",
        icon: <MatrizButton />,
    },
    {
        href: "/dashboard/pomodoro",
        label: "Pomodoro",
        position: "bottom-0 left-0",
        icon: <PomodoroButton />,
    },
    {
        href: "/dashboard/whiteboard",
        label: "Pizarra",
        position: "bottom-0 right-0",
        icon: <WhiteboardButton />,
    },
]

export default function DashboardShell({ children }: { children: ReactNode }) {
    const pathname = usePathname()
    const settingsDialogRef = useRef<HTMLDialogElement>(null)
    const [sidebarPath, setSidebarPath] = useState<string | null>(null)
    const [settingsDialogKey, setSettingsDialogKey] = useState(0)
    const [isSettingsCloseLocked, setIsSettingsCloseLocked] =
        useState(false)
    const isSidebarOpen = sidebarPath === pathname

    const clearSettingsQuery = () => {
        const url = new URL(window.location.href)
        url.searchParams.delete("settings")
        url.searchParams.delete("discord")
        window.history.replaceState(
            null,
            "",
            `${url.pathname}${url.search}${url.hash}`,
        )
    }

    const openSettings = () => {
        if (!settingsDialogRef.current?.open) {
            settingsDialogRef.current?.showModal()
        }
    }

    useEffect(() => {
        if (!isSidebarOpen) return

        const closeOnEscape = (event: KeyboardEvent) => {
            if (
                event.key === "Escape" &&
                !settingsDialogRef.current?.open
            ) {
                setSidebarPath(null)
            }
        }

        document.addEventListener("keydown", closeOnEscape)
        return () => document.removeEventListener("keydown", closeOnEscape)
    }, [isSidebarOpen])

    useEffect(() => {
        const params = new URLSearchParams(window.location.search)

        if (
            params.get("settings") === "open" ||
            params.get("discord") === "connected"
        ) {
            if (!settingsDialogRef.current?.open) {
                settingsDialogRef.current?.showModal()
            }
        }
    }, [])

    useEffect(() => {
        if (!isSettingsCloseLocked) return

        const warnBeforeLeaving = (event: BeforeUnloadEvent) => {
            event.preventDefault()
            event.returnValue = ""
        }

        window.addEventListener("beforeunload", warnBeforeLeaving)
        return () =>
            window.removeEventListener(
                "beforeunload",
                warnBeforeLeaving,
            )
    }, [isSettingsCloseLocked])

    return (
        <div className="flex h-dvh w-full overflow-hidden bg-background">
            {isSidebarOpen && (
                <button
                    type="button"
                    aria-label="Cerrar panel de tareas"
                    onClick={() => setSidebarPath(null)}
                    className="fixed inset-0 z-40 bg-black/55 backdrop-blur-[2px] xl:hidden"
                />
            )}

            <div
                id="dashboard-sidebar"
                className={`
                    z-50 h-dvh shrink-0
                    ${isSidebarOpen ? "fixed inset-y-0 left-0 block" : "hidden"}
                    xl:static xl:block
                `}
            >
                <Sidebar onOpenSettings={openSettings} />
                {isSidebarOpen && (
                    <button
                        type="button"
                        aria-label="Cerrar panel de tareas"
                        onClick={() => setSidebarPath(null)}
                        className="
                            calm-icon-button absolute top-3 left-full ml-3
                            bg-surface text-[22px] leading-none
                            text-text-primary shadow-lg xl:hidden
                        "
                    >
                        <span aria-hidden="true">×</span>
                    </button>
                )}
            </div>

            <button
                type="button"
                aria-controls="dashboard-sidebar"
                aria-expanded={isSidebarOpen}
                aria-label="Abrir panel de tareas"
                onClick={() => setSidebarPath(pathname)}
                className="
                    calm-icon-button fixed top-4 left-4 z-30
                    bg-surface/95 text-text-primary shadow-lg
                    backdrop-blur xl:hidden
                "
            >
                <span className="flex w-5 flex-col gap-1.25" aria-hidden="true">
                    <span className="h-0.5 w-full rounded-full bg-current" />
                    <span className="h-0.5 w-full rounded-full bg-current" />
                    <span className="h-0.5 w-full rounded-full bg-current" />
                </span>
            </button>

            <main className="no-scrollbar relative h-dvh min-w-0 flex-1 overflow-auto bg-[radial-gradient(circle_at_top_right,color-mix(in_srgb,var(--primary)_7%,transparent),transparent_38%)] pb-20 xl:pb-0">
                {children}

                {pathname !== "/dashboard/calendar" && (
                    <NewTaskButton
                        className="
                            calm-icon-button fixed top-4 right-4 z-30
                            bg-surface/95 shadow-lg
                            xl:top-12 xl:right-6
                        "
                    />
                )}

                <nav
                    aria-label="Navegación del dashboard"
                    className="
                        fixed right-4 bottom-4 left-4 z-30 mx-auto
                        flex max-w-95 items-center justify-around
                        rounded-2xl border border-border/70 bg-surface/94 p-1.5
                        shadow-[0_16px_42px_rgb(0_0_0/28%)] backdrop-blur-xl
                        xl:contents
                    "
                >
                    {navigation.map((item) => {
                        const isActive = pathname === item.href

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                aria-label={item.label}
                                aria-current={isActive ? "page" : undefined}
                                className={`
                                    grid size-12 place-items-center rounded-[11px]
                                    xl:absolute xl:z-10 xl:size-auto xl:rounded-none xl:ring-0
                                    ${item.position}
                                    ${
                                        isActive
                                            ? "bg-primary/14 text-accent ring-1 ring-primary/35 xl:hidden"
                                            : "text-text-secondary hover:bg-card hover:text-text-primary xl:block"
                                    }
                                `}
                            >
                                {item.icon}
                            </Link>
                        )
                    })}
                </nav>
            </main>

            <dialog
                ref={settingsDialogRef}
                aria-labelledby="settings-title"
                aria-describedby="settings-description"
                onClose={() => {
                    clearSettingsQuery()
                    setIsSettingsCloseLocked(false)
                    setSettingsDialogKey((key) => key + 1)
                }}
                onCancel={(event) => {
                    if (isSettingsCloseLocked) event.preventDefault()
                }}
                onClick={(event) => {
                    if (
                        event.target === event.currentTarget &&
                        !isSettingsCloseLocked
                    ) {
                        event.currentTarget.close()
                    }
                }}
                className="
                    fixed inset-0 m-auto max-h-dvh w-full max-w-none
                    overflow-visible border-0 bg-transparent p-4
                    text-inherit backdrop:bg-black/70
                "
            >
                <SettingsModal
                    key={settingsDialogKey}
                    onClose={() => {
                        if (!isSettingsCloseLocked) {
                            settingsDialogRef.current?.close()
                        }
                    }}
                    onCloseLockChange={setIsSettingsCloseLocked}
                />
            </dialog>
        </div>
    )
}
