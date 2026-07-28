"use client"

import { useId } from "react"

export default function IconCompleteTask() {
    const circleGradientId = useId()
    const checkGradientId = useId()

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 32 32"
            aria-hidden="true"
        >
            <path d="M0 0h32v32H0z" fill="none" />
            <g fill="none">
                <path fill={`url(#${circleGradientId})`} d="M30 16c0 7.732-6.268 14-14 14S2 23.732 2 16S8.268 2 16 2s14 6.268 14 14" />
                <path fill={`url(#${checkGradientId})`} d="M22.707 12.707a1 1 0 0 0-1.414-1.414L14.5 18.086l-3.293-3.293a1 1 0 0 0-1.414 1.414l4 4a1 1 0 0 0 1.414 0z" />
                <defs>
                    <linearGradient id={circleGradientId} x1="3" x2="22.323" y1="7.25" y2="27.326" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#52d17c" />
                        <stop offset="1" stopColor="#22918b" />
                    </linearGradient>
                    <linearGradient id={checkGradientId} x1="12.031" x2="14.162" y1="11.969" y2="22.66" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#fff" />
                        <stop offset="1" stopColor="#e3ffd9" />
                    </linearGradient>
                </defs>
            </g>
        </svg>

    )
}
