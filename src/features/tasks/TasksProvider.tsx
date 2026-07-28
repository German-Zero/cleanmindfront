"use client"

import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react"
import { useRouter } from "next/navigation"
import { ApiError } from "@/lib/api"
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
    toggleTaskCompleted: (task: Task) => Promise<void>
}

const TasksContext = createContext<TasksContextValue | null>(null)

export function TasksProvider({ children }: { children: ReactNode }) {
    const router = useRouter()
    const [tasks, setTasks] = useState<Task[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        let isCancelled = false

        void tasksService
            .getAll()
            .then((response) => {
                if (!isCancelled) setTasks(response)
            })
            .catch((requestError: unknown) => {
                if (
                    !isCancelled &&
                    requestError instanceof ApiError &&
                    requestError.status === 401
                ) {
                    router.replace("/login")
                    router.refresh()
                } else if (!isCancelled) {
                    setError(
                        requestError instanceof Error
                            ? requestError.message
                            : "No se pudieron cargar las tareas.",
                    )
                }
            })
            .finally(() => {
                if (!isCancelled) setIsLoading(false)
            })

        return () => {
            isCancelled = true
        }
    }, [router])

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

    const toggleTaskCompleted = async (task: Task) => {
        const updated =
            task.status === "COMPLETED"
                ? await tasksService.reopen(task.id)
                : await tasksService.complete(task.id)

        setTasks((current) =>
            current.map((item) => (item.id === updated.id ? updated : item)),
        )
    }

    return (
        <TasksContext
            value={{
                tasks,
                isLoading,
                error,
                createTask,
                updateTask,
                deleteTask,
                toggleTaskCompleted,
            }}
        >
            {children}
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
