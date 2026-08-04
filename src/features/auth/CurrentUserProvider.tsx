"use client"

import {
    createContext,
    useContext,
    useState,
    type ReactNode,
} from "react"
import type { CurrentUser } from "./types"

interface CurrentUserContextValue {
    user: CurrentUser | null
    isLoading: boolean
    markPasswordCreated: () => void
    markOnboardingCompleted: () => void
}

const CurrentUserContext = createContext<CurrentUserContextValue | null>(
    null,
)

export function CurrentUserProvider({
    children,
    initialUser,
}: {
    children: ReactNode
    initialUser: CurrentUser
}) {
    const [user, setUser] = useState<CurrentUser | null>(initialUser)

    return (
        <CurrentUserContext.Provider
            value={{
                user,
                isLoading: false,
                markPasswordCreated: () =>
                    setUser((currentUser) =>
                        currentUser
                            ? { ...currentUser, hasPassword: true }
                            : currentUser,
                    ),
                markOnboardingCompleted: () =>
                    setUser((currentUser) =>
                        currentUser
                            ? { ...currentUser, needsOnboarding: false }
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
