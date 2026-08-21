import { redirect } from "next/navigation"

interface SettingsRedirectPageProps {
    searchParams: Promise<{
        discord?: string | string[]
    }>
}

export default async function SettingsRedirectPage({
    searchParams,
}: SettingsRedirectPageProps) {
    const { discord } = await searchParams
    const query = new URLSearchParams({ settings: "open" })

    if (typeof discord === "string") {
        query.set("discord", discord)
    }

    redirect(`/dashboard?${query.toString()}`)
}
