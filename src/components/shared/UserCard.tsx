
"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { authService } from "@/features/auth/services/auth.service"
import { useCurrentUser } from "@/features/auth/CurrentUserProvider"
import IconUser from "../ui/icons/IconUser"
import IconPersonalization from "../ui/icons/IconPersonalization"
import IconSettings from "../ui/icons/IconSettings"
import IconLogout from "../ui/icons/IconLogout"

interface UserCardProps {
    onOpenSettings: () => void
}

export default function UserCard({ onOpenSettings }: UserCardProps) {
    const router = useRouter()
    const { user, isLoading } = useCurrentUser()
    const [isLoggingOut, setIsLoggingOut] = useState(false)
    const [logoutError, setLogoutError] = useState<string | null>(null)

    const handleLogout = async () => {
        setIsLoggingOut(true)
        setLogoutError(null)

        try {
            await authService.logout()
            router.replace("/login")
            router.refresh()
        } catch {
            setLogoutError("No se pudo cerrar la sesión. Inténtalo de nuevo.")
            setIsLoggingOut(false)
        }
    }

    return (
        <div className="
                relative
                flex h-16 w-full max-w-[320px] shrink-0
                rounded-xl border border-border
                bg-card hover:bg-card-hover"
        >
            {logoutError && (
                <p
                    role="alert"
                    className="absolute right-0 bottom-full left-0 mb-2 rounded-lg border border-error bg-surface p-2 text-[10px] text-error"
                >
                    {logoutError}
                </p>
            )}
            <div className="flex w-full min-w-0 items-center gap-2 px-2">
                <div className="shrink-0">
                    <IconUser />
                </div>
                <div className="min-w-0 flex-1 xl:w-38 xl:flex-none">
                    <h6 className="truncate font-sans text-[16px] font-semibold text-text-primary">
                        {isLoading ? "Cargando…" : user?.name ?? "Usuario"}
                    </h6>
                </div>
                <div className="flex shrink-0 items-center justify-center gap-1">
                    <Link
                        href="/dashboard/personalization"
                        aria-label="Personalización"
                        className="grid size-11 place-items-center xl:size-auto"
                    >
                        <IconPersonalization />
                    </Link>
                    <button
                        type="button"
                        aria-label="Configuración"
                        onClick={onOpenSettings}
                        className="grid size-11 place-items-center xl:size-auto"
                    >
                        <IconSettings />
                    </button>
                    <button
                        type="button"
                        aria-label="Cerrar sesión"
                        aria-busy={isLoggingOut}
                        disabled={isLoggingOut}
                        onClick={handleLogout}
                        className="grid size-11 place-items-center disabled:cursor-wait disabled:opacity-50 xl:size-auto"
                    >
                        <IconLogout />
                    </button>
                </div>
            </div>
        </div>
    )
}
