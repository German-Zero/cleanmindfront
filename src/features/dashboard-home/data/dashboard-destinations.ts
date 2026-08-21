import type { DashboardDestination } from "../types"

export const dashboardDestinations = [
    {
        id: "calendar",
        href: "/dashboard/calendar",
        eyebrow: "Organizar",
        title: "Calendario",
        description: "Mira tus tareas por día, semana o mes y ordena tus fechas.",
        action: "Abrir calendario",
    },
    {
        id: "matrix",
        href: "/dashboard/matriz",
        eyebrow: "Priorizar",
        title: "Matriz de Eisenhower",
        description: "Decide qué hacer, planificar, delegar o dejar para después.",
        action: "Ordenar prioridades",
    },
    {
        id: "pomodoro",
        href: "/dashboard/pomodoro",
        eyebrow: "Enfocar",
        title: "Pomodoro",
        description: "Elige una tarea y avanza en bloques de trabajo con pausas.",
        action: "Iniciar enfoque",
    },
    {
        id: "whiteboard",
        href: "/dashboard/whiteboard",
        eyebrow: "Explorar",
        title: "Pizarra",
        description: "Dibuja, escribe y organiza tus ideas en un espacio libre.",
        action: "Abrir pizarra",
    },
    {
        id: "personalization",
        href: "/dashboard/personalization",
        eyebrow: "Adaptar",
        title: "Personalización",
        description: "Ajusta colores, movimiento y atmósfera a tu forma de trabajar.",
        action: "Personalizar espacio",
    },
    {
        id: "store",
        href: "/dashboard/store",
        eyebrow: "Descubrir",
        title: "Tienda",
        description: "Canjea tus puntos por nuevos detalles y efectos visuales.",
        action: "Explorar tienda",
    },
] as const satisfies readonly DashboardDestination[]
