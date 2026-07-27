'use client'

import Link from "next/link"
import IconGoogle from "./IconGoogle"
import PasswordField from "./PasswordField"

export default function LogInForm() {
    return (
        <div className="
            w-full max-w-100 h-auto flex justify-center items-center
        ">
            <div className="flex w-full flex-col gap-6 px-0 py-8 sm:gap-7.5 sm:px-6.25 sm:py-12.5">
                <form
                    className="flex flex-col gap-3.75"
                    onSubmit={(event) => event.preventDefault()}
                >
                    <div className="flex flex-col gap-1">
                        <label 
                            htmlFor="email"
                            className="text-[14px] text-text-primary"
                        >
                            Email
                        </label>
                        <input 
                            required
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            placeholder="Email" 
                            className="
                                w-full pl-3.75 pr-10 py-3.75 bg-card/70
                                border border-border rounded-sm
                                placeholder:text-text-secondary placeholder:text-base
                                text-base text-text-primary
                                sm:placeholder:text-[13px] sm:text-[13px]
                        "/>
                    </div>
                    <PasswordField
                        id="password"
                        name="password"
                        label="Contraseña"
                        placeholder="Contraseña"
                        autoComplete="current-password"
                    />
                    <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                            <input 
                                id="remember"
                                name="remember"
                                type="checkbox" 
                                className="appearance-none peer
                                w-5 h-5 bg-text-primary rounded-[3px]
                                checked:bg-accent
                                sm:w-3.25 sm:h-3.25
                            "/>
                            <label 
                                htmlFor="remember"
                                className="text-xs text-text-primary sm:text-[10px]
                            ">
                                Recordarme
                            </label>
                        </div>
                        <Link href="/forgot-password"
                            className="
                            text-xs text-primary sm:text-[10px]
                        ">¿Olvidaste tu contraseña?</Link>
                    </div>
                    <button 
                        type="button"
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
                    <span className="mx-3 shrink text-center text-[10px] text-text-primary sm:mx-4">o continúa con</span>
                    <div className="grow border-t border-text-secondary" />
                </div>
                <button
                    type="button"
                    className="
                    bg-card/70 py-3
                    border border-border rounded-sm
                    flex justify-center gap-1.25
                    text-[15px] text-text-primary
                ">
                    <IconGoogle />
                    Google
                </button>
                <div className="flex flex-wrap justify-center gap-x-0.5 gap-y-1 text-center">
                    <span className="
                        text-text-primary text-[13px]
                    ">
                        ¿No tienes una cuenta?
                    </span>
                    <Link href="/register"
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
