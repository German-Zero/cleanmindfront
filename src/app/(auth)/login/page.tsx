import LoginForm from "@/features/auth/components/LoginForm";
import AuthIntroPanel from "@/features/auth/components/AuthIntroPanel";

interface LoginPageProps {
    searchParams: Promise<{
        googleMfaChallenge?: string | string[]
        googleMfaExpiresIn?: string | string[]
        googleRegistrationError?: string | string[]
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
    const googleRegistrationError =
        typeof params.googleRegistrationError === "string"
            ? params.googleRegistrationError
            : null
    const initialError = initialChallenge
        ? null
        : googleRegistrationError === "not-invited"
          ? "Esta beta privada es solo por invitación."
          : googleRegistrationError === "full"
            ? "La beta alcanzó el cupo máximo. Si ya tienes una cuenta, puedes seguir iniciando sesión."
            : null

    return (
        <main className="
            w-full min-h-dvh
            flex flex-col justify-start items-stretch
            xl:w-screen xl:h-screen xl:min-h-0
            xl:flex-row xl:justify-between xl:items-center
        ">
            <AuthIntroPanel />
            <section className="
                flex w-full flex-1 items-center justify-center bg-surface
                px-6 py-10 sm:px-12
                xl:h-screen xl:w-140 xl:flex-initial xl:px-16 xl:py-12
            ">
                <LoginForm
                    initialChallenge={initialChallenge}
                    initialError={initialError}
                />
            </section>
        </main>
    )
}
