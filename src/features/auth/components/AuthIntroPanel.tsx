import CopyrightFooter from "@/components/shared/CopyrightFooter"

const calmSteps = [
    "Elige qué importa hoy",
    "Avanza en un bloque de enfoque",
    "Cierra el día con menos ruido",
]

export default function AuthIntroPanel() {
    return (
        <section className="relative flex min-h-55 w-full items-center justify-center overflow-hidden border-b border-border bg-linear-to-br from-background via-background to-card px-6 xl:h-screen xl:min-h-0 xl:flex-1 xl:justify-start xl:border-r xl:border-b-0 xl:px-[clamp(64px,8vw,140px)]">
            <div
                aria-hidden="true"
                className="absolute -top-35 -left-27.5 size-90 rounded-full bg-primary/10 blur-[90px]"
            />
            <div
                aria-hidden="true"
                className="absolute -right-30 -bottom-42.5 size-105 rounded-full bg-accent/8 blur-[110px]"
            />
            <div className="auth-intro-enter relative flex w-full max-w-145 flex-col items-center text-center xl:items-start xl:text-left">
                <span className="mb-4 rounded-full border border-primary/25 bg-primary/8 px-3 py-1.5 text-[10px] font-semibold tracking-[1.4px] text-accent uppercase">
                    Tu espacio, a tu ritmo
                </span>
                <h1 className="text-[44px] leading-13 font-semibold text-primary sm:text-[52px] sm:leading-15 xl:text-[60px] xl:leading-17">
                    CleanMind
                </h1>
                <p className="mt-2 text-[14px] leading-5.5 font-medium text-text-secondary sm:text-[16px] xl:text-[18px]">
                    Mente Limpia, Conciencia Tranquila
                </p>
                <p className="mt-4.5 hidden max-w-125 text-[13px] leading-5.5 text-text-secondary xl:block">
                    Organiza lo que tienes en mente, encuentra tu siguiente
                    paso y avanza sin sentir que todo compite por tu atención.
                </p>

                <div className="mt-8.5 hidden w-full max-w-125 rounded-[18px] border border-border/75 bg-surface/65 p-5 shadow-[0_24px_70px_rgb(0_0_0/18%)] backdrop-blur-lg xl:block">
                    <div className="flex items-center justify-between gap-5">
                        <div>
                            <p className="text-[10px] font-semibold tracking-[1.2px] text-accent uppercase">
                                Un día más claro
                            </p>
                            <h2 className="mt-1.25 text-[17px] font-semibold text-text-primary">
                                Hoy, con calma
                            </h2>
                        </div>
                        <span className="grid size-9.5 place-items-center rounded-xl border border-primary/25 bg-primary/10 text-primary">
                            <svg
                                viewBox="0 0 24 24"
                                className="size-4.5"
                                fill="none"
                                aria-hidden="true"
                            >
                                <path
                                    d="M7 3v3m10-3v3M4.5 9.5h15M6 5h12a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z"
                                    stroke="currentColor"
                                    strokeWidth="1.7"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </span>
                    </div>

                    <ol className="mt-4.5 flex flex-col gap-2.5">
                        {calmSteps.map((step, index) => (
                            <li
                                key={step}
                                className="flex items-center gap-2.75 rounded-[11px] border border-border/60 bg-card/55 px-3 py-2.5"
                            >
                                <span className="grid size-5.5 shrink-0 place-items-center rounded-[7px] bg-primary/12 text-[10px] font-semibold text-accent">
                                    {index + 1}
                                </span>
                                <span className="text-[11px] leading-4.25 text-text-secondary">
                                    {step}
                                </span>
                            </li>
                        ))}
                    </ol>

                    <div className="mt-4.5 flex items-center gap-2.5">
                        <div className="h-1 flex-1 overflow-hidden rounded-full bg-card">
                            <div className="h-full w-[68%] rounded-full bg-linear-to-r from-primary to-accent" />
                        </div>
                        <span className="text-[10px] text-text-secondary">
                            Un paso a la vez
                        </span>
                    </div>
                </div>
            </div>
            <CopyrightFooter className="absolute bottom-3 left-1/2 w-max max-w-[calc(100%-32px)] -translate-x-1/2 text-center xl:bottom-5.5 xl:left-[clamp(64px,8vw,140px)] xl:translate-x-0 xl:text-left" />
        </section>
    )
}
