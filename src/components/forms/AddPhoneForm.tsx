'use client'

import IconCancel from "../ui/icons/IconCancel"

export default function AddPhoneForm() {
    return (
        <div className="
            relative
            w-full max-w-100 h-auto bg-surface
            border border-border rounded-xl
            flex justify-center items-center
        ">
            <button className="absolute top-2.5 right-2.5">
                <IconCancel />
            </button>
            <div className="flex w-full flex-col gap-7.5 px-5 py-8 sm:px-6.25 sm:py-12.5">
                <div className="flex flex-col items-center gap-2.5">
                    <h1 className="
                        bg-linear-to-br from-primary via-secondary to-accent 
                        bg-clip-text text-[16px] text-transparent text-center
                        font-semibold
                    ">Agrega un número de teléfono</h1>
                    <p className="max-w-80 text-center text-[11px] font-semibold tracking-[0.05em] text-text-secondary">
                        Ingresa tu número de teléfono para recibir el código de verificación de dos pasos
                    </p>
                </div>
                <form className="flex w-full flex-col gap-3.75">

                        <div className="flex flex-col gap-1">
                            <label 
                                htmlFor="password"
                                className="text-[14px] text-text-primary"
                            >
                                Ingresa tu numero
                            </label>
                            <div className="flex w-full gap-2.5">
                                <input
                                    type="number"
                                    className="
                                        h-auto w-16 shrink-0
                                        bg-card border border-border
                                        rounded-sm
                                        text-center text-base text-text-primary sm:text-[15px]
                                        font-semibold
                                "/>
                                <input 
                                    required
                                    type="text"
                                    placeholder="Numero Telefonico" 
                                    className="
                                    w-full pl-3.75 pr-10 py-3.75 bg-card/70
                                    border border-border rounded-sm
                                    placeholder:text-text-secondary placeholder:text-[13px]
                                    min-w-0 text-base text-text-primary sm:text-[15px]
                                    font-semibold
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
                        Siguiente
                    </button>
                </form>

            </div>
        </div>
    )
}
