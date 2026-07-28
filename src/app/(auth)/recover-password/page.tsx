import RecoverPasswordForm from "@/features/auth/components/RecoverPasswordForm";

interface RecoverPasswordPageProps {
    searchParams: Promise<{ token?: string | string[] }>
}

export default async function RecoverPasswordPage({
    searchParams,
}: RecoverPasswordPageProps) {
    const { token } = await searchParams

    return (
        <main className="
            w-full min-h-dvh px-4 py-6
            flex justify-center items-center
            bg-linear-to-tr from-background to-card to-90%
        ">
            <RecoverPasswordForm
                token={typeof token === "string" && token ? token : null}
            />
        </main>
    )
}
