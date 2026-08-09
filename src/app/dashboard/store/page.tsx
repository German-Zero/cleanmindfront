import RewardsStoreView from "@/features/rewards/components/RewardsStoreView"

export default function StorePage() {
    return (
        <div className="no-scrollbar relative flex h-full w-full items-start justify-center overflow-y-auto overscroll-contain px-3 pt-20 pb-28 xl:px-8 xl:py-12">
            <RewardsStoreView />
        </div>
    )
}
