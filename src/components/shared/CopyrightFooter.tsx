export default function CopyrightFooter({
    className = "",
}: {
    className?: string
}) {
    return (
        <footer
            aria-label="Derechos de autor"
            className={`text-[9px] leading-3.5 tracking-[0.2px] text-text-secondary/65 ${className}`}
        >
            © {new Date().getFullYear()} German Naz. Todos los derechos
            reservados.
        </footer>
    )
}
