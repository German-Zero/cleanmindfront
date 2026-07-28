"use client"

import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react"
import { authService } from "./services/auth.service"
import type { CurrentUser } from "./types"

interface CurrentUserContextValue {
    user: CurrentUser | null
    isLoading: boolean
    markPasswordCreated: () => void
}

const CurrentUserContext = createContext<CurrentUserContextValue | null>(
    null,
)

export function CurrentUserProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<CurrentUser | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        let isCancelled = false

        void authService
            .getCurrentUser()
            .then((currentUser) => {
                if (!isCancelled) setUser(currentUser)
            })
            .catch(() => undefined)
            .finally(() => {
                if (!isCancelled) setIsLoading(false)
            })

        return () => {
            isCancelled = true
        }
    }, [])

    return (
        <CurrentUserContext.Provider
            value={{
                user,
                isLoading,
                markPasswordCreated: () =>
                    setUser((currentUser) =>
                        currentUser
                            ? { ...currentUser, hasPassword: true }
                            : currentUser,
                    ),
            }}
        >
            {children}
        </CurrentUserContext.Provider>
    )
}

export function useCurrentUser(): CurrentUserContextValue {
    const context = useContext(CurrentUserContext)

    if (!context) {
        throw new Error(
            "useCurrentUser debe utilizarse dentro de CurrentUserProvider.",
        )
    }

    return context
}
