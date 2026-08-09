import type { StoreItem } from "../types"

interface RewardVisualPreviewProps {
    item: StoreItem
    expanded?: boolean
}

const backgroundPreviewClasses = {
    BACKGROUND_FIREFLY_GARDEN: "reward-preview--fireflies",
    BACKGROUND_COSMIC_RIBBONS: "reward-preview--ribbons",
    BACKGROUND_RAINY_WINDOW: "reward-preview--rain",
    BACKGROUND_FLOATING_BLOOMS: "reward-preview--blooms",
} as const

export default function RewardVisualPreview({
    item,
    expanded = false,
}: RewardVisualPreviewProps) {
    const height = expanded ? "h-[280px]" : "h-[124px]"
    const gradient = `linear-gradient(135deg, ${item.colors.join(", ")})`

    if (item.category === "PALETTE") {
        return (
            <div
                className={`relative grid ${height} grid-cols-[1.25fr_0.75fr] overflow-hidden rounded-[14px] border border-white/10`}
                style={{ backgroundColor: item.colors[0] }}
                aria-hidden="true"
            >
                <span className="flex min-w-0 flex-col justify-between p-3.5">
                    <span
                        className="h-1.5 w-[52%] rounded-full"
                        style={{ backgroundColor: item.colors[2] }}
                    />
                    <span className="grid gap-1.75">
                        <span
                            className="h-9 rounded-[10px] border border-white/10 opacity-90"
                            style={{ backgroundColor: item.colors[1] }}
                        />
                        <span className="flex gap-1.25">
                            {item.colors.map((color) => (
                                <span
                                    key={color}
                                    className="h-1.25 flex-1 rounded-full"
                                    style={{ backgroundColor: color }}
                                />
                            ))}
                        </span>
                    </span>
                </span>
                <span
                    className="m-2.5 rounded-[11px] border border-white/10 opacity-95 shadow-[0_14px_30px_rgb(0_0_0/18%)]"
                    style={{ backgroundColor: item.colors[1] }}
                />
            </div>
        )
    }

    if (item.category === "BACKGROUND") {
        const variant =
            backgroundPreviewClasses[
                item.id as keyof typeof backgroundPreviewClasses
            ] ?? "reward-preview--fireflies"

        return (
            <div
                className={`reward-background-preview ${variant} relative ${height} overflow-hidden rounded-[14px] border border-white/10`}
                style={{ background: gradient }}
                aria-hidden="true"
            >
                {item.id === "BACKGROUND_FIREFLY_GARDEN" &&
                    [12, 26, 41, 57, 73, 88].map((left, index) => (
                        <span
                            key={left}
                            className="reward-firefly absolute rounded-full"
                            style={{
                                left: `${left}%`,
                                top: `${16 + ((index * 23) % 65)}%`,
                                animationDelay: `${index * -0.8}s`,
                            }}
                        />
                    ))}
                {item.id === "BACKGROUND_COSMIC_RIBBONS" && (
                    <>
                        <span className="reward-preview-ribbon reward-preview-ribbon--one" />
                        <span className="reward-preview-ribbon reward-preview-ribbon--two" />
                        <span className="reward-preview-ribbon reward-preview-ribbon--three" />
                    </>
                )}
                {item.id === "BACKGROUND_RAINY_WINDOW" &&
                    [9, 21, 34, 47, 61, 74, 88].map((left, index) => (
                        <span
                            key={left}
                            className="reward-preview-raindrop"
                            style={{
                                left: `${left}%`,
                                animationDelay: `${index * -0.35}s`,
                            }}
                        />
                    ))}
                {item.id === "BACKGROUND_FLOATING_BLOOMS" &&
                    [10, 28, 49, 68, 86].map((left, index) => (
                        <span
                            key={left}
                            className="reward-preview-petal"
                            style={{
                                left: `${left}%`,
                                top: `${12 + ((index * 19) % 58)}%`,
                                animationDelay: `${index * -0.7}s`,
                            }}
                        />
                    ))}
            </div>
        )
    }

    if (item.category === "BORDER") {
        return (
            <div
                className={`relative grid ${height} place-items-center overflow-hidden rounded-[14px] border border-border/45 bg-surface/72 p-3.5`}
                aria-hidden="true"
            >
                <span
                    className="absolute inset-[-25%] opacity-20 blur-[34px]"
                    style={{ background: gradient }}
                />
                <span
                    className="relative h-[76%] w-[88%] rounded-2xl p-0.5 shadow-[0_16px_38px_rgb(0_0_0/24%)]"
                    style={{ background: gradient }}
                >
                    <span className="flex h-full w-full flex-col justify-between rounded-[14px] bg-card p-3">
                        <span className="flex items-center gap-1.25">
                            <span className="size-1.25 rounded-full bg-text-secondary/45" />
                            <span className="size-1.25 rounded-full bg-text-secondary/30" />
                            <span className="h-1.25 w-[34%] rounded-full bg-text-secondary/18" />
                        </span>
                        <span className="grid gap-1.5">
                            <span className="h-1.5 w-[58%] rounded-full bg-text-primary/28" />
                            <span className="h-1.25 w-[78%] rounded-full bg-text-secondary/18" />
                        </span>
                    </span>
                </span>
            </div>
        )
    }

    if (item.category === "CALENDAR") {
        return (
            <div
                className={`reward-calendar-preview relative ${height} overflow-hidden rounded-[14px] border border-white/10 bg-[#0B1724] p-3.5`}
                aria-hidden="true"
            >
                <span
                    className="reward-calendar-preview-wave"
                    style={{ background: gradient }}
                />
                <span className="relative z-1 flex h-full flex-col rounded-[10px] border border-cyan-100/18 bg-[#132536]/88 p-2.5">
                    <span className="mb-2 flex items-center justify-between">
                        <span className="h-1.25 w-[34%] rounded-full bg-cyan-100/55" />
                        <span className="size-2.75 rounded-sm bg-blue-300/45" />
                    </span>
                    <span className="grid flex-1 grid-cols-4 grid-rows-3 gap-0.75">
                        {Array.from({ length: 12 }, (_, index) => (
                            <span
                                key={index}
                                className="rounded-[3px] border border-cyan-100/12 bg-white/6"
                            />
                        ))}
                    </span>
                </span>
            </div>
        )
    }

    if (item.category === "POMODORO") {
        return (
            <div
                className={`relative grid ${height} place-items-center overflow-hidden rounded-[14px] border border-white/10 bg-[#171223]`}
                aria-hidden="true"
            >
                <span className="absolute inset-[12%] rounded-full bg-fuchsia-300/10 blur-xl" />
                <span className="reward-pomodoro-preview relative grid size-22 place-items-center rounded-full border-[5px] border-primary/28">
                    <span className="text-[17px] font-semibold text-white/90">
                        25:00
                    </span>
                    {[
                        ["-10px", "35%"],
                        ["12%", "-7px"],
                        ["12%", "auto"],
                        ["auto", "35%"],
                    ].map(([top, left], index) => (
                        <span
                            key={`${top}-${left}-${index}`}
                            className="reward-pomodoro-flower absolute grid size-4.5 place-items-center rounded-full"
                            style={{
                                top,
                                left: left === "auto" ? undefined : left,
                                right: left === "auto" ? "-9px" : undefined,
                                bottom: top === "auto" ? "-9px" : undefined,
                                backgroundColor: item.colors[index % item.colors.length],
                            }}
                        >
                            <span className="size-1.25 rounded-full bg-white/75" />
                        </span>
                    ))}
                </span>
            </div>
        )
    }

    if (item.id === "EFFECT_SOFT_GLOW") {
        return (
            <div
                className={`relative grid ${height} place-items-center overflow-hidden rounded-[14px] border border-white/10 bg-[#0E1422] p-4`}
                aria-hidden="true"
            >
                <span
                    className="absolute inset-[18%] rounded-3xl opacity-55 blur-[28px]"
                    style={{ background: gradient }}
                />
                <span className="relative flex h-[72%] w-[86%] flex-col justify-between rounded-[15px] border border-cyan-200/28 bg-[#141B2B]/92 p-3.25 shadow-[0_0_30px_rgb(134_231_212/30%)]">
                    <span className="h-1.5 w-[42%] rounded-full bg-cyan-100/55" />
                    <span className="h-1.25 w-[68%] rounded-full bg-violet-100/24" />
                </span>
            </div>
        )
    }

    if (item.id === "EFFECT_PAPER_GRAIN") {
        return (
            <div
                className={`reward-paper-preview relative grid ${height} place-items-center overflow-hidden rounded-[14px] border border-[#BDAF9A]/35 bg-[#E9DECB] p-4`}
                aria-hidden="true"
            >
                <span className="relative flex h-[74%] w-[86%] flex-col justify-between rounded-xl border border-[#756A5B]/24 bg-[#F5EBD8]/88 p-3.25 shadow-[0_14px_30px_rgb(77_65_51/14%)]">
                    <span className="h-1.5 w-[38%] rounded-full bg-[#756A5B]/48" />
                    <span className="grid gap-1.25">
                        <span className="h-1.25 w-[76%] rounded-full bg-[#756A5B]/24" />
                        <span className="h-1.25 w-[58%] rounded-full bg-[#756A5B]/18" />
                    </span>
                </span>
            </div>
        )
    }

    return (
        <div
            className={`relative grid ${height} place-items-center overflow-hidden rounded-[14px] border border-white/10 bg-[#111528] p-4`}
            aria-hidden="true"
        >
            <span className="absolute top-[-18%] left-[-8%] size-[58%] rounded-full bg-violet-400/38 blur-[32px]" />
            <span className="absolute right-[-8%] bottom-[-22%] size-[62%] rounded-full bg-cyan-300/28 blur-[36px]" />
            <span className="relative flex h-[76%] w-[88%] flex-col justify-between rounded-2xl border border-white/28 bg-white/12 p-3.25 shadow-[0_20px_48px_rgb(0_0_0/30%),inset_0_1px_0_rgb(255_255_255/26%)] backdrop-blur-[18px]">
                <span className="flex items-center justify-between">
                    <span className="h-1.5 w-[38%] rounded-full bg-white/60" />
                    <span className="size-4.5 rounded-md border border-white/24 bg-white/12" />
                </span>
                <span className="grid gap-1.5">
                    <span className="h-1.25 w-[72%] rounded-full bg-white/32" />
                    <span className="h-1.25 w-[54%] rounded-full bg-white/20" />
                </span>
            </span>
        </div>
    )
}
