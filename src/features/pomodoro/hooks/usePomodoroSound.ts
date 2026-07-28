"use client"

import { useEffect, useRef, useState } from "react"
import type { PomodoroPhase } from "../timer"

type AudiblePhase = Exclude<PomodoroPhase, "COMPLETE">

function playCue(
    audioContext: AudioContext,
    phase: AudiblePhase,
) {
    const startedAt = audioContext.currentTime
    const frequencies =
        phase === "FOCUS" ? [523.25, 659.25] : [659.25, 523.25]

    frequencies.forEach((frequency, index) => {
        const noteStartsAt = startedAt + index * 0.14
        const oscillator = audioContext.createOscillator()
        const gain = audioContext.createGain()

        oscillator.type = "sine"
        oscillator.frequency.setValueAtTime(
            frequency,
            noteStartsAt,
        )
        gain.gain.setValueAtTime(0.0001, noteStartsAt)
        gain.gain.exponentialRampToValueAtTime(
            0.035,
            noteStartsAt + 0.025,
        )
        gain.gain.exponentialRampToValueAtTime(
            0.0001,
            noteStartsAt + 0.32,
        )
        oscillator.connect(gain)
        gain.connect(audioContext.destination)
        oscillator.start(noteStartsAt)
        oscillator.stop(noteStartsAt + 0.34)
    })
}

export function usePomodoroSound(phase: PomodoroPhase | null) {
    const [soundEnabled, setSoundEnabled] = useState(false)
    const audioContext = useRef<AudioContext | null>(null)
    const previousPhase = useRef<PomodoroPhase | null>(phase)

    const toggleSound = async (enabled: boolean) => {
        if (enabled) {
            audioContext.current ??= new AudioContext()
            await audioContext.current.resume()
        }
        setSoundEnabled(enabled)
    }

    useEffect(() => {
        const isNewAudiblePhase =
            phase !== null &&
            phase !== "COMPLETE" &&
            phase !== previousPhase.current

        if (
            soundEnabled &&
            isNewAudiblePhase &&
            audioContext.current
        ) {
            playCue(audioContext.current, phase)
        }
        previousPhase.current = phase
    }, [phase, soundEnabled])

    useEffect(
        () => () => {
            void audioContext.current?.close()
        },
        [],
    )

    return { soundEnabled, toggleSound }
}
