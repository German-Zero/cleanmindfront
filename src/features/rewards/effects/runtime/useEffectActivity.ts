"use client"

import { useReducedMotion } from "motion/react"
import { useMemo, useSyncExternalStore } from "react"

function subscribeToPageVisibility(onStoreChange: () => void) {
    document.addEventListener("visibilitychange", onStoreChange)
    return () => document.removeEventListener("visibilitychange", onStoreChange)
}

function getPageVisibilitySnapshot() {
    return document.visibilityState === "visible"
}

function getServerPageVisibilitySnapshot() {
    return false
}

export function useEffectActivity() {
    const prefersReducedMotion = Boolean(useReducedMotion())
    const isPageVisible = useSyncExternalStore(
        subscribeToPageVisibility,
        getPageVisibilitySnapshot,
        getServerPageVisibilitySnapshot,
    )

    return useMemo(() => ({
        prefersReducedMotion,
        shouldAnimate: isPageVisible && !prefersReducedMotion,
    }), [isPageVisible, prefersReducedMotion])
}
