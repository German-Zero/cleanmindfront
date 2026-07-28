import ForgotPasswordForm from "@/features/auth/components/ForgotPasswordForm";

export default function ForgotPasswordPage() {
    return (
        <main className="
            w-full min-h-dvh px-4 py-6
            flex justify-center items-center
            bg-linear-to-tr from-background to-card to-90%
        ">
            <ForgotPasswordForm />
        </main>
    )
}
