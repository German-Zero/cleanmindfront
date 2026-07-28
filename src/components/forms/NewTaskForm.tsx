'use client'

import { useId, useState, type FormEvent } from "react"
import { taskDueDateKey } from "@/features/tasks/calendar"
import { createTaskRequestFromFormData } from "@/features/tasks/create-task"
import { useTasks } from "@/features/tasks/TasksProvider"
import type { Task } from "@/features/tasks/types"
import IconCalendar from "../ui/icons/IconCalendar"

interface NewTaskFormProps {
    onClose: () => void
    task?: Task
    titleId?: string
}

export default function NewTaskForm({
    onClose,
    task,
    titleId = "task-form-title",
}: NewTaskFormProps) {
    const { createTask, updateTask } = useTasks()
    const formId = useId()
    const nameId = `${formId}-name`
    const descriptionId = `${formId}-description`
    const dueDateId = `${formId}-due-date`
    const urgentId = `${formId}-urgent`
    const importantId = `${formId}-important`
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const isEditing = Boolean(task)

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const form = event.currentTarget
        const formData = new FormData(form)

        setIsPending(true)
        setError(null)

        try {
            const request = createTaskRequestFromFormData(formData)

            if (task) {
                await updateTask(task.id, request)
            } else {
                await createTask(request)
            }
            form.reset()
            onClose()
        } catch (requestError: unknown) {
            setError(
                requestError instanceof Error
                    ? requestError.message
                    : `No se pudo ${isEditing ? "actualizar" : "crear"} la tarea.`,
            )
        } finally {
            setIsPending(false)
        }
    }

    return (
        <div className="
            calm-panel relative flex h-auto w-full max-w-105
            items-center justify-center
        ">
            <button
                type="button"
                aria-label={
                    isEditing ? "Cerrar edición de tarea" : "Cerrar nueva tarea"
                }
                disabled={isPending}
                onClick={onClose}
                className="calm-icon-button absolute top-3 right-3 text-[22px] disabled:opacity-50"
            >
                <span aria-hidden="true">×</span>
            </button>
            <div className="flex w-full flex-col gap-7 px-5 py-8 sm:px-7 sm:py-10.5">
                <div className="flex flex-col items-center gap-2">
                    <h1 id={titleId} className="
                        text-center text-[28px] font-semibold
                        tracking-[-0.4px] text-text-primary sm:text-[32px]
                    ">{isEditing ? "Editar Tarea" : "Nueva Tarea"}</h1>
                    <p className="text-center text-[12px] leading-4.75 text-text-secondary">
                        {isEditing
                            ? "Actualiza los datos de la tarea"
                            : "¿Que tarea estamos planeando?"}
                    </p>
                </div>
                <form
                    onSubmit={handleSubmit}
                    className="flex w-full flex-col gap-7"
                >
                    <div className="flex flex-col gap-3.75">

                        <div className="flex flex-col gap-1">
                            <label htmlFor={nameId} className="text-[14px] text-text-primary"
                            >
                                Titulo
                            </label>
                            <div className="relative w-full">
                                <input 
                                    required
                                    id={nameId}
                                    name="title"
                                    type="text"
                                    minLength={3}
                                    maxLength={100}
                                    disabled={isPending}
                                    defaultValue={task?.title}
                                    placeholder="Titulo" 
                                    className="calm-input pr-10 text-[13px]"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor={descriptionId} className="text-[14px] text-text-primary"
                            >
                                Descripcion
                            </label>
                            <div className="relative w-full">
                                <textarea
                                    id={descriptionId}
                                    name="description"
                                    rows={3}
                                    maxLength={1000}
                                    disabled={isPending}
                                    defaultValue={task?.description ?? ""}
                                    placeholder="Descripcion" 
                                    className="calm-input min-h-24 resize-y text-[13px]"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor={dueDateId} className="text-[14px] text-text-primary">
                                Fecha
                            </label>
                            <div className="relative w-full">
                                <div className="pointer-events-none absolute inset-y-0 left-0 z-10 flex w-13 items-center justify-center border-r border-border/70 text-text-secondary">
                                    <IconCalendar />
                                </div>
                                <input 
                                    id={dueDateId}
                                    name="dueDate"
                                    type="date"
                                    disabled={isPending}
                                    defaultValue={taskDueDateKey(task?.dueDate ?? null) ?? ""}
                                    className="calm-input hide-date-icon pl-16 pr-4 text-[13px]"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between gap-2.5">
                            <label 
                                htmlFor={urgentId}
                                className="text-[14px] text-text-primary
                            ">
                                ¿Es Urgente?
                            </label>
                            <input 
                                type="checkbox" 
                                id={urgentId}
                                name="isUrgent"
                                disabled={isPending}
                                defaultChecked={task?.isUrgent}
                                className="themed-checkbox"
                            />
                        </div>

                        <div className="flex items-center justify-between gap-2.5">
                            <label 
                                htmlFor={importantId}
                                className="text-[14px] text-text-primary
                            ">
                                ¿Es Importante?
                            </label>
                            <input 
                                type="checkbox" 
                                id={importantId}
                                name="isImportant"
                                disabled={isPending}
                                defaultChecked={task?.isImportant}
                                className="themed-checkbox"
                            />
                        </div>
                    </div>

                    {error && (
                        <p role="alert" className="calm-feedback text-error">
                            {error}
                        </p>
                    )}

                    <button 
                        type="submit"
                        disabled={isPending}
                        className="calm-button"
                    >
                        {isPending
                            ? "Guardando…"
                            : isEditing
                              ? "Guardar Cambios"
                              : "Crear Tarea"}
                    </button>
                </form>

            </div>
        </div>
    )
}
