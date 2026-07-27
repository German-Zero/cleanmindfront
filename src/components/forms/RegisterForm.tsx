'use client'

import Link from "next/link"
import PasswordField from "./PasswordField"

export default function RegisterForm() {
    return (
        <div className="w-full max-w-100 h-auto flex justify-center items-center">
            <div className="flex w-full flex-col gap-6 px-0 py-8 sm:gap-7.5 sm:px-6.25 sm:py-12.5">
                <form
                    className="flex flex-col gap-3.75"
                    onSubmit={(event) => event.preventDefault()}
                >
                    <div className="flex flex-col gap-1">
                        <label 
                            htmlFor="name"
                            className="text-[14px] text-text-primary"
                        >
                            Nombre
                        </label>
                        <input 
                            required
                            id="name"
                            name="name"
                            type="text"
                            autoComplete="name"
                            placeholder="Nombre" 
                            className="
                                w-full pl-3.75 pr-10 py-3.75 bg-card/70
                                border border-border rounded-sm
                                placeholder:text-text-secondary placeholder:text-base
                                text-base text-text-primary
                                sm:placeholder:text-[13px] sm:text-[13px]
                        "/>
                    </div>
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
                        autoComplete="new-password"
                    />
                    <PasswordField
                        id="confirm-password"
                        name="confirmPassword"
                        label="Confirmar Contraseña"
                        placeholder="Confirmar Contraseña"
                        autoComplete="new-password"
                    />
                    <button 
                        type="button"
                        className="
                        h-11.75 rounded-sm border border-border
                        bg-linear-to-r from-primary via-accent to-secondary
                        text-text-primary text-sm
                    ">
                        Registrarse
                    </button>
                </form>
                <div className="flex flex-wrap justify-center gap-x-0.5 gap-y-1 text-center">
                    <span className="
                        text-text-primary text-[13px]
                    ">
                        ¿Ya tienes una cuenta?
                    </span>
                    <Link href="/login"
                        className="
                        text-[13px] text-primary
                    ">
                        Inicia Sesión
                    </Link>
                </div>
            </div>
        </div>
    )
}
