export type UserRole = "USER" | "ADMIN"

export interface AuthUser {
    id: string
    name: string
    email: string
    role: UserRole
    avatarUrl: string | null
    emailVerified: boolean
}

export interface CurrentUser {
    id: string
    name: string
    email: string
    role: UserRole
    avatarUrl: string | null
    hasPassword: boolean
}

export interface LoginRequest {
    email: string
    password: string
}

export interface AuthResponse {
    mfaRequired: false
    accessToken: string
    refreshToken: string
    expiresIn: number
    user: AuthUser
}

export interface MfaRequiredResponse {
    mfaRequired: true
    challengeToken: string
    expiresIn: number
}

export type LoginResponse = AuthResponse | MfaRequiredResponse

export interface VerifyMfaLoginRequest {
    challengeToken: string
    code: string
}
