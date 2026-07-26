'use client'

import Matriz from "@/components/Matriz"
import Sidebar from "@/components/shared/Sidebar"
import CalendarButton from "@/components/ui/CalendarButton"
import PomodoroButton from "@/components/ui/PomodoroButton"
import WhiteboardButton from "@/components/ui/WhiteboardButton"
import Link from "next/link"

export default function MatrizPage() {
    return (
        <div className="flex w-screen h-screen">
            <Sidebar />
            <div className="h-screen w-screen relative flex justify-center items-center">
                <Matriz />
                <Link className="absolute top-0 left-0" href={"/dashboard/calendar"}><CalendarButton /></Link>
                <Link className="absolute bottom-0 right-0" href={"/dashboard/whiteboard"}><WhiteboardButton /></Link>
                <Link className="absolute bottom-0 left-0" href={"/dashboard/pomodoro"}><PomodoroButton/></Link>
            </div>
        </div>
    )
}