'use client'

import IconPomodoro from "./icons/IconPomodoro"

export default function PomodoroButton() {
    return (
        <div className="
            flex size-9 items-center justify-center
            xl:rounded-tl-md xl:rounded-tr-xl xl:rounded-br-md xl:bg-primary
        ">
            <IconPomodoro />
        </div>
    )
}
