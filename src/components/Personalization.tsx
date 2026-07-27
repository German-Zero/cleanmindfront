import IconSelect from "./ui/icons/IconSelect";

export default function Personalization() {
    return (
        <div className="flex w-full min-w-0 max-w-7xl flex-col gap-8 px-4 py-16 text-text-primary sm:gap-10 sm:px-6 xl:gap-10 xl:px-8 xl:py-0">
            <div className="flex flex-col gap-2.5">
                <h3 className="text-sm text-primary font-semibold uppercase tracking-[30%]">Tu Ambiente</h3>
                <h1 className="text-3xl font-semibold tracking-wide sm:text-4xl">Personalización</h1>
                <p className="text-text-secondary text-sm">Elige la atmosfera visual que mejor acompaña tu forma de pensar</p>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                <div className="relative flex w-full min-w-0 flex-col gap-8 rounded-lg bg-card-hover p-4 ring ring-primary sm:gap-10 sm:p-6">
                    <>
                        <div className=" w-6 h-6 bg-accent rounded-sm"/>
                        <div className="absolute top-3 right-3">
                            <IconSelect />
                        </div>
                    </>
                    <>
                        <div className="flex flex-col gap-5">
                            <div className="grid w-full grid-cols-3 gap-1.25">
                                <div className="h-2 min-w-0 rounded-full bg-[#0D0B1A]"></div>
                                <div className="h-2 min-w-0 rounded-full bg-[#3C3261]"></div>
                                <div className="h-2 min-w-0 rounded-full bg-[#6366F1]"></div>
                            </div>
                            <div className="flex flex-col gap-1">
                                <h4 className="font-semibold text-lg">Lunar Mind</h4>
                                <p className="text-[13px] text-text-secondary">Violetas profundos y foco sereno</p>
                            </div>
                        </div>
                    </>
                </div>
                <div className="relative flex w-full min-w-0 flex-col gap-8 rounded-lg bg-card/80 p-4 ring ring-border sm:gap-10 sm:p-6">
                    <>
                        <div className=" w-6 h-6 bg-accent rounded-sm"/>
                    </>
                    <>
                        <div className="flex flex-col gap-5">
                            <div className="grid w-full grid-cols-3 gap-1.25">
                                <div className="h-2 min-w-0 rounded-full bg-[#08141A]"></div>
                                <div className="h-2 min-w-0 rounded-full bg-[#29515F]"></div>
                                <div className="h-2 min-w-0 rounded-full bg-[#10B981]"></div>
                            </div>
                            <div className="flex flex-col gap-1">
                                <h4 className="font-semibold text-lg">Deep Serenity</h4>
                                <p className="text-[13px] text-text-secondary">Verdes suaves para bajar el ritmo</p>
                            </div>
                        </div>
                    </>
                </div>
                <div className="relative flex w-full min-w-0 flex-col gap-8 rounded-lg bg-card/80 p-4 ring ring-border sm:gap-10 sm:p-6">
                    <>
                        <div className=" w-6 h-6 bg-accent rounded-sm"/>
                    </>
                    <>
                        <div className="flex flex-col gap-5">
                            <div className="grid w-full grid-cols-3 gap-1.25">
                                <div className="h-2 min-w-0 rounded-full bg-[#0B1020]"></div>
                                <div className="h-2 min-w-0 rounded-full bg-[#2D3B55]"></div>
                                <div className="h-2 min-w-0 rounded-full bg-[#60A5FA]"></div>
                            </div>
                            <div className="flex flex-col gap-1">
                                <h4 className="font-semibold text-lg">Calm Tech</h4>
                                <p className="text-[13px] text-text-secondary">Azules precisos y contraste limpio</p>
                            </div>
                        </div>
                    </>
                </div>
            </div>
        </div>
    )
}
