import VerifyEmailForm from "@/features/auth/components/VerifyEmailForm";

interface VerifyEmailPageProps {
    searchParams: Promise<{ email?: string | string[] }>
}

export default async function VerifyEmailPage({
    searchParams,
}: VerifyEmailPageProps) {
    const { email } = await searchParams

    return (
        <main className="flex min-h-dvh w-full items-center justify-center bg-background px-[20px] py-[40px]">
            <VerifyEmailForm
                email={typeof email === "string" ? email : null}
            />
        </main>
    )
}
