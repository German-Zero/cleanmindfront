import Sidebar from "@/components/shared/Sidebar";
import CalendarButton from "@/components/ui/CalendarButton";
import MatrizButton from "@/components/ui/MatrizButton";
import PomodoroButton from "@/components/ui/PomodoroButton";
import ToolWhiteboardButton from "@/components/ui/ToolWhiteboardButton";
import Link from "next/link";

export default function WhiteboardPage() {
    return (
        <div className="flex h-screen w-screen">
            <Sidebar />
            <div className="flex h-screen w-screen justify-center items-center relative">
                <h1 className="text-text-secondary/70 font-semibold text-2xl tracking-[5%]">¿Que dibujaremos hoy?</h1>
                <div className="absolute bottom-0 right-0">
                    <ToolWhiteboardButton />
                </div>
                <Link href={"/dashboard/calendar"} className="absolute top-0 left-0"><CalendarButton /></Link>
                <Link href={"/dashboard/matriz"} className="absolute top-0 right-0"><MatrizButton /></Link>
                <Link href={"/dashboard/pomodoro"} className="absolute bottom-0 left-0"><PomodoroButton /></Link>
            </div>
        </div>
    )
}