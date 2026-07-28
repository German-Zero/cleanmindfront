"use client"

import { useRef, useState } from "react"
import NewTaskForm from "@/components/forms/NewTaskForm"
import IconNewTask from "@/components/ui/icons/IconNewTask"

export default function NewTaskButton({ className }: { className: string }) {
    const dialogRef = useRef<HTMLDialogElement>(null)
    const [formKey, setFormKey] = useState(0)

    return (
        <>
            <button
                type="button"
                aria-label="Crear nueva tarea"
                onClick={() => dialogRef.current?.showModal()}
                className={className}
            >
                <IconNewTask />
            </button>

            <dialog
                ref={dialogRef}
                aria-labelledby="task-form-title"
                onClose={() => setFormKey((key) => key + 1)}
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
                        key={formKey}
                        onClose={() => dialogRef.current?.close()}
                    />
                </div>
            </dialog>
        </>
    )
}
