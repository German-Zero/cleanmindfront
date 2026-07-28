import { apiRequest } from "@/lib/api"
import type {
    AuthResponse,
    CurrentUser,
    ForgotPasswordRequest,
    LoginRequest,
    LoginResponse,
    RegisterRequest,
    ResetPasswordRequest,
    VerifyEmailRequest,
    VerifyMfaLoginRequest,
} from "../types"

const jsonHeaders = { "Content-Type": "application/json" }

export const authService = {
    register: (request: RegisterRequest) =>
        apiRequest<AuthResponse>("/api/auth/register", {
            method: "POST",
            headers: jsonHeaders,
            body: JSON.stringify(request),
        }),

    verifyEmail: (request: VerifyEmailRequest) =>
        apiRequest<void>("/api/auth/verify-email", {
            method: "POST",
            headers: jsonHeaders,
            body: JSON.stringify(request),
        }),

    resendVerificationEmail: () =>
        apiRequest<void>("/api/auth/resend-verification-email", {
            method: "POST",
        }),

    getCurrentUser: () =>
        apiRequest<CurrentUser>("/api/auth/me", { cache: "no-store" }),

    forgotPassword: (request: ForgotPasswordRequest) =>
        apiRequest<void>("/api/auth/forgot-password", {
            method: "POST",
            headers: jsonHeaders,
            body: JSON.stringify(request),
        }),

    resetPassword: (request: ResetPasswordRequest) =>
        apiRequest<void>("/api/auth/reset-password", {
            method: "POST",
            headers: jsonHeaders,
            body: JSON.stringify(request),
        }),

    login: (request: LoginRequest) =>
        apiRequest<LoginResponse>("/api/auth/login", {
            method: "POST",
            headers: jsonHeaders,
            body: JSON.stringify(request),
        }),

    verifyMfa: (request: VerifyMfaLoginRequest) =>
        apiRequest<AuthResponse>("/api/auth/mfa/verify", {
            method: "POST",
            headers: jsonHeaders,
            body: JSON.stringify(request),
        }),

    logout: () =>
        apiRequest<void>("/api/auth/logout", {
            method: "POST",
        }),
}
