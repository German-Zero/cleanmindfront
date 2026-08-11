import type { CSSProperties } from "react"
import type { RewardPreviewProps } from "./preview.types"
import { previewHeight } from "./preview.types"
import styles from "./BorderRewardPreview.module.css"

export default function BorderRewardPreview({ item, expanded }: RewardPreviewProps) {
    const gradient = `linear-gradient(118deg, ${[...item.colors, item.colors[0]].join(", ")})`

    return (
        <div
            className={`${styles.preview} relative grid ${previewHeight(expanded)} place-items-center overflow-hidden rounded-[14px] border border-border/45 bg-surface/72 p-3.5`}
            style={{ "--preview-gradient": gradient } as CSSProperties}
            data-animated={Boolean(expanded)}
            aria-hidden="true"
        >
            <span className={styles.halo} />
            <span className={styles.border}>
                <span className={styles.content}>
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
