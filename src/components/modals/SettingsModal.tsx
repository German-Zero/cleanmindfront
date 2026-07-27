'use client'

import { useState } from "react"

export default function SettingsModal() {

    const [isActive, setIsActive] = useState(false)

    return (
        <div className="no-scrollbar flex max-h-[calc(100dvh-2rem)] w-full max-w-170 overflow-y-auto rounded-xl bg-surface text-text-primary ring ring-border">
            <div className="flex w-full flex-col gap-7.5 p-5 sm:p-8 lg:p-10">
                <div className="flex flex-col gap-1.25">
                    <h1 className=" text-2xl font-bold">
                        Perfil
                    </h1>
                    <p className="text-sm text-text-secondary">
                        Gestiona tu perfil y tus datos de inicio de sesión 
                    </p>
                </div>
                <div className="flex flex-col gap-3.75">
                    <div className="flex flex-col gap-0.5">
                        <h2 className="text-sm font-semibold">Seguridad de la cuenta</h2>
                        <div className="w-full h-px bg-primary"/>
                    </div>
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex w-full min-w-0 flex-col gap-1.25 sm:max-w-97.5">
                            <h3 className="text-[13px]">Contraseña</h3>
                            <p className="text-text-secondary text-[11px]">cambia la contraseña que utilizas para iniciar sesion</p>
                        </div>
                        <button className="self-start rounded-[3px] border border-border px-2.5 py-1.25 text-[11px] sm:shrink-0 sm:self-auto">Cambiar Contraseña</button>
                    </div>
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex w-full min-w-0 flex-col gap-1.25 sm:max-w-97.5">
                            <h3 className="text-[13px]">Verificación de dos Pasos</h3>
                            <p className="text-text-secondary text-[11px]">Agrega otra capa de seguridad a tu cuenta</p>
                        </div>
                        <button className="self-start rounded-[3px] border border-border px-2.5 py-1.25 text-left text-[11px] sm:shrink-0 sm:self-auto">Agregar un Método de Verificación</button>
                    </div>
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex w-full min-w-0 flex-col gap-1.25 sm:max-w-97.5">
                            <h3 className="text-[13px]">Eliminar mi cuenta</h3>
                            <p className="text-text-secondary text-[11px]">Elimina tu cuenta de forma permanente. Ya no podrás acceder a tus páginas ni a ninguno de los espacios de trabajo a los que perteneces.</p>
                        </div>
                        <button className="self-start rounded-[3px] border border-error bg-error/40 px-2.5 py-1.25 text-[11px] sm:shrink-0 sm:self-auto">Eliminar mi Cuenta</button>
                    </div>
                </div>

                <div className="flex flex-col gap-1.25">
                    <h1 className=" text-2xl font-bold">
                        Notificaciones
                    </h1>
                    <p className="text-sm text-text-secondary">
                        Decide cuándo y cómo quieres recibir notificaciones
                    </p>
                </div>
                <div className="flex flex-col gap-3.75">
                    <div className="flex flex-col gap-0.5">
                        <h2 className="text-sm font-semibold">Notificaciones en la App</h2>
                        <div className="w-full h-px bg-primary"/>
                    </div>
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex w-full min-w-0 flex-col gap-1.25 sm:max-w-97.5">
                            <h3 className="text-[13px]">Notificaciones de Email</h3>
                            <p className="text-text-secondary text-[11px]">Recibe notificaciones de Emails sobre la actividad en tu espacio de trabajo de CleanMind</p>
                        </div>
                        <button 
                            onClick={() => setIsActive(!isActive)}
                            className={`
                                ring ring-border rounded-full
                                w-10 h-5 flex shrink-0 self-start sm:self-auto
                                ${isActive ? 'justify-start' : 'bg-primary justify-end'}
                        `}>
                            <div className="
                                rounded-full w-5 h-5 bg-text-primary ring ring-border
                            "/>
                        </button>
                    </div>
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex w-full min-w-0 flex-col gap-1.25 sm:max-w-97.5">
                            <h3 className="text-[13px]">Notificaciones de Discord</h3>
                            <p className="text-text-secondary text-[11px]">Recibe notificaciones de Discord sobre la actividad en tu espacio de trabajo de CleanMind</p>
                        </div>
                        <button className="self-start rounded-[3px] border border-border px-2.5 py-1.25 text-[11px] sm:shrink-0 sm:self-auto">Vincular</button>
                    </div>
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex w-full min-w-0 flex-col gap-1.25 sm:max-w-97.5">
                            <h3 className="text-[13px]">Frecuencia</h3>
                            <p className="text-text-secondary text-[11px]">Cambia la frecuencia con la que recibes las notificaciones.</p>
                        </div>
                        <button className="self-start rounded-[3px] border border-border px-2.5 py-1.25 text-[11px] sm:shrink-0 sm:self-auto">Cambiar Frecuencia</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
