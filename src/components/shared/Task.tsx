'use client'

import IconCancel from "../ui/icons/IconCancel"
import IconCompleteTask from "../ui/icons/IconCompleteTask"
import IconEdit from "../ui/icons/IconEdit"

export default function Task() {

    return (
        <div className="relative w-[320px] hover:bg-card-hover bg-card h-auto border border-border rounded-lg">
            <div className="
                
                flex flex-wrap gap-1 max-w-65
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
                <button>
                    <IconEdit />
                </button>
                <button>
                    <IconCompleteTask />
                </button>
                <button>
                    <IconCancel />
                </button>
            </div>
        </div>
    )
}