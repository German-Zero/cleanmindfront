'use client'

import PasswordField from "./PasswordField"

export default function RecoverPasswordForm() {
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
                        bg-clip-text text-2xl text-transparent text-center
                        font-semibold
                        sm:text-[30px]
                    ">Recuperar Contraseña</h1>
                    <p className="w-full max-w-80 text-center text-text-secondary font-semibold text-[13px] tracking-[0.05em]">
                        Por favor, coloque una nueva contraseña para reemplazar a la anterior.
                    </p>
                </div>
                <form
                    className="flex w-full flex-col gap-3.75"
                    onSubmit={(event) => event.preventDefault()}
                >
                    <PasswordField
                        id="new-password"
                        name="password"
                        label="Nueva Contraseña"
                        placeholder="Nueva Contraseña"
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
                        Recuperar Contraseña
                    </button>
                </form>
            </div>
        </div>
    )
}
