'use client'

import IconWhiteboard from "./icons/IconWhiteboard"

export default function WhiteboardButton() {
    return (
        <div className="
            w-9 h-9 bg-primary
            rounded-bl-md rounded-tl-xl rounded-tr-md
            flex justify-center items-center
        ">
            <IconWhiteboard />
        </div>
    )
}