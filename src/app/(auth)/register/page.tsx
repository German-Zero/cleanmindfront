import RegisterForm from "@/features/auth/components/RegisterForm";
import AuthIntroPanel from "@/features/auth/components/AuthIntroPanel";

export default function RegisterPage() {
    return (
        <main className="flex min-h-dvh w-full flex-col bg-background xl:h-screen xl:min-h-0 xl:flex-row">
            <AuthIntroPanel />
            <section className="flex w-full flex-1 items-center justify-center bg-surface px-[24px] py-[40px] sm:px-[48px] xl:h-screen xl:w-[560px] xl:flex-initial xl:px-[64px] xl:py-[48px]">
                <RegisterForm />
            </section>
        </main>
    )
}
