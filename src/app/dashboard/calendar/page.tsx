import { Calendar } from "@/components/Calendar";
import Sidebar from "@/components/shared/Sidebar";
import MatrizButton from "@/components/ui/MatrizButton";
import PomodoroButton from "@/components/ui/PomodoroButton";
import WhiteboardButton from "@/components/ui/WhiteboardButton";
import Link from "next/link";

export default function CalendarPage() {
    return (
        <div className="w-screen h-screen flex">
            <Sidebar />
            <div className="relative h-screen w-screen items-center justify-center flex">
                <Link href={"/dashboard/matriz"} className="absolute top-0 right-0">
                    <MatrizButton />
                </Link>
                <Link href={"/dashboard/whiteboard"} className="absolute bottom-0 right-0">
                    <WhiteboardButton />
                </Link>
                <Link href={"/dashboard/pomodoro"} className="absolute bottom-0 left-0">
                    <PomodoroButton />
                </Link>
                <Calendar />
            </div>
        </div>
    )
}   