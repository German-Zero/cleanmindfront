'use client';

import React, { useId } from 'react';

export default function IconUser() {
    const idGradienteCuerpo1 = useId();
    const idGradienteCuerpo2 = useId();
    const idGradienteCabeza = useId();

    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" viewBox="0 0 32 32">
            <path d="M0 0h32v32H0z" fill="none" />
            <g fill="none">
                <path fill="var(--surface)" d="M7.5 18A3.5 3.5 0 0 0 4 21.5v.5c0 2.393 1.523 4.417 3.685 5.793C9.859 29.177 12.802 30 16 30s6.14-.823 8.315-2.206C26.477 26.418 28 24.394 28 22v-.5a3.5 3.5 0 0 0-3.5-3.5z" />
    
                <path fill={`url(#${idGradienteCuerpo1})`} d="M7.5 18A3.5 3.5 0 0 0 4 21.5v.5c0 2.393 1.523 4.417 3.685 5.793C9.859 29.177 12.802 30 16 30s6.14-.823 8.315-2.206C26.477 26.418 28 24.394 28 22v-.5a3.5 3.5 0 0 0-3.5-3.5z" />
                <path fill={`url(#${idGradienteCuerpo2})`} d="M7.5 18A3.5 3.5 0 0 0 4 21.5v.5c0 2.393 1.523 4.417 3.685 5.793C9.859 29.177 12.802 30 16 30s6.14-.823 8.315-2.206C26.477 26.418 28 24.394 28 22v-.5a3.5 3.5 0 0 0-3.5-3.5z" />
                
                <path fill="var(--card-hover)" d="M16 16a7 7 0 1 0 0-14a7 7 0 0 0 0 14" />
                <path fill={`url(#${idGradienteCabeza})`} d="M16 16a7 7 0 1 0 0-14a7 7 0 0 0 0 14" />
                
                <defs>
                    <linearGradient id={idGradienteCuerpo1} x1="9.707" x2="13.584" y1="19.595" y2="31.977" gradientUnits="userSpaceOnUse">
                        <stop offset="12.5%" stopColor="var(--primary)" />
                        <stop offset="100%" stopColor="var(--accent)" />
                    </linearGradient>
                    
                    <linearGradient id={idGradienteCuerpo2} x1="16" x2="21.429" y1="16.571" y2="36.857" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="var(--secondary)" stopOpacity="0" />
                        <stop offset="100%" stopColor="var(--delegate)" />
                    </linearGradient>
                    
                    <linearGradient id={idGradienteCabeza} x1="12.329" x2="19.464" y1="3.861" y2="15.254" gradientUnits="userSpaceOnUse">
                        <stop offset="12.5%" stopColor="var(--primary)" />
                        <stop offset="100%" stopColor="var(--accent)" />
                    </linearGradient>
                </defs>
            </g>
        </svg>
    );
}
