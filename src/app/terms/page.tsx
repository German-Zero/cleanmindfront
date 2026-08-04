import type { Metadata } from 'next'
import TermsAcceptanceForm from '@/features/legal/components/TermsAcceptanceForm'

export const metadata: Metadata = {
    title: 'Condiciones de uso | CleanMind',
    description: 'Aceptación de las condiciones vigentes de CleanMind.',
}

export default function TermsPage() {
    return (
        <main className="relative grid min-h-dvh place-items-center overflow-hidden bg-background px-4 py-7 text-text-primary">
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-45 -left-35 h-105 w-105 rounded-full bg-primary/10 blur-[110px]"
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-45 -bottom-55 h-125 w-125 rounded-full bg-accent/8 blur-[130px]"
            />
            <div className="relative z-1 w-full">
                <TermsAcceptanceForm />
            </div>
        </main>
    )
}
