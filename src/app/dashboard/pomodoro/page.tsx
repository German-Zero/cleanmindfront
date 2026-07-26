import Pomodoro from "@/components/Pomodoro";
import Sidebar from "@/components/shared/Sidebar";
import CalendarButton from "@/components/ui/CalendarButton";
import MatrizButton from "@/components/ui/MatrizButton";
import WhiteboardButton from "@/components/ui/WhiteboardButton";
import Link from "next/link";

export default function PomodoroPage() {
    return (
        <div className="h-screen w-screen flex">
            <Sidebar />
            <div className="w-screen h-screen flex justify-center items-center relative">
                <Pomodoro />
                <Link href={"/dashboard/calendar"} className="absolute top-0 left-0"><CalendarButton /></Link>
                <Link href={"/dashboard/matriz"} className="absolute top-0 right-0"><MatrizButton /></Link>
                <Link href={"/dashboard/whiteboard"} className="absolute bottom-0 right-0"><WhiteboardButton /></Link>
            </div>
        </div>
    )
}