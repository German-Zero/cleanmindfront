import type { RewardPreviewProps } from "./preview.types"
import { previewHeight } from "./preview.types"

export default function PaletteRewardPreview({ item, expanded }: RewardPreviewProps) {
    return (
        <div
            className={`relative grid ${previewHeight(expanded)} grid-cols-[1.25fr_0.75fr] overflow-hidden rounded-[14px] border border-white/10`}
            style={{ backgroundColor: item.colors[0] }}
            aria-hidden="true"
        >
            <span className="flex min-w-0 flex-col justify-between p-3.5">
                <span className="h-1.5 w-[52%] rounded-full" style={{ backgroundColor: item.colors[2] }} />
                <span className="grid gap-1.75">
                    <span className="h-9 rounded-[10px] border border-white/10 opacity-90" style={{ backgroundColor: item.colors[1] }} />
                    <span className="flex gap-1.25">
                        {item.colors.map((color) => (
                            <span key={color} className="h-1.25 flex-1 rounded-full" style={{ backgroundColor: color }} />
                        ))}
                    </span>
                </span>
            </span>
            <span className="m-2.5 rounded-[11px] border border-white/10 opacity-95 shadow-[0_14px_30px_rgb(0_0_0/18%)]" style={{ backgroundColor: item.colors[1] }} />
        </div>
    )
}
