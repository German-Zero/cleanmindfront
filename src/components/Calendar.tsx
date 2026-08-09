"use client"

import { useMemo, useState } from "react"
import CalendarRewardDecoration from "@/features/rewards/effects/CalendarRewardDecoration"
import ViewTaskCalendarModal from "./modals/ViewTaskCalendar"
import IconLeftArrow from "./ui/icons/IconLeftArrow"
import IconRigthArrow from "./ui/icons/IconRigthArrow"
import {
    buildCalendarDays,
    buildWeekDays,
    shiftDate,
    shiftMonth,
    taskDueDateKey,
    toDateKey,
} from "@/features/tasks/calendar"
import { useTasks } from "@/features/tasks/TasksProvider"
import NewTaskButton from "@/features/tasks/components/NewTaskButton"
import type { Task, TaskQuadrant } from "@/features/tasks/types"

type CalendarView = "month" | "week" | "day"

const calendarViews: Array<{ value: CalendarView; label: string }> = [
    { value: "month", label: "Mes" },
    { value: "week", label: "Semana" },
    { value: "day", label: "Día" },
]

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

function dateFromKey(dateKey: string): Date {
    const [year, month, day] = dateKey.split("-").map(Number)
    return new Date(year, month - 1, day)
}

function visibleDateLabel(
    view: CalendarView,
    visibleDate: Date,
    weekDateKeys: string[],
): string {
    if (view === "month") {
        return capitalize(
            new Intl.DateTimeFormat("es-AR", {
                month: "long",
                year: "numeric",
            }).format(visibleDate),
        )
    }

    if (view === "day") {
        return capitalize(
            new Intl.DateTimeFormat("es-AR", {
                weekday: "long",
                day: "numeric",
                month: "long",
            }).format(visibleDate),
        )
    }

    const start = dateFromKey(weekDateKeys[0])
    const end = dateFromKey(weekDateKeys[weekDateKeys.length - 1])
    const sameMonth =
        start.getMonth() === end.getMonth() &&
        start.getFullYear() === end.getFullYear()

    if (sameMonth) {
        const monthAndYear = new Intl.DateTimeFormat("es-AR", {
            month: "long",
            year: "numeric",
        }).format(end)

        return capitalize(`${start.getDate()}–${end.getDate()} de ${monthAndYear}`)
    }

    const shortDate = new Intl.DateTimeFormat("es-AR", {
        day: "numeric",
        month: "short",
    })
    const endDate = new Intl.DateTimeFormat("es-AR", {
        day: "numeric",
        month: "short",
        year: "numeric",
    })

    return capitalize(`${shortDate.format(start)} – ${endDate.format(end)}`)
}

