'use client'

import IconWhiteboard from "./icons/IconWhiteboard"

export default function WhiteboardButton() {
    return (
        <div className="
            flex size-9 items-center justify-center
            xl:rounded-tl-xl xl:rounded-tr-md xl:rounded-bl-md xl:bg-primary
        ">
            <IconWhiteboard />
        </div>
    )
}
