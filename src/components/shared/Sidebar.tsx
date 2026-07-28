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
            bg-surface xl:w-87.5 flex-col justify-between
            px-3.75 py-6.25 gap-5
        ">
            <div className="no-scrollbar flex min-h-0 max-h-220 flex-1 flex-col items-center gap-2.5 overflow-y-auto rounded-xl">
                {isLoading && (
                    <p role="status" className="text-xs text-text-secondary">
                        Cargando tareas…
                    </p>
                )}
                {error && (
                    <p role="alert" className="text-xs text-error">
                        {error}
                    </p>
                )}
                {sections.map((section) => (
                    <div
                        key={section.quadrant}
                        className="contents"
                    >
                        <div
                            className={`w-full max-w-75 shrink-0 rounded-sm py-0.5 text-center text-[13px] text-text-primary ${section.color}`}
                        >
                            {section.label}
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
