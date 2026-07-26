
import IconUser from "../ui/icons/IconUser"
import IconPersonalization from "../ui/icons/IconPersonalization"
import IconSettings from "../ui/icons/IconSettings"
import IconLogout from "../ui/icons/IconLogout"
import Link from "next/link"

export default function UserCard() {
    return (
        <div className="
            w-[320px] h-16 
            bg-card hover:bg-card-hover 
            border border-border rounded-xl 
            flex"
        >
            <div className="m-auto flex gap-3">
                <IconUser />
                <div className="w-38">
                    <h6 className="font-sans font-semibold text-[16px] text-text-primary">Zero</h6>
                    <p className="font-sans text-[10px] text-text-secondary">germannaz_@hotmail.com</p>
                </div>
                <div className="flex gap-1 justify-center items-center">
                    <Link href={"/dashboard/personalization"}><IconPersonalization /></Link>
                    <IconSettings />
                    <IconLogout />
                </div>
            </div>
        </div>
    )
}