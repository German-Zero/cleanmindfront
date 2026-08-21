"use client"

import { useId } from "react"

export default function IconWhiteboard() {
    const iconId = useId()

    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32">
            <path d="M0 0h32v32H0z" fill="none" />
            <g fill="none">
                <path fill={`url(#${iconId}-board)`} d="M6 3a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v12H6z" />
                <path fill={`url(#${iconId}-base)`} d="M26 15.5H6v3.25A3.25 3.25 0 0 0 9.25 22H13v5a3 3 0 1 0 6 0v-5h3.75A3.25 3.25 0 0 0 26 18.75z" />
                <path fill={`url(#${iconId}-edge)`} d="M6 15a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v1H6z" />
                <path fill={`url(#${iconId}-marks)`} d="M17 2v5a1 1 0 1 0 2 0V2z" />
                <path fill={`url(#${iconId}-marks)`} d="M23 9V2h-2v7a1 1 0 1 0 2 0" />
                <defs>
                    <linearGradient id={`${iconId}-board`} x1="12" x2="18.902" y1="-2.062" y2="20.028" gradientUnits="userSpaceOnUse">
                        <stop offset=".085" stopColor="#ffcd0f" />
                        <stop offset=".991" stopColor="#e67505" />
                    </linearGradient>
                    <linearGradient id={`${iconId}-base`} x1="6" x2="7.262" y1="10.383" y2="33.752" gradientUnits="userSpaceOnUse">
                        <stop offset=".125" stopColor="#ac80ff" />
                        <stop offset="1" stopColor="#5750e2" />
                    </linearGradient>
                    <linearGradient id={`${iconId}-edge`} x1="10.756" x2="10.897" y1="14.266" y2="16.523" gradientUnits="userSpaceOnUse">
                        <stop offset=".125" stopColor="#9c6cfe" />
                        <stop offset="1" stopColor="#5750e2" />
                    </linearGradient>
                    <linearGradient id={`${iconId}-marks`} x1="17" x2="23.575" y1="-.222" y2="7.877" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#ff921f" />
                        <stop offset="1" stopColor="#eb4824" />
                    </linearGradient>
                </defs>
            </g>
        </svg>
    )
}
