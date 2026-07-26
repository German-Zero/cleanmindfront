'use client'

export default function ForgotPasswordForm() {
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
                        bg-clip-text text-[23px] text-transparent
                        font-semibold
                    ">¿Olvidaste tu Contraseña?</h1>
                    <h2 className="w-[320px] text-center text-text-secondary font-semibold text-[13px] tracking-[5%]">
                        Te enviaremos un código a tu correo para verificar que existe una cuenta en CleanMind
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
                        <div className="relative w-87.5">
                            <input 
                                required
                                type="email"
                                placeholder="tu@email.com" 
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
                    <button 
                        type="submit"
                        className="
                        h-11.75 rounded-sm border border-border
                        bg-secondary/60
                        text-text-primary text-sm
                    ">
                        Atras
                    </button>
                </form>
            </div>
        </div>
    )
}