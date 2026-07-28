"use client"

import {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react"
import { pomodoroService } from "../services/pomodoro.service"
import { getPomodoroClock } from "../timer"
import type {
    PomodoroBreakType,
    PomodoroSession,
    PomodoroSettings,
    PomodoroSummary,
} from "../types"

type PendingAction =
    | "start"
    | "pause"
    | "resume"
    | "complete"
    | "interrupt"
    | "cancel"
    | null

interface UsePomodoroOptions {
    autoRepeat?: boolean
}

function getBreakType(
    settings: PomodoroSettings,
    completedToday: number,
): PomodoroBreakType {
    return (completedToday + 1) %
        settings.sessionsBeforeLongBreak ===
        0
        ? "LONG"
        : "SHORT"
}

export function usePomodoro({
    autoRepeat = false,
}: UsePomodoroOptions = {}) {
    const [settings, setSettings] = useState<PomodoroSettings | null>(null)
    const [session, setSession] = useState<PomodoroSession | null>(null)
    const [summary, setSummary] = useState<PomodoroSummary | null>(null)
    const [now, setNow] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const [pendingAction, setPendingAction] = useState<PendingAction>(null)
    const [error, setError] = useState<string | null>(null)
    const completingSessionId = useRef<string | null>(null)

    useEffect(() => {
        let isCurrent = true

        void Promise.all([
            pomodoroService.getSettings(),
            pomodoroService.getActiveSession(),
            pomodoroService.getSummary(),
        ])
            .then(([nextSettings, activeSession, nextSummary]) => {
                if (!isCurrent) return

                setSettings(nextSettings)
                setSession(activeSession)
                setSummary(nextSummary)
                setNow(Date.now())
            })
            .catch((requestError: unknown) => {
                if (!isCurrent) return
                setError(
                    requestError instanceof Error
                        ? requestError.message
                        : "No se pudo cargar Pomodoro.",
                )
            })
            .finally(() => {
                if (isCurrent) setIsLoading(false)
            })

        return () => {
            isCurrent = false
        }
    }, [])

    useEffect(() => {
        if (!session || session.pausedAt) return

        const interval = window.setInterval(() => setNow(Date.now()), 1000)
        return () => window.clearInterval(interval)
    }, [session])

    const clock = useMemo(
        () => (session ? getPomodoroClock(session, now) : null),
        [now, session],
    )

    const refreshSummary = useCallback(async () => {
        const nextSummary = await pomodoroService.getSummary()
        setSummary(nextSummary)
        return nextSummary
    }, [])

    useEffect(() => {
        if (
            !session ||
            clock?.phase !== "COMPLETE" ||
            completingSessionId.current === session.id
        ) {
            return
        }

        completingSessionId.current = session.id
        setPendingAction("complete")
        setError(null)

        void (async () => {
            let completed = false

            try {
                await pomodoroService.completeSession(session.id, {
                    actualFocusSeconds: session.plannedFocusSeconds,
                    actualBreakSeconds: session.plannedBreakSeconds,
                })
                completed = true
                setSession(null)

                const nextSummary = await refreshSummary()
                if (!autoRepeat || !settings) return

                const started = await pomodoroService.startSession({
                    taskId: session.taskId || undefined,
                    breakType: getBreakType(
                        settings,
                        nextSummary.today.completedSessions,
                    ),
                })
                completingSessionId.current = null
                setSession(started)
                setNow(Date.now())
            } catch (requestError: unknown) {
                completingSessionId.current = null
                setError(
                    requestError instanceof Error
                        ? requestError.message
                        : completed
                          ? "La sesión terminó, pero no se pudo iniciar la siguiente."
                          : "No se pudo completar la sesión.",
                )
            } finally {
                setPendingAction(null)
            }
        })()
    }, [
        autoRepeat,
        clock?.phase,
        refreshSummary,
        session,
        settings,
    ])

    const start = async (taskId?: string) => {
        if (!settings || session || pendingAction) return

        setPendingAction("start")
        setError(null)

        try {
            const started = await pomodoroService.startSession({
                taskId: taskId || undefined,
                breakType: getBreakType(
                    settings,
                    summary?.today.completedSessions ?? 0,
                ),
            })
            completingSessionId.current = null
            setSession(started)
            setNow(Date.now())
        } catch (requestError: unknown) {
            setError(
                requestError instanceof Error
                    ? requestError.message
                    : "No se pudo iniciar la sesión.",
            )
        } finally {
            setPendingAction(null)
        }
    }

    const pause = async () => {
        if (!session || session.pausedAt || pendingAction) return

        setPendingAction("pause")
        setError(null)
        try {
            setSession(await pomodoroService.pauseSession(session.id))
        } catch (requestError: unknown) {
            setError(
                requestError instanceof Error
                    ? requestError.message
                    : "No se pudo pausar la sesión.",
            )
        } finally {
            setPendingAction(null)
        }
    }

    const resume = async () => {
        if (!session?.pausedAt || pendingAction) return

        setPendingAction("resume")
        setError(null)
        try {
            setSession(await pomodoroService.resumeSession(session.id))
            setNow(Date.now())
        } catch (requestError: unknown) {
            setError(
                requestError instanceof Error
                    ? requestError.message
                    : "No se pudo reanudar la sesión.",
            )
        } finally {
            setPendingAction(null)
        }
    }

    const interrupt = async () => {
        if (!session || !clock || pendingAction) return

        setPendingAction("interrupt")
        setError(null)

        try {
            await pomodoroService.interruptSession(session.id, {
                actualFocusSeconds: clock.elapsedFocusSeconds,
                actualBreakSeconds: clock.elapsedBreakSeconds,
            })
            setSession(null)
            await refreshSummary()
        } catch (requestError: unknown) {
            setError(
                requestError instanceof Error
                    ? requestError.message
                    : "No se pudo interrumpir la sesión.",
            )
        } finally {
            setPendingAction(null)
        }
    }

    const cancel = async () => {
        if (!session || pendingAction) return

        setPendingAction("cancel")
        setError(null)

        try {
            await pomodoroService.cancelSession(session.id)
            setSession(null)
        } catch (requestError: unknown) {
            setError(
                requestError instanceof Error
                    ? requestError.message
                    : "No se pudo cancelar la sesión.",
            )
        } finally {
            setPendingAction(null)
        }
    }

    return {
        settings,
        session,
        summary,
        clock,
        isLoading,
        pendingAction,
        error,
        isPaused: Boolean(session?.pausedAt),
        start,
        pause,
        resume,
        interrupt,
        cancel,
    }
}
