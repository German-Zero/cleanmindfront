'use client'

import IconPhone from "../ui/icons/IconPhone"
import IconShield from "../ui/icons/IconShield"

export default function MfaActivation() {
    return (
        <div className="
            relative
            w-full max-w-100 h-auto bg-surface
            border border-border rounded-xl
            flex justify-center items-center
        ">
            <div className="flex w-full flex-col gap-3.5 px-5 py-8 sm:px-6.25 sm:py-12.5">
                <div className="flex flex-col items-center gap-2.5">
                    <h1 className="
                        bg-linear-to-br from-primary via-secondary to-accent 
                        bg-clip-text text-[23px] text-transparent text-center
                        font-semibold
                    ">Activar la verificación en dos pasos</h1>
                    <p className="max-w-80 text-center text-[11px] font-semibold tracking-[0.05em] text-text-secondary">
                        Cuando uses una contraseña, confirma que eres tú mediante un código de verificación
                    </p>
                </div>
                <button className="
                    p-2.5 flex gap-2.5
                    bg-linear-to-r from-primary/50 via-accent/50 to-secondary/50
                    border border-border rounded-xl
                ">
                    <IconShield />
                    <div>
                        <h2 className="
                            text-text-primary text-start text-[13px]
                        ">Codigo de Autentificacion</h2>
                        <p className="
                            text-text-secondary text-start text-[10px]
                        ">Genera un código de un solo uso en tu aplicacion de autenticación</p>
                    </div>
                </button>
                <button className="
                    p-2.5 flex gap-2.5
                    bg-linear-to-r from-primary/50 via-accent/50 to-secondary/50
                    border border-border rounded-xl
                ">
                    <IconPhone />
                    <div>
                        <h2 className="
                            text-text-primary text-start text-[13px]
                        ">Enviame un Código</h2>
                        <p className="
                            text-text-secondary text-start text-[10px]
                        ">Agrega y verifica tu telefono</p>
                    </div>
                </button>
            </div>
        </div>
    )
}
