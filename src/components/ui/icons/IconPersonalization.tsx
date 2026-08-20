"use client"

import { useId } from "react"

export default function IconPersonalization() {
    const iconId = useId()

    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32">
            <path d="M0 0h32v32H0z" fill="none" />
            <g fill="none">
                <circle cx="14" cy="13" r="9" fill={`url(#${iconId}-orb)`} />
                <circle cx="14" cy="13" r="9" fill={`url(#${iconId}-orb-shadow-one)`} fillOpacity=".6" />
                <circle cx="14" cy="13" r="9" fill={`url(#${iconId}-orb-shadow-two)`} fillOpacity=".6" />
                <rect width="17" height="17" x="13" y="12" fill={`url(#${iconId}-panel)`} rx="4.5" />
                <path fill={`url(#${iconId}-panel-shine)`} fillRule="evenodd" d="M14 22a9 9 0 0 0 8.945-10H17.5a4.5 4.5 0 0 0-4.5 4.5v5.445q.492.055 1 .055" clipRule="evenodd" />
                <path fill={`url(#${iconId}-panel-color)`} fillRule="evenodd" d="M14 22a9 9 0 0 0 8.945-10H17.5a4.5 4.5 0 0 0-4.5 4.5v5.445q.492.055 1 .055" clipRule="evenodd" />
                <path fill={`url(#${iconId}-drop-blue)`} d="M10 18.627C10 26.098 7.875 30 6 30c-1.625 0-4-3.238-4-11.373c0-6.946 1.79-8.053 4-8.053c1.969 0 4 .581 4 8.053" />
                <path fill={`url(#${iconId}-drop-purple)`} fillOpacity=".5" d="M10 18.627C10 26.098 7.875 30 6 30c-1.625 0-4-3.238-4-11.373c0-6.946 1.79-8.053 4-8.053c1.969 0 4 .581 4 8.053" />
                <path fill={`url(#${iconId}-drop-green)`} d="M10 18.627C10 26.098 7.875 30 6 30c-1.625 0-4-3.238-4-11.373c0-6.946 1.79-8.053 4-8.053c1.969 0 4 .581 4 8.053" />
                <path fill={`url(#${iconId}-drop-shadow)`} fillOpacity=".7" d="M10 18.627C10 26.098 7.875 30 6 30c-1.625 0-4-3.238-4-11.373c0-6.946 1.79-8.053 4-8.053c1.969 0 4 .581 4 8.053" />
                <path fill="#fff" fillOpacity=".15" d="M2.092 16.156c.392-4.75 1.993-5.582 3.908-5.582c1.725 0 3.498.446 3.91 5.583a7.43 7.43 0 0 1-3.908 1.086a7.43 7.43 0 0 1-3.91-1.087" />
                <path fill={`url(#${iconId}-small-drop)`} d="M7.75 2.977a1 1 0 0 0-1.638-.747C4.393 3.657 3.35 4.837 2.744 5.94C2.119 7.077 2 8.064 2 9a4 4 0 0 0 8 0c0-1.28-.626-2.23-1.116-2.974l-.144-.22c-.521-.806-.963-1.59-.99-2.829" />
                <defs>
                    <radialGradient id={`${iconId}-orb`} cx="0" cy="0" r="1" gradientTransform="rotate(-78.382 19.528 9.11)scale(24.3503)" gradientUnits="userSpaceOnUse">
                        <stop offset=".222" stopColor="#4e46e2" />
                        <stop offset=".578" stopColor="#625df6" />
                        <stop offset=".955" stopColor="#e37dff" />
                    </radialGradient>
                    <radialGradient id={`${iconId}-orb-shadow-one`} cx="0" cy="0" r="1" gradientTransform="rotate(-17.281 59.643 .193)scale(9.83002 12.8674)" gradientUnits="userSpaceOnUse">
                        <stop offset=".566" stopColor="#251fba" />
                        <stop offset="1" stopColor="#5e51e4" stopOpacity="0" />
                    </radialGradient>
                    <radialGradient id={`${iconId}-orb-shadow-two`} cx="0" cy="0" r="1" gradientTransform="rotate(8.26 -75.545 19.116)scale(9.04231 9.24303)" gradientUnits="userSpaceOnUse">
                        <stop offset=".566" stopColor="#251fba" />
                        <stop offset="1" stopColor="#5e51e4" stopOpacity="0" />
                    </radialGradient>
                    <radialGradient id={`${iconId}-panel`} cx="0" cy="0" r="1" gradientTransform="rotate(42.462 -9.42 26.133)scale(20.1004 27.3018)" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#c354ff" />
                        <stop offset=".158" stopColor="#b339f0" />
                        <stop offset=".429" stopColor="#f24a9d" />
                        <stop offset=".749" stopColor="#ff835c" />
                        <stop offset="1" stopColor="#ffc470" />
                    </radialGradient>
                    <radialGradient id={`${iconId}-drop-purple`} cx="0" cy="0" r="1" gradientTransform="rotate(81.001 -2.646 7.997)scale(19.3137 49.0656)" gradientUnits="userSpaceOnUse">
                        <stop offset=".5" stopColor="#dd3ce2" stopOpacity="0" />
                        <stop offset="1" stopColor="#dd3ce2" />
                    </radialGradient>
                    <radialGradient id={`${iconId}-drop-shadow`} cx="0" cy="0" r="1" gradientTransform="rotate(-68.003 9.365 2.586)scale(9.85094 19.365)" gradientUnits="userSpaceOnUse">
                        <stop offset=".169" stopColor="#02888d" />
                        <stop offset=".26" stopColor="#02888d" stopOpacity="0" />
                    </radialGradient>
                    <radialGradient id={`${iconId}-small-drop`} cx="0" cy="0" r="1" gradientTransform="rotate(107.965 1.816 5.595)scale(8.43491 9.06726)" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#ff9532" />
                        <stop offset=".251" stopColor="#ff835c" />
                        <stop offset="1" stopColor="#f24a9d" />
                    </radialGradient>
                    <linearGradient id={`${iconId}-panel-shine`} x1="22.101" x2="14.834" y1="21.913" y2="11.234" gradientUnits="userSpaceOnUse">
                        <stop offset=".195" stopColor="#6d37cd" />
                        <stop offset=".765" stopColor="#ea71ef" />
                    </linearGradient>
                    <linearGradient id={`${iconId}-panel-color`} x1="23.638" x2="12.05" y1="24.424" y2="8.228" gradientUnits="userSpaceOnUse">
                        <stop offset=".195" stopColor="#7631ff" />
                        <stop offset=".886" stopColor="#e63080" />
                    </linearGradient>
                    <linearGradient id={`${iconId}-drop-blue`} x1=".125" x2="8.846" y1="18.82" y2="28.295" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#0fafff" />
                        <stop offset="1" stopColor="#2764e7" />
                    </linearGradient>
                    <linearGradient id={`${iconId}-drop-green`} x1="13" x2="-1" y1="19.472" y2="19.472" gradientUnits="userSpaceOnUse">
                        <stop offset=".307" stopColor="#0d91e1" />
                        <stop offset=".761" stopColor="#52b471" />
                    </linearGradient>
                </defs>
            </g>
        </svg>
    )
}
