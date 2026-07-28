'use client'

import { useId, useRef, useState } from "react"
import NewTaskForm from "@/components/forms/NewTaskForm"
import DeleteTaskModal from "@/components/modals/DeleteTask"
import { useTasks } from "@/features/tasks/TasksProvider"
import type { Task as TaskModel } from "@/features/tasks/types"
import IconCancel from "../ui/icons/IconCancel"
import IconCompleteTask from "../ui/icons/IconCompleteTask"
import IconEdit from "../ui/icons/IconEdit"
import IconReopenTask from "../ui/icons/IconReopenTask"

export default function Task({ task }: { task: TaskModel }) {
    const { deleteTask, startTask, toggleTaskCompleted } = useTasks()
    const editDialogRef = useRef<HTMLDialogElement>(null)
    const deleteDialogRef = useRef<HTMLDialogElement>(null)
    const dialogId = useId()
    const editTitleId = `${dialogId}-edit-title`
    const deleteTitleId = `${dialogId}-delete-title`
    const [editKey, setEditKey] = useState(0)
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleToggleCompleted = async () => {
        setIsPending(true)
        setError(null)

        try {
            await toggleTaskCompleted(task)
        } catch (requestError: unknown) {
            setError(
                requestError instanceof Error
                    ? requestError.message
                    : "No se pudo actualizar la tarea.",
            )
        } finally {
            setIsPending(false)
        }
    }

    const handleStart = async () => {
        setIsPending(true)
        setError(null)

        try {
            await startTask(task.id)
        } catch (requestError: unknown) {
            setError(
                requestError instanceof Error
                    ? requestError.message
                    : "No se pudo empezar la tarea.",
            )
        } finally {
            setIsPending(false)
        }
    }

    const handleDelete = async () => {
        setIsPending(true)
        setError(null)

        try {
            await deleteTask(task.id)
        } catch (requestError: unknown) {
            setError(
                requestError instanceof Error
                    ? requestError.message
                    : "No se pudo eliminar la tarea.",
            )
            deleteDialogRef.current?.close()
            setIsPending(false)
        }
    }

    return (
        <article
            className="calm-card relative h-auto w-full max-w-[320px] shrink-0 hover:border-accent/25 hover:bg-card-hover"
        >
            <div className={`
                flex max-w-[calc(100%-50px)] flex-col items-start gap-1
                xl:max-w-65
                mt-3 ml-3 mr-12 mb-13
                ${task.status === "COMPLETED" ? "opacity-60" : ""}
            `}>
                <h2 className="w-full wrap-break-word text-[13px] font-semibold leading-4.75 text-text-primary">
                    {task.title}
                </h2>
                <p className="w-full whitespace-pre-wrap wrap-break-word text-[10px] leading-4 text-text-secondary">
                    {task.description || "Sin descripción"}
                </p>
                {error && (
                    <p role="alert" className="w-full text-[10px] text-error">
                        {error}
                    </p>
                )}
            </div>
            <div className="
                absolute right-2 bottom-1.75 flex items-center gap-0.5
            ">
                {task.status === "TODO" && (
                    <button
                        type="button"
                        aria-label="Empezar tarea"
                        aria-busy={isPending}
                        disabled={isPending}
                        onClick={handleStart}
                        className="
                            mr-0.75 inline-flex min-h-8 items-center
                            gap-1.5 rounded-[9px] border border-accent/30
                            bg-accent/10 px-2.5 text-[10px] font-semibold
                            text-accent hover:bg-accent/16
                            disabled:cursor-wait disabled:opacity-50
                        "
                    >
                        <span
                            aria-hidden="true"
                            className="
                                h-0 w-0 border-y-4 border-l-[7px]
                                border-y-transparent border-l-current
                            "
                        />
                        Empezar
                    </button>
                )}
                {task.status === "IN_PROGRESS" && (
                    <span
                        className="
                            mr-0.75 inline-flex min-h-8 items-center
                            rounded-[9px] border border-success/30
                            bg-success/10 px-2.5 text-[10px]
                            font-semibold text-success
                        "
                    >
                        En curso
                    </span>
                )}
                <button
                    type="button"
                    aria-label="Editar tarea"
                    disabled={isPending}
                    onClick={() => editDialogRef.current?.showModal()}
                    className="calm-icon-button disabled:opacity-50"
                >
                    <IconEdit />
                </button>
                <button
                    type="button"
                    aria-label={
                        task.status === "COMPLETED"
                            ? "Reabrir tarea"
                            : "Completar tarea"
                    }
                    aria-busy={isPending}
                    disabled={isPending}
                    onClick={handleToggleCompleted}
                    className="calm-icon-button disabled:cursor-wait disabled:opacity-50"
                >
                    {task.status === "COMPLETED" ? (
                        <IconReopenTask />
                    ) : (
                        <IconCompleteTask />
                    )}
                </button>
                <button
                    type="button"
                    aria-label="Eliminar tarea"
                    disabled={isPending}
                    onClick={() => deleteDialogRef.current?.showModal()}
                    className="calm-icon-button disabled:opacity-50"
                >
                    <IconCancel />
                </button>
            </div>

            <dialog
                ref={editDialogRef}
                aria-labelledby={editTitleId}
                onClose={() => setEditKey((key) => key + 1)}
                onClick={(event) => {
                    if (event.target === event.currentTarget) {
                        event.currentTarget.close()
                    }
                }}
                className="
                    fixed inset-0 m-auto max-h-dvh w-full max-w-none
                    overflow-y-auto border-0 bg-transparent p-4
                    text-inherit backdrop:bg-black/70
                "
            >
                <div className="flex min-h-[calc(100dvh-32px)] items-center justify-center">
                    <NewTaskForm
                        key={editKey}
                        task={task}
                        titleId={editTitleId}
                        onClose={() => editDialogRef.current?.close()}
                    />
                </div>
            </dialog>

            <dialog
                ref={deleteDialogRef}
                aria-labelledby={deleteTitleId}
                onCancel={(event) => {
                    if (isPending) event.preventDefault()
                }}
                onClick={(event) => {
                    if (
                        event.target === event.currentTarget &&
                        !isPending
                    ) {
                        event.currentTarget.close()
                    }
                }}
                className="
                    fixed inset-0 m-auto max-h-dvh w-full max-w-none
                    overflow-y-auto border-0 bg-transparent p-4
                    text-inherit backdrop:bg-black/70
                "
            >
                <div className="flex min-h-[calc(100dvh-32px)] items-center justify-center">
                    <DeleteTaskModal
                        titleId={deleteTitleId}
                        taskTitle={task.title}
                        isPending={isPending}
                        onConfirm={handleDelete}
                        onCancel={() => deleteDialogRef.current?.close()}
                    />
                </div>
            </dialog>
        </article>
    )
}
