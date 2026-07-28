import assert from "node:assert/strict"
import test from "node:test"
import { apiRequest } from "../src/lib/api.ts"

test("preserva cookies y acepta respuestas 204 sin cuerpo", async () => {
    const originalFetch = globalThis.fetch
    let receivedInit: RequestInit | undefined

    globalThis.fetch = async (_input, init) => {
        receivedInit = init

        return new Response(null, {
            status: 204,
            headers: { "Content-Type": "application/json" },
        })
    }

    try {
        assert.equal(
            await apiRequest<void>("/api/auth/change-password", {
                method: "PATCH",
            }),
            undefined,
        )
        assert.equal(receivedInit?.method, "PATCH")
        assert.equal(receivedInit?.credentials, "include")
    } finally {
        globalThis.fetch = originalFetch
    }
})
