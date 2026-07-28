import assert from "node:assert/strict"
import test from "node:test"
import {
    buildCalendarDays,
    shiftMonth,
    taskDueDateKey,
} from "../src/features/tasks/calendar.ts"
import { createTaskRequestFromFormData } from "../src/features/tasks/create-task.ts"

test("genera seis semanas y marca el día actual", () => {
    const days = buildCalendarDays(
        new Date(2026, 4, 1),
        new Date(2026, 4, 21),
    )

    assert.equal(days.length, 42)
    assert.equal(days[0]?.dateKey, "2026-04-26")
    assert.equal(days[41]?.dateKey, "2026-06-06")
    assert.equal(
        days.find((day) => day.isToday)?.dateKey,
        "2026-05-21",
    )
})

test("navega entre años y conserva la fecha UTC de una tarea", () => {
    assert.equal(shiftMonth(new Date(2026, 11, 1), 1).getFullYear(), 2027)
    assert.equal(
        taskDueDateKey("2026-05-21T00:00:00.000Z"),
        "2026-05-21",
    )
})

test("construye el DTO exacto para crear una tarea", () => {
    const formData = new FormData()
    formData.set("title", "  Preparar demo  ")
    formData.set("description", "")
    formData.set("dueDate", "2026-08-12")
    formData.set("isUrgent", "on")

    assert.deepEqual(createTaskRequestFromFormData(formData), {
        title: "Preparar demo",
        description: undefined,
        isImportant: false,
        isUrgent: true,
        dueDate: "2026-08-12",
    })
})
