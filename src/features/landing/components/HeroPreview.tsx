"use client"

import {
    LazyMotion,
    MotionConfig,
    domAnimation,
    m,
    useReducedMotion,
    useScroll,
    useTransform,
} from "motion/react"
import { useRef, useSyncExternalStore } from "react"
import { landingMotionTokens } from "../motion/tokens"
import styles from "./HeroPreview.module.css"

const weekDays = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"]
const calendarDays = Array.from({ length: 35 }, (_, index) => index + 1)

const tasks = [
    { name: "Preparar la presentación", time: "09:30", status: "now" },
    { name: "Revisar el informe final", time: "12:00", status: "plan" },
    { name: "Organizar ideas de mañana", time: "17:30", status: "now" },
]

function subscribeToDeviceCapabilities() {
    return () => undefined
}

function getLowPowerDeviceSnapshot() {
    if (typeof navigator === "undefined") return true

    const navigatorWithMemory = navigator as Navigator & {
        deviceMemory?: number
    }
    const processors = navigator.hardwareConcurrency || 8
    const memory = navigatorWithMemory.deviceMemory ?? 8

    return processors <= 4 || memory <= 4
}

function getServerLowPowerDeviceSnapshot() {
    return true
}

function useLowPowerDevice() {
    return useSyncExternalStore(
        subscribeToDeviceCapabilities,
        getLowPowerDeviceSnapshot,
        getServerLowPowerDeviceSnapshot,
    )
}

function subscribeToCompactViewport(callback: () => void) {
    if (typeof window === "undefined") return () => undefined
    const query = window.matchMedia("(max-width: 680px)")
    query.addEventListener("change", callback)
    return () => query.removeEventListener("change", callback)
}

function getCompactViewportSnapshot() {
    return typeof window === "undefined"
        || window.matchMedia("(max-width: 680px)").matches
}

function useCompactViewport() {
    return useSyncExternalStore(
        subscribeToCompactViewport,
        getCompactViewportSnapshot,
        () => true,
    )
}

