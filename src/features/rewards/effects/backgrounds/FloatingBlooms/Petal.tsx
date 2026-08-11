"use client"

import type { CSSProperties } from "react"
import type { PetalPreset, PetalVariant } from "./petal.config"
import styles from "./FloatingBlooms.module.css"

const petalPaths: Record<PetalVariant, string> = {
    rounded: "M16 29C8.9 25.7 5 20.1 6.8 13.6C8.2 8.3 12.1 4.7 16 2.8c3.9 1.9 7.8 5.5 9.2 10.8C27 20.1 23.1 25.7 16 29Z",
    almond: "M16 29.2C10.1 24.8 7.4 18.6 9.1 12.7 10.5 7.8 13.2 4.2 16 2.1c2.8 2.1 5.5 5.7 6.9 10.6 1.7 5.9-1 12.1-6.9 16.5Z",
    split: "M15.9 29C9.1 25.5 5.9 20.6 7.2 14.7 1.8 14 1.8 8.7 4.5 6.2c2.5-2.3 7.6-.9 11.5 3.8 3.9-4.7 9-6.1 11.5-3.8 2.7 2.5 2.7 7.8-2.7 8.5 1.3 5.9-1.9 10.8-8.9 14.3Z",
}

export default function Petal({
    preset,
    color,
}: {
    preset: PetalPreset
    color: string
}) {
    const style = {
        "--petal-x": `${preset.x}%`,
        "--petal-size": `${preset.size}px`,
        "--petal-delay": `${preset.delay}s`,
        "--petal-duration": `${preset.duration}s`,
        "--petal-flutter-duration": `${preset.flutterDuration}s`,
        "--petal-opacity": preset.opacity,
        "--petal-blur": `${preset.blur}px`,
        "--petal-color": color,
        "--petal-entry-x": `${preset.entryX}px`,
        "--petal-waypoint-one": `${preset.waypointOne}px`,
        "--petal-waypoint-two": `${preset.waypointTwo}px`,
        "--petal-waypoint-three": `${preset.waypointThree}px`,
        "--petal-exit-x": `${preset.exitX}px`,
        "--petal-rotation-start": `${preset.rotationStart}deg`,
        "--petal-rotation-one": `${preset.rotationOne}deg`,
        "--petal-rotation-two": `${preset.rotationTwo}deg`,
        "--petal-rotation-three": `${preset.rotationThree}deg`,
        "--petal-rotation-end": `${preset.rotationEnd}deg`,
    } as CSSProperties

    return (
        <span
            className={styles.petal}
            data-depth={preset.depth}
            style={style}
        >
            <svg
                className={styles.petalShape}
                viewBox="0 0 32 32"
                focusable="false"
            >
                <path className={styles.petalSurface} d={petalPaths[preset.variant]} />
                <path
                    className={styles.petalVein}
                    d="M16 27.2C15.1 21.1 15.3 14.3 16.2 5.4"
                />
                <path
                    className={styles.petalSheen}
                    d="M12.7 10.2C10.8 13.8 10.9 17.3 12.3 20.4"
                />
            </svg>
        </span>
    )
}
