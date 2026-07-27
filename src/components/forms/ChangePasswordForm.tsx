'use client'

import IconViewPassword from "../ui/icons/IconViewPassword"
import IconOccultPassword from "../ui/icons/IconOccultPassword"

export default function ChangePasswordForm() {
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
                        bg-clip-text text-2xl text-transparent
                        text-center font-semibold sm:text-[32px]
                    ">Cambiar Contraseña</h1>
                    <p className="w-full max-w-80 text-center text-[13px] font-semibold tracking-[0.05em] text-text-secondary">
                        Elige una contraseña de al menos 8 caracteres (con letras y numeros)
                    </p>
                </div>
                <form className="flex w-full flex-col gap-3.75">

                    <div className="flex flex-col gap-1">
                        <label 
                            htmlFor="current-password"
                            className="text-[14px] text-text-primary"
                        >
                            Contraseña Actual
                        </label>
                        <div className="relative w-full">
                            <input 
                                required
                                type="password"
                                placeholder="Contraseña Actual" 
                                className="
                                    w-full pl-3.75 pr-10 py-3.75 bg-card/70
                                    border border-border rounded-sm
                                    placeholder:text-text-secondary placeholder:text-[13px]
                                    text-base text-text-primary sm:text-[13px]
                                "/>
                            <button 
                                type="button"
                                aria-label="Mostrar Contraseña"
                                className="absolute inset-y-0 right-0 flex w-11 items-center justify-center">
                                <IconViewPassword />
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label 
                            htmlFor="new-password"
                            className="text-[14px] text-text-primary"
                        >
                            Nueva Contraseña
                        </label>
                        <div className="relative w-full">
                            <input 
                                required
                                type="password"
                                placeholder="Nueva Contraseña" 
                                className="
                                    w-full pl-3.75 pr-10 py-3.75 bg-card/70
                                    border border-border rounded-sm
                                    placeholder:text-text-secondary placeholder:text-[13px]
                                    text-base text-text-primary sm:text-[13px]
                                "/>
                            <button 
                                type="button"
                                aria-label="Mostrar Contraseña"
                                className="absolute inset-y-0 right-0 flex w-11 items-center justify-center">
                                <IconViewPassword />
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label 
                            htmlFor="confirm-password"
                            className="text-[14px] text-text-primary"
                        >
                            Confirmar Contraseña
                        </label>
                        <div className="relative w-full">
                            <input 
                                required
                                type="password"
                                placeholder="Confirmar Contraseña" 
                                className="
                                    w-full pl-3.75 pr-10 py-3.75 bg-card/70
                                    border border-border rounded-sm
                                    placeholder:text-text-secondary placeholder:text-[13px]
                                    text-base text-text-primary sm:text-[13px]
                                "/>
                            <button 
                                type="button"
                                aria-label="Mostrar Contraseña"
                                className="absolute inset-y-0 right-0 flex w-11 items-center justify-center">
                                <IconOccultPassword />
                            </button>
                        </div>
                    </div>
                    <button 
                        type="submit"
                        className="
                        h-11.75 rounded-sm border border-border
                        bg-linear-to-r from-primary via-accent to-secondary
                        text-text-primary text-sm
                    ">
                        Cambiar Contraseña
                    </button>
                </form>
            </div>
        </div>
    )
}
