
"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { authService } from "@/features/auth/services/auth.service"
import { useCurrentUser } from "@/features/auth/CurrentUserProvider"
import { useRewards } from "@/features/rewards/RewardsProvider"
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
    const { summary: rewards } = useRewards()
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
                calm-card relative flex min-h-16 w-full max-w-[320px]
                shrink-0 items-center hover:border-accent/30"
        >
            {logoutError && (
                <p
                    role="alert"
                    className="calm-feedback absolute right-0 bottom-full left-0 mb-2 text-error"
                >
                    {logoutError}
                </p>
            )}
            <div className="flex w-full min-w-0 items-center gap-2 px-2.5">
                <div className="shrink-0">
                    <IconUser />
                </div>
                <div className="min-w-0 flex-1">
                    <h6 className="truncate font-sans text-[14px] font-semibold text-text-primary">
                        {isLoading ? "Cargando…" : user?.name ?? "Usuario"}
                    </h6>
                    <p
                        className="truncate text-[10px] font-medium text-accent"
                        title={`${rewards.earnedThisMonth} de ${rewards.monthlyLimit} puntos obtenidos este mes`}
                    >
                        &#10022; {rewards.balance} puntos
                    </p>
                </div>
                <div className="flex shrink-0 items-center justify-center gap-0.5">
                    <Link
                        href="/dashboard/personalization"
                        aria-label="Personalización"
                        className="calm-icon-button"
                    >
                        <IconPersonalization />
                    </Link>
                    <button
                        type="button"
                        aria-label="Configuración"
                        onClick={onOpenSettings}
                        className="calm-icon-button"
                    >
                        <IconSettings />
                    </button>
                    <button
                        type="button"
                        aria-label="Cerrar sesión"
                        aria-busy={isLoggingOut}
                        disabled={isLoggingOut}
                        onClick={handleLogout}
                        className="calm-icon-button disabled:cursor-wait disabled:opacity-50"
                    >
                        <IconLogout />
                    </button>
                </div>
            </div>
        </div>
    )
}
