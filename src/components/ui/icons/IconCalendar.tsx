"use client"

import { useId } from "react"

export default function IconCalendar() {
    const calendarGradient = useId()
    const headerGradient = useId()

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 32 32"
            fill="none"
            aria-hidden="true"
        >
            <rect
                width="26"
                height="26"
                x="3"
                y="4"
                rx="6"
                fill={`url(#${calendarGradient})`}
            />
            <path
                d="M3 10a6 6 0 0 1 6-6h14a6 6 0 0 1 6 6v4H3z"
                fill={`url(#${headerGradient})`}
            />
            <path
                d="M10 2.75v4.5m12-4.5v4.5"
                stroke="#fff"
                strokeWidth="2.4"
                strokeLinecap="round"
            />
            <rect
                width="5"
                height="5"
                x="8"
                y="17"
                rx="1.6"
                fill="#fff"
                fillOpacity=".92"
            />
            <rect
                width="5"
                height="5"
                x="19"
                y="17"
                rx="1.6"
                fill="#fff"
                fillOpacity=".42"
            />
            <rect
                width="5"
                height="3"
                x="8"
                y="24"
                rx="1.5"
                fill="#fff"
                fillOpacity=".36"
            />
            <rect
                width="5"
                height="3"
                x="19"
                y="24"
                rx="1.5"
                fill="#fff"
                fillOpacity=".7"
            />
            <defs>
                <linearGradient
                    id={calendarGradient}
                    x1="5"
                    x2="27"
                    y1="7"
                    y2="29"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#6D5DFC" />
                    <stop offset="1" stopColor="#3AA7E8" />
                </linearGradient>
                <linearGradient
                    id={headerGradient}
                    x1="5"
                    x2="28"
                    y1="4"
                    y2="14"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#C77DFF" />
                    <stop offset="1" stopColor="#FF7AB6" />
                </linearGradient>
            </defs>
        </svg>
    )
}
