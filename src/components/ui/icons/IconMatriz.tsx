"use client"

import { useId } from "react"

export default function IconMatriz() {
    const iconId = useId()

    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32">
            <path d="M0 0h32v32H0z" fill="none" />
            <g fill="none">
                <path fill={`url(#${iconId}-top-left)`} d="M3 6a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z" />
                <path fill={`url(#${iconId}-bottom-right)`} d="M26 15a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H16a1 1 0 0 1-1-1V16a1 1 0 0 1 1-1z" />
                <path fill={`url(#${iconId}-bottom-left)`} d="M17 28a1 1 0 0 1-1 1H6a3 3 0 0 1-3-3V16a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1z" />
                <path fill={`url(#${iconId}-top-right)`} d="M20.2 2.953a3.25 3.25 0 0 1 4.597 0l4.248 4.25a3.25 3.25 0 0 1 0 4.595l-4.25 4.248a3.25 3.25 0 0 1-4.596 0l-4.249-4.25a3.25 3.25 0 0 1 0-4.595z" />
                <defs>
                    <linearGradient id={`${iconId}-top-left`} x1="3" x2="15.964" y1="3" y2="16.962" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#b9c0c7" />
                        <stop offset="1" stopColor="#889096" />
                    </linearGradient>
                    <linearGradient id={`${iconId}-bottom-right`} x1="29" x2="16" y1="28" y2="15" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#63686e" />
                        <stop offset="1" stopColor="#889096" />
                    </linearGradient>
                    <linearGradient id={`${iconId}-bottom-left`} x1="3" x2="17" y1="15" y2="24" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#55595e" />
                        <stop offset="1" stopColor="#383b3d" />
                    </linearGradient>
                    <linearGradient id={`${iconId}-top-right`} x1="27.397" x2="18.903" y1="13.625" y2="3.145" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#2764e7" />
                        <stop offset="1" stopColor="#36dff1" />
                    </linearGradient>
                </defs>
            </g>
        </svg>
    )
}
