import type { Theme } from "@/features/settings/types"
import type { ReactNode } from "react"

export default function IconTheme({ theme }: { theme: Theme }) {
    const paths = {
        LUNAR_MIND: (
            <>
                <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454l0 .008" />
                <path d="M17 4a2 2 0 0 0 2 2a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2a2 2 0 0 0 2 -2" />
                <path d="M19 11h2m-1 -1v2" />
            </>
        ),
        DEEP_SERENITY: (
            <>
                <path d="M5 21c.5 -4.5 2.5 -8 7 -10" />
                <path d="M9 18c6.218 0 10.5 -3.288 11 -12v-2h-4.014c-9 0 -11.986 4 -12 9c0 1 0 3 2 5h3l.014 0" />
            </>
        ),
        CALM_TECH: (
            <>
                <path d="M5 6a1 1 0 0 1 1 -1h12a1 1 0 0 1 1 1v12a1 1 0 0 1 -1 1h-12a1 1 0 0 1 -1 -1z" />
                <path d="M8 10v-2h2m6 6v2h-2m-4 0h-2v-2m8 -4v-2h-2" />
                <path d="M3 10h2m-2 4h2m5 -11v2m4 -2v2m7 5h-2m2 4h-2m-5 7v-2m-4 2v-2" />
            </>
        ),
    } satisfies Record<Theme, ReactNode>

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            {paths[theme]}
        </svg>
    )
}
