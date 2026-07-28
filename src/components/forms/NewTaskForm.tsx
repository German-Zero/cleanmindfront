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
            relative
            w-full max-w-100 h-auto bg-surface
            border border-border rounded-xl
            flex justify-center items-center
        ">
            <button
                type="button"
                aria-label={
                    isEditing ? "Cerrar edición de tarea" : "Cerrar nueva tarea"
                }
                disabled={isPending}
                onClick={onClose}
                className="absolute top-3 right-3 grid size-10 place-items-center rounded-lg text-2xl text-text-secondary hover:bg-card disabled:opacity-50"
            >
                <span aria-hidden="true">×</span>
            </button>
            <div className="flex w-full flex-col gap-7.5 px-5 py-8 sm:px-6.25 sm:py-12.5">
                <div className="flex flex-col items-center gap-2.5">
                    <h1 id={titleId} className="
                        bg-linear-to-br from-primary via-secondary to-accent 
                        bg-clip-text text-3xl text-transparent
                        text-center font-semibold sm:text-4xl
                    ">{isEditing ? "Editar Tarea" : "Nueva Tarea"}</h1>
                    <p className="text-center text-xs font-semibold tracking-wider text-text-secondary sm:text-[14px]">
                        {isEditing
                            ? "Actualiza los datos de la tarea"
                            : "¿Que tarea estamos planeando?"}
                    </p>
                </div>
                <form
                    onSubmit={handleSubmit}
                    className="flex w-full flex-col gap-7.5"
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
                                    className="
                                    w-full pl-3.75 pr-10 py-3.75 bg-card/70
                                    border border-border rounded-sm
                                    placeholder:text-text-secondary placeholder:text-[13px]
                                        text-base text-text-primary sm:text-[13px]
                                    "/>
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
                                    className="
                                    min-h-24 w-full resize-y px-3.75 py-3.75 bg-card/70
                                    border border-border rounded-sm
                                    placeholder:text-text-secondary placeholder:text-[13px]
                                    text-base text-text-primary sm:text-[13px]
                                    "/>
                            </div>
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor={dueDateId} className="text-[14px] text-text-primary">
                                Fecha
                            </label>
                            <div className="relative w-full">
                                <div className="absolute inset-y-0 left-0 w-13 rounded-l-sm border-y border-l border-border bg-card flex items-center justify-center pointer-events-none z-10">
                                    <IconCalendar />
                                </div>
                                <input 
                                    id={dueDateId}
                                    name="dueDate"
                                    type="date"
                                    disabled={isPending}
                                    defaultValue={taskDueDateKey(task?.dueDate ?? null) ?? ""}
                                    className="
                                    w-full pl-16 pr-4 py-3.75 bg-card/70
                                    border border-border rounded-sm
                                    text-base text-text-primary sm:text-[13px]
                                    focus:outline-none focus:border-primary
                                    hide-date-icon
                                "/>
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
                        <p role="alert" className="text-xs text-error">
                            {error}
                        </p>
                    )}

                    <button 
                        type="submit"
                        disabled={isPending}
                        className="
                        h-11.75 rounded-sm border border-border
                        bg-linear-to-r from-primary via-accent to-secondary
                        text-text-primary text-sm
                    ">
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
