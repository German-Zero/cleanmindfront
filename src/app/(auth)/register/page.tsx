import RegisterForm from "@/features/auth/components/RegisterForm";

export default function RegisterPage() {
    return (
        <main className="flex min-h-dvh w-full flex-col bg-background xl:h-screen xl:min-h-0 xl:flex-row">
            <section className="relative flex min-h-[220px] w-full items-center justify-center overflow-hidden border-b border-border bg-linear-to-br from-background to-card px-[24px] xl:min-h-0 xl:flex-1 xl:justify-start xl:border-r xl:border-b-0 xl:px-[clamp(64px,8vw,140px)]">
                <div
                    aria-hidden="true"
                    className="absolute top-[32px] left-[32px] h-[1px] w-[80px] bg-primary/50"
                />
                <div className="flex flex-col items-center gap-[10px] text-center xl:items-start xl:text-left">
                    <h1 className="text-[44px] font-semibold text-primary sm:text-[52px] xl:text-[60px]">
                        CleanMind
                    </h1>
                    <p className="max-w-[460px] text-[14px] font-medium leading-[22px] text-text-secondary sm:text-[16px] xl:text-[18px]">
                        Mente Limpia, Conciencia Tranquila
                    </p>
                </div>
            </section>
            <section className="flex w-full flex-1 items-center justify-center bg-surface px-[24px] py-[40px] sm:px-[48px] xl:h-screen xl:w-[560px] xl:flex-initial xl:px-[64px] xl:py-[48px]">
                <RegisterForm />
            </section>
        </main>
    )
}
