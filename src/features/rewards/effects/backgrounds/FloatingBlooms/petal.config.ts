export type PetalDepth = "far" | "middle" | "near"
export type PetalVariant = "rounded" | "almond" | "split"

export interface PetalPreset {
    id: string
    x: number
    size: number
    delay: number
    duration: number
    flutterDuration: number
    opacity: number
    blur: number
    colorIndex: number
    depth: PetalDepth
    variant: PetalVariant
    entryX: number
    waypointOne: number
    waypointTwo: number
    waypointThree: number
    exitX: number
    rotationStart: number
    rotationOne: number
    rotationTwo: number
    rotationThree: number
    rotationEnd: number
}

const variants: PetalVariant[] = ["rounded", "almond", "split"]
const depths: PetalDepth[] = ["far", "middle", "near"]

function seededValue(index: number, multiplier: number, offset: number) {
    return ((index * multiplier + offset) % 101) / 100
}

export const petalPresets: PetalPreset[] = Array.from({ length: 30 }, (_, index) => {
    const depth = depths[(index * 2 + 1) % depths.length]
    const depthScale = depth === "near" ? 1.15 : depth === "middle" ? 0.93 : 0.74
    const direction = index % 2 === 0 ? 1 : -1
    const drift = 24 + seededValue(index, 47, 13) * 58
    const rotationStart = Math.round(seededValue(index, 61, 17) * 320)

    return {
        id: `floating-petal-${index + 1}`,
        x: 3 + seededValue(index, 37, 11) * 94,
        size: Math.round((10 + seededValue(index, 29, 7) * 12) * depthScale),
        delay: -(seededValue(index, 43, 19) * 27),
        duration: 23 + seededValue(index, 31, 5) * 13,
        flutterDuration: 3.8 + seededValue(index, 53, 23) * 3.6,
        opacity: (depth === "near" ? 0.67 : depth === "middle" ? 0.52 : 0.34)
            + seededValue(index, 17, 3) * 0.08,
        blur: depth === "near" ? 0 : depth === "middle" ? 0.25 : 0.7,
        colorIndex: index % 2,
        depth,
        variant: variants[(index * 2) % variants.length],
        entryX: direction * drift * -0.18,
        waypointOne: direction * drift * 0.48,
        waypointTwo: direction * drift * -0.34,
        waypointThree: direction * drift * 0.72,
        exitX: direction * drift * 0.22,
        rotationStart,
        rotationOne: rotationStart + direction * 76,
        rotationTwo: rotationStart + direction * 178,
        rotationThree: rotationStart + direction * 286,
        rotationEnd: rotationStart + direction * 430,
    }
})
