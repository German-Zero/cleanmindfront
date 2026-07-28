'use client'

import Link from "next/link"

export default function ForgotPasswordForm() {
    return (
        <div className="
            w-full max-w-100 h-auto bg-surface
            border border-border rounded-xl
            flex justify-center items-center
        ">
            <div className="flex w-full flex-col gap-6 px-5 py-8 sm:gap-7.5 sm:px-6.25 sm:py-12.5">
                <div className="flex flex-col items-center gap-2.5">
                    <h1 className="
                        bg-linear-to-br from-primary via-secondary to-accent 
                        bg-clip-text text-xl text-transparent text-center
                        font-semibold
                        sm:text-[23px]
                    ">¿Olvidaste tu Contraseña?</h1>
                    <p className="w-full max-w-80 text-center text-text-secondary font-semibold text-[13px] tracking-wider">
                        Te enviaremos un código a tu correo para verificar que existe una cuenta en CleanMind
                    </p>
                </div>
                <form
                    className="flex w-full flex-col gap-3.75"
                    onSubmit={(event) => event.preventDefault()}
                >

                    <div className="flex flex-col gap-1">
                        <label 
                            htmlFor="email"
                            className="text-[14px] text-text-primary"
                        >
                            Email
                        </label>
                        <div className="w-full">
                            <input 
                                required
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                placeholder="tu@email.com" 
                                className="
                                    w-full px-3.75 py-3.75 bg-card/70
                                    border border-border rounded-sm
                                    placeholder:text-text-secondary placeholder:text-base
                                    text-base text-text-primary
                                    sm:placeholder:text-[13px] sm:text-[13px]
                                "/>
                        </div>
                    </div>
                    <button 
                        type="button"
                        className="
                        h-11.75 rounded-sm border border-border
                        bg-linear-to-r from-primary via-accent to-secondary
                        text-text-primary text-sm
                    ">
                        Siguiente
                    </button>
                    <Link
                        href="/login"
                        className="
                        h-11.75 rounded-sm border border-border
                        bg-secondary/60
                        flex items-center justify-center
                        text-text-primary text-sm
                    ">
                        Atrás
                    </Link>
                </form>
            </div>
        </div>
    )
}
