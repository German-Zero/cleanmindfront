'use client'

import IconCancel from "../ui/icons/IconCancel"
import IconViewPassword from "../ui/icons/IconViewPassword"

export default function ConfirmUserForm() {
    return (
        <div className="
            relative
            w-100 h-auto bg-surface
            border border-border rounded-xl
            flex justify-center items-center
        ">
            <div className="w-max h-max bg-surface/20"/>
            <button className="absolute top-2.5 right-2.5">
                <IconCancel />
            </button>
            <div className="flex flex-col py-12.5 px-6.25 gap-7.5">
                <div className="flex flex-col items-center gap-2.5">
                    <h1 className="
                        bg-linear-to-br from-primary via-secondary to-accent 
                        bg-clip-text text-[16px] text-transparent text-center
                        font-semibold
                    ">Para continuar, necesitamos verificar tu identidad</h1>
                    <h2 className="text-text-secondary font-semibold text-[11px] tracking-[5%]">
                        tu@email.com
                    </h2>
                </div>
                <form className="flex flex-col gap-3.75">

                        <div className="flex flex-col gap-1">
                            <label 
                                htmlFor="password"
                                className="text-[14px] text-text-primary"
                            >
                                Tu Contraseña
                            </label>
                            <div className="relative w-87.5">
                                <input 
                                    required
                                    type="password"
                                    placeholder="Tu Contraseña" 
                                    className="
                                        w-full pl-3.75 pr-10 py-3.75 bg-card/70
                                        border border-border rounded-sm
                                        placeholder:text-text-secondary placeholder:text-[13px]
                                        text-text-primary text-[13px]
                                    "/>
                                <button 
                                    type="button"
                                    aria-label="Contraseña"
                                    className="absolute right-3.75 top-1/2 -translate-y-1/2">
                                    <IconViewPassword />
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
                        Siguiente
                    </button>
                </form>

            </div>
        </div>
    )
}