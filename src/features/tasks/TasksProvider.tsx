"use client"

import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react"
import { tasksService } from "./services/tasks.service"
import type {
    CreateTaskRequest,
    Task,
    UpdateTaskRequest,
} from "./types"

interface TasksContextValue {
    tasks: Task[]
    isLoading: boolean
    error: string | null
    createTask: (request: CreateTaskRequest) => Promise<Task>
    updateTask: (id: string, request: UpdateTaskRequest) => Promise<Task>
    deleteTask: (id: string) => Promise<void>
    startTask: (id: string) => Promise<void>
    toggleTaskCompleted: (task: Task) => Promise<void>
}

const TasksContext = createContext<TasksContextValue | null>(null)

export function TasksProvider({
    children,
    initialTasks,
}: {
    children: ReactNode
    initialTasks: Task[]
}) {
    const [tasks, setTasks] = useState<Task[]>(initialTasks)
    const [completedTask, setCompletedTask] = useState<Task | null>(null)

    useEffect(() => {
        if (!completedTask) return

        const timeout = window.setTimeout(
            () => setCompletedTask(null),
            5000,
        )
        return () => window.clearTimeout(timeout)
    }, [completedTask])

    const createTask = async (request: CreateTaskRequest) => {
        const task = await tasksService.create(request)
        setTasks((current) => [task, ...current])
        return task
    }

    const updateTask = async (
        id: string,
        request: UpdateTaskRequest,
    ) => {
        const updated = await tasksService.update(id, request)
        setTasks((current) =>
            current.map((task) => (task.id === updated.id ? updated : task)),
        )
        return updated
    }

    const deleteTask = async (id: string) => {
        await tasksService.delete(id)
        setTasks((current) => current.filter((task) => task.id !== id))
    }

    const startTask = async (id: string) => {
        const updated = await tasksService.start(id)
        setTasks((current) =>
            current.map((task) => (task.id === updated.id ? updated : task)),
        )
    }

    const toggleTaskCompleted = async (task: Task) => {
        const updated =
            task.status === "COMPLETED"
                ? await tasksService.reopen(task.id)
                : await tasksService.complete(task.id)

        setTasks((current) =>
            current.map((item) => (item.id === updated.id ? updated : item)),
        )

        if (task.status !== "COMPLETED") {
            setCompletedTask(updated)
        }
    }

    return (
        <TasksContext
            value={{
                tasks,
                isLoading: false,
                error: null,
                createTask,
                updateTask,
                deleteTask,
                startTask,
                toggleTaskCompleted,
            }}
        >
            {children}
            {completedTask && (
                <aside
                    role="status"
                    aria-live="polite"
                    className="task-complete-toast fixed right-[16px] bottom-[88px] left-[16px] z-[90] flex items-center gap-[12px] rounded-[14px] border border-success/30 bg-surface/95 px-[16px] py-[13px] shadow-[0_16px_40px_rgb(0_0_0/24%)] backdrop-blur sm:right-[24px] sm:bottom-[24px] sm:left-auto sm:w-[320px]"
                >
                    <span
                        aria-hidden="true"
                        className="grid size-[32px] shrink-0 place-items-center rounded-full bg-success/14 text-[16px] font-semibold text-success"
                    >
                        ✓
                    </span>
                    <span className="min-w-0">
                        <strong className="block text-[12px] font-semibold text-text-primary">
                            Tarea completada
                        </strong>
                        <span className="block truncate text-[10px] text-text-secondary">
                            {completedTask.title}
                        </span>
                    </span>
                </aside>
            )}
        </TasksContext>
    )
}

export function useTasks(): TasksContextValue {
    const context = useContext(TasksContext)

    if (!context) {
        throw new Error("useTasks debe usarse dentro de TasksProvider")
    }

    return context
}
