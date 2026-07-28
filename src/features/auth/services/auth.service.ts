import { apiRequest } from "@/lib/api"
import type {
    AuthResponse,
    CurrentUser,
    LoginRequest,
    LoginResponse,
    VerifyMfaLoginRequest,
} from "../types"

const jsonHeaders = { "Content-Type": "application/json" }

export const authService = {
    getCurrentUser: () =>
        apiRequest<CurrentUser>("/api/auth/me", { cache: "no-store" }),

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
