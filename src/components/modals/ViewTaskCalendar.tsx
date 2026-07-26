'use client'

export default function ViewTaskCalendarModal() {
    return (
        <div className="
            relative
            w-100 h-auto 
            bg-linear-to-br from-surface from-50% to-secondary
            border border-border rounded-xl
        ">
            <div className="
                w-full h-17.5
                bg-accent rounded-t-xl
            "/>
            <div className="
                w-full h-17.5 absolute top-0
                bg-black/30 rounded-t-xl 
            "/>
            <div className="p-4 flex flex-wrap gap-1">
                <h1 className="
                    text-text-primary text-[14px] 
                    font-semibold
                ">Title Task</h1>
                <p className="
                    text-text-secondary text-[12px]
                    tracking-[5%]
                ">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Quasi quam consequuntur totam alias libero id vitae sed praesentium dolorum 
                    quos, soluta natus eligendi ipsum assumenda obcaecati laudantium expedita 
                    saepe omnis.
                </p>
            </div>
        </div>
    )
}