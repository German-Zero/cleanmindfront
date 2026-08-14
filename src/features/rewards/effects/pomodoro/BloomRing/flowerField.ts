export interface BioluminescentFlowerField {
    count: number
    positions: Float32Array
    sizes: Float32Array
    phases: Float32Array
    fallSpeeds: Float32Array
    drifts: Float32Array
    rotations: Float32Array
    spinSpeeds: Float32Array
    flowerTypes: Float32Array
    depths: Float32Array
    pulseRates: Float32Array
}

export const BIOLUMINESCENT_FLOWER_SETTINGS = {
    count: {
        timer: 28,
        preview: 18,
        fallbackTimer: 18,
        fallbackPreview: 12,
    },
    speed: {
        timer: 0.72,
        preview: 0.8,
    },
} as const

export function seededFlowerValue(index: number, salt: number) {
    const value = Math.sin(index * 7351.79 + salt * 91.37) * 43758.5453
    return value - Math.floor(value)
}

function resolveFlowerType(index: number) {
    const seed = seededFlowerValue(index, 8)

    if (seed < 0.25) return 0
    if (seed < 0.5) return 1
    if (seed < 0.75) return 2
    return 3
}

function resolveFlowerSize(type: number, depth: number, preview: boolean) {
    const previewScale = preview ? 0.84 : 1
    const depthScale = 0.7 + depth * 0.48

    if (type === 0) return 30 * previewScale * depthScale
    if (type === 1) return 34 * previewScale * depthScale
    if (type === 2) return 32 * previewScale * depthScale
    return 29 * previewScale * depthScale
}

export function createBioluminescentFlowerField(
    preview: boolean,
    fallback = false,
): BioluminescentFlowerField {
    const count = fallback
        ? (preview
            ? BIOLUMINESCENT_FLOWER_SETTINGS.count.fallbackPreview
            : BIOLUMINESCENT_FLOWER_SETTINGS.count.fallbackTimer)
        : (preview
            ? BIOLUMINESCENT_FLOWER_SETTINGS.count.preview
            : BIOLUMINESCENT_FLOWER_SETTINGS.count.timer)
    const positions = new Float32Array(count * 3)
    const sizes = new Float32Array(count)
    const phases = new Float32Array(count)
    const fallSpeeds = new Float32Array(count)
    const drifts = new Float32Array(count * 2)
    const rotations = new Float32Array(count)
    const spinSpeeds = new Float32Array(count)
    const flowerTypes = new Float32Array(count)
    const depths = new Float32Array(count)
    const pulseRates = new Float32Array(count)

    for (let index = 0; index < count; index += 1) {
        const depth = 0.18 + seededFlowerValue(index, 2) * 0.82
        const type = resolveFlowerType(index)
        const spinDirection = seededFlowerValue(index, 12) > 0.5 ? 1 : -1

        positions[index * 3] = seededFlowerValue(index, 1) * 2.16 - 1.08
        positions[index * 3 + 1] = 0
        positions[index * 3 + 2] = 0
        sizes[index] = resolveFlowerSize(type, depth, preview)
            * (0.84 + seededFlowerValue(index, 4) * 0.3)
        phases[index] = seededFlowerValue(index, 5)
        fallSpeeds[index] = 0.018
            + seededFlowerValue(index, 6) * 0.025
            + depth * 0.009
        drifts[index * 2] = 0.045 + seededFlowerValue(index, 7) * 0.105
        drifts[index * 2 + 1] = 0.018 + seededFlowerValue(index, 9) * 0.065
        rotations[index] = seededFlowerValue(index, 10) * Math.PI * 2
        spinSpeeds[index] = spinDirection
            * (0.075 + seededFlowerValue(index, 11) * 0.24)
        flowerTypes[index] = type
        depths[index] = depth
        pulseRates[index] = 0.28 + seededFlowerValue(index, 13) * 0.34
    }

    return {
        count,
        positions,
        sizes,
        phases,
        fallSpeeds,
        drifts,
        rotations,
        spinSpeeds,
        flowerTypes,
        depths,
        pulseRates,
    }
}
