import styles from "../styles/Landing.module.css"

interface BrandMarkProps {
    className?: string
    compact?: boolean
}

export default function BrandMark({
    className = "",
    compact = false,
}: BrandMarkProps) {
    return (
        <span className={`${styles.brand} ${className}`}>
            <svg
                viewBox="0 0 64 64"
                aria-hidden="true"
                className={styles.brandIcon}
            >
                <rect width="64" height="64" rx="17" fill="#171520" />
                <path
                    d="M31 16C28 11 21 10 17 15C11 15 8 20 10 25C5 29 7 36 12 38C10 44 15 50 21 49C24 54 31 51 31 46Z"
                    fill="#2B2130"
                    stroke="#D8839D"
                    strokeWidth="3"
                    strokeLinejoin="round"
                />
                <path
                    d="M33 16C36 11 43 10 47 15C53 15 56 20 54 25C59 29 57 36 52 38C54 44 49 50 43 49C40 54 33 51 33 46Z"
                    fill="#24233A"
                    stroke="#8B88F2"
                    strokeWidth="3"
                    strokeLinejoin="round"
                />
                <path
                    d="M15 25L21 22L19 29L27 25L23 35L29 32"
                    fill="none"
                    stroke="#F0A1B6"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M38 33C42 27 46 39 51 32"
                    fill="none"
                    stroke="#D2D0FF"
                    strokeWidth="3"
                    strokeLinecap="round"
                />
            </svg>
            <span className={styles.brandCopy}>
                <strong>CleanMind</strong>
                {!compact && <small>Mente limpia, conciencia tranquila</small>}
            </span>
        </span>
    )
}
