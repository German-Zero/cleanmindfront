export function normalizeMfaCode(code: string): string {
    return code.trim().toUpperCase()
}

export function isMfaCodeValid(code: string): boolean {
    return /^(?:\d{6}|CM-(?:[A-F0-9]{4}-){3}[A-F0-9]{4})$/.test(
        normalizeMfaCode(code),
    )
}
