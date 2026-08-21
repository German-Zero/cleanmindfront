'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState, type ReactNode } from "react"
import OnboardingTutorial from "@/features/onboarding/components/OnboardingTutorial"
import RewardBackgroundLayer from "@/features/rewards/effects/RewardBackgroundLayer"
import SettingsModal from "@/features/settings/components/SettingsModal"
import NewTaskButton from "@/features/tasks/components/NewTaskButton"
import CalendarButton from "../ui/CalendarButton"
import DashboardButton from "../ui/DashboardButton"
import MatrizButton from "../ui/MatrizButton"
import PomodoroButton from "../ui/PomodoroButton"
import StoreButton from "../ui/StoreButton"
import WhiteboardButton from "../ui/WhiteboardButton"
import Sidebar from "./Sidebar"

const navigation = [
    {
        href: "/dashboard",
        label: "Inicio",
        icon: <DashboardButton />,
    },
    {
        href: "/dashboard/calendar",
        label: "Calendario",
        icon: <CalendarButton />,
    },
    {
        href: "/dashboard/matriz",
        label: "Matriz",
        icon: <MatrizButton />,
    },
    {
        href: "/dashboard/pomodoro",
        label: "Pomodoro",
        icon: <PomodoroButton />,
    },
    {
        href: "/dashboard/whiteboard",
        label: "Pizarra",
        icon: <WhiteboardButton />,
    },
    {
        href: "/dashboard/store",
        label: "Tienda",
        icon: <StoreButton />,
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
        <div className="relative isolate flex h-dvh w-full overflow-hidden bg-background">
            <RewardBackgroundLayer />
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

            <main
                className={`
                    no-scrollbar relative z-1 h-dvh min-w-0 flex-1
                    bg-[radial-gradient(circle_at_top_right,color-mix(in_srgb,var(--primary)_7%,transparent),transparent_38%)]
                    pb-20 xl:pb-0
                    ${
                        pathname === "/dashboard/personalization" ||
                        pathname === "/dashboard/store"
                            ? "overflow-hidden"
                            : "overflow-auto"
                    }
                `}
            >
                {children}

                {pathname !== "/dashboard" &&
                    pathname !== "/dashboard/calendar" &&
                    pathname !== "/dashboard/store" && (
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
                        flex max-w-105 items-center justify-around
                        rounded-2xl border border-border/70 bg-surface/94 p-1.5
                        shadow-[0_16px_42px_rgb(0_0_0/28%)] backdrop-blur-xl
                        xl:top-1/2 xl:right-5.5 xl:bottom-auto xl:left-auto
                        xl:mx-0 xl:max-w-none xl:-translate-y-1/2
                        xl:flex-col xl:justify-center xl:gap-1.5
                        xl:rounded-[20px] xl:border-border/65
                        xl:bg-surface/82 xl:p-1.75
                        xl:shadow-[0_20px_60px_rgb(0_0_0/34%),inset_0_1px_0_rgb(255_255_255/4%)]
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
                                    group relative grid size-11 place-items-center
                                    rounded-xl transition-[background-color,color,box-shadow,transform]
                                    sm:size-12 xl:rounded-[13px]
                                    ${
                                        isActive
                                            ? "bg-primary/14 text-accent ring-1 ring-primary/35 xl:bg-primary/16 xl:shadow-[0_8px_22px_rgb(0_0_0/18%)]"
                                            : "text-text-secondary hover:bg-card hover:text-text-primary xl:hover:-translate-x-0.5 xl:hover:bg-card/85"
                                    }
                                `}
                            >
                                <span
                                    aria-hidden="true"
                                    className={`
                                        absolute top-1/2 right-14.25 hidden
                                        -translate-y-1/2 rounded-[9px]
                                        border border-border/65 bg-surface/96
                                        px-2.5 py-1.5 text-[10px]
                                        font-medium whitespace-nowrap
                                        text-text-primary opacity-0
                                        shadow-[0_10px_28px_rgb(0_0_0/28%)]
                                        backdrop-blur-md
                                        transition-[opacity,transform]
                                        group-hover:-translate-x-0.75
                                        group-hover:opacity-100
                                        group-focus-visible:-translate-x-0.75
                                        group-focus-visible:opacity-100
                                        xl:block
                                    `}
                                >
                                    {item.label}
                                </span>
                                {item.icon}
                                <span
                                    aria-hidden="true"
                                    className={`
                                        absolute -right-0.75 hidden h-4.5
                                        w-0.75 rounded-full bg-accent
                                        transition-[opacity,transform]
                                        xl:block
                                        ${
                                            isActive
                                                ? "opacity-100"
                                                : "translate-x-0.75 opacity-0"
                                        }
                                    `}
                                />
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

            <OnboardingTutorial />
        </div>
    )
}