export function Calendar() {
    const { tasks, isLoading, error } = useTasks()
    const [view, setView] = useState<CalendarView>("month")
    const [visibleDate, setVisibleDate] = useState(() => new Date())
    const [taskPreview, setTaskPreview] = useState<TaskPreview | null>(null)
    const monthDays = useMemo(
        () => buildCalendarDays(visibleDate),
        [visibleDate],
    )
    const weekDays = useMemo(
        () => buildWeekDays(visibleDate),
        [visibleDate],
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
    const visibleLabel = visibleDateLabel(
        view,
        visibleDate,
        weekDays.map((day) => day.dateKey),
    )
    const visibleDayTasks = tasksByDate.get(toDateKey(visibleDate)) ?? []

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

    const showDay = (dateKey: string) => {
        setVisibleDate(dateFromKey(dateKey))
        setTaskPreview(null)
        setView("day")
    }

    const moveCalendar = (amount: number) => {
        setTaskPreview(null)
        setVisibleDate((current) => {
            if (view === "month") return shiftMonth(current, amount)
            return shiftDate(current, amount * (view === "week" ? 7 : 1))
        })
    }

    const renderTask = (task: Task, expanded = false) => (
        <button
            key={task.id}
            type="button"
            aria-describedby={
                taskPreview?.task.id === task.id
                    ? "calendar-task-preview"
                    : undefined
            }
            onMouseEnter={(event) =>
                showTaskPreview(task, event.currentTarget)
            }
            onMouseLeave={() => setTaskPreview(null)}
            onFocus={(event) => showTaskPreview(task, event.currentTarget)}
            onBlur={() => setTaskPreview(null)}
            onClick={(event) => showTaskPreview(task, event.currentTarget)}
            onKeyDown={(event) => {
                if (event.key === "Escape") {
                    setTaskPreview(null)
                    event.currentTarget.blur()
                }
            }}
            className={`
                w-full text-left focus-visible:outline-2
                focus-visible:outline-offset-1 focus-visible:outline-accent
                ${
                    expanded
                        ? "min-h-12 rounded-lg px-2.5 py-2"
                        : "truncate rounded-sm px-0.5 py-0.5 text-[8px] leading-2.5 sm:px-1 sm:text-[9px] sm:leading-2.75 xl:rounded-md xl:px-1.5 xl:text-[9px] xl:leading-normal 2xl:px-2 2xl:py-1 2xl:text-[10px]"
                }
                ${taskColors[task.quadrant]}
                ${task.status === "COMPLETED" ? "line-through opacity-60" : ""}
            `}
        >
            {expanded ? (
                <>
                    <span className="block truncate text-[12px] font-semibold">
                        {task.title}
                    </span>
                    <span className="mt-0.5 block truncate text-[10px] opacity-78">
                        {task.description || "Sin descripción"}
                    </span>
                </>
            ) : (
                task.title
            )}
        </button>
    )

    return (
        <div className="h-full min-h-144 w-full min-w-0 max-w-7xl xl:h-auto xl:min-h-0">
            <div className="calendar-decoration-surface relative isolate flex h-full w-full flex-col overflow-hidden bg-transparent px-1 sm:px-2 xl:h-auto xl:rounded-2xl xl:border xl:border-border/65 xl:bg-surface/94 xl:px-8 xl:py-6 xl:shadow-[0_18px_48px_rgb(0_0_0/14%)] 2xl:px-10.5 2xl:py-7">
                <CalendarRewardDecoration />
                <div className="relative z-1 mx-auto flex h-full min-h-0 w-full flex-col gap-1 sm:gap-2 xl:h-auto xl:gap-4">
                    <header className="grid shrink-0 grid-cols-[minmax(0,1fr)_auto] items-center gap-x-2 gap-y-1.5 px-1 py-2 xl:grid-cols-[1fr_auto_1fr] xl:px-0 xl:py-0">
                        <div className="flex min-w-0 items-center gap-1 pl-13 sm:gap-2 sm:pl-14 xl:pl-0">
                            <button
                                type="button"
                                aria-label={
                                    view === "month"
                                        ? "Mes anterior"
                                        : view === "week"
                                          ? "Semana anterior"
                                          : "Día anterior"
                                }
                                onClick={() => moveCalendar(-1)}
                                className="calm-icon-button shrink-0"
                            >
                                <IconLeftArrow />
                            </button>
                            <h1
                                aria-live="polite"
                                className="min-w-0 truncate px-1 text-center text-[14px] font-semibold text-text-primary sm:text-[16px] xl:text-[22px]"
                            >
                                {visibleLabel}
                            </h1>
                            <button
                                type="button"
                                aria-label={
                                    view === "month"
                                        ? "Mes siguiente"
                                        : view === "week"
                                          ? "Semana siguiente"
                                          : "Día siguiente"
                                }
                                onClick={() => moveCalendar(1)}
                                className="calm-icon-button shrink-0"
                            >
                                <IconRigthArrow />
                            </button>
                        </div>

                        <div
                            role="group"
                            aria-label="Vista del calendario"
                            className="col-span-2 row-start-2 grid min-h-10.5 grid-cols-3 rounded-xl border border-border/70 bg-background/45 p-1 shadow-[inset_0_1px_0_rgb(255_255_255/4%)] xl:col-span-1 xl:col-start-2 xl:row-start-1 xl:min-w-62.5"
                        >
                            {calendarViews.map((option) => (
                                <button
                                    key={option.value}
                                    type="button"
                                    aria-pressed={view === option.value}
                                    onClick={() => {
                                        setTaskPreview(null)
                                        setView(option.value)
                                    }}
                                    className={`
                                        min-h-8.5 min-w-0 rounded-lg border px-3
                                        text-[11px] font-semibold
                                        transition-[background-color,border-color,color,box-shadow] duration-150
                                        focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2
                                        focus-visible:ring-primary/70 focus-visible:ring-offset-2
                                        focus-visible:ring-offset-background
                                        ${
                                            view === option.value
                                                ? "border-primary/70 bg-primary text-text-primary shadow-[0_4px_12px_rgb(0_0_0/18%)]"
                                                : "border-transparent text-text-secondary hover:border-border/70 hover:bg-card-hover/75 hover:text-text-primary"
                                        }
                                    `}
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>

                        <div className="col-start-2 row-start-1 justify-self-end xl:col-start-3">
                            <NewTaskButton className="calm-icon-button bg-card text-text-primary" />
                        </div>
                    </header>

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

                    {view === "month" && (
                        <div className="flex min-h-0 flex-1 flex-col gap-y-1 xl:flex-none xl:gap-y-2">
                            <div className="grid shrink-0 grid-cols-7 gap-0.5 sm:gap-1 xl:gap-2">
                                {weekdays.map((weekday) => (
                                    <div
                                        key={weekday}
                                        aria-label={weekday}
                                        className="py-1.25 text-center text-[8px] font-semibold text-text-secondary sm:text-[10px] xl:text-[11px]"
                                    >
                                        <span className="xl:hidden" aria-hidden="true">
                                            {weekday.slice(0, 3).toLowerCase()}.
                                        </span>
                                        <span className="hidden xl:inline" aria-hidden="true">
                                            {weekday}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="grid min-h-0 flex-1 grid-cols-7 grid-rows-6 gap-0.5 sm:gap-1 xl:flex-none xl:grid-rows-none xl:auto-rows-[minmax(72px,1fr)] xl:gap-2 2xl:auto-rows-[minmax(90px,1fr)]">
                                {monthDays.map((day) => (
                                    <div
                                        key={day.dateKey}
                                        className={`
                                            relative flex min-h-0 min-w-0 flex-col
                                            justify-start overflow-hidden rounded-md
                                            border border-border/55 p-1
                                            sm:p-1.5 xl:rounded-[10px] xl:p-2
                                            ${day.isCurrentMonth ? "bg-card/62" : "bg-card/14"}
                                        `}
                                    >
                                        <div className="flex items-start justify-center xl:justify-between">
                                            <button
                                                type="button"
                                                aria-label={`Ver ${day.dateKey}`}
                                                aria-current={day.isToday ? "date" : undefined}
                                                onClick={() => showDay(day.dateKey)}
                                                className={`
                                                    inline-grid h-5.5 min-w-5.5
                                                    place-items-center rounded-full px-1
                                                    text-[12px] font-medium
                                                    sm:h-6 sm:min-w-6 sm:text-[13px]
                                                    xl:text-[12px]
                                                    ${day.isCurrentMonth ? "text-secondary" : "text-text-secondary"}
                                                    ${day.isToday ? "bg-primary text-text-primary" : "hover:bg-card-hover"}
                                                `}
                                            >
                                                {day.dayNumber}
                                            </button>
                                        </div>

                                        <div className="z-10 mt-1 w-full space-y-0.5 xl:mt-2 xl:space-y-1">
                                            {tasksByDate
                                                .get(day.dateKey)
                                                ?.map((task) => renderTask(task))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {view === "week" && (
                        <div className="no-scrollbar grid min-h-0 flex-1 grid-cols-1 gap-2 overflow-y-auto pb-1 xl:grid-cols-7 xl:overflow-hidden xl:pb-0">
                            {weekDays.map((day, index) => {
                                const dayTasks = tasksByDate.get(day.dateKey) ?? []

                                return (
                                    <section
                                        key={day.dateKey}
                                        aria-label={`${weekdays[index]}, ${day.dayNumber}`}
                                        className={`
                                            flex min-h-28 min-w-0 flex-col
                                            rounded-xl border p-2.5
                                            xl:min-h-120 xl:p-2
                                            ${
                                                day.isToday
                                                    ? "border-primary/65 bg-primary/8"
                                                    : "border-border/55 bg-card/48"
                                            }
                                        `}
                                    >
                                        <button
                                            type="button"
                                            aria-current={day.isToday ? "date" : undefined}
                                            onClick={() => showDay(day.dateKey)}
                                            className="flex items-center justify-between rounded-lg px-1 py-0.5 text-left hover:bg-card-hover/55 xl:flex-col xl:items-start xl:gap-0.75"
                                        >
                                            <span className="text-[10px] font-semibold uppercase tracking-[0.7px] text-text-secondary">
                                                {weekdays[index].slice(0, 3)}
                                            </span>
                                            <span
                                                className={`grid h-7 min-w-7 place-items-center rounded-full px-1.25 text-[14px] font-semibold ${
                                                    day.isToday
                                                        ? "bg-primary text-text-primary"
                                                        : "text-text-primary"
                                                }`}
                                            >
                                                {day.dayNumber}
                                            </span>
                                        </button>

                                        <div className="no-scrollbar mt-2 flex min-h-0 flex-1 flex-col gap-1.5 overflow-y-auto">
                                            {dayTasks.length > 0 ? (
                                                dayTasks.map((task) => renderTask(task, true))
                                            ) : (
                                                <p className="m-auto py-2.5 text-center text-[10px] text-text-secondary/70">
                                                    Sin tareas
                                                </p>
                                            )}
                                        </div>
                                    </section>
                                )
                            })}
                        </div>
                    )}

                    {view === "day" && (
                        <section className="mx-auto flex min-h-0 w-full max-w-190 flex-1 flex-col overflow-hidden rounded-[14px] border border-border/60 bg-card/48">
                            <div className="flex items-center justify-between border-b border-border/55 px-4 py-3.5">
                                <div>
                                    <p className="text-[10px] font-semibold uppercase tracking-[1px] text-text-secondary">
                                        Agenda del día
                                    </p>
                                    <p className="mt-0.75 text-[13px] text-text-primary">
                                        {visibleDayTasks.length}{" "}
                                        {visibleDayTasks.length === 1 ? "tarea" : "tareas"}
                                    </p>
                                </div>
                                {toDateKey(visibleDate) === toDateKey(new Date()) && (
                                    <span className="rounded-full bg-primary/18 px-2.25 py-1 text-[10px] font-semibold text-accent">
                                        Hoy
                                    </span>
                                )}
                            </div>

                            <div className="no-scrollbar flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto p-3 sm:p-4">
                                {visibleDayTasks.length > 0 ? (
                                    visibleDayTasks.map((task) => renderTask(task, true))
                                ) : (
                                    <div className="m-auto max-w-[320px] px-5 py-8 text-center">
                                        <p className="text-[14px] font-semibold text-text-primary">
                                            Día despejado
                                        </p>
                                        <p className="mt-1.25 text-[11px] leading-4.25 text-text-secondary">
                                            No tienes tareas programadas para esta fecha.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </section>
                    )}
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
                    className="pointer-events-none fixed z-60 w-100 max-w-[calc(100vw-24px)] drop-shadow-2xl"
                >
                    <ViewTaskCalendarModal task={taskPreview.task} />
                </aside>
            )}
        </div>
    )
}
