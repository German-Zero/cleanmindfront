export interface FireflyFieldGeometry {
    count: number
    positions: Float32Array
    sizes: Float32Array
    phases: Float32Array
    drifts: Float32Array
    depths: Float32Array
    colorMixes: Float32Array
    pulseRates: Float32Array
}

export const FIREFLY_GARDEN_SETTINGS = {
    count: {
        dashboard: 56,
        preview: 28,
        fallbackDashboard: 22,
        fallbackPreview: 14,
    },
    speed: {
        dashboard: 0.78,
        preview: 0.92,
    },
} as const

export function seededFireflyValue(index: number, salt: number) {
    const value = Math.sin(index * 9283.31 + salt * 77.13) * 43758.5453
    return value - Math.floor(value)
}

export function createFireflyField(
    preview: boolean,
    fallback = false,
): FireflyFieldGeometry {
    const count = fallback
        ? (preview
            ? FIREFLY_GARDEN_SETTINGS.count.fallbackPreview
            : FIREFLY_GARDEN_SETTINGS.count.fallbackDashboard)
        : (preview
            ? FIREFLY_GARDEN_SETTINGS.count.preview
            : FIREFLY_GARDEN_SETTINGS.count.dashboard)
    const positions = new Float32Array(count * 3)
    const sizes = new Float32Array(count)
    const phases = new Float32Array(count)
    const drifts = new Float32Array(count * 2)
    const depths = new Float32Array(count)
    const colorMixes = new Float32Array(count)
    const pulseRates = new Float32Array(count)

    for (let index = 0; index < count; index += 1) {
        const depth = 0.3 + seededFireflyValue(index, 3) * 0.7
        const isHighWanderer = index % 8 === 0
        const verticalSeed = seededFireflyValue(index, 2)
        const verticalPosition = isHighWanderer
            ? verticalSeed * 1.9 - 0.92
            : Math.pow(verticalSeed, 1.42) * 1.72 - 1.02

        positions[index * 3] = seededFireflyValue(index, 1) * 2.24 - 1.12
        positions[index * 3 + 1] = verticalPosition
        positions[index * 3 + 2] = 0
        sizes[index] = (preview ? 3.8 : 3.1)
            + seededFireflyValue(index, 4) * (preview ? 5.6 : 7.2)
        phases[index] = seededFireflyValue(index, 5) * Math.PI * 2
        drifts[index * 2] = 0.018 + seededFireflyValue(index, 6) * 0.045
        drifts[index * 2 + 1] = 0.024 + seededFireflyValue(index, 7) * 0.052
        depths[index] = depth
        colorMixes[index] = 0.18 + seededFireflyValue(index, 8) * 0.82
        pulseRates[index] = 0.5 + seededFireflyValue(index, 9) * 0.88
    }

    return {
        count,
        positions,
        sizes,
        phases,
        drifts,
        depths,
        colorMixes,
        pulseRates,
    }
}
