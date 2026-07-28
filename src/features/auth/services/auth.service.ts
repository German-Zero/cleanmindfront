import { apiRequest } from "@/lib/api"
import type {
    AuthResponse,
    CurrentUser,
    ForgotPasswordRequest,
    LoginRequest,
    LoginResponse,
    ResetPasswordRequest,
    VerifyMfaLoginRequest,
} from "../types"

const jsonHeaders = { "Content-Type": "application/json" }

export const authService = {
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
