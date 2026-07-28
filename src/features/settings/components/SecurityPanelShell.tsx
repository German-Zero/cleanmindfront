import type { ReactNode } from "react"

interface SecurityPanelShellProps {
    title: string
    description: string
    onBack?: () => void
    onClose: () => void
    canClose?: boolean
    children: ReactNode
}

export default function SecurityPanelShell({
    title,
    description,
    onBack,
    onClose,
    canClose = true,
    children,
}: SecurityPanelShellProps) {
    return (
        <div className="no-scrollbar relative mx-auto max-h-[calc(100dvh-32px)] w-full max-w-100 overflow-y-auto rounded-xl border border-border bg-surface text-text-primary">
            {onBack && (
                <button
                    type="button"
                    onClick={onBack}
                    className="absolute top-2 left-2 grid min-h-10 place-items-center rounded-lg px-3 text-xs text-text-secondary hover:bg-card hover:text-text-primary"
                >
                    ← Volver
                </button>
            )}
            {canClose && (
                <button
                    type="button"
                    aria-label="Cerrar configuración"
                    onClick={onClose}
                    className="absolute top-2 right-2 grid size-10 place-items-center rounded-lg text-2xl leading-none text-text-secondary hover:bg-card hover:text-text-primary"
                >
                    <span aria-hidden="true">×</span>
                </button>
            )}

            <div className="flex w-full flex-col gap-7.5 px-5 py-14 sm:px-6.25 sm:py-12.5">
                <div className="flex flex-col items-center gap-2.5">
                    <h1
                        id="settings-title"
                        tabIndex={-1}
                        autoFocus
                        className="bg-linear-to-br from-primary via-secondary to-accent bg-clip-text text-center text-2xl font-semibold text-transparent sm:text-[28px]"
                    >
                        {title}
                    </h1>
                    <p
                        id="settings-description"
                        className="w-full max-w-80 text-center text-[11px] font-semibold tracking-wider text-text-secondary"
                    >
                        {description}
                    </p>
                </div>

                {children}
            </div>
        </div>
    )
}
