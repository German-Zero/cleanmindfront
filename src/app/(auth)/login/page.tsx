import LoginForm from "@/features/auth/components/LoginForm";

interface LoginPageProps {
    searchParams: Promise<{
        googleMfaChallenge?: string | string[]
        googleMfaExpiresIn?: string | string[]
    }>
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
    const params = await searchParams
    const challengeToken =
        typeof params.googleMfaChallenge === "string"
            ? params.googleMfaChallenge
            : null
    const expiresIn = Number(params.googleMfaExpiresIn)
    const initialChallenge =
        challengeToken && Number.isSafeInteger(expiresIn) && expiresIn > 0
            ? { mfaRequired: true as const, challengeToken, expiresIn }
            : null

    return (
        <main className="
            w-full min-h-dvh
            flex flex-col justify-start items-stretch
            xl:w-screen xl:h-screen xl:min-h-0
            xl:flex-row xl:justify-between xl:items-center
        ">
            <section className="
                relative flex min-h-55 w-full items-center justify-center
                overflow-hidden border-b border-border bg-background px-6
                sm:min-h-64 xl:h-screen xl:min-h-0 xl:flex-1
                xl:justify-start xl:border-r xl:border-b-0
                xl:px-[clamp(64px,8vw,140px)]
            ">
                <div
                    aria-hidden="true"
                    className="absolute top-8 left-8 h-px w-20 bg-primary/50"
                />
                <div className="flex flex-col items-center gap-2.5 px-4 text-center xl:items-start xl:px-0 xl:text-left">
                    <h1 className="text-[44px] font-semibold text-primary sm:text-[52px] xl:text-[60px]">
                        CleanMind
                    </h1>
                    <p className="max-w-115 text-[14px] font-medium leading-5.5 text-text-secondary sm:text-[16px] xl:text-[18px]">
                        Mente Limpia, Conciencia Tranquila
                    </p>
                </div>
            </section>
            <section className="
                flex w-full flex-1 items-center justify-center bg-surface
                px-6 py-10 sm:px-12
                xl:h-screen xl:w-140 xl:flex-initial xl:px-16 xl:py-12
            ">
                <LoginForm initialChallenge={initialChallenge} />
            </section>
        </main>
    )
}
