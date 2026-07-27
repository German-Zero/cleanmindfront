'use client'

import IconCancel from "../ui/icons/IconCancel"
import IconCompleteTask from "../ui/icons/IconCompleteTask"
import IconEdit from "../ui/icons/IconEdit"

export default function Task() {

    return (
        <div className="relative h-auto w-full max-w-[320px] shrink-0 rounded-lg border border-border bg-card hover:bg-card-hover">
            <div className="
                
                flex max-w-[calc(100%_-_3.125rem)] flex-wrap gap-1 xl:max-w-65
                mt-2.5 ml-2.5 mr-12.5 mb-12.5
            ">
                <h1 className="
                    text-sm text-text-primary 
                    font-semibold
                ">Title</h1>
                <p className="
                    text-text-secondary text-[10px]
                ">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
                    Ratione sed veritatis possimus numquam, ipsum quam, a culpa quos 
                    eius ducimus debitis voluptatem nisi quae. Minima tempore porro 
                    id ipsam nobis.
                </p>
            </div>
            <div className="
                flex
                absolute bottom-2.5 right-2.5
            ">
                <button type="button" aria-label="Editar tarea" className="grid size-11 place-items-center xl:size-auto">
                    <IconEdit />
                </button>
                <button type="button" aria-label="Completar tarea" className="grid size-11 place-items-center xl:size-auto">
                    <IconCompleteTask />
                </button>
                <button type="button" aria-label="Cancelar tarea" className="grid size-11 place-items-center xl:size-auto">
                    <IconCancel />
                </button>
            </div>
        </div>
    )
}
