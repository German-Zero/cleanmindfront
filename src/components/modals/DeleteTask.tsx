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
        <div className="calm-panel h-auto w-full max-w-90">
            <div className="flex flex-col gap-6 px-5 py-7 sm:px-8">
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
                        min-h-11 flex-1 rounded-[10px] border border-error/40
                        bg-error/10 px-4 py-2.5 text-center
                        text-[13px] font-semibold text-error
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
                        calm-button-secondary h-auto flex-1
                        text-center text-[13px] font-semibold
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
