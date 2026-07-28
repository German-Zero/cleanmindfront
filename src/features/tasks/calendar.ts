export interface CalendarDay {
    dateKey: string
    dayNumber: number
    isCurrentMonth: boolean
    isToday: boolean
}

export function toDateKey(date: Date): string {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")

    return `${year}-${month}-${day}`
}

export function taskDueDateKey(dueDate: string | null): string | null {
    return dueDate?.slice(0, 10) ?? null
}

export function buildCalendarDays(
    visibleMonth: Date,
    today = new Date(),
): CalendarDay[] {
    const year = visibleMonth.getFullYear()
    const month = visibleMonth.getMonth()
    const firstCell = new Date(year, month, 1 - new Date(year, month, 1).getDay())
    const todayKey = toDateKey(today)

    return Array.from({ length: 42 }, (_, index) => {
        const date = new Date(
            firstCell.getFullYear(),
            firstCell.getMonth(),
            firstCell.getDate() + index,
        )
        const dateKey = toDateKey(date)

        return {
            dateKey,
            dayNumber: date.getDate(),
            isCurrentMonth: date.getMonth() === month,
            isToday: dateKey === todayKey,
        }
    })
}

export function shiftMonth(visibleMonth: Date, amount: number): Date {
    return new Date(
        visibleMonth.getFullYear(),
        visibleMonth.getMonth() + amount,
        1,
    )
}
