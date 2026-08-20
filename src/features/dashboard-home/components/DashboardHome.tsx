"use client"

import Link from "next/link"
import type { ComponentType } from "react"
import { useCurrentUser } from "@/features/auth/CurrentUserProvider"
import { useRewards } from "@/features/rewards/RewardsProvider"
import { useTasks } from "@/features/tasks/TasksProvider"
import CalendarButton from "@/components/ui/CalendarButton"
import MatrizButton from "@/components/ui/MatrizButton"
import PomodoroButton from "@/components/ui/PomodoroButton"
import StoreButton from "@/components/ui/StoreButton"
import WhiteboardButton from "@/components/ui/WhiteboardButton"
import IconPersonalization from "@/components/ui/icons/IconPersonalization"
import { dashboardDestinations } from "../data/dashboard-destinations"
import type { DashboardDestinationId } from "../types"
import styles from "../styles/DashboardHome.module.css"

const destinationIcons: Record<DashboardDestinationId, ComponentType> = {
    calendar: CalendarButton,
    matrix: MatrizButton,
    pomodoro: PomodoroButton,
    whiteboard: WhiteboardButton,
    personalization: IconPersonalization,
    store: StoreButton,
}

export default function DashboardHome() {
    const { user } = useCurrentUser()
    const { tasks } = useTasks()
    const { summary } = useRewards()

    const taskOverview = tasks.reduce(
        (overview, task) => {
            if (task.status === "COMPLETED") overview.completed += 1
            else if (task.status === "IN_PROGRESS") overview.inProgress += 1
            else overview.pending += 1

            return overview
        },
        { pending: 0, inProgress: 0, completed: 0 },
    )

    return (
        <div className={styles.home}>
            <div className={styles.content}>
                <header className={styles.header}>
                    <div className={styles.intro}>
                        <p className={styles.greeting}>
                            Hola, {user?.name?.trim() || "bienvenido"}
                        </p>
                        <h1 className={styles.title}>
                            ¿Dónde quieres empezar?
                        </h1>
                        <p className={styles.description}>
                            Elige el espacio que necesitas ahora. Puedes cambiar
                            de sección cuando quieras.
                        </p>
                    </div>

                    <dl className={styles.overview} aria-label="Resumen de tareas">
                        <div className={styles.overviewItem}>
                            <dt>Pendientes</dt>
                            <dd>{taskOverview.pending}</dd>
                        </div>
                        <div className={styles.overviewItem}>
                            <dt>En curso</dt>
                            <dd>{taskOverview.inProgress}</dd>
                        </div>
                        <div className={styles.overviewItem}>
                            <dt>Puntos</dt>
                            <dd>{summary.balance}</dd>
                        </div>
                    </dl>
                </header>

                <section aria-labelledby="dashboard-spaces-title">
                    <div className={styles.sectionHeading}>
                        <div>
                            <p className={styles.eyebrow}>Tu espacio de trabajo</p>
                            <h2 id="dashboard-spaces-title" className={styles.sectionTitle}>
                                Elige una sección
                            </h2>
                        </div>
                        <p className={styles.sectionNote}>
                            {taskOverview.completed > 0
                                ? `${taskOverview.completed} tareas completadas hasta ahora`
                                : "Un paso pequeño también cuenta"}
                        </p>
                    </div>

                    <nav className={styles.destinationGrid} aria-label="Secciones de CleanMind">
                        {dashboardDestinations.map((destination, index) => {
                            const DestinationIcon = destinationIcons[destination.id]

                            return (
                                <Link
                                    key={destination.id}
                                    href={destination.href}
                                    className={`${styles.destination} ${styles[destination.id]}`}
                                >
                                    <span className={styles.destinationNumber} aria-hidden="true">
                                        {String(index + 1).padStart(2, "0")}
                                    </span>
                                    <span className={styles.icon} aria-hidden="true">
                                        <DestinationIcon />
                                    </span>
                                    <span className={styles.destinationCopy}>
                                        <span className={styles.destinationEyebrow}>
                                            {destination.eyebrow}
                                        </span>
                                        <span className={styles.destinationTitle}>
                                            {destination.title}
                                        </span>
                                        <span className={styles.destinationDescription}>
                                            {destination.description}
                                        </span>
                                    </span>
                                    <span className={styles.destinationAction} aria-hidden="true">
                                        {destination.action}
                                        <span className={styles.arrow}>→</span>
                                    </span>
                                </Link>
                            )
                        })}
                    </nav>
                </section>
            </div>
        </div>
    )
}
