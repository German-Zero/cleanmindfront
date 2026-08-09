import type { CurrentUser } from "@/features/auth/types"
import type { RewardSummary } from "@/features/rewards/types"
import type { UserSettings } from "@/features/settings/types"
import type { Task } from "@/features/tasks/types"

export interface DashboardBootstrap {
    user: CurrentUser
    settings: UserSettings
    rewards: RewardSummary
    tasks: Task[]
}
