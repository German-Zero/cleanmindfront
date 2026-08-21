export const landingMotionTokens = {
    duration: {
        fast: 0.18,
        normal: 0.36,
    },
    easing: {
        smooth: [0.22, 1, 0.36, 1] as const,
    },
    distance: {
        reveal: 18,
        parallaxBack: 14,
        parallaxMiddle: 22,
        parallaxFront: 38,
    },
} as const
export const landingViewport = {
    once: true,
    amount: 0.24,
} as const
