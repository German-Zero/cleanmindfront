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
        <div className="flex h-dvh w-full overflow-hidden">
            {isSidebarOpen && (
                <button
                    type="button"
                    aria-label="Cerrar panel de tareas"
                    onClick={() => setSidebarPath(null)}
                    className="fixed inset-0 z-40 bg-black/60 xl:hidden"
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
                            absolute top-2 left-full ml-2 grid size-10 place-items-center
                            rounded-xl border border-border bg-surface
                            text-2xl leading-none text-text-primary xl:hidden
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
                    fixed top-4 left-4 z-30 grid size-11 place-items-center
                    rounded-xl border border-border bg-surface text-text-primary
                    xl:hidden
                "
            >
                <span className="flex w-5 flex-col gap-1.25" aria-hidden="true">
                    <span className="h-0.5 w-full rounded-full bg-current" />
                    <span className="h-0.5 w-full rounded-full bg-current" />
                    <span className="h-0.5 w-full rounded-full bg-current" />
                </span>
            </button>

            <main className="no-scrollbar relative h-dvh min-w-0 flex-1 overflow-auto pb-20 xl:pb-0">
                {children}

                {pathname !== "/dashboard/calendar" && (
                    <NewTaskButton
                        className="
                            fixed top-4 right-4 z-30 grid size-11 place-items-center
                            xl:top-12 xl:right-6
                        "
                    />
                )}

                <nav
                    aria-label="Navegación del dashboard"
                    className="
                        fixed right-4 bottom-4 left-4 z-30 mx-auto
                        flex max-w-sm items-center justify-around
                        rounded-2xl border border-border bg-surface/95 p-2
                        shadow-xl backdrop-blur xl:contents
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
                                    grid size-12 place-items-center rounded-xl
                                    xl:absolute xl:z-10 xl:size-auto xl:rounded-none xl:ring-0
                                    ${item.position}
                                    ${isActive ? "ring-2 ring-accent xl:hidden" : "xl:block"}
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
