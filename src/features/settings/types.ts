export const notificationFrequencies = [
    "IMMEDIATE",
    "DAILY",
    "WEEKLY",
    "DISABLED",
] as const

export type NotificationFrequency =
    (typeof notificationFrequencies)[number]

export type Theme =
    | "LUNAR_MIND"
    | "DEEP_SERENITY"
    | "CALM_TECH"
    | "SOFT_DAWN"
    | "MINT_BREEZE"
    | "CLEAR_SKY"
export type BackgroundMotion =
    | "NONE"
    | "STAR_RAIN"
    | "ORBITAL_GALAXY"
    | "SOFT_AURORA"
export type MotivationFrequency = "DAILY" | "WEEKLY" | "DISABLED"

export interface UserSettings {
    theme: Theme
    backgroundMotion: BackgroundMotion
    emailNotifications: boolean
    whatsappNotifications: boolean
    discordNotifications: boolean
    taskNotificationFrequency: NotificationFrequency
    motivationalMessages: boolean
    motivationFrequency: MotivationFrequency
    createdAt: string
    updatedAt: string
}

export interface UpdateNotificationPreferencesRequest {
    emailNotifications: boolean
    whatsappNotifications: boolean
    discordNotifications: boolean
    taskNotificationFrequency: NotificationFrequency
}

export type NotificationPreferenceChanges = Partial<
    Pick<
        UpdateNotificationPreferencesRequest,
        | "emailNotifications"
        | "discordNotifications"
        | "taskNotificationFrequency"
    >
>

export type DiscordConnection =
    | { connected: false }
    | {
        connected: true
        discordUserId: string
        username: string
        globalName: string | null
        connectedAt: string
    }

export interface DiscordAuthorizationResponse {
    authorizationUrl: string
}

export interface ChangePasswordRequest {
    currentPassword: string
    newPassword: string
    confirmPassword: string
}

export interface SetPasswordRequest {
    password: string
    confirmPassword: string
}

export interface MfaStatus {
    enabled: boolean
    enabledAt: string | null
}

export interface MfaSetup {
    secret: string
    otpauthUri: string
}

export interface MfaCodeRequest {
    code: string
}

export interface MfaRecoveryCodesResponse {
    recoveryCodes: string[]
}
