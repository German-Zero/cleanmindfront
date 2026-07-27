'use client'

import IconCalendar from "./icons/IconCalendar"

export default function CalendarButton() {
    return (
        <div className="
            flex size-9 items-center justify-center
            xl:rounded-tr-md xl:rounded-br-xl xl:rounded-bl-md xl:bg-primary
        ">
            <IconCalendar />
        </div>
    )
}
