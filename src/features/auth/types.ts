export type UserRole = "USER" | "ADMIN"

export interface AuthUser {
    id: string
    name: string
    email: string
    role: UserRole
    avatarUrl: string | null
    emailVerified: boolean
    requiresTermsAcceptance: boolean
    needsOnboarding: boolean
}

export interface CurrentUser {
    id: string
    name: string
    email: string
    role: UserRole
    avatarUrl: string | null
    hasPassword: boolean
    needsOnboarding: boolean
}

export interface LoginRequest {
    email: string
    password: string
}

export interface RegisterRequest {
    name: string
    email: string
    password: string
    acceptedTerms: boolean
}

export interface VerifyEmailRequest {
    code: string
}

export interface ForgotPasswordRequest {
    email: string
}

export interface ResetPasswordRequest {
    token: string
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
