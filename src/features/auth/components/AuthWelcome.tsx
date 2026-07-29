interface AuthWelcomeProps {
    mode: "login" | "register"
    name: string
}

export default function AuthWelcome({ mode, name }: AuthWelcomeProps) {
    const firstName = name.trim().split(/\s+/)[0] || "Hola"
    const isRegister = mode === "register"

    return (
        <div
            role="status"
            aria-live="polite"
            className="auth-welcome-enter flex w-full max-w-100 flex-col items-center text-center"
        >
            <div className="auth-welcome-mark relative grid size-18 place-items-center rounded-[22px] border border-primary/30 bg-primary/10 text-primary">
                <svg
                    viewBox="0 0 24 24"
                    className="size-7.5"
                    fill="none"
                    aria-hidden="true"
                >
                    <path
                        d="m6.5 12.5 3.4 3.4 7.8-8.1"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </div>
            <p className="mt-6 text-[10px] font-semibold tracking-[1.5px] text-accent uppercase">
                {isRegister ? "Cuenta creada" : "Sesión iniciada"}
            </p>
            <h2 className="mt-2 text-[26px] leading-8.5 font-semibold text-text-primary">
                {isRegister ? "Bienvenido" : "Qué bueno verte"},{" "}
                {firstName}
            </h2>
            <p className="mt-2.5 max-w-[320px] text-[12px] leading-5 text-text-secondary">
                {isRegister
                    ? "Todo está listo. Solo falta confirmar tu email."
                    : "Estamos preparando tu espacio para que continúes con calma."}
            </p>
            <div
                aria-hidden="true"
                className="mt-7 h-0.75 w-28 overflow-hidden rounded-full bg-card"
            >
                <div className="auth-welcome-progress h-full rounded-full bg-primary" />
            </div>
        </div>
    )
}
