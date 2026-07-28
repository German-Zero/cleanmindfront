"use client"

import { useTasks } from "@/features/tasks/TasksProvider";
import type { TaskQuadrant } from "@/features/tasks/types";
import Task from "./Task";
import UserCard from "./UserCard";

const sections: Array<{
    quadrant: TaskQuadrant
    label: string
    color: string
}> = [
    { quadrant: "DO", label: "Hacer", color: "bg-now" },
    { quadrant: "PLAN", label: "Planificar", color: "bg-plan" },
    { quadrant: "DELEGATE", label: "Delegar", color: "bg-delegate" },
    { quadrant: "DELETE", label: "Eliminar", color: "bg-delete" },
]

interface SidebarProps {
    onOpenSettings: () => void
}

export default function Sidebar({ onOpenSettings }: SidebarProps) {
    const { tasks, isLoading, error } = useTasks()

    return (
        <aside className="
            flex h-dvh w-[min(350px,calc(100vw-48px))] shrink-0
            flex-col justify-between gap-5 border-r border-border/65
            bg-surface/96 px-3.5 py-4.5 xl:w-87.5
        ">
            <div className="no-scrollbar flex min-h-0 flex-1 flex-col items-center gap-2 overflow-y-auto rounded-xl">
                {isLoading && (
                    <p role="status" className="calm-feedback w-full text-text-secondary">
                        Cargando tareas…
                    </p>
                )}
                {error && (
                    <p role="alert" className="calm-feedback w-full text-error">
                        {error}
                    </p>
                )}
                {sections.map((section) => (
                    <div
                        key={section.quadrant}
                        className="contents"
                    >
                        <div className="mt-1.5 flex w-full max-w-[320px] shrink-0 items-center gap-2 px-0.75 py-1.25">
                            <span
                                aria-hidden="true"
                                className={`size-1.75 rounded-full ${section.color}`}
                            />
                            <span className="text-[10px] font-semibold uppercase tracking-[1.3px] text-text-secondary">
                                {section.label}
                            </span>
                        </div>
                        {tasks
                            .filter(
                                (task) =>
                                    task.quadrant === section.quadrant,
                            )
                            .map((task) => (
                                <Task key={task.id} task={task} />
                            ))}
                    </div>
                ))}
            </div>
            <UserCard onOpenSettings={onOpenSettings} />
        </aside>
    )
}
