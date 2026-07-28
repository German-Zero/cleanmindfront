import type {
    WhiteboardElement,
    WhiteboardPoint,
} from "./types"

export const MIN_ZOOM = 0.1
export const MAX_ZOOM = 1.5

export function clampZoom(value: number): number {
    return Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, value))
}

export function screenToWorld(
    point: WhiteboardPoint,
    pan: WhiteboardPoint,
    zoom: number,
): WhiteboardPoint {
    return {
        x: (point.x - pan.x) / zoom,
        y: (point.y - pan.y) / zoom,
    }
}

export function panForZoom(
    pan: WhiteboardPoint,
    anchor: WhiteboardPoint,
    currentZoom: number,
    nextZoom: number,
): WhiteboardPoint {
    const world = screenToWorld(anchor, pan, currentZoom)
    return {
        x: anchor.x - world.x * nextZoom,
        y: anchor.y - world.y * nextZoom,
    }
}

function distanceToSegment(
    point: WhiteboardPoint,
    start: WhiteboardPoint,
    end: WhiteboardPoint,
): number {
    const dx = end.x - start.x
    const dy = end.y - start.y
    const lengthSquared = dx * dx + dy * dy
    if (lengthSquared === 0) {
        return Math.hypot(point.x - start.x, point.y - start.y)
    }

    const position = Math.max(
        0,
        Math.min(
            1,
            ((point.x - start.x) * dx +
                (point.y - start.y) * dy) /
                lengthSquared,
        ),
    )

    return Math.hypot(
        point.x - (start.x + position * dx),
        point.y - (start.y + position * dy),
    )
}

export function elementIntersectsEraser(
    element: WhiteboardElement,
    point: WhiteboardPoint,
    radius: number,
): boolean {
    if (element.type === "text") {
        const width = element.text.length * element.size * 0.6
        return (
            point.x >= element.position.x - radius &&
            point.x <= element.position.x + width + radius &&
            point.y >= element.position.y - element.size - radius &&
            point.y <= element.position.y + radius
        )
    }

    const reach = radius + element.strokeWidth / 2

    if (element.type === "path") {
        return element.points.some((current, index) => {
            const previous = element.points[index - 1] ?? current
            return distanceToSegment(point, previous, current) <= reach
        })
    }

    if (element.type === "rectangle") {
        const topRight = {
            x: element.end.x,
            y: element.start.y,
        }
        const bottomLeft = {
            x: element.start.x,
            y: element.end.y,
        }
        return [
            [element.start, topRight],
            [topRight, element.end],
            [element.end, bottomLeft],
            [bottomLeft, element.start],
        ].some(
            ([start, end]) =>
                distanceToSegment(point, start, end) <= reach,
        )
    }

    if (element.type === "circle") {
        const radiusX = Math.abs(element.end.x - element.start.x) / 2
        const radiusY = Math.abs(element.end.y - element.start.y) / 2
        if (radiusX === 0 || radiusY === 0) {
            return (
                distanceToSegment(
                    point,
                    element.start,
                    element.end,
                ) <= reach
            )
        }
        const center = {
            x: (element.start.x + element.end.x) / 2,
            y: (element.start.y + element.end.y) / 2,
        }
        const dx = point.x - center.x
        const dy = point.y - center.y
        const scale = Math.hypot(dx / radiusX, dy / radiusY)
        const distance =
            scale === 0
                ? Math.min(radiusX, radiusY)
                : Math.hypot(
                      dx - dx / scale,
                      dy - dy / scale,
                  )
        return distance <= reach
    }

    return (
        distanceToSegment(point, element.start, element.end) <= reach
    )
}
