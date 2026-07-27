
import IconUser from "../ui/icons/IconUser"
import IconPersonalization from "../ui/icons/IconPersonalization"
import IconSettings from "../ui/icons/IconSettings"
import IconLogout from "../ui/icons/IconLogout"
import Link from "next/link"

export default function UserCard() {
    return (
        <div className="
            h-16 w-full max-w-[320px] shrink-0
            bg-card hover:bg-card-hover 
            border border-border rounded-xl 
            flex"
        >
            <div className="flex w-full min-w-0 items-center gap-2 px-2">
                <div className="shrink-0">
                    <IconUser />
                </div>
                <div className="min-w-0 flex-1 xl:w-38 xl:flex-none">
                    <h6 className="font-sans font-semibold text-[16px] text-text-primary">Zero</h6>
                    <p className="truncate font-sans text-[10px] text-text-secondary">germannaz_@hotmail.com</p>
                </div>
                <div className="flex shrink-0 items-center justify-center gap-1">
                    <Link
                        href="/dashboard/personalization"
                        aria-label="Personalización"
                        className="grid size-11 place-items-center xl:size-auto"
                    >
                        <IconPersonalization />
                    </Link>
                    <button
                        type="button"
                        aria-label="Configuración"
                        className="grid size-11 place-items-center xl:size-auto"
                    >
                        <IconSettings />
                    </button>
                    <button
                        type="button"
                        aria-label="Cerrar sesión"
                        className="grid size-11 place-items-center xl:size-auto"
                    >
                        <IconLogout />
                    </button>
                </div>
            </div>
        </div>
    )
}
