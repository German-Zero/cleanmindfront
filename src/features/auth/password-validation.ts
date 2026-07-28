export function validatePasswordConfirmation(
    password: string,
    confirmPassword: string,
): string | null {
    if (password.length < 8) {
        return "La nueva contraseña debe tener al menos 8 caracteres."
    }

    return password === confirmPassword
        ? null
        : "Las contraseñas nuevas no coinciden."
}
