export interface MeteorInstanceConfig {
    count: number
    seed: number
}

const MIN_METEORS = 7
const METEOR_VARIATIONS = 6

export function createMeteorInstanceConfig(instanceId: string): MeteorInstanceConfig {
    let hash = 2166136261

    for (const character of instanceId) {
        hash ^= character.charCodeAt(0)
        hash = Math.imul(hash, 16777619)
    }

    const normalizedHash = hash >>> 0

    return {
        count: MIN_METEORS + (normalizedHash % METEOR_VARIATIONS),
        seed: ((normalizedHash >>> 8) % 10000) / 10000,
    }
}
