import DashboardShell from "@/components/shared/DashboardShell";
import { DashboardProviders } from "@/features/dashboard/DashboardProviders";

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <DashboardProviders>
            <DashboardShell>{children}</DashboardShell>
        </DashboardProviders>
    );
}
