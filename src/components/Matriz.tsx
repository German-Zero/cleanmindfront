"use client"

import { useTasks } from "@/features/tasks/TasksProvider"
import type { TaskQuadrant } from "@/features/tasks/types"

const quadrants: Array<{
    quadrant: TaskQuadrant
    label: string
    description: string
    accent: string
    text: string
    border: string
}> = [
    {
        quadrant: "DO",
        label: "Hacer ahora",
        description: "Urgente e importante",
        accent: "bg-now",
        text: "text-now",
        border: "border-now",
    },
    {
        quadrant: "PLAN",
        label: "Planificar",
        description: "Importante, no urgente",
        accent: "bg-plan",
        text: "text-plan",
        border: "border-plan",
    },
    {
        quadrant: "DELEGATE",
        label: "Delegar",
        description: "Urgente, no importante",
        accent: "bg-delegate",
        text: "text-delegate",
        border: "border-delegate",
    },
    {
        quadrant: "DELETE",
        label: "Eliminar",
        description: "No urgente ni importante",
        accent: "bg-delete",
        text: "text-delete",
        border: "border-delete",
    },
]

export default function Matriz() {
    const { tasks, isLoading, error } = useTasks()

    return (
        <section
            aria-labelledby="eisenhower-matrix-title"
            className="
                calm-panel flex w-full max-w-250 flex-col gap-4.5
                p-3.5 text-text-primary sm:p-5.5
                xl:h-187.5 xl:min-h-0 xl:shrink-0
            "
        >
            <header className="flex flex-col gap-1 px-1 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <p className="calm-eyebrow">
                        Prioridades
                    </p>
                    <h1
                        id="eisenhower-matrix-title"
                        className="mt-1 text-[24px] font-semibold sm:text-[30px]"
                    >
                        Matriz de Eisenhower
                    </h1>
                </div>
                <p className="text-xs text-text-secondary">
                    {tasks.length} {tasks.length === 1 ? "tarea" : "tareas"}
                </p>
            </header>

            {(isLoading || error) && (
                <p
                    role={error ? "alert" : "status"}
                    className={`calm-feedback ${
                        error ? "text-error" : "text-text-secondary"
                    }`}
                >
                    {error ?? "Cargando tareas…"}
                </p>
            )}

            <div className="grid min-h-0 flex-1 grid-cols-1 gap-3 md:grid-cols-2">
                {quadrants.map((section) => {
                    const quadrantTasks = tasks.filter(
                        (task) => task.quadrant === section.quadrant,
                    )

                    return (
                        <section
                            key={section.quadrant}
                            aria-labelledby={`quadrant-${section.quadrant}`}
                            className="
                                relative flex min-h-64 min-w-0 flex-col
                                overflow-hidden rounded-xl border border-border/60
                                bg-card/56 xl:min-h-0
                            "
                        >
                            <div
                                className={`absolute inset-y-3 left-0 w-0.75 rounded-full opacity-75 ${section.accent}`}
                            />

                            <header className="flex items-start justify-between gap-3 border-b border-border/55 px-5 py-4">
                                <div>
                                    <h2
                                        id={`quadrant-${section.quadrant}`}
                                        className={`text-sm font-semibold ${section.text}`}
                                    >
                                        {section.label}
                                    </h2>
                                    <p className="mt-1 text-[10px] leading-4 text-text-secondary">
                                        {section.description}
                                    </p>
                                </div>
                                <span className="grid min-w-7 place-items-center rounded-full border border-border/55 bg-surface/65 px-2 py-1 text-[10px] text-text-secondary">
                                    {quadrantTasks.length}
                                </span>
                            </header>

                            <div className="no-scrollbar flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto p-4 pl-5">
                                {quadrantTasks.length === 0 && !isLoading && (
                                    <p className="m-auto text-xs text-text-secondary">
                                        Sin tareas
                                    </p>
                                )}

                                {quadrantTasks.map((task) => (
                                    <article
                                        key={task.id}
                                        className={`
                                            rounded-[9px] border border-border/45 border-l-2
                                            bg-surface/62 px-3 py-2.5 ${section.border}
                                            ${task.status === "COMPLETED" ? "opacity-55" : ""}
                                        `}
                                    >
                                        <h3
                                            className={`truncate text-xs font-medium ${
                                                task.status === "COMPLETED"
                                                    ? "line-through"
                                                    : ""
                                            }`}
                                        >
                                            {task.title}
                                        </h3>
                                        {task.description && (
                                            <p className="mt-1 line-clamp-1 text-[10px] text-text-secondary">
                                                {task.description}
                                            </p>
                                        )}
                                    </article>
                                ))}
                            </div>
                        </section>
                    )
                })}
            </div>
        </section>
    )
}
