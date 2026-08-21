"use client"

import { useEffect, useRef, useState } from "react"
import { useCurrentUser } from "@/features/auth/CurrentUserProvider"
import { authService } from "@/features/auth/services/auth.service"

const steps = [
    {
        eyebrow: "Tu espacio",
        title: "Bienvenido a CleanMind",
        description:
            "Aquí puedes sacar las tareas de tu cabeza y ver solo lo que necesitas en cada momento.",
        points: [
            "El inicio te permite elegir por dónde empezar.",
            "La barra lateral mantiene a mano lo que tienes pendiente.",
        ],
        tags: ["Inicio", "Secciones", "Vista clara"],
    },
    {
        eyebrow: "Organización",
        title: "Empieza agregando una tarea",
        description:
            "Usa el botón +, escribe lo necesario y marca si la tarea es urgente o importante.",
        points: [
            "Puedes verla por mes, semana o día.",
            "La matriz la ubicará automáticamente según su prioridad.",
        ],
        tags: ["Nueva tarea", "Fecha", "Matriz"],
    },
    {
        eyebrow: "Enfoque",
        title: "Trabaja de a una cosa por vez",
        description:
            "Inicia una tarea y acompáñala con Pomodoro cuando necesites un bloque de concentración.",
        points: [
            "Pausa y continúa el temporizador cuando lo necesites.",
            "El contador lateral muestra cuántas tareas están en curso.",
        ],
        tags: ["En curso", "Pomodoro", "Descansos"],
    },
    {
        eyebrow: "A tu manera",
        title: "Ajusta el espacio a tu ritmo",
        description:
            "Personaliza el tema, usa la pizarra para pensar libremente y activa solo los avisos que te sirvan.",
        points: [
            "Puedes cambiar estas opciones en cualquier momento.",
            "No hace falta configurar todo ahora.",
        ],
        tags: ["Pizarra", "Temas", "Recordatorios"],
    },
] as const

