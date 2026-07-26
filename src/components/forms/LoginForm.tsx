'use client'

import Link from "next/link"
import IconViewPassword from "../ui/icons/IconViewPassword"
import IconGoogle from "./IconGoogle"

export default function LogInForm() {
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
                    ">CleanMind</h1>
                    <h2 className="text-text-secondary font-semibold text-[16px] tracking-[5%]">
                        Mente Limpia, Conciencia Tranquila
                    </h2>
                </div>
                <form className="flex flex-col gap-3.75">
                    <div className="flex flex-col gap-1">
                        <label 
                            htmlFor="email"
                            className="text-[14px] text-text-primary"
                        >
                            Email
                        </label>
                        <input 
                            required
                            type="email"
                            placeholder="Email" 
                            className="
                                w-full pl-3.75 pr-10 py-3.75 bg-card/70
                                border border-border rounded-sm
                                placeholder:text-text-secondary placeholder:text-[13px]
                                text-text-primary text-[13px]
                        "/>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label 
                            htmlFor="password"
                            className="text-[14px] text-text-primary"
                        >
                            Contraseña
                        </label>
                        <div className="relative w-87.5">
                            <input 
                                required
                                type="password"
                                placeholder="Contraseña" 
                                className="
                                    w-full pl-3.75 pr-10 py-3.75 bg-card/70
                                    border border-border rounded-sm
                                    placeholder:text-text-secondary placeholder:text-[13px]
                                    text-text-primary text-[13px]
                                "/>
                            <button 
                                type="button"
                                aria-label="Mostrar Contraseña"
                                className="absolute right-3.75 top-1/2 -translate-y-1/2">
                                <IconViewPassword />
                            </button>
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="flex gap-2.5">
                            <input 
                                type="checkbox" 
                                className="appearance-none peer
                                w-3.25 h-3.25 bg-text-primary rounded-[3px]
                                checked:bg-accent
                            "/>
                            <label 
                                htmlFor="forgot-passowrd" 
                                className="text-[10px] text-text-primary
                            ">
                                Recordarme
                            </label>
                        </div>
                        <Link href={"/dashboard"} 
                            className="
                            text-primary text-[10px]
                        ">¿Olvidaste tu contraseña?</Link>
                    </div>
                    <button 
                        type="submit"
                        className="
                        h-11.75 rounded-sm border border-border
                        bg-linear-to-r from-primary via-accent to-secondary
                        text-text-primary text-sm
                    ">
                        Iniciar Sesión
                    </button>
                </form>
                <div className="flex items-center">
                    <div className="grow border-t border-text-secondary" />
                    <span className="shrink mx-4 text-text-primary text-[10px]">o continua con</span>
                    <div className="grow border-t border-text-secondary" />
                </div>
                <button className="
                    bg-card/70 py-3
                    border border-border rounded-sm
                    flex justify-center gap-1.25
                    text-[15px] text-text-primary
                ">
                    <IconGoogle />
                    Google
                </button>
                <div className="flex gap-0.5 justify-center">
                    <span className="
                        text-text-primary text-[13px]
                    ">
                        ¿No tienes una cuenta?
                    </span>
                    <Link href={"/register"}
                        className="
                        text-[13px] text-primary
                    ">
                        Regístrate
                    </Link>
                </div>
            </div>
        </div>
    )
}