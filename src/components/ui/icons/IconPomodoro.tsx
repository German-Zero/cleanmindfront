"use client"

import { useId } from "react"

export default function IconPomodoro() {
    const iconId = useId()

    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32">
            <path d="M0 0h32v32H0z" fill="none" />
            <g fill="none">
                <path fill={`url(#${iconId}-face)`} d="M16 30c7.732 0 14-6.268 14-14S23.732 2 16 2S2 8.268 2 16s6.268 14 14 14" />
                <path fill={`url(#${iconId}-hand)`} d="M14 9a1 1 0 1 1 2 0v7h4a1 1 0 1 1 0 2h-5a1 1 0 0 1-1-1z" />
                <defs>
                    <linearGradient id={`${iconId}-face`} x1="6.667" x2="20.667" y1=".444" y2="31.556" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#1ec8b0" />
                        <stop offset="1" stopColor="#2764e7" />
                    </linearGradient>
                    <linearGradient id={`${iconId}-hand`} x1="14.613" x2="11.885" y1="9.531" y2="17.383" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#fdfdfd" />
                        <stop offset="1" stopColor="#d1d1ff" />
                    </linearGradient>
                </defs>
            </g>
        </svg>
    )
}
