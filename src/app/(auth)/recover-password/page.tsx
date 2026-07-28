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
            flex min-h-dvh w-full items-center justify-center
            bg-background px-5 py-10
        ">
            <RecoverPasswordForm
                token={typeof token === "string" && token ? token : null}
            />
        </main>
    )
}
