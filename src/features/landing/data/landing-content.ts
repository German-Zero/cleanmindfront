export const landingNavigation = [
    { href: "#recorrido", label: "Cómo funciona" },
    { href: "#herramientas", label: "Herramientas" },
    { href: "#personalizacion", label: "Personalización" },
    { href: "#seguridad", label: "Tu cuenta" },
] as const

export const journeySteps = [
    {
        number: "01",
        eyebrow: "Descarga mental",
        title: "Saca las tareas de tu cabeza",
        description:
            "Anota lo necesario, agrega una fecha y deja que cada pendiente tenga un lugar concreto.",
    },
    {
        number: "02",
        eyebrow: "Prioridad",
        title: "Decide qué merece atención",
        description:
            "Marca urgencia e importancia para ver cada tarea en el cuadrante que le corresponde.",
    },
    {
        number: "03",
        eyebrow: "Enfoque",
        title: "Avanza de una cosa por vez",
        description:
            "Elige una tarea, inicia un bloque Pomodoro y pausa cuando realmente lo necesites.",
    },
    {
        number: "04",
        eyebrow: "Cierre",
        title: "Termina el día con menos ruido",
        description:
            "Revisa lo completado, lo que sigue y tu tiempo de enfoque sin llenar la pantalla de estímulos.",
    },
] as const

export type LandingFeatureIcon =
    | "calendar"
    | "matrix"
    | "pomodoro"
    | "whiteboard"

export const landingFeatures: Array<{
    id: string
    number: string
    eyebrow: string
    title: string
    description: string
    highlights: readonly string[]
    icon: LandingFeatureIcon
    tone: "lavender" | "mint" | "coral" | "blue"
}> = [
    {
        id: "calendario",
        number: "01",
        eyebrow: "Planificación",
        title: "Todo tu día, en contexto",
        description:
            "Consulta tus tareas por mes, semana o día. Cambia de escala sin perder fechas, estados ni detalles.",
        highlights: ["Mes, semana y día", "Detalle de tareas", "Fecha actual"],
        icon: "calendar",
        tone: "lavender",
    },
    {
        id: "matriz",
        number: "02",
        eyebrow: "Prioridades",
        title: "Prioriza antes de reaccionar",
        description:
            "CleanMind ubica cada tarea en la Matriz de Eisenhower según lo que marques como urgente e importante.",
        highlights: ["Hacer", "Planificar", "Delegar", "Eliminar"],
        icon: "matrix",
        tone: "coral",
    },
    {
        id: "pomodoro",
        number: "03",
        eyebrow: "Concentración",
        title: "Enfócate en una sola cosa",
        description:
            "Vincula una tarea a Pomodoro, alterna trabajo y descanso, pausa el recorrido y revisa los últimos siete días.",
        highlights: ["Ciclos automáticos", "Pausa y reanudación", "Historial"],
        icon: "pomodoro",
        tone: "mint",
    },
    {
        id: "pizarra",
        number: "04",
        eyebrow: "Ideas libres",
        title: "Piensa también fuera de las listas",
        description:
            "Dibuja, escribe y conecta ideas con formas, flechas, colores y zoom. Tus cambios se guardan automáticamente.",
        highlights: ["Dibujo y texto", "Zoom y movimiento", "Guardado automático"],
        icon: "whiteboard",
        tone: "blue",
    },
]

export const paletteSamples = [
    { name: "Lunar Mind", colors: ["#0E0D16", "#363047", "#7C79E8"] },
    { name: "Deep Serenity", colors: ["#0A1418", "#30474E", "#46B89A"] },
    { name: "Calm Tech", colors: ["#0C111C", "#314154", "#6A9ED8"] },
    { name: "Soft Dawn", colors: ["#F7F3EE", "#D8CBC1", "#D5C3F2"] },
    { name: "Mint Breeze", colors: ["#EFF7F4", "#BFD5CC", "#A7DCCB"] },
    { name: "Clear Sky", colors: ["#F1F6FA", "#C0D2DF", "#B7D7ED"] },
] as const

export const rewardCategories = [
    "Paletas",
    "Fondos animados",
    "Bordes",
    "Efectos",
    "Pomodoro",
    "Calendario",
] as const

export const securityFeatures = [
    {
        number: "01",
        title: "Acceso a tu manera",
        description:
            "Inicia sesión con Google o con email y contraseña. También puedes recuperar tu acceso por correo.",
    },
    {
        number: "02",
        title: "Una capa adicional",
        description:
            "Activa la verificación en dos pasos mediante código QR y conserva códigos de recuperación.",
    },
    {
        number: "03",
        title: "Solo los avisos que te sirven",
        description:
            "Decide si quieres recibir recordatorios por email o Discord y ajusta su frecuencia.",
    },
] as const
