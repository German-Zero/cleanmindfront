"use client"

import { useMemo, useState } from "react"
import { usePomodoro } from "@/features/pomodoro/hooks/usePomodoro"
import { usePomodoroSound } from "@/features/pomodoro/hooks/usePomodoroSound"
import {
    formatFocusDuration,
    formatTimer,
} from "@/features/pomodoro/timer"
import { taskDueDateKey, toDateKey } from "@/features/tasks/calendar"
import { useTasks } from "@/features/tasks/TasksProvider"
import type { PomodoroTimerMode } from "@/features/pomodoro/types"
import type { TaskQuadrant } from "@/features/tasks/types"
import IconPause from "./ui/icons/IconPause"
import IconStop from "./ui/icons/IconStop"

const quadrantLabels: Record<TaskQuadrant, string> = {
    DO: "Hacer Ahora",
    PLAN: "Planificar",
    DELEGATE: "Delegar",
    DELETE: "Eliminar",
}

const quadrantBorders: Record<TaskQuadrant, string> = {
    DO: "border-l-now",
    PLAN: "border-l-plan",
    DELEGATE: "border-l-delegate",
    DELETE: "border-l-delete",
}

function weekdayLabel(dateKey: string): string {
    return new Intl.DateTimeFormat("es-AR", { weekday: "short" })
        .format(new Date(`${dateKey}T00:00:00`))
        .replace(".", "")
        .slice(0, 2)
}