export default function OnboardingTutorial() {
    const { user, markOnboardingCompleted } = useCurrentUser()
    const dialogRef = useRef<HTMLDialogElement>(null)
    const titleRef = useRef<HTMLHeadingElement>(null)
    const [step, setStep] = useState(0)
    const [isSaving, setIsSaving] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const currentStep = steps[step]
    const isLastStep = step === steps.length - 1

    useEffect(() => {
        const dialog = dialogRef.current
        if (!user?.needsOnboarding || !dialog || dialog.open) return

        dialog.showModal()
        return () => {
            if (dialog.open) dialog.close()
        }
    }, [user?.needsOnboarding])

    useEffect(() => {
        titleRef.current?.focus()
    }, [step])

    if (!user?.needsOnboarding) return null

    const finishTutorial = async () => {
        if (isSaving) return

        setIsSaving(true)
        setError(null)

        try {
            await authService.completeOnboarding()
            markOnboardingCompleted()
        } catch {
            setError(
                "No pudimos guardar el progreso. Inténtalo nuevamente.",
            )
            setIsSaving(false)
        }
    }

    return (
        <dialog
            ref={dialogRef}
            aria-labelledby="onboarding-title"
            aria-describedby="onboarding-description"
            onCancel={(event) => event.preventDefault()}
            className="fixed inset-0 z-100 m-auto max-h-[calc(100dvh-32px)] w-[calc(100%-32px)] max-w-140 overflow-hidden rounded-[22px] border border-border/75 bg-surface p-0 text-text-primary shadow-[0_28px_90px_rgb(0_0_0/48%)] backdrop:bg-black/72 backdrop:backdrop-blur-[5px]"
        >
            <div className="relative overflow-hidden px-5.5 pt-5.5 pb-5 sm:px-7.5 sm:pt-7 sm:pb-6.5">
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-22.5 -right-17.5 size-57.5 rounded-full bg-primary/14 blur-[55px]"
                />

                <div className="relative flex items-start justify-between gap-4">
                    <div>
                        <p className="text-[10px] font-semibold tracking-[1.4px] text-accent uppercase">
                            Primeros pasos
                        </p>
                        <p className="mt-1.25 text-[11px] text-text-secondary">
                            Paso {step + 1} de {steps.length}
                        </p>
                    </div>
                    <button
                        type="button"
                        disabled={isSaving}
                        onClick={() => void finishTutorial()}
                        className="rounded-lg px-2 py-1.5 text-[11px] font-medium text-text-secondary transition-colors hover:bg-card hover:text-text-primary disabled:cursor-wait disabled:opacity-50"
                    >
                        Saltar tutorial
                    </button>
                </div>

                <div
                    role="progressbar"
                    aria-label="Progreso del tutorial"
                    aria-valuemin={1}
                    aria-valuemax={steps.length}
                    aria-valuenow={step + 1}
                    className="relative mt-4.5 grid grid-cols-4 gap-1.5"
                >
                    {steps.map((item, index) => (
                        <span
                            aria-hidden="true"
                            key={item.eyebrow}
                            className={`h-0.75 rounded-full transition-colors ${
                                index <= step
                                    ? "bg-primary"
                                    : "bg-border/70"
                            }`}
                        />
                    ))}
                </div>

                <section className="relative mt-7 min-h-75 sm:min-h-70">
                    <p className="text-[11px] font-semibold tracking-[1.2px] text-primary uppercase">
                        {currentStep.eyebrow}
                    </p>
                    <h2
                        ref={titleRef}
                        id="onboarding-title"
                        tabIndex={-1}
                        className="mt-2 text-[22px] leading-7.5 font-semibold outline-none sm:text-[26px] sm:leading-8.5"
                    >
                        {currentStep.title}
                    </h2>
                    <p
                        id="onboarding-description"
                        className="mt-2.5 max-w-117.5 text-[13px] leading-5.25 text-text-secondary"
                    >
                        {currentStep.description}
                    </p>

                    <div className="mt-5 rounded-[14px] border border-border/60 bg-card/48 px-4 py-3.5">
                        <ul className="grid gap-2.5">
                            {currentStep.points.map((point) => (
                                <li
                                    key={point}
                                    className="flex items-start gap-2.5 text-[12px] leading-4.5 text-text-primary"
                                >
                                    <span
                                        aria-hidden="true"
                                        className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent"
                                    />
                                    {point}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-1.75">
                        {currentStep.tags.map((tag) => (
                            <span
                                key={tag}
                                className="rounded-full border border-primary/25 bg-primary/9 px-2.5 py-1.25 text-[10px] font-medium text-text-secondary"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </section>

                {error && (
                    <p
                        role="alert"
                        className="mt-3 rounded-[10px] border border-error/30 bg-error/8 px-3 py-2.25 text-[11px] text-error"
                    >
                        {error}
                    </p>
                )}

                <div className="relative mt-5.5 flex items-center justify-between gap-3 border-t border-border/55 pt-4.5">
                    <button
                        type="button"
                        disabled={step === 0 || isSaving}
                        onClick={() => {
                            setError(null)
                            setStep((current) => current - 1)
                        }}
                        className="calm-button-secondary min-w-24 disabled:cursor-not-allowed disabled:opacity-35"
                    >
                        Anterior
                    </button>
                    <button
                        type="button"
                        disabled={isSaving}
                        onClick={() => {
                            setError(null)
                            if (isLastStep) {
                                void finishTutorial()
                                return
                            }
                            setStep((current) => current + 1)
                        }}
                        className="calm-button min-w-28 disabled:cursor-wait disabled:opacity-50"
                    >
                        {isSaving
                            ? "Guardando…"
                            : isLastStep
                              ? "Empezar"
                              : "Siguiente"}
                    </button>
                </div>
            </div>
        </dialog>
    )
}