export default function HeroPreview() {
    const previewRef = useRef<HTMLDivElement>(null)
    const prefersReducedMotion = Boolean(useReducedMotion())
    const isLowPower = useLowPowerDevice()
    const isCompactViewport = useCompactViewport()
    const canUseParallax = !prefersReducedMotion && !isLowPower && !isCompactViewport
    const { scrollYProgress } = useScroll({
        target: previewRef,
        offset: ["start end", "end start"],
    })
    const backY = useTransform(
        scrollYProgress,
        [0, 1],
        [
            -landingMotionTokens.distance.parallaxBack,
            landingMotionTokens.distance.parallaxBack,
        ],
    )
    const middleY = useTransform(
        scrollYProgress,
        [0, 1],
        [
            landingMotionTokens.distance.parallaxMiddle,
            -landingMotionTokens.distance.parallaxMiddle,
        ],
    )
    const frontY = useTransform(
        scrollYProgress,
        [0, 1],
        [
            landingMotionTokens.distance.parallaxFront,
            -landingMotionTokens.distance.parallaxFront,
        ],
    )

    return (
        <LazyMotion features={domAnimation} strict>
            <MotionConfig reducedMotion="user">
                <div
                    ref={previewRef}
                    className={styles.preview}
                    role="img"
                    aria-label="Vista previa de CleanMind con calendario, tareas y una sesión Pomodoro"
                >
                    <m.div
                        className={styles.ambientLayer}
                        style={{ y: canUseParallax ? backY : 0 }}
                        aria-hidden="true"
                    >
                        <span className={styles.orbit} />
                        <span className={styles.orbitSmall} />
                    </m.div>

                    <m.div
                        className={styles.workspaceLayer}
                        style={{ y: canUseParallax ? middleY : 0 }}
                        aria-hidden="true"
                    >
                        <section className={styles.workspace}>
                            <header className={styles.topbar}>
                                <div className={styles.brand}>
                                    <span className={styles.brandMark} />
                                    <span>CleanMind</span>
                                </div>
                                <div className={styles.topActions}>
                                    <span className={styles.topDot}>+</span>
                                    <span className={styles.topDot}>✓</span>
                                    <span className={styles.topAvatar}>GN</span>
                                </div>
                            </header>

                            <div className={styles.workspaceBody}>
                                <aside className={styles.taskPanel}>
                                    <span className={styles.eyebrow}>Tu día</span>
                                    <h3 className={styles.taskTitle}>En orden</h3>
                                    <ul className={styles.taskList}>
                                        {tasks.map((task) => (
                                            <li
                                                key={task.name}
                                                className={styles.taskItem}
                                            >
                                                <span className={styles.taskName}>
                                                    {task.name}
                                                </span>
                                                <span className={styles.taskMeta}>
                                                    <span>{task.time}</span>
                                                    <span
                                                        className={`${styles.taskStatus} ${
                                                            task.status === "plan"
                                                                ? styles.taskStatusPlan
                                                                : ""
                                                        }`}
                                                    />
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </aside>

                                <section className={styles.calendarPanel}>
                                    <header className={styles.calendarHeader}>
                                        <div className={styles.monthNavigation}>
                                            <span className={styles.monthButton}>‹</span>
                                            <strong className={styles.monthTitle}>
                                                Agosto de 2026
                                            </strong>
                                            <span className={styles.monthButton}>›</span>
                                        </div>
                                        <div className={styles.viewTabs}>
                                            <span className={`${styles.viewTab} ${styles.viewTabActive}`}>
                                                Mes
                                            </span>
                                            <span className={styles.viewTab}>Semana</span>
                                            <span className={styles.viewTab}>Día</span>
                                        </div>
                                    </header>

                                    <div className={styles.weekdays}>
                                        {weekDays.map((day) => (
                                            <span key={day} className={styles.weekday}>
                                                {day}
                                            </span>
                                        ))}
                                    </div>

                                    <div className={styles.calendarGrid}>
                                        {calendarDays.map((day) => {
                                            const isToday = day === 14
                                            const hasNowTask = day === 8 || day === 14
                                            const hasPlanTask = day === 19 || day === 26

                                            return (
                                                <span
                                                    key={day}
                                                    className={`${styles.calendarDay} ${
                                                        day <= 3
                                                            ? styles.calendarDayMuted
                                                            : ""
                                                    } ${
                                                        isToday
                                                            ? styles.calendarDayToday
                                                            : ""
                                                    }`}
                                                >
                                                    <span className={isToday ? styles.todayNumber : ""}>
                                                        {day}
                                                    </span>
                                                    {hasNowTask && (
                                                        <span className={styles.calendarTask}>
                                                            {day === 14
                                                                ? "Informe final"
                                                                : "Planificar semana"}
                                                        </span>
                                                    )}
                                                    {hasPlanTask && (
                                                        <span className={`${styles.calendarTask} ${styles.calendarTaskPlan}`}>
                                                            Bloque de enfoque
                                                        </span>
                                                    )}
                                                </span>
                                            )
                                        })}
                                    </div>
                                </section>
                            </div>
                        </section>
                    </m.div>

                    <m.div
                        className={styles.focusLayer}
                        style={{ y: canUseParallax ? frontY : 0 }}
                        aria-hidden="true"
                    >
                        <section className={styles.focusCard}>
                            <header className={styles.focusHeader}>
                                <span className={styles.focusLabel}>Enfoque actual</span>
                                <span className={styles.liveBadge}>En curso</span>
                            </header>
                            <p className={styles.focusTime}>24:32</p>
                            <p className={styles.focusTask}>
                                Preparar la presentación
                            </p>
                            <div className={styles.focusProgress} />
                            <footer className={styles.focusFooter}>
                                <span>Sesión 2 de 4</span>
                                <span className={styles.focusControl}>Ⅱ</span>
                            </footer>
                        </section>
                    </m.div>
                </div>
            </MotionConfig>
        </LazyMotion>
    )
}
