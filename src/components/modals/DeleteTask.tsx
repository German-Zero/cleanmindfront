'use client'

export default function DeleteTaskModal() {
    return (
        <div className="
            w-full max-w-90 h-auto bg-surface
            border border-border rounded-lg
        ">
            <div className="flex flex-col gap-6.25 px-5 py-7.5 sm:px-10">
                <h3 className="
                    text-text-primary text-center text-[13px]
                    font-semibold 
                ">¿Seguro quieres eliminar esta tarea?</h3>
                <div className="flex gap-3 sm:justify-between">
                    <button className="
                        h-auto flex-1 py-1.25 sm:px-12 rounded-xs
                        text-center text-text-primary text-[13px]
                        font-semibold
                        bg-success
                    ">
                        SI
                    </button>

                    <button className="
                        h-auto flex-1 py-1.25 sm:px-12 rounded-xs
                        text-center text-text-primary text-[13px]
                        font-semibold
                        bg-error
                    ">
                        NO
                    </button>
                </div>
            </div>
        </div>
    )
}
