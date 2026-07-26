import Personalization from "@/components/Personalization";
import Sidebar from "@/components/shared/Sidebar";
import CalendarButton from "@/components/ui/CalendarButton";
import MatrizButton from "@/components/ui/MatrizButton";
import PomodoroButton from "@/components/ui/PomodoroButton";
import WhiteboardButton from "@/components/ui/WhiteboardButton";
import Link from "next/link";

export default function PersonalizationPage() {
    return (
        <div className="w-screen h-screen flex">
            <Sidebar />
            <div className="w-screen h-screen justify-center flex relative">
                <Personalization />
                <Link className="absolute bottom-0 left-0" href={"/dashboard/pomodoro"}><PomodoroButton /></Link>
                <Link className="absolute top-0 left-0" href={"/dashboard/calendar"}><CalendarButton /></Link>
                <Link className="absolute top-0 right-0" href={"/dashboard/matriz"}><MatrizButton /></Link>
                <Link className="absolute bottom-0 right-0" href={"/dashboard/whiteboard"}><WhiteboardButton /></Link>
            </div>
        </div>
    )
}