import VerifyEmailForm from "@/features/auth/components/VerifyEmailForm";

interface VerifyEmailPageProps {
    searchParams: Promise<{ email?: string | string[] }>
}

export default async function VerifyEmailPage({
    searchParams,
}: VerifyEmailPageProps) {
    const { email } = await searchParams

    return (
        <main className="relative flex min-h-dvh w-full items-center justify-center overflow-hidden bg-linear-to-br from-background via-surface to-card px-4 py-8">
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_center,var(--color-primary)_1px,transparent_1px)] [background-size:28px_28px]"
            />
            <VerifyEmailForm
                email={typeof email === "string" ? email : null}
            />
        </main>
    )
}
