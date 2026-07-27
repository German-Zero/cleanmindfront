'use client'

import IconCalendar from "../ui/icons/IconCalendar"

export default function NewTaskForm() {
    return (
        <div className="
            w-full max-w-100 h-auto bg-surface
            border border-border rounded-xl
            flex justify-center items-center
        ">
            <div className="flex w-full flex-col gap-7.5 px-5 py-8 sm:px-6.25 sm:py-12.5">
                <div className="flex flex-col items-center gap-2.5">
                    <h1 className="
                        bg-linear-to-br from-primary via-secondary to-accent 
                        bg-clip-text text-3xl text-transparent
                        text-center font-semibold sm:text-4xl
                    ">Nueva Tarea</h1>
                    <p className="text-center text-xs font-semibold tracking-[0.05em] text-text-secondary sm:text-[14px]">
                        ¿Que tarea estamos planeando?
                    </p>
                </div>
                <form className="flex w-full flex-col gap-7.5">
                    <div className="flex flex-col gap-3.75">

                        <div className="flex flex-col gap-1">
                            <label className="text-[14px] text-text-primary"
                            >
                                Titulo
                            </label>
                            <div className="relative w-full">
                                <input 
                                    required
                                    type="text"
                                    placeholder="Titulo" 
                                    className="
                                    w-full pl-3.75 pr-10 py-3.75 bg-card/70
                                    border border-border rounded-sm
                                    placeholder:text-text-secondary placeholder:text-[13px]
                                        text-base text-text-primary sm:text-[13px]
                                    "/>
                            </div>
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-[14px] text-text-primary"
                            >
                                Descripcion
                            </label>
                            <div className="relative w-full">
                                <input 
                                    required
                                    type="text"
                                    placeholder="Descripcion" 
                                    className="
                                    w-full pl-3.75 pr-10 py-3.75 bg-card/70
                                    border border-border rounded-sm
                                    placeholder:text-text-secondary placeholder:text-[13px]
                                    text-base text-text-primary sm:text-[13px]
                                    "/>
                            </div>
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-[14px] text-text-primary">
                                Fecha
                            </label>
                            <div className="relative w-full">
                                <div className="absolute inset-y-0 left-0 w-13 rounded-l-sm border-y border-l border-border bg-card flex items-center justify-center pointer-events-none z-10">
                                    <IconCalendar />
                                </div>
                                <input 
                                    required
                                    type="date"
                                    className="
                                    w-full pl-16 pr-4 py-3.75 bg-card/70
                                    border border-border rounded-sm
                                    text-base text-text-primary sm:text-[13px]
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
