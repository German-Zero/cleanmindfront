'use client'

export default function Matriz() {
    return (
        <div className="grid w-full min-w-0 max-w-6xl grid-cols-1 gap-3 rounded-xl bg-surface p-3 sm:gap-4 sm:p-4 md:grid-cols-2 xl:gap-4 xl:p-4">
            <div className="relative flex min-h-44 flex-col gap-3 rounded-xl border border-border bg-card md:min-h-52 xl:min-h-62.5">
                <span className="self-start bg-now text-sm font-semibold px-3 py-1 rounded-tl-xl rounded-br-md mb-2 text-text-primary tracking-[5%]">
                    Hacer Ahora...
                </span>
                <div className="flex flex-col gap-2 text-text-primary m-3.5">
                    <div className="bg-now h-7 w-3/5 rounded-md px-3 flex items-center text-xs font-medium">
                        Diseñar Frontend
                    </div>
                    <div className="bg-now h-5 w-11/12 rounded-md"></div>
                    <div className="grid grid-cols-3 gap-2">
                        <div className="bg-now h-5 rounded-md col-span-2"></div>
                        <div className="bg-now h-5 rounded-md"></div>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                        <div className="bg-now h-5 rounded-md"></div>
                        <div className="bg-now h-5 rounded-md col-span-2"></div>
                        <div className="bg-now h-5 rounded-md"></div>
                    </div>
                </div>
            </div>

            <div className="relative flex min-h-44 flex-col justify-between rounded-xl border border-border bg-card text-text-primary md:min-h-52 xl:min-h-62.5">
                <div className="w-full flex justify-end">
                    <span className="bg-plan text-sm font-semibold px-3 py-1 rounded-tr-xl rounded-bl-md tracking-[5%]">
                        Planificar...
                    </span>
                </div>
                <div className="flex flex-col gap-2 mb-auto m-4">
                    <div className="grid grid-cols-3 gap-2">
                        <div className="bg-plan h-5 rounded-md"></div>
                        <div className="bg-plan h-5 rounded-md col-span-2"></div>
                    </div>
                    <div className="bg-plan h-5 w-1/2 rounded-md"></div>
                </div>
            </div>

            <div className="relative flex min-h-44 flex-col justify-between rounded-xl border border-border bg-card text-text-primary md:min-h-52 xl:min-h-62.5">
                <div className="flex flex-col gap-2 m-4">
                    <div className="grid grid-cols-4 gap-2">
                        <div className="bg-delegate h-5 rounded-md"></div>
                        <div className="bg-delegate h-5 rounded-md col-span-3"></div>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                        <div className="bg-delegate h-5 rounded-md col-span-2"></div>
                        <div className="bg-delegate h-5 rounded-md"></div>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                        <div className="bg-[#b380ff] h-5 rounded-md"></div>
                        <div className="bg-delegate h-5 rounded-md col-span-2"></div>
                        <div className="bg-delegate h-5 rounded-md"></div>
                    </div>
                </div>
                <span className="self-start bg-delegate text-sm font-semibold px-3 py-1 mt-4 rounded-bl-xl rounded-tr-md tracking-[5%]">
                    Delegar...
                </span>
            </div>

            <div className="relative flex min-h-44 flex-col justify-between rounded-xl border border-border bg-card text-text-primary md:min-h-52 xl:min-h-62.5">
                <div className="flex flex-col gap-2 m-3.5">
                    <div className="grid grid-cols-4 gap-2">
                        <div className="bg-delete h-5 rounded-md col-span-1"></div>
                        <div className="bg-delete h-5 rounded-md col-span-3"></div>
                    </div>
                    <div className="bg-delete h-5 w-11/12 rounded-md"></div>
                    <div className="grid grid-cols-4 gap-2">
                        <div className="bg-delete h-5 rounded-md col-span-1"></div>
                        <div className="bg-delete h-5 rounded-md col-span-2"></div>
                        <div className="bg-delete h-5 rounded-md col-span-1"></div>
                    </div>
                    <div className="bg-delete h-5 w-4/5 rounded-md"></div>
                    <div className="bg-delete h-5 w-3/5 rounded-md"></div>
                </div>
                <div className="w-full flex justify-end mt-4">
                    <span className="bg-delete text-sm font-semibold px-3 py-1 rounded-br-xl rounded-tl-md tracking-[5%]">
                        Eliminar...
                    </span>
                </div>
            </div>
        </div>
    );
}
