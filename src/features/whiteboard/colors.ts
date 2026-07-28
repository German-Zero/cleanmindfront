const HEX_COLOR = /^#[0-9A-F]{6}$/i

export function isHexColor(color: string): boolean {
    return HEX_COLOR.test(color)
}

export function addSavedColor(
    colors: string[],
    color: string,
): string[] {
    const normalized = color.toUpperCase()
    if (!isHexColor(normalized)) return colors

    return [
        normalized,
        ...colors.filter((saved) => saved !== normalized),
    ].slice(0, 5)
}
