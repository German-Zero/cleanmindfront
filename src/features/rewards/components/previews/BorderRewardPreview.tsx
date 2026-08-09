import type { RewardPreviewProps } from "./preview.types"
import { previewHeight } from "./preview.types"

export default function BorderRewardPreview({ item, expanded }: RewardPreviewProps) {
    const gradient = `linear-gradient(135deg, ${item.colors.join(", ")})`

    return (
        <div className={`relative grid ${previewHeight(expanded)} place-items-center overflow-hidden rounded-[14px] border border-border/45 bg-surface/72 p-3.5`} aria-hidden="true">
            <span className="absolute inset-[-25%] opacity-20 blur-[34px]" style={{ background: gradient }} />
            <span className="relative h-[76%] w-[88%] rounded-2xl p-0.5 shadow-[0_16px_38px_rgb(0_0_0/24%)]" style={{ background: gradient }}>
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
