import Personalization from "@/components/Personalization";

export default function PersonalizationPage() {
    return (
        <div className="no-scrollbar absolute inset-0 flex w-full touch-pan-y items-start justify-center overflow-y-scroll overscroll-y-contain px-3 pt-20 pb-28 xl:px-8 xl:py-12">
            <Personalization />
        </div>
    )
}
