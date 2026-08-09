import type { RewardPreviewProps } from "./preview.types"
import { previewHeight } from "./preview.types"
import styles from "./SurfaceEffectRewardPreview.module.css"

export default function SurfaceEffectRewardPreview({ item, expanded }: RewardPreviewProps) {
    const height = previewHeight(expanded)
    const gradient = `linear-gradient(135deg, ${item.colors.join(", ")})`

    if (item.id === "EFFECT_SOFT_GLOW") {
        return (
            <div className={`relative grid ${height} place-items-center overflow-hidden rounded-[14px] border border-white/10 bg-[#0E1422] p-4`} aria-hidden="true">
                <span className="absolute inset-[18%] rounded-3xl opacity-55 blur-[28px]" style={{ background: gradient }} />
                <span className="relative flex h-[72%] w-[86%] flex-col justify-between rounded-[15px] border border-cyan-200/28 bg-[#141B2B]/92 p-3.25 shadow-[0_0_30px_rgb(134_231_212/30%)]">
                    <span className="h-1.5 w-[42%] rounded-full bg-cyan-100/55" />
                    <span className="h-1.25 w-[68%] rounded-full bg-violet-100/24" />
                </span>
            </div>
        )
    }

    if (item.id === "EFFECT_PAPER_GRAIN") {
        return (
            <div className={`${styles.paper} relative grid ${height} place-items-center overflow-hidden rounded-[14px] border border-[#BDAF9A]/35 bg-[#E9DECB] p-4`} aria-hidden="true">
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
        <div className={`relative grid ${height} place-items-center overflow-hidden rounded-[14px] border border-white/10 bg-[#111528] p-4`} aria-hidden="true">
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
