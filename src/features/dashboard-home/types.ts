export type DashboardDestinationId =
    | "calendar"
    | "matrix"
    | "pomodoro"
    | "whiteboard"
    | "personalization"
    | "store"

export interface DashboardDestination {
    id: DashboardDestinationId
    href: string
    eyebrow: string
    title: string
    description: string
    action: string
}
