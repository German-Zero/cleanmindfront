'use client'

import IconCalendar from "./icons/IconCalendar"

export default function CalendarButton() {
    return (
        <div className="
            w-9 h-9 bg-primary
            rounded-bl-md rounded-br-xl rounded-tr-md
            flex justify-center items-center
        ">
            <IconCalendar />
        </div>
    )
}