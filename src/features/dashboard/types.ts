import type { CurrentUser } from "@/features/auth/types"
import type {
    RewardSummary,
    StorefrontResponse,
} from "@/features/rewards/types"
import type { UserSettings } from "@/features/settings/types"
import type { Task } from "@/features/tasks/types"

export interface DashboardBootstrap {
    user: CurrentUser
    settings: UserSettings
    rewards: RewardSummary
    rewardStore: StorefrontResponse
    tasks: Task[]
}
