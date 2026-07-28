import assert from "node:assert/strict"
import test from "node:test"
import {
    clampZoom,
    elementIntersectsEraser,
    panForZoom,
    screenToWorld,
} from "../src/features/whiteboard/geometry.ts"
import {
    addSavedColor,
    isHexColor,
} from "../src/features/whiteboard/colors.ts"

test("limita el zoom entre 10% y 150%", () => {
    assert.equal(clampZoom(0), 0.1)
    assert.equal(clampZoom(0.75), 0.75)
    assert.equal(clampZoom(2), 1.5)
})

test("conserva el punto bajo el cursor al cambiar el zoom", () => {
    const anchor = { x: 300, y: 200 }
    const pan = { x: 40, y: -20 }
    const worldBefore = screenToWorld(anchor, pan, 1)
    const nextPan = panForZoom(pan, anchor, 1, 1.5)

    assert.deepEqual(
        screenToWorld(anchor, nextPan, 1.5),
        worldBefore,
    )
})

test("detecta elementos dentro del radio del borrador", () => {
    const line = {
        id: "line",
        type: "line" as const,
        color: "#fff",
        strokeWidth: 3,
        start: { x: 10, y: 10 },
        end: { x: 100, y: 100 },
    }

    assert.equal(
        elementIntersectsEraser(line, { x: 50, y: 50 }, 10),
        true,
    )
    assert.equal(
        elementIntersectsEraser(line, { x: 150, y: 150 }, 10),
        false,
    )
})

test("el tamaño del borrador cambia el alcance real", () => {
    const line = {
        id: "line",
        type: "line" as const,
        color: "#fff",
        strokeWidth: 2,
        start: { x: 0, y: 0 },
        end: { x: 100, y: 0 },
    }

    assert.equal(
        elementIntersectsEraser(line, { x: 50, y: 20 }, 8),
        false,
    )
    assert.equal(
        elementIntersectsEraser(line, { x: 50, y: 20 }, 24),
        true,
    )
})

test("valida y conserva como máximo cinco colores recientes", () => {
    assert.equal(isHexColor("#A78BFA"), true)
    assert.equal(isHexColor("#123"), false)
    assert.deepEqual(
        addSavedColor(
            ["#111111", "#222222", "#333333", "#444444", "#555555"],
            "#abcdef",
        ),
        ["#ABCDEF", "#111111", "#222222", "#333333", "#444444"],
    )
})
