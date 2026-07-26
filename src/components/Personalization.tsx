import IconSelect from "./ui/icons/IconSelect";

export default function Personalization() {
    return (
        <div className="my-20 flex flex-col gap-10 text-text-primary">
            <div className="flex flex-col gap-2.5">
                <h3 className="text-sm text-primary font-semibold uppercase tracking-[30%]">Tu Ambiente</h3>
                <h1 className="text-4xl font-semibold tracking-wide">Personalización</h1>
                <p className="text-text-secondary text-sm">Elige la atmosfera visual que mejor acompaña tu forma de pensar</p>
            </div>
            <div className="flex flex-wrap gap-4">
                <div className="flex flex-col p-6 bg-card-hover gap-10 ring ring-primary rounded-lg relative">
                    <>
                        <div className=" w-6 h-6 bg-accent rounded-sm"/>
                        <div className="absolute top-3 right-3">
                            <IconSelect />
                        </div>
                    </>
                    <>
                        <div className="flex flex-col gap-5">
                            <div className="flex gap-1.25">
                                <div className="w-28 h-2 rounded-full bg-[#0D0B1A]"></div>
                                <div className="w-28 h-2 rounded-full bg-[#3C3261]"></div>
                                <div className="w-28 h-2 rounded-full bg-[#6366F1]"></div>
                            </div>
                            <div className="flex flex-col gap-1">
                                <h4 className="font-semibold text-lg">Lunar Mind</h4>
                                <p className="text-[13px] text-text-secondary">Violetas profundos y foco sereno</p>
                            </div>
                        </div>
                    </>
                </div>
                <div className="flex flex-col p-6 gap-10 bg-card/80 ring ring-border rounded-lg relative">
                    <>
                        <div className=" w-6 h-6 bg-accent rounded-sm"/>
                    </>
                    <>
                        <div className="flex flex-col gap-5">
                            <div className="flex gap-1.25">
                                <div className="w-28 h-2 rounded-full bg-[#08141A]"></div>
                                <div className="w-28 h-2 rounded-full bg-[#29515F]"></div>
                                <div className="w-28 h-2 rounded-full bg-[#10B981]"></div>
                            </div>
                            <div className="flex flex-col gap-1">
                                <h4 className="font-semibold text-lg">Deep Serenity</h4>
                                <p className="text-[13px] text-text-secondary">Verdes suaves para bajar el ritmo</p>
                            </div>
                        </div>
                    </>
                </div>
                <div className="flex flex-col p-6 gap-10 bg-card/80 ring ring-border rounded-lg relative">
                    <>
                        <div className=" w-6 h-6 bg-accent rounded-sm"/>
                    </>
                    <>
                        <div className="flex flex-col gap-5">
                            <div className="flex gap-1.25">
                                <div className="w-28 h-2 rounded-full bg-[#0B1020]"></div>
                                <div className="w-28 h-2 rounded-full bg-[#2D3B55]"></div>
                                <div className="w-28 h-2 rounded-full bg-[#60A5FA]"></div>
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