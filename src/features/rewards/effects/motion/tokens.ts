export const rewardMotionTokens = {
    duration: {
        instant: 0.08,
        fast: 0.18,
        normal: 0.35,
        slow: 0.6,
        ambientShort: 4,
        ambientMedium: 8,
        ambientBloom: 12,
        ambientLong: 16,
    },
    easing: {
        smooth: [0.22, 1, 0.36, 1] as const,
        standard: [0.4, 0, 0.2, 1] as const,
        linear: [0, 0, 1, 1] as const,
    },
    opacity: {
        ambient: [0.72, 1, 0.72] as const,
        bloom: [0.76, 1, 0.76] as const,
        rest: 0.82,
    },
    rotation: {
        rest: 0,
        sway: [-2, 2, -2] as const,
        bloom: [-3, 3, -3] as const,
    },
    scale: {
        subtle: 0.97,
        rest: 1,
        ambient: 1.03,
        bloom: [0.985, 1.025, 0.985] as const,
    },
} as const

export const rewardSprings = {
    snappy: { type: "spring", stiffness: 300, damping: 30 },
    gentle: { type: "spring", stiffness: 120, damping: 14 },
    release: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        restDelta: 0.001,
    },
} as const
