import assert from "node:assert/strict"
import test from "node:test"
import {
    formatFocusDuration,
    formatTimer,
    getPomodoroClock,
} from "../src/features/pomodoro/timer.ts"
import type { PomodoroSession } from "../src/features/pomodoro/types.ts"

const session: PomodoroSession = {
    id: "session-id",
    userId: "user-id",
    taskId: null,
    status: "ACTIVE",
    breakType: "SHORT",
    plannedFocusSeconds: 1500,
    plannedBreakSeconds: 300,
    actualFocusSeconds: 0,
    actualBreakSeconds: 0,
    startedAt: "2026-07-27T12:00:00.000Z",
    endedAt: null,
    pausedAt: null,
    accumulatedPausedSeconds: 0,
}

test("reconstruye enfoque, descanso y finalización desde startedAt", () => {
    const startedAt = Date.parse(session.startedAt)

    assert.deepEqual(
        getPomodoroClock(session, startedAt + 60_000),
        {
            phase: "FOCUS",
            remainingSeconds: 1440,
            elapsedFocusSeconds: 60,
            elapsedBreakSeconds: 0,
            progress: 0.04,
        },
    )

    assert.equal(
        getPomodoroClock(session, startedAt + 1_560_000).phase,
        "BREAK",
    )
    assert.deepEqual(
        getPomodoroClock(session, startedAt + 1_800_000),
        {
            phase: "COMPLETE",
            remainingSeconds: 0,
            elapsedFocusSeconds: 1500,
            elapsedBreakSeconds: 300,
            progress: 1,
        },
    )
})

test("formatea el contador sin valores negativos", () => {
    assert.equal(formatTimer(920), "15:20")
    assert.equal(formatTimer(-1), "00:00")
    assert.equal(formatFocusDuration(3723), "01:02:03")
})

test("descuenta del reloj el tiempo acumulado en pausa", () => {
    const startedAt = Date.parse(session.startedAt)
    const pausedAt = startedAt + 10 * 60_000

    assert.equal(
        getPomodoroClock(
            {
                ...session,
                pausedAt: new Date(pausedAt).toISOString(),
            },
            startedAt + 15 * 60_000,
        ).remainingSeconds,
        900,
    )

    assert.equal(
        getPomodoroClock(
            {
                ...session,
                accumulatedPausedSeconds: 5 * 60,
            },
            startedAt + 20 * 60_000,
        ).remainingSeconds,
        600,
    )
})
