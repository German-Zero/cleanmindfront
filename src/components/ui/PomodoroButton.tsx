'use client'

import IconPomodoro from "./icons/IconPomodoro"

export default function PomodoroButton() {
    return (
        <div className="
            w-9 h-9 bg-primary
            rounded-tl-md rounded-tr-xl rounded-br-md
            flex justify-center items-center
        ">
            <IconPomodoro />
        </div>
    )
}