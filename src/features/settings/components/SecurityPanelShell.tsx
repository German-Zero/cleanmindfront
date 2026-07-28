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
        <div className="calm-panel no-scrollbar relative mx-auto max-h-[calc(100dvh-32px)] w-full max-w-105 overflow-y-auto text-text-primary">
            {onBack && (
                <button
                    type="button"
                    onClick={onBack}
                    className="absolute top-2.5 left-2.5 grid min-h-10 place-items-center rounded-[10px] px-3 text-[11px] text-text-secondary hover:bg-card hover:text-text-primary"
                >
                    ← Volver
                </button>
            )}
            {canClose && (
                <button
                    type="button"
                    aria-label="Cerrar configuración"
                    onClick={onClose}
                    className="calm-icon-button absolute top-2.5 right-2.5 text-[22px] leading-none"
                >
                    <span aria-hidden="true">×</span>
                </button>
            )}

            <div className="flex w-full flex-col gap-7.5 px-5.5 py-14 sm:px-7 sm:py-12.5">
                <div className="flex flex-col items-center gap-2">
                    <h1
                        id="settings-title"
                        tabIndex={-1}
                        autoFocus
                        className="text-center text-[24px] font-semibold tracking-[-0.3px] text-text-primary sm:text-[28px]"
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
