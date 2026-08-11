import type { CSSProperties } from "react"
import type { RewardPreviewProps } from "./preview.types"
import { previewHeight } from "./preview.types"
import styles from "./SurfaceEffectRewardPreview.module.css"

const effectClass = {
    EFFECT_SERENE_GLASS: styles.glass,
    EFFECT_SOFT_GLOW: styles.glow,
    EFFECT_PAPER_GRAIN: styles.paper,
} as const

export default function SurfaceEffectRewardPreview({ item, expanded }: RewardPreviewProps) {
    const gradient = `linear-gradient(135deg, ${item.colors.join(", ")})`
    const variant = effectClass[item.id as keyof typeof effectClass] ?? styles.glass

    return (
        <div
            className={`${styles.preview} ${variant} relative grid ${previewHeight(expanded)} place-items-center overflow-hidden rounded-[14px] border border-white/10 p-4`}
            style={{ "--surface-gradient": gradient } as CSSProperties}
            data-animated={Boolean(expanded)}
            aria-hidden="true"
        >
            <span className={styles.atmosphere} />
            <span className={styles.surface}>
                <span className="relative z-1 flex items-center justify-between">
                    <span className="h-1.5 w-[40%] rounded-full bg-text-primary/48" />
                    <span className="size-4.5 rounded-md border border-text-primary/18 bg-text-primary/8" />
                </span>
                <span className="relative z-1 grid gap-1.5">
                    <span className="h-1.25 w-[72%] rounded-full bg-text-secondary/30" />
                    <span className="h-1.25 w-[54%] rounded-full bg-text-secondary/20" />
                </span>
            </span>
        </div>
    )
}
