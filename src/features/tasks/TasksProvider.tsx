"use client"

import {
    createContext,
    useContext,
    useState,
    type ReactNode,
} from "react"
import { useRewards } from "@/features/rewards/RewardsProvider"
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
    const { registerReward } = useRewards()
    const [tasks, setTasks] = useState<Task[]>(initialTasks)

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
        if (task.status === "COMPLETED") {
            const reopened = await tasksService.reopen(task.id)
            setTasks((current) =>
                current.map((item) =>
                    item.id === reopened.id ? reopened : item,
                ),
            )
            return
        }

        const updated = await tasksService.complete(task.id)

        setTasks((current) =>
            current.map((item) => (item.id === updated.id ? updated : item)),
        )
        registerReward(updated.reward, {
            title: "Tarea completada",
            description: updated.title,
        })
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
