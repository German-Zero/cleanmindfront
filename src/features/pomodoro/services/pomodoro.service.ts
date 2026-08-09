import { apiRequest } from "@/lib/api"
import type { RewardedResponse } from "@/features/rewards/types"
import type {
    FinishPomodoroSessionRequest,
    PomodoroSession,
    PomodoroSettings,
    PomodoroState,
    PomodoroSummary,
    StartPomodoroSessionRequest,
    UpdatePomodoroSettingsRequest,
} from "../types"

const jsonHeaders = { "Content-Type": "application/json" }

export const pomodoroService = {
    getState: (days = 7) =>
        apiRequest<PomodoroState>(`/api/pomodoro/state?days=${days}`, {
            cache: "no-store",
        }),

    updateSettings: (request: UpdatePomodoroSettingsRequest) =>
        apiRequest<PomodoroSettings>("/api/pomodoro/settings", {
            method: "PATCH",
            headers: jsonHeaders,
            body: JSON.stringify(request),
        }),

    startSession: (request: StartPomodoroSessionRequest) =>
        apiRequest<PomodoroSession>("/api/pomodoro/sessions", {
            method: "POST",
            headers: jsonHeaders,
            body: JSON.stringify(request),
        }),

    pauseSession: (id: string) =>
        apiRequest<PomodoroSession>(
            `/api/pomodoro/sessions/${id}/pause`,
            { method: "PATCH" },
        ),

    resumeSession: (id: string) =>
        apiRequest<PomodoroSession>(
            `/api/pomodoro/sessions/${id}/resume`,
            { method: "PATCH" },
        ),

    completeSession: (
        id: string,
        request: FinishPomodoroSessionRequest,
    ) =>
        apiRequest<RewardedResponse<PomodoroSession>>(
            `/api/pomodoro/sessions/${id}/complete`,
            {
                method: "PATCH",
                headers: jsonHeaders,
                body: JSON.stringify(request),
            },
        ),

    interruptSession: (
        id: string,
        request: FinishPomodoroSessionRequest,
    ) =>
        apiRequest<PomodoroSession>(
            `/api/pomodoro/sessions/${id}/interrupt`,
            {
                method: "PATCH",
                headers: jsonHeaders,
                body: JSON.stringify(request),
            },
        ),

    cancelSession: (id: string) =>
        apiRequest<PomodoroSession>(
            `/api/pomodoro/sessions/${id}/cancel`,
            { method: "PATCH" },
        ),

    getSummary: (days = 7) =>
        apiRequest<PomodoroSummary>(`/api/pomodoro/summary?days=${days}`, {
            cache: "no-store",
        }),
}
