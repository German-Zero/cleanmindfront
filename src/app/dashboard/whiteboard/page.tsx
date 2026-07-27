import ToolWhiteboardButton from "@/components/ui/ToolWhiteboardButton";

export default function WhiteboardPage() {
    return (
        <div className="relative flex min-h-full w-full items-center justify-center px-16 pt-20 pb-4 xl:h-full xl:p-0">
            <h1 className="text-center text-lg font-semibold tracking-[0.05em] text-text-secondary/70 sm:text-2xl">¿Qué dibujaremos hoy?</h1>
            <div className="absolute right-2 bottom-2 xl:right-0 xl:bottom-0">
                <ToolWhiteboardButton />
            </div>
        </div>
    )
}
