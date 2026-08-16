import type { CSSProperties } from "react"
import { getBorderEffectProfile } from "../../effects/borders/borderProfiles"
import type { RewardPreviewProps } from "./preview.types"
import { previewHeight } from "./preview.types"
import styles from "./BorderRewardPreview.module.css"

type PreviewVariables = CSSProperties & {
    "--preview-gradient": string
    "--preview-sheen": string
    "--preview-glow": string
    "--preview-duration": string
}

export default function BorderRewardPreview({ item, expanded }: RewardPreviewProps) {
    const profile = getBorderEffectProfile(item.id)
    const variables: PreviewVariables = {
        "--preview-gradient": profile.gradient,
        "--preview-sheen": profile.sheen,
        "--preview-glow": profile.glow,
        "--preview-duration": profile.duration,
    }

    return (
        <div
            className={`${styles.preview} relative grid ${previewHeight(expanded)} place-items-center overflow-hidden rounded-[14px] border border-border/45 bg-surface/72 p-3.5`}
            style={variables}
            data-animated={Boolean(expanded)}
            data-variant={profile.variant}
            aria-hidden="true"
        >
            <span className={styles.halo} />
            <span className={styles.frame}>
                <span className={styles.edgeLight} />
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
