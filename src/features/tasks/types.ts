export type TaskQuadrant = "DO" | "PLAN" | "DELEGATE" | "DELETE"
export type TaskStatus = "TODO" | "IN_PROGRESS" | "COMPLETED"

export interface Task {
    id: string
    title: string
    description: string | null
    isImportant: boolean
    isUrgent: boolean
    quadrant: TaskQuadrant
    status: TaskStatus
    dueDate: string | null
    completedAt: string | null
    createdAt: string
    updatedAt: string
}

export interface CreateTaskRequest {
    title: string
    description?: string
    isImportant: boolean
    isUrgent: boolean
    dueDate?: string
}

export type UpdateTaskRequest = CreateTaskRequest
