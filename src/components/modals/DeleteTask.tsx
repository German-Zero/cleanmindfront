'use client'

export default function DeleteTaskModal() {
    return (
        <div className="
            w-90 h-auto bg-surface
            border border-border rounded-lg
        ">
            <div className="py-7.5 px-10 flex flex-col gap-6.25">
                <h3 className="
                    text-text-primary text-center text-[13px]
                    font-semibold 
                ">¿Seguro quieres eliminar esta tarea?</h3>
                <div className="flex justify-between">
                    <button className="
                        w-auto h-auto py-1.25 px-12 rounded-xs
                        text-center text-text-primary text-[13px]
                        font-semibold
                        bg-success
                    ">
                        SI
                    </button>

                    <button className="
                        w-auto h-auto py-1.25 px-12 rounded-xs
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