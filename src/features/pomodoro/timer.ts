import type { PomodoroSession } from "./types"

export type PomodoroPhase = "FOCUS" | "BREAK" | "COMPLETE"

export interface PomodoroClock {
    phase: PomodoroPhase
    remainingSeconds: number
    elapsedFocusSeconds: number
    elapsedBreakSeconds: number
    progress: number
}

export function getPomodoroClock(
    session: PomodoroSession,
    nowMs = Date.now(),
): PomodoroClock {
    const effectiveNow = session.pausedAt
        ? new Date(session.pausedAt).getTime()
        : nowMs
    const elapsedSeconds = Math.max(
        0,
        Math.floor(
            (effectiveNow -
                new Date(session.startedAt).getTime()) /
                1000,
        ) - session.accumulatedPausedSeconds,
    )
    const focusSeconds = session.plannedFocusSeconds
    const breakSeconds = session.plannedBreakSeconds
    const totalSeconds = focusSeconds + breakSeconds
    const elapsedFocusSeconds = Math.min(elapsedSeconds, focusSeconds)
    const elapsedBreakSeconds = Math.min(
        Math.max(elapsedSeconds - focusSeconds, 0),
        breakSeconds,
    )

    if (elapsedSeconds < focusSeconds) {
        return {
            phase: "FOCUS",
            remainingSeconds: focusSeconds - elapsedSeconds,
            elapsedFocusSeconds,
            elapsedBreakSeconds,
            progress: focusSeconds
                ? elapsedFocusSeconds / focusSeconds
                : 1,
        }
    }

    if (elapsedSeconds < totalSeconds) {
        return {
            phase: "BREAK",
            remainingSeconds: totalSeconds - elapsedSeconds,
            elapsedFocusSeconds,
            elapsedBreakSeconds,
            progress: breakSeconds
                ? elapsedBreakSeconds / breakSeconds
                : 1,
        }
    }

    return {
        phase: "COMPLETE",
        remainingSeconds: 0,
        elapsedFocusSeconds,
        elapsedBreakSeconds,
        progress: 1,
    }
}

export function formatTimer(seconds: number): string {
    const safeSeconds = Math.max(0, Math.floor(seconds))
    const minutes = Math.floor(safeSeconds / 60)
    const remainder = safeSeconds % 60

    return `${String(minutes).padStart(2, "0")}:${String(remainder).padStart(2, "0")}`
}

export function formatFocusDuration(seconds: number): string {
    const safeSeconds = Math.max(0, Math.floor(seconds))
    const hours = Math.floor(safeSeconds / 3600)
    const minutes = Math.floor((safeSeconds % 3600) / 60)
    const remainder = safeSeconds % 60

    return [
        String(hours).padStart(2, "0"),
        String(minutes).padStart(2, "0"),
        String(remainder).padStart(2, "0"),
    ].join(":")
}
