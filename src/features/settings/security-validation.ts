import type {
    ChangePasswordRequest,
    SetPasswordRequest,
} from "./types"

function validatePasswordPair(
    password: string,
    confirmPassword: string,
): string | null {
    if (password.length < 8) {
        return "La nueva contraseña debe tener al menos 8 caracteres."
    }

    if (password !== confirmPassword) {
        return "Las contraseñas nuevas no coinciden."
    }

    return null
}

export function validateChangePassword(
    request: ChangePasswordRequest,
): string | null {
    return validatePasswordPair(
        request.newPassword,
        request.confirmPassword,
    )
}

export function validateSetPassword(
    request: SetPasswordRequest,
): string | null {
    return validatePasswordPair(request.password, request.confirmPassword)
}