export default function Pomodoro() {
    const { tasks, isLoading: areTasksLoading } = useTasks()
    const [selectedTaskId, setSelectedTaskId] = useState("")
    const [timerMode, setTimerMode] =
        useState<PomodoroTimerMode>("AUTO")
    const {
        settings,
        session,
        summary,
        clock,
        isLoading,
        pendingAction,
        error,
        isPaused,
        start,
        pause,
        resume,
        interrupt,
        cancel,
    } = usePomodoro({ autoRepeat: timerMode === "AUTO" })
    const { soundEnabled, toggleSound } = usePomodoroSound(
        clock?.phase ?? null,
    )
    const todayKey = toDateKey(new Date())

    const stats = useMemo(
        () => [
            { label: "Total", value: tasks.length },
            {
                label: "Pendientes",
                value: tasks.filter((task) => task.status === "TODO").length,
            },
            {
                label: "En Curso",
                value: tasks.filter(
                    (task) => task.status === "IN_PROGRESS",
                ).length,
            },
            {
                label: "Completadas",
                value: tasks.filter(
                    (task) => task.status === "COMPLETED",
                ).length,
            },
        ],
        [tasks],
    )
    const completedTasks = stats[3].value
    const taskProgress = tasks.length
        ? Math.round((completedTasks / tasks.length) * 100)
        : 0
    const taskDateStats = [
        {
            label: "Para Hoy",
            value: tasks.filter(
                (task) => taskDueDateKey(task.dueDate) === todayKey,
            ).length,
        },
        {
            label: "Vencidas",
            value: tasks.filter((task) => {
                const date = taskDueDateKey(task.dueDate)
                return (
                    task.status !== "COMPLETED" &&
                    date !== null &&
                    date < todayKey
                )
            }).length,
        },
        {
            label: "Próximas",
            value: tasks.filter((task) => {
                const date = taskDueDateKey(task.dueDate)
                return (
                    task.status !== "COMPLETED" &&
                    date !== null &&
                    date > todayKey
                )
            }).length,
        },
    ]
    const remainingSeconds =
        clock?.remainingSeconds ?? (settings?.focusMinutes ?? 25) * 60
    const timerProgress = clock?.progress ?? 0
    const circumference = 2 * Math.PI * 42
    const activeTask = tasks.find((task) => task.id === session?.taskId)
    const availableTasks = tasks.filter(
        (task) =>
            task.status !== "COMPLETED" || task.id === session?.taskId,
    )
    const maxDailyFocus = Math.max(
        1,
        ...(summary?.daily.map((day) => day.focusSeconds) ?? []),
    )
    const phaseLabel =
        clock?.phase === "FOCUS"
            ? "Tiempo de enfoque"
            : clock?.phase === "BREAK"
              ? session?.breakType === "LONG"
                  ? "Descanso largo"
                  : "Descanso corto"
              : "Listo para enfocar"
    const visiblePhaseLabel = isPaused
        ? `${phaseLabel} · En pausa`
        : phaseLabel

    return (
        <div className="flex w-full min-w-0 items-start justify-center p-3 text-text-primary sm:p-4 md:p-6 xl:p-6">
            <div className="grid w-full min-w-0 max-w-4xl grid-cols-1 gap-5 md:grid-cols-2">
                <section className="min-w-0 rounded-2xl bg-surface p-4 sm:p-6">
                    <span className="block text-xs font-semibold uppercase tracking-wider text-text-secondary">
                        Vista General
                    </span>
                    <h1 className="mt-1 mb-6 text-2xl font-bold sm:text-3xl">
                        Tu Progreso
                    </h1>

                    <div className="mb-6 grid grid-cols-2 gap-3">
                        {stats.map((stat) => (
                            <div
                                key={stat.label}
                                className="
                                    flex h-20 min-w-0 w-full flex-col justify-between
                                    rounded-xl bg-card p-3 ring ring-border
                                    sm:h-24 sm:p-4
                                "
                            >
                                <span className="text-3xl font-bold">
                                    {stat.value}
                                </span>
                                <span className="text-xs text-text-secondary">
                                    {stat.label}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="mb-8">
                        <div className="mb-2 flex justify-between text-xs font-medium">
                            <span>Progreso de Tareas</span>
                            <span className="text-text-secondary">
                                {taskProgress}%
                            </span>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-card">
                            <div
                                className="h-full bg-now transition-[width] duration-300"
                                style={{ width: `${taskProgress}%` }}
                            />
                        </div>
                    </div>

                    <div className="mb-6">
                        <h2 className="mb-3 text-sm font-semibold">
                            Distribución Eisenhower
                        </h2>
                        <div className="space-y-2">
                            {(
                                Object.keys(
                                    quadrantLabels,
                                ) as TaskQuadrant[]
                            ).map((quadrant) => (
                                <div
                                    key={quadrant}
                                    className={`
                                        flex items-center justify-between rounded-lg
                                        border-l-4 bg-card p-3 text-sm
                                        ${quadrantBorders[quadrant]}
                                    `}
                                >
                                    <span className="font-medium">
                                        {quadrantLabels[quadrant]}
                                    </span>
                                    <span className="rounded-full px-2 py-0.5 text-xs font-bold text-text-secondary">
                                        {
                                            tasks.filter(
                                                (task) =>
                                                    task.quadrant === quadrant,
                                            ).length
                                        }
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                        {taskDateStats.map((stat) => (
                            <div
                                key={stat.label}
                                className="rounded-lg bg-card py-3 text-center ring ring-border"
                            >
                                <div className="mb-1 text-sm font-bold">
                                    {stat.value}
                                </div>
                                <div className="text-[10px] font-medium text-text-secondary">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <div className="flex min-w-0 flex-col gap-5">
                    <section className="flex flex-col items-center justify-center rounded-2xl bg-surface p-4 sm:p-6">
                        <span className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
                            {visiblePhaseLabel}
                        </span>

                        <div className="relative mt-3 flex h-40 w-40 items-center justify-center sm:h-48 sm:w-48">
                            <svg
                                className="h-full w-full -rotate-90"
                                viewBox="0 0 100 100"
                                aria-hidden="true"
                            >
                                <circle
                                    cx="50"
                                    cy="50"
                                    r="42"
                                    stroke="var(--card)"
                                    strokeWidth="6"
                                    fill="transparent"
                                />
                                <circle
                                    cx="50"
                                    cy="50"
                                    r="42"
                                    stroke="var(--primary)"
                                    strokeWidth="6"
                                    fill="transparent"
                                    strokeDasharray={circumference}
                                    strokeDashoffset={
                                        circumference *
                                        (1 - timerProgress)
                                    }
                                    strokeLinecap="round"
                                    className="transition-[stroke-dashoffset] duration-500"
                                />
                            </svg>
                            <span
                                aria-live="polite"
                                className="absolute text-3xl font-bold tracking-wider"
                            >
                                {formatTimer(remainingSeconds)}
                            </span>
                        </div>

                        <label className="mt-5 w-full max-w-64 text-xs text-text-secondary">
                            Tarea
                            <select
                                key={
                                    isLoading || areTasksLoading
                                        ? "pomodoro-loading"
                                        : "pomodoro-ready"
                                }
                                value={session?.taskId ?? selectedTaskId}
                                disabled={
                                    isLoading ||
                                    areTasksLoading ||
                                    session !== null ||
                                    pendingAction !== null
                                }
                                onChange={(event) =>
                                    setSelectedTaskId(event.target.value)
                                }
                                className="
                                    mt-1.5 w-full rounded-lg border border-border
                                    bg-card px-3 py-2 text-xs text-text-primary
                                    disabled:opacity-60
                                "
                            >
                                <option value="">
                                    {isLoading
                                        ? "Cargando historial…"
                                        : areTasksLoading
                                          ? "Cargando tareas…"
                                          : "Sesión libre"}
                                </option>
                                {availableTasks.map((task) => (
                                    <option key={task.id} value={task.id}>
                                        {task.title}
                                    </option>
                                ))}
                            </select>
                            {!session &&
                                !isLoading &&
                                !areTasksLoading && (
                                    <span className="mt-1 block text-[10px]">
                                        Elige la tarea antes de iniciar.
                                    </span>
                                )}
                        </label>

                        {activeTask && (
                            <p className="mt-2 max-w-64 truncate text-xs text-accent">
                                Enfoque actual: {activeTask.title}
                            </p>
                        )}

                        <div className="mt-4 w-full max-w-64">
                            <span className="text-xs text-text-secondary">
                                Tipo de cronómetro
                            </span>
                            <div className="mt-1.5 grid grid-cols-2 rounded-lg bg-card p-1 ring ring-border">
                                {(
                                    [
                                        ["AUTO", "Automático"],
                                        ["SINGLE", "Una sesión"],
                                    ] as const
                                ).map(([value, label]) => (
                                    <button
                                        key={value}
                                        type="button"
                                        disabled={
                                            session !== null ||
                                            pendingAction !== null
                                        }
                                        onClick={() =>
                                            setTimerMode(value)
                                        }
                                        className={`
                                            rounded-md px-2 py-1.5 text-[11px]
                                            font-semibold transition-colors
                                            disabled:cursor-not-allowed
                                            ${
                                                timerMode === value
                                                    ? "bg-primary text-text-primary"
                                                    : "text-text-secondary"
                                            }
                                        `}
                                    >
                                        {label}
                                    </button>
                                ))}
                            </div>
                            <p className="mt-1.5 text-[10px] text-text-secondary">
                                {timerMode === "AUTO"
                                    ? `${settings?.focusMinutes ?? 25} min de trabajo · ${settings?.shortBreakMinutes ?? 5} min de descanso · reinicio automático`
                                    : "Finaliza después de un ciclo de trabajo y descanso."}
                            </p>
                        </div>

                        <label className="mt-3 flex w-full max-w-64 items-center justify-between text-xs text-text-secondary">
                            Avisos sonoros sutiles
                            <input
                                type="checkbox"
                                checked={soundEnabled}
                                onChange={(event) =>
                                    void toggleSound(
                                        event.target.checked,
                                    )
                                }
                                className="themed-checkbox"
                            />
                        </label>

                        {error && (
                            <p
                                role="alert"
                                className="mt-3 text-center text-xs text-error"
                            >
                                {error}
                            </p>
                        )}

                        {!session ? (
                            <button
                                type="button"
                                disabled={
                                    isLoading ||
                                    !settings ||
                                    pendingAction !== null
                                }
                                onClick={() => void start(selectedTaskId)}
                                className="
                                    mt-5 min-w-36 rounded-lg bg-primary px-5 py-2.5
                                    text-sm font-semibold disabled:cursor-wait
                                    disabled:opacity-50
                                "
                            >
                                {pendingAction === "start"
                                    ? "Iniciando…"
                                    : "Iniciar"}
                            </button>
                        ) : (
                            <div className="mt-5 flex flex-col items-center">
                                <div className="flex gap-4">
                                    <button
                                        type="button"
                                        aria-label={
                                            isPaused
                                                ? "Reanudar sesión"
                                                : "Pausar sesión"
                                        }
                                        title={
                                            isPaused
                                                ? "Reanudar"
                                                : "Pausar"
                                        }
                                        disabled={pendingAction !== null}
                                        onClick={
                                            isPaused ? resume : pause
                                        }
                                        className="grid size-11 place-items-center rounded-full bg-card ring ring-border disabled:opacity-50"
                                    >
                                        {isPaused ? (
                                            <span
                                                aria-hidden="true"
                                                className="ml-0.5 block h-0 w-0 border-y-[7px] border-l-11 border-y-transparent border-l-current"
                                            />
                                        ) : (
                                            <IconPause />
                                        )}
                                    </button>
                                    <button
                                        type="button"
                                        aria-label="Finalizar sesión"
                                        title="Finalizar y guardar progreso"
                                        disabled={pendingAction !== null}
                                        onClick={() =>
                                            void interrupt()
                                        }
                                        className="grid size-11 place-items-center rounded-full bg-card ring ring-border disabled:opacity-50"
                                    >
                                        <IconStop />
                                    </button>
                                </div>
                                <button
                                    type="button"
                                    disabled={pendingAction !== null}
                                    onClick={() => void cancel()}
                                    className="mt-3 text-[10px] text-text-secondary underline-offset-2 hover:underline disabled:opacity-50"
                                >
                                    Cancelar sin guardar
                                </button>
                            </div>
                        )}

                        {pendingAction === "complete" && (
                            <p
                                role="status"
                                className="mt-3 text-xs text-text-secondary"
                            >
                                Guardando sesión…
                            </p>
                        )}
                    </section>

                    <section className="min-h-50 flex-1 rounded-2xl bg-surface p-4 sm:p-6">
                        <span className="block text-xs font-semibold uppercase tracking-wider text-text-secondary">
                            Últimos 7 días
                        </span>
                        <div className="flex items-end justify-between gap-3">
                            <div>
                                <h2 className="mt-1 text-xl font-bold">
                                    Historial Pomodoro
                                </h2>
                                <span className="mt-1 block text-2xl font-semibold text-accent">
                                    {formatFocusDuration(
                                        summary?.period.focusSeconds ?? 0,
                                    )}
                                </span>
                            </div>
                            <span className="text-right text-[10px] text-text-secondary">
                                {summary?.period.completedSessions ?? 0}
                                <br />
                                completadas
                            </span>
                        </div>
                        <hr className="mt-4 border-border" />

                        <div className="mt-5 flex h-24 items-end justify-between gap-2">
                            {summary?.daily.map((day) => (
                                <div
                                    key={day.date}
                                    className="flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-1.5"
                                    title={formatFocusDuration(
                                        day.focusSeconds,
                                    )}
                                >
                                    <div
                                        className="w-full max-w-5 rounded-t bg-primary/80"
                                        style={{
                                            height:
                                                day.focusSeconds > 0
                                                    ? `${Math.max(
                                                          8,
                                                          (day.focusSeconds /
                                                              maxDailyFocus) *
                                                              100,
                                                      )}%`
                                                    : "2px",
                                        }}
                                    />
                                    <span className="text-[9px] text-text-secondary">
                                        {weekdayLabel(day.date)}
                                    </span>
                                </div>
                            ))}
                            {!summary?.daily.length && (
                                <p className="m-auto text-xs text-text-secondary">
                                    Sin sesiones todavía
                                </p>
                            )}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}
