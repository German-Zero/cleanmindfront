'use client'

import Link from "next/link"

export default function VerifyEmailForm() {
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
                    ">Verificar Correo</h1>
                    <h2 className="w-81.25 text-center text-text-secondary font-semibold text-[13px] tracking-[5%]">
                        Por favor, introduce el código enviado a tu correo electrónico para verificar que eres tú
                    </h2>
                </div>
                <form className="flex flex-col gap-3.75">

                    <div className="flex gap-2.5 justify-center">
                        <input 
                            type="number" 
                            min={0}
                            max={9}
                            className="
                                bg-card/70 w-10 h-10 
                                rounded-sm border border-border
                                font-semibold text-center text-text-primary
                        "/>
                        <input 
                            type="number" 
                            min={0}
                            max={9}
                            className="
                                bg-card/70 w-10 h-10 
                                rounded-sm border border-border
                                font-semibold text-center text-text-primary
                        "/>
                        <input 
                            type="number" 
                            min={0}
                            max={9}
                            className="
                                bg-card/70 w-10 h-10 
                                rounded-sm border border-border
                                font-semibold text-center text-text-primary
                        "/>
                        <input 
                            type="number" 
                            min={0}
                            max={9}
                            className="
                                bg-card/70 w-10 h-10 
                                rounded-sm border border-border
                                font-semibold text-center text-text-primary
                        "/>
                        <input 
                            type="number" 
                            min={0}
                            max={9}
                            className="
                                bg-card/70 w-10 h-10 
                                rounded-sm border border-border
                                font-semibold text-center text-text-primary
                        "/>
                        <input 
                            type="number" 
                            min={0}
                            max={9}
                            className="
                                bg-card/70 w-10 h-10 
                                rounded-sm border border-border
                                font-semibold text-center text-text-primary
                        "/>
                    </div>

                    <button 
                        type="submit"
                        className="
                        h-11.75 rounded-sm border border-border
                        bg-linear-to-r from-primary via-accent to-secondary
                        text-text-primary text-sm
                    ">
                        Verificar
                    </button>
                </form>

                <div className="flex gap-0.5 justify-center">
                    <span className="
                        text-text-primary text-[13px]
                    ">
                        ¿No te llego el código?
                    </span>
                    <Link href={"/register"}
                        className="
                        text-[13px] text-primary
                    ">
                        Reenviar código
                    </Link>
                </div>
            </div>
        </div>
    )
}