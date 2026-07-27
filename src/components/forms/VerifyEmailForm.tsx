'use client'

export default function VerifyEmailForm() {
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
                        bg-clip-text text-3xl text-transparent text-center
                        font-semibold
                        sm:text-4xl
                    ">Verificar Correo</h1>
                    <p className="w-full max-w-81.25 text-center text-text-secondary font-semibold text-[13px] tracking-[0.05em]">
                        Por favor, introduce el código enviado a tu correo electrónico para verificar que eres tú
                    </p>
                </div>
                <form
                    className="flex w-full flex-col gap-3.75"
                    onSubmit={(event) => event.preventDefault()}
                >

                    <fieldset className="flex justify-center gap-1.5 sm:gap-2.5">
                        <legend className="sr-only">Código de verificación</legend>
                        {Array.from({ length: 6 }, (_, index) => (
                            <input
                                key={index}
                                required
                                id={`code-${index + 1}`}
                                name="code"
                                type="text"
                                inputMode="numeric"
                                pattern="[0-9]"
                                maxLength={1}
                                autoComplete={index === 0 ? "one-time-code" : "off"}
                                aria-label={`Dígito ${index + 1} del código`}
                                className="
                                    bg-card/70 w-9 h-9
                                    rounded-sm border border-border
                                    font-semibold text-center text-text-primary
                                    sm:w-10 sm:h-10
                                "
                            />
                        ))}
                    </fieldset>

                    <button 
                        type="button"
                        className="
                        h-11.75 rounded-sm border border-border
                        bg-linear-to-r from-primary via-accent to-secondary
                        text-text-primary text-sm
                    ">
                        Verificar
                    </button>
                </form>

                <div className="flex flex-wrap justify-center gap-x-0.5 gap-y-1 text-center">
                    <span className="
                        text-text-primary text-[13px]
                    ">
                        ¿No te llegó el código?
                    </span>
                    <button
                        type="button"
                        className="
                        text-[13px] text-primary
                    ">
                        Reenviar código
                    </button>
                </div>
            </div>
        </div>
    )
}
