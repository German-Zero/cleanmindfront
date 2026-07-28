"use client"

import { useMemo, useState } from "react"
import ViewTaskCalendarModal from "./modals/ViewTaskCalendar"
import IconLeftArrow from "./ui/icons/IconLeftArrow"
import IconRigthArrow from "./ui/icons/IconRigthArrow"
import {
    buildCalendarDays,
    shiftMonth,
    taskDueDateKey,
} from "@/features/tasks/calendar"
import { useTasks } from "@/features/tasks/TasksProvider"
import NewTaskButton from "@/features/tasks/components/NewTaskButton"
import type { Task, TaskQuadrant } from "@/features/tasks/types"

const weekdays = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
]

const taskColors: Record<TaskQuadrant, string> = {
    DO: "bg-now/82 text-white font-medium",
    PLAN: "bg-plan/82 text-white",
    DELEGATE: "bg-delegate/82 text-white",
    DELETE: "bg-delete/72 text-white",
}

interface TaskPreview {
    task: Task
    top: number
    left: number
    placeAbove: boolean
}

function capitalize(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1)
}

export function Calendar() {
    const { tasks, isLoading, error } = useTasks()
    const [taskPreview, setTaskPreview] = useState<TaskPreview | null>(null)
    const [visibleMonth, setVisibleMonth] = useState(
        () => new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    )
    const days = useMemo(
        () => buildCalendarDays(visibleMonth),
        [visibleMonth],
    )
    const tasksByDate = useMemo(() => {
        const grouped = new Map<string, typeof tasks>()

        for (const task of tasks) {
            const dateKey = taskDueDateKey(task.dueDate)
            if (!dateKey) continue
            grouped.set(dateKey, [...(grouped.get(dateKey) ?? []), task])
        }

        return grouped
    }, [tasks])
    const mobileMonth = capitalize(
        new Intl.DateTimeFormat("es-AR", { month: "long" }).format(
            visibleMonth,
        ),
    )
    const desktopMonth = capitalize(
        new Intl.DateTimeFormat("es-AR", {
            month: "long",
            year: "numeric",
        }).format(visibleMonth),
    )

    const showTaskPreview = (task: Task, target: HTMLElement) => {
        const rect = target.getBoundingClientRect()
        const width = Math.min(400, window.innerWidth - 24)
        const left = Math.min(
            Math.max(12, rect.left + rect.width / 2 - width / 2),
            window.innerWidth - width - 12,
        )

        setTaskPreview({
            task,
            top:
                window.innerHeight - rect.bottom < 230
                    ? rect.top - 8
                    : rect.bottom + 8,
            left,
            placeAbove: window.innerHeight - rect.bottom < 230,
        })
    }

    return (
        <div className="h-full min-h-144 w-full min-w-0 max-w-7xl xl:h-auto xl:min-h-0">
            <div className="flex h-full w-full flex-col bg-transparent px-1 sm:px-2 xl:h-auto xl:rounded-2xl xl:border xl:border-border/65 xl:bg-surface/94 xl:px-8 xl:py-6 xl:shadow-[0_18px_48px_rgb(0_0_0/14%)] 2xl:px-10.5 2xl:py-7">
                <div className="mx-auto flex h-full min-h-0 w-full flex-col gap-1 sm:gap-2 xl:h-auto xl:gap-4">
                    <div className="flex h-16 shrink-0 items-center justify-between px-1 py-2 xl:h-auto">
                        <div className="flex items-center gap-1 pl-14 sm:gap-3 sm:pl-16 xl:pl-0">
                            <button
                                type="button"
                                aria-label="Mes anterior"
                                onClick={() =>
                                    setVisibleMonth((month) =>
                                        shiftMonth(month, -1),
                                    )
                                }
                                className="calm-icon-button"
                            >
                                <IconLeftArrow />
                            </button>
                            <h1
                                aria-live="polite"
                                className="min-w-24 text-center text-[18px] font-semibold text-text-primary xl:min-w-42.5 xl:text-[24px]"
                            >
                                <span className="xl:hidden">
                                    {mobileMonth}
                                </span>
                                <span className="hidden xl:inline">
                                    {desktopMonth}
                                </span>
                            </h1>
                            <button
                                type="button"
                                aria-label="Mes siguiente"
                                onClick={() =>
                                    setVisibleMonth((month) =>
                                        shiftMonth(month, 1),
                                    )
                                }
                                className="calm-icon-button"
                            >
                                <IconRigthArrow />
                            </button>
                        </div>
                        <NewTaskButton className="calm-icon-button bg-card text-text-primary" />
                    </div>

                    {(isLoading || error) && (
                        <p
                            role={error ? "alert" : "status"}
                            className={`calm-feedback text-center ${
                                error ? "text-error" : "text-text-secondary"
                            }`}
                        >
                            {error ?? "Cargando tareas…"}
                        </p>
                    )}

                    <div className="flex min-h-0 flex-1 flex-col gap-y-1 xl:flex-none xl:gap-y-2">
                        <div className="grid shrink-0 grid-cols-7 gap-0.5 sm:gap-1 xl:gap-2">
                            {weekdays.map((weekday) => (
                                <div
                                    key={weekday}
                                    aria-label={weekday}
                                    className="
                                        py-1.25 text-center text-[8px] font-semibold text-text-secondary
                                        sm:text-[10px]
                                        xl:text-[11px] xl:text-text-secondary
                                    "
                                >
                                    <span
                                        className="xl:hidden"
                                        aria-hidden="true"
                                    >
                                        {weekday.slice(0, 3).toLowerCase()}.
                                    </span>
                                    <span
                                        className="hidden xl:inline"
                                        aria-hidden="true"
                                    >
                                        {weekday}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="grid min-h-0 flex-1 grid-cols-7 grid-rows-6 gap-0.5 sm:gap-1 xl:flex-none xl:grid-rows-none xl:auto-rows-[minmax(72px,1fr)] xl:gap-2 2xl:auto-rows-[minmax(90px,1fr)]">
                            {days.map((day) => (
                                <div
                                    key={day.dateKey}
                                    className={`
                                        relative flex min-h-0 min-w-0 flex-col justify-start overflow-hidden
                                        rounded-md border border-border/55 p-1 sm:p-1.5
                                        xl:justify-between xl:rounded-[10px] xl:p-2
                                        ${day.isCurrentMonth ? "bg-card/62" : "bg-card/14"}
                                    `}
                                >
                                    <div className="flex items-start justify-center xl:justify-between">
                                        <span
                                            className={`
                                                inline-grid h-5 min-w-5 place-items-center px-1
                                                text-[10px] sm:h-6 sm:min-w-6 sm:text-xs
                                                ${day.isCurrentMonth ? "text-secondary" : "text-text-secondary"}
                                                ${day.isToday ? "rounded-full bg-primary text-text-primary" : ""}
                                            `}
                                        >
                                            {day.dayNumber}
                                        </span>
                                    </div>

                                    <div className="z-10 mt-1 w-full space-y-0.5 xl:mt-2 xl:space-y-1">
                                        {tasksByDate
                                            .get(day.dateKey)
                                            ?.map((task) => (
                                                <button
                                                    key={task.id}
                                                    type="button"
                                                    aria-describedby={
                                                        taskPreview?.task.id ===
                                                        task.id
                                                            ? "calendar-task-preview"
                                                            : undefined
                                                    }
                                                    onMouseEnter={(event) =>
                                                        showTaskPreview(
                                                            task,
                                                            event.currentTarget,
                                                        )
                                                    }
                                                    onMouseLeave={() =>
                                                        setTaskPreview(null)
                                                    }
                                                    onFocus={(event) =>
                                                        showTaskPreview(
                                                            task,
                                                            event.currentTarget,
                                                        )
                                                    }
                                                    onBlur={() =>
                                                        setTaskPreview(null)
                                                    }
                                                    onClick={(event) =>
                                                        showTaskPreview(
                                                            task,
                                                            event.currentTarget,
                                                        )
                                                    }
                                                    onKeyDown={(event) => {
                                                        if (
                                                            event.key ===
                                                            "Escape"
                                                        ) {
                                                            setTaskPreview(null)
                                                            event.currentTarget.blur()
                                                        }
                                                    }}
                                                    className={`
                                                w-full truncate rounded-sm px-0.5 py-0.5
                                                        text-left focus-visible:outline-2
                                                        focus-visible:outline-offset-1 focus-visible:outline-accent
                                                        text-[6px] leading-none
                                                        sm:px-1 sm:text-[8px]
                                                xl:rounded-md xl:px-1.5 xl:text-[9px] xl:leading-normal
                                                2xl:px-2 2xl:py-1 2xl:text-[10px]
                                                        ${taskColors[task.quadrant]}
                                                        ${task.status === "COMPLETED" ? "line-through opacity-60" : ""}
                                                    `}
                                                >
                                                    {task.title}
                                                </button>
                                            ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {taskPreview && (
                <aside
                    id="calendar-task-preview"
                    role="tooltip"
                    style={{
                        top: taskPreview.top,
                        left: taskPreview.left,
                        transform: taskPreview.placeAbove
                            ? "translateY(-100%)"
                            : undefined,
                    }}
                    className="
                        pointer-events-none fixed z-60 w-100
                        max-w-[calc(100vw-24px)] drop-shadow-2xl
                    "
                >
                    <ViewTaskCalendarModal task={taskPreview.task} />
                </aside>
            )}
        </div>
    )
}
