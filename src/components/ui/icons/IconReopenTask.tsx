"use client"

import { useId } from "react"

export default function IconReopenTask() {
    const gradientId = useId()

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 32 32"
            aria-hidden="true"
        >
            <defs>
                <linearGradient
                    id={gradientId}
                    x1="4"
                    x2="28"
                    y1="4"
                    y2="28"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#8b5cf6" />
                    <stop offset="1" stopColor="#38bdf8" />
                </linearGradient>
            </defs>
            <circle cx="16" cy="16" r="14" fill={`url(#${gradientId})`} />
            <path
                d="M23.5 10.5V6m0 4.5H19M23 11a8 8 0 1 0 .7 8"
                fill="none"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}
