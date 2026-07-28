export type PomodoroSessionStatus =
    | "ACTIVE"
    | "COMPLETED"
    | "INTERRUPTED"
    | "CANCELLED"

export type PomodoroBreakType = "SHORT" | "LONG"
export type PomodoroTimerMode = "SINGLE" | "AUTO"

export interface PomodoroSettings {
    userId: string
    focusMinutes: number
    shortBreakMinutes: number
    longBreakMinutes: number
    sessionsBeforeLongBreak: number
    autoStartBreak: boolean
    dailyGoalMinutes: number | null
}

export interface PomodoroSession {
    id: string
    userId: string
    taskId: string | null
    status: PomodoroSessionStatus
    breakType: PomodoroBreakType
    plannedFocusSeconds: number
    plannedBreakSeconds: number
    actualFocusSeconds: number
    actualBreakSeconds: number
    startedAt: string
    endedAt: string | null
    pausedAt: string | null
    accumulatedPausedSeconds: number
}

export interface PomodoroDailySummary {
    date: string
    focusSeconds: number
    breakSeconds: number
    completedSessions: number
}

export interface PomodoroSummary {
    today: Omit<PomodoroDailySummary, "date">
    period: {
        days: number
        focusSeconds: number
        breakSeconds: number
        completedSessions: number
        interruptedSessions: number
    }
    daily: PomodoroDailySummary[]
}

export interface PomodoroState {
    settings: PomodoroSettings
    activeSession: PomodoroSession | null
    summary: PomodoroSummary
}

export interface StartPomodoroSessionRequest {
    taskId?: string | null
    breakType?: PomodoroBreakType
}

export interface FinishPomodoroSessionRequest {
    actualFocusSeconds: number
    actualBreakSeconds: number
}

export interface UpdatePomodoroSettingsRequest {
    focusMinutes?: number
    shortBreakMinutes?: number
    longBreakMinutes?: number
    sessionsBeforeLongBreak?: number
    autoStartBreak?: boolean
    dailyGoalMinutes?: number | null
}
