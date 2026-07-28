import { apiRequest } from "@/lib/api"
import type { LoginRequest, LoginResponse } from "@/features/auth/types"
import type {
    ChangePasswordRequest,
    MfaCodeRequest,
    MfaRecoveryCodesResponse,
    MfaSetup,
    MfaStatus,
    SetPasswordRequest,
} from "../types"

const jsonHeaders = { "Content-Type": "application/json" }

export const accountSecurityService = {
    changePassword: (request: ChangePasswordRequest) =>
        apiRequest<void>("/api/auth/change-password", {
            method: "PATCH",
            headers: jsonHeaders,
            body: JSON.stringify(request),
        }),

    setPassword: (request: SetPasswordRequest) =>
        apiRequest<void>("/api/auth/set-password", {
            method: "PATCH",
            headers: jsonHeaders,
            body: JSON.stringify(request),
        }),

    reauthenticate: (request: LoginRequest) =>
        apiRequest<LoginResponse>("/api/auth/login", {
            method: "POST",
            headers: jsonHeaders,
            body: JSON.stringify(request),
        }),

    getMfaStatus: () =>
        apiRequest<MfaStatus>("/api/auth/mfa/status", {
            cache: "no-store",
        }),

    setupMfa: () =>
        apiRequest<MfaSetup>("/api/auth/mfa/setup", {
            method: "POST",
        }),

    enableMfa: (request: MfaCodeRequest) =>
        apiRequest<MfaRecoveryCodesResponse>("/api/auth/mfa/enable", {
            method: "POST",
            headers: jsonHeaders,
            body: JSON.stringify(request),
        }),

    disableMfa: (request: MfaCodeRequest) =>
        apiRequest<void>("/api/auth/mfa/disable", {
            method: "POST",
            headers: jsonHeaders,
            body: JSON.stringify(request),
        }),
}
