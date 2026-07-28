import assert from "node:assert/strict"
import test from "node:test"
import {
    isMfaCodeValid,
    normalizeMfaCode,
} from "../src/features/auth/mfa-code.ts"
import { validatePasswordConfirmation } from "../src/features/auth/password-validation.ts"
import {
    ApiError,
    requestErrorMessage,
} from "../src/lib/api.ts"
import {
    validateChangePassword,
    validateSetPassword,
} from "../src/features/settings/security-validation.ts"

test("valida el contrato de cambio de contraseña", () => {
    assert.equal(
        validateChangePassword({
            currentPassword: "actual",
            newPassword: "1234567",
            confirmPassword: "1234567",
        }),
        "La nueva contraseña debe tener al menos 8 caracteres.",
    )
    assert.equal(
        validateChangePassword({
            currentPassword: "actual",
            newPassword: "12345678",
            confirmPassword: "abcdefgh",
        }),
        "Las contraseñas nuevas no coinciden.",
    )
    assert.equal(
        validateChangePassword({
            currentPassword: "actual",
            newPassword: "12345678",
            confirmPassword: "12345678",
        }),
        null,
    )
})

test("valida el contrato para crear una contraseña local", () => {
    assert.equal(
        validateSetPassword({
            password: "segura123",
            confirmPassword: "segura123",
        }),
        null,
    )
    assert.match(
        validateSetPassword({
            password: "segura123",
            confirmPassword: "distinta123",
        }) ?? "",
        /no coinciden/,
    )
})

test("valida la confirmación al recuperar la contraseña", () => {
    assert.equal(
        validatePasswordConfirmation("segura123", "segura123"),
        null,
    )
    assert.match(
        validatePasswordConfirmation("segura123", "distinta123") ?? "",
        /no coinciden/,
    )
})

test("normaliza y valida códigos MFA admitidos por el backend", () => {
    assert.equal(normalizeMfaCode(" cm-ab12-cd34-ef56-7890 "), "CM-AB12-CD34-EF56-7890")
    assert.equal(isMfaCodeValid("123456"), true)
    assert.equal(isMfaCodeValid("cm-ab12-cd34-ef56-7890"), true)
    assert.equal(isMfaCodeValid("12345"), false)
    assert.equal(isMfaCodeValid("CM-NOPE-CD34-EF56-7890"), false)
})

test("muestra errores esperados sin filtrar mensajes técnicos", () => {
    assert.equal(
        requestErrorMessage(
            new ApiError("Ya existe una cuenta con este email.", 409),
            "No pudimos crear tu cuenta.",
        ),
        "Ya existe una cuenta con este email.",
    )
    assert.equal(
        requestErrorMessage(
            new ApiError("Database connection failed", 500),
            "No pudimos crear tu cuenta.",
        ),
        "No pudimos crear tu cuenta.",
    )
    assert.equal(
        requestErrorMessage(
            new TypeError("Failed to fetch"),
            "No pudimos conectar con el servidor.",
        ),
        "No pudimos conectar con el servidor.",
    )
})
