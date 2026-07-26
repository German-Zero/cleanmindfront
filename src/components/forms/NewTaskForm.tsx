'use client'

import IconCalendar from "../ui/icons/IconCalendar"

export default function NewTaskForm() {
    return (
        <div className="
            w-100 h-auto bg-surface
            border border-border rounded-xl
            flex justify-center items-center
        ">
            <div className="w-max h-max bg-surface/20"/>
            <div className="flex flex-col py-12.5 px-6.25 gap-7.5">
                <div className="flex flex-col items-center gap-2.5">
                    <h1 className="
                        bg-linear-to-br from-primary via-secondary to-accent 
                        bg-clip-text text-4xl text-transparent
                        font-semibold
                    ">Nueva Tarea</h1>
                    <h2 className="text-text-secondary font-semibold text-[14px] tracking-[5%]">
                        ¿Que tarea estamos planeando?
                    </h2>
                </div>
                <form className="flex flex-col gap-7.5">
                    <div className="flex flex-col gap-3.75">

                        <div className="flex flex-col gap-1">
                            <label className="text-[14px] text-text-primary"
                            >
                                Titulo
                            </label>
                            <div className="relative w-87.5">
                                <input 
                                    required
                                    type="text"
                                    placeholder="Titulo" 
                                    className="
                                    w-full pl-3.75 pr-10 py-3.75 bg-card/70
                                    border border-border rounded-sm
                                    placeholder:text-text-secondary placeholder:text-[13px]
                                        text-text-primary text-[13px]
                                    "/>
                            </div>
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-[14px] text-text-primary"
                            >
                                Descripcion
                            </label>
                            <div className="relative w-87.5">
                                <input 
                                    required
                                    type="text"
                                    placeholder="Descripcion" 
                                    className="
                                    w-full pl-3.75 pr-10 py-3.75 bg-card/70
                                    border border-border rounded-sm
                                    placeholder:text-text-secondary placeholder:text-[13px]
                                    text-text-primary text-[13px]
                                    "/>
                            </div>
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-[14px] text-text-primary">
                                Fecha
                            </label>
                            <div className="relative w-87.5">
                                <div className="absolute inset-y-0 left-0 w-13 rounded-l-sm border-y border-l border-border bg-card flex items-center justify-center pointer-events-none z-10">
                                    <IconCalendar />
                                </div>
                                <input 
                                    required
                                    type="date"
                                    className="
                                    w-full pl-16 pr-4 py-3.75 bg-card/70
                                    border border-border rounded-sm
                                    text-text-primary text-[13px]
                                    focus:outline-none focus:border-primary
                                    hide-date-icon
                                "/>
                            </div>
                        </div>

                        <div className="flex items-center justify-between gap-2.5">
                            <label 
                                htmlFor="forgot-passowrd" 
                                className="text-[14px] text-text-primary
                            ">
                                ¿Es Urgente?
                            </label>
                            <input 
                                type="checkbox" 
                                className="appearance-none peer
                                w-5 h-5 bg-text-primary rounded-[3px]
                                checked:bg-accent
                            "/>
                        </div>

                        <div className="flex items-center justify-between gap-2.5">
                            <label 
                                htmlFor="forgot-passowrd" 
                                className="text-[14px] text-text-primary
                            ">
                                ¿Es Importante?
                            </label>
                            <input 
                                type="checkbox" 
                                className="appearance-none peer
                                w-5 h-5 bg-text-primary rounded-[3px]
                                checked:bg-accent
                            "/>
                        </div>
                    </div>

                    <button 
                        type="submit"
                        className="
                        h-11.75 rounded-sm border border-border
                        bg-linear-to-r from-primary via-accent to-secondary
                        text-text-primary text-sm
                    ">
                        Crear Tarea
                    </button>
                </form>

            </div>
        </div>
    )
}