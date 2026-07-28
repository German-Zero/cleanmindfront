import type { CreateTaskRequest } from "./types"

export function createTaskRequestFromFormData(
    formData: FormData,
): CreateTaskRequest {
    const description = String(formData.get("description") ?? "").trim()
    const dueDate = String(formData.get("dueDate") ?? "")

    return {
        title: String(formData.get("title") ?? "").trim(),
        description: description || undefined,
        isImportant: formData.get("isImportant") === "on",
        isUrgent: formData.get("isUrgent") === "on",
        dueDate: dueDate || undefined,
    }
}
