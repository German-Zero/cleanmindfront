export class ApiError extends Error {
    readonly status: number

    constructor(message: string, status: number) {
        super(message)
        this.name = "ApiError"
        this.status = status
    }
}

export function requestErrorMessage(
    error: unknown,
    fallback: string,
    messages: Partial<Record<number, string>> = {},
): string {
    if (!(error instanceof ApiError)) return fallback

    return messages[error.status] ??
        (error.status < 500 ? error.message : fallback)
}

export async function apiRequest<T>(
    path: string,
    init: RequestInit = {},
): Promise<T> {
    const response = await fetch(path, {
        ...init,
        credentials: "include",
    })

    const isJson = response.headers
        .get("content-type")
        ?.includes("application/json")
    const body =
        isJson && response.status !== 204
            ? await response.json() as unknown
            : undefined

    if (!response.ok) {
        const rawMessage =
            body &&
            typeof body === "object" &&
            "message" in body
                ? (body as { message: unknown }).message
                : null
        const message = Array.isArray(rawMessage)
            ? rawMessage.map(String).join(" ")
            : rawMessage !== null
              ? String(rawMessage)
              : "No pudimos completar la solicitud."

        throw new ApiError(message, response.status)
    }

    return body as T
}
