import SecurityPanelShell from "./SecurityPanelShell"

interface DeleteAccountPanelProps {
    onBack: () => void
    onClose: () => void
}

export default function DeleteAccountPanel({
    onBack,
    onClose,
}: DeleteAccountPanelProps) {
    return (
        <SecurityPanelShell
            title="Eliminar mi cuenta"
            description="Esta acción elimina de forma permanente tu cuenta y tus espacios de trabajo."
            onBack={onBack}
            onClose={onClose}
        >
            <div className="flex flex-col gap-4">
                <p
                    role="status"
                    className="rounded-lg border border-warning/50 bg-warning/10 p-4 text-xs leading-5 text-text-primary"
                >
                    La eliminación de cuenta todavía no está disponible.
                    Activaremos esta acción cuando podamos verificar tu
                    identidad y eliminar tus datos de forma segura.
                </p>
                <button
                    type="button"
                    disabled
                    className="h-11.75 rounded-sm border border-error bg-error/30 text-sm text-text-primary opacity-60"
                >
                    Eliminación no disponible
                </button>
            </div>
        </SecurityPanelShell>
    )
}
