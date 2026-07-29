import assert from "node:assert/strict"
import test from "node:test"
import { apiRequest } from "../src/lib/api.ts"

test("preserva cookies y acepta respuestas 204 sin cuerpo", async () => {
    const originalFetch = globalThis.fetch
    let receivedInput: RequestInfo | URL | undefined
    let receivedInit: RequestInit | undefined

    globalThis.fetch = async (input, init) => {
        receivedInput = input
        receivedInit = init

        return new Response(null, {
            status: 204,
            headers: { "Content-Type": "application/json" },
        })
    }

    try {
        assert.equal(
            await apiRequest<void>("/api/auth/account", {
                method: "DELETE",
            }),
            undefined,
        )
        assert.equal(receivedInput, "/api/auth/account")
        assert.equal(receivedInit?.method, "DELETE")
        assert.equal(receivedInit?.credentials, "include")

        await apiRequest<void>("/api/notifications/discord/connection", {
            method: "DELETE",
        })
        assert.equal(
            receivedInput,
            "/api/notifications/discord/connection",
        )
        assert.equal(receivedInit?.method, "DELETE")
        assert.equal(receivedInit?.credentials, "include")
    } finally {
        globalThis.fetch = originalFetch
    }
})
