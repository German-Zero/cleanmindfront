import { taskDueDateKey } from "@/features/tasks/calendar"
import type {
    Task,
    TaskQuadrant,
    TaskStatus,
} from "@/features/tasks/types"

const quadrantStyles: Record<TaskQuadrant, string> = {
    DO: "bg-now",
    PLAN: "bg-plan",
    DELEGATE: "bg-delegate",
    DELETE: "bg-delete",
}

const quadrantLabels: Record<TaskQuadrant, string> = {
    DO: "Hacer ahora",
    PLAN: "Planificar",
    DELEGATE: "Delegar",
    DELETE: "Eliminar",
}

const statusLabels: Record<TaskStatus, string> = {
    TODO: "Pendiente",
    IN_PROGRESS: "En progreso",
    COMPLETED: "Completada",
}

function formatDueDate(dueDate: string | null): string {
    const dateKey = taskDueDateKey(dueDate)
    if (!dateKey) return "Sin fecha"

    const [year, month, day] = dateKey.split("-").map(Number)
    return new Intl.DateTimeFormat("es-AR", {
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(new Date(year, month - 1, day))
}

export default function ViewTaskCalendarModal({ task }: { task: Task }) {
    return (
        <div
            className="
                calm-panel relative h-auto w-full max-w-100 overflow-hidden
            "
        >
            <div className={`h-1.25 w-full opacity-80 ${quadrantStyles[task.quadrant]}`} />

            <div className="flex flex-col gap-3.5 p-4">
                <div>
                    <h2 className="text-sm font-semibold text-text-primary">
                        {task.title}
                    </h2>
                    <p className="mt-1 line-clamp-4 text-xs tracking-wider text-text-secondary">
                        {task.description || "Sin descripción"}
                    </p>
                </div>

                <dl className="grid grid-cols-2 gap-2.5 rounded-[10px] border border-border/45 bg-card/38 p-3 text-[10px]">
                    <div>
                        <dt className="text-text-secondary">Fecha</dt>
                        <dd className="mt-0.5 text-text-primary">
                            {formatDueDate(task.dueDate)}
                        </dd>
                    </div>
                    <div>
                        <dt className="text-text-secondary">Estado</dt>
                        <dd className="mt-0.5 text-text-primary">
                            {statusLabels[task.status]}
                        </dd>
                    </div>
                    <div>
                        <dt className="text-text-secondary">Matriz</dt>
                        <dd className="mt-0.5 text-text-primary">
                            {quadrantLabels[task.quadrant]}
                        </dd>
                    </div>
                    <div>
                        <dt className="text-text-secondary">Prioridad</dt>
                        <dd className="mt-0.5 text-text-primary">
                            {task.isUrgent && task.isImportant
                                ? "Urgente e importante"
                                : task.isUrgent
                                  ? "Urgente"
                                  : task.isImportant
                                    ? "Importante"
                                    : "Normal"}
                        </dd>
                    </div>
                </dl>
            </div>
        </div>
    )
}
