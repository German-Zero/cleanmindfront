import DashboardShell from "@/components/shared/DashboardShell";
import { CurrentUserProvider } from "@/features/auth/CurrentUserProvider";
import { ThemeProvider } from "@/features/settings/ThemeProvider";
import { TasksProvider } from "@/features/tasks/TasksProvider";

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <CurrentUserProvider>
            <ThemeProvider>
                <TasksProvider>
                    <DashboardShell>{children}</DashboardShell>
                </TasksProvider>
            </ThemeProvider>
        </CurrentUserProvider>
    );
}
