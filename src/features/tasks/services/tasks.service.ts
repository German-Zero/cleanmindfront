import { apiRequest } from "@/lib/api"
import type {
    CreateTaskRequest,
    Task,
    UpdateTaskRequest,
} from "../types"

const jsonHeaders = { "Content-Type": "application/json" }

export const tasksService = {
    getAll: () =>
        apiRequest<Task[]>("/api/tasks", {
            cache: "no-store",
        }),

    create: (request: CreateTaskRequest) =>
        apiRequest<Task>("/api/tasks", {
            method: "POST",
            headers: jsonHeaders,
            body: JSON.stringify(request),
        }),

    update: (id: string, request: UpdateTaskRequest) =>
        apiRequest<Task>(`/api/tasks/${id}`, {
            method: "PUT",
            headers: jsonHeaders,
            body: JSON.stringify(request),
        }),

    delete: (id: string) =>
        apiRequest<void>(`/api/tasks/${id}`, {
            method: "DELETE",
        }),

    complete: (id: string) =>
        apiRequest<Task>(`/api/tasks/${id}/complete`, {
            method: "PATCH",
        }),

    reopen: (id: string) =>
        apiRequest<Task>(`/api/tasks/${id}/reopen`, {
            method: "PATCH",
        }),
}
