'use client'

interface DeleteTaskModalProps {
    titleId: string
    taskTitle: string
    isPending: boolean
    onConfirm: () => void
    onCancel: () => void
}

export default function DeleteTaskModal({
    titleId,
    taskTitle,
    isPending,
    onConfirm,
    onCancel,
}: DeleteTaskModalProps) {
    return (
        <div className="
            w-full max-w-90 h-auto bg-surface
            border border-border rounded-lg
        ">
            <div className="flex flex-col gap-6.25 px-5 py-7.5 sm:px-10">
                <h3 id={titleId} className="
                    text-text-primary text-center text-[13px]
                    font-semibold 
                ">
                    ¿Seguro quieres eliminar &quot;{taskTitle}&quot;?
                </h3>
                <div className="flex gap-3 sm:justify-between">
                    <button
                        type="button"
                        disabled={isPending}
                        onClick={onConfirm}
                        className="
                        h-auto flex-1 py-1.25 sm:px-12 rounded-xs
                        text-center text-text-primary text-[13px]
                        font-semibold
                        bg-success
                        disabled:cursor-wait disabled:opacity-50
                    "
                    >
                        {isPending ? "Eliminando…" : "Sí"}
                    </button>

                    <button
                        type="button"
                        disabled={isPending}
                        onClick={onCancel}
                        className="
                        h-auto flex-1 py-1.25 sm:px-12 rounded-xs
                        text-center text-text-primary text-[13px]
                        font-semibold
                        bg-error
                        disabled:opacity-50
                    "
                    >
                        No
                    </button>
                </div>
            </div>
        </div>
    )
}
