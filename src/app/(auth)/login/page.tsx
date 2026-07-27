import LogInForm from "@/components/forms/LoginForm";

export default function LoginPage() {
    return (
        <main className="
            w-full min-h-dvh
            flex flex-col justify-start items-stretch
            xl:w-screen xl:h-screen xl:min-h-0
            xl:flex-row xl:justify-between xl:items-center
        ">
            <div className="
                w-full min-h-48 flex justify-center items-center
                bg-linear-to-tr from-background to-card to-90%
                sm:min-h-64
                xl:w-screen xl:h-screen xl:min-h-0
            ">
                <div className="flex flex-col items-center gap-2.5 px-4 text-center xl:items-start xl:px-0 xl:text-left">
                    <h1 className="
                        bg-linear-to-br from-primary via-secondary to-accent 
                        bg-clip-text text-4xl text-transparent
                        font-semibold
                        sm:text-5xl xl:text-6xl
                        ">CleanMind</h1>
                    <p className="max-w-sm text-sm font-semibold tracking-[0.05em] text-text-secondary sm:text-lg xl:max-w-none xl:text-2xl">
                        Mente Limpia, Conciencia Tranquila
                    </p>
                </div>
            </div>
            <div className="
                w-full flex flex-1 items-center justify-center
                bg-surface px-4 py-8 ring ring-border
                xl:h-screen xl:w-screen xl:max-w-187.5 xl:flex-initial
                xl:px-0 xl:py-0
            ">
                <LogInForm />
            </div>
        </main>
    )
}
