"use client"

import {
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react"
import ToolWhiteboardButton from "@/components/ui/ToolWhiteboardButton"
import {
    clampZoom,
    elementIntersectsEraser,
    panForZoom,
    screenToWorld,
} from "../geometry"
import { whiteboardService } from "../services/whiteboard.service"
import type {
    WhiteboardElement,
    WhiteboardFont,
    WhiteboardPoint,
    WhiteboardStrokeStyle,
    WhiteboardTool,
} from "../types"

const DEFAULT_COLOR = "#A78BFA"
const fontFamilies: Record<WhiteboardFont, string> = {
    subtle: '"Segoe Print", "Bradley Hand", cursive',
    elegant: 'Georgia, "Times New Roman", serif',
    sans: 'Sora, Arial, sans-serif',
}

function drawArrow(
    context: CanvasRenderingContext2D,
    start: WhiteboardPoint,
    end: WhiteboardPoint,
) {
    const angle = Math.atan2(end.y - start.y, end.x - start.x)
    const headLength = 14

    context.beginPath()
    context.moveTo(start.x, start.y)
    context.lineTo(end.x, end.y)
    context.moveTo(end.x, end.y)
    context.lineTo(
        end.x - headLength * Math.cos(angle - Math.PI / 6),
        end.y - headLength * Math.sin(angle - Math.PI / 6),
    )
    context.moveTo(end.x, end.y)
    context.lineTo(
        end.x - headLength * Math.cos(angle + Math.PI / 6),
        end.y - headLength * Math.sin(angle + Math.PI / 6),
    )
    context.stroke()
}

function drawElement(
    context: CanvasRenderingContext2D,
    element: WhiteboardElement,
) {
    context.save()
    context.strokeStyle = element.color
    context.fillStyle = element.color
    context.lineCap = "round"
    context.lineJoin = "round"

    if (element.type === "text") {
        context.font = `600 ${element.size}px ${fontFamilies[element.font]}`
        element.text.split("\n").forEach((line, index) =>
            context.fillText(
                line,
                element.position.x,
                element.position.y +
                    index * element.size * 1.25,
            ),
        )
        context.restore()
        return
    }

    context.lineWidth = element.strokeWidth
    context.setLineDash(
        element.type === "rectangle" &&
            element.strokeStyle === "dashed"
            ? [12, 8]
            : element.type === "rectangle" &&
                element.strokeStyle === "dotted"
              ? [2, 7]
              : [],
    )
    context.beginPath()

    if (element.type === "path") {
        const [first, ...points] = element.points
        if (first) {
            context.moveTo(first.x, first.y)
            points.forEach((point) =>
                context.lineTo(point.x, point.y),
            )
            context.stroke()
        }
    } else {
        const width = element.end.x - element.start.x
        const height = element.end.y - element.start.y

        if (element.type === "rectangle") {
            context.roundRect(
                element.start.x,
                element.start.y,
                width,
                height,
                Math.min(
                    element.cornerRadius ?? 0,
                    Math.abs(width) / 2,
                    Math.abs(height) / 2,
                ),
            )
            context.stroke()
        } else if (element.type === "circle") {
            context.ellipse(
                element.start.x + width / 2,
                element.start.y + height / 2,
                Math.abs(width / 2),
                Math.abs(height / 2),
                0,
                0,
                Math.PI * 2,
            )
            context.stroke()
        } else if (element.type === "arrow") {
            drawArrow(context, element.start, element.end)
        } else {
            context.moveTo(element.start.x, element.start.y)
            context.lineTo(element.end.x, element.end.y)
            context.stroke()
        }
    }

    context.restore()
}

export default function Whiteboard() {
    const containerRef = useRef<HTMLDivElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const draftRef = useRef<WhiteboardElement | null>(null)
    const panGestureRef = useRef<WhiteboardPoint | null>(null)
    const erasingRef = useRef(false)
    const spacePressedRef = useRef(false)
    const backgroundRef = useRef<HTMLImageElement | null>(null)
    const skipInitialSaveRef = useRef(true)
    const [elements, setElements] = useState<WhiteboardElement[]>([])
    const [draft, setDraft] = useState<WhiteboardElement | null>(null)
    const [backgroundImage, setBackgroundImage] =
        useState<string | null>(null)
    const [backgroundVersion, setBackgroundVersion] = useState(0)
    const [savedColors, setSavedColors] = useState<string[]>([])
    const [isHydrated, setIsHydrated] = useState(false)
    const [viewport, setViewport] = useState({ width: 1, height: 1 })
    const [pan, setPan] = useState<WhiteboardPoint>({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const [tool, setTool] = useState<WhiteboardTool>("pen")
    const [color, setColor] = useState(DEFAULT_COLOR)
    const [strokeWidth, setStrokeWidth] = useState(3)
    const [eraserWidth, setEraserWidth] = useState(28)
    const [textSize, setTextSize] = useState(24)
    const [font, setFont] = useState<WhiteboardFont>("sans")
    const [rectangleStrokeStyle, setRectangleStrokeStyle] =
        useState<WhiteboardStrokeStyle>("solid")
    const [cornerRadius, setCornerRadius] = useState(12)
    const [textEditor, setTextEditor] = useState<{
        position: WhiteboardPoint
        text: string
    } | null>(null)
    const [eraserCursor, setEraserCursor] =
        useState<WhiteboardPoint | null>(null)
    const [error, setError] = useState<string | null>(null)

    const updateDraft = (element: WhiteboardElement | null) => {
        draftRef.current = element
        setDraft(element)
    }

    useEffect(() => {
        let isCurrent = true

        void whiteboardService
            .get()
            .then((document) => {
                if (!isCurrent) return
                setElements(document.elements)
                setBackgroundImage(document.backgroundImage)
                setSavedColors(document.savedColors)
                setIsHydrated(true)
            })
            .catch((requestError: unknown) => {
                if (!isCurrent) return
                setError(
                    requestError instanceof Error
                        ? requestError.message
                        : "No se pudo cargar el lienzo.",
                )
            })

        return () => {
            isCurrent = false
        }
    }, [])

    useEffect(() => {
        if (!isHydrated) return
        if (skipInitialSaveRef.current) {
            skipInitialSaveRef.current = false
            return
        }

        const timeout = window.setTimeout(() => {
            void whiteboardService
                .save({
                    version: 3,
                    elements,
                    backgroundImage,
                    savedColors,
                })
                .then(() => setError(null))
                .catch((requestError: unknown) =>
                    setError(
                        requestError instanceof Error
                            ? requestError.message
                            : "No se pudo guardar el lienzo.",
                    ),
                )
        }, 500)

        return () => window.clearTimeout(timeout)
    }, [backgroundImage, elements, isHydrated, savedColors])

    useEffect(() => {
        if (!backgroundImage) {
            backgroundRef.current = null
            return
        }

        const image = new Image()
        image.onload = () => {
            backgroundRef.current = image
            setBackgroundVersion((version) => version + 1)
        }
        image.src = backgroundImage
    }, [backgroundImage])

    useEffect(() => {
        const container = containerRef.current
        const canvas = canvasRef.current
        if (!container || !canvas) return

        const resize = () => {
            const rect = container.getBoundingClientRect()
            const ratio = window.devicePixelRatio || 1
            canvas.width = Math.max(1, Math.floor(rect.width * ratio))
            canvas.height = Math.max(1, Math.floor(rect.height * ratio))
            setViewport({ width: rect.width, height: rect.height })
        }

        resize()
        const observer = new ResizeObserver(resize)
        observer.observe(container)
        return () => observer.disconnect()
    }, [])

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (
                event.code === "Space" &&
                !(event.target instanceof HTMLInputElement) &&
                !(event.target instanceof HTMLTextAreaElement)
            ) {
                event.preventDefault()
                spacePressedRef.current = true
            }
        }
        const handleKeyUp = (event: KeyboardEvent) => {
            if (event.code === "Space") {
                spacePressedRef.current = false
            }
        }

        window.addEventListener("keydown", handleKeyDown)
        window.addEventListener("keyup", handleKeyUp)
        return () => {
            window.removeEventListener("keydown", handleKeyDown)
            window.removeEventListener("keyup", handleKeyUp)
        }
    }, [])

    useEffect(() => {
        const canvas = canvasRef.current
        const context = canvas?.getContext("2d")
        if (!canvas || !context) return

        const ratio = window.devicePixelRatio || 1
        context.setTransform(ratio, 0, 0, ratio, 0, 0)
        context.clearRect(0, 0, viewport.width, viewport.height)
        context.translate(pan.x, pan.y)
        context.scale(zoom, zoom)

        const background = backgroundRef.current
        if (background) {
            context.drawImage(
                background,
                0,
                0,
                background.naturalWidth / ratio,
                background.naturalHeight / ratio,
            )
        }

        elements.forEach((element) =>
            drawElement(context, element),
        )
        if (draft) drawElement(context, draft)
    }, [
        backgroundVersion,
        draft,
        elements,
        pan,
        viewport,
        zoom,
    ])

    const eventPoints = (
        event: React.PointerEvent<HTMLCanvasElement>,
    ) => {
        const rect = event.currentTarget.getBoundingClientRect()
        const screen = {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
        }
        return {
            screen,
            world: screenToWorld(screen, pan, zoom),
        }
    }

    const eraseAt = useCallback(
        (point: WhiteboardPoint) => {
            setElements((current) =>
                current.filter(
                    (element) =>
                        !elementIntersectsEraser(
                            element,
                            point,
                            eraserWidth / (2 * zoom),
                        ),
                ),
            )
        },
        [eraserWidth, zoom],
    )

    const handlePointerDown = (
        event: React.PointerEvent<HTMLCanvasElement>,
    ) => {
        const { screen, world } = eventPoints(event)
        const shouldPan =
            tool === "hand" ||
            event.button === 1 ||
            spacePressedRef.current

        if (shouldPan) {
            panGestureRef.current = screen
            event.currentTarget.setPointerCapture(event.pointerId)
            return
        }

        if (tool === "eraser") {
            erasingRef.current = true
            eraseAt(world)
            event.currentTarget.setPointerCapture(event.pointerId)
            return
        }

        if (tool === "text") {
            setTextEditor({ position: world, text: "" })
            return
        }

        const element: WhiteboardElement =
            tool === "pen"
                ? {
                      id: crypto.randomUUID(),
                      type: "path",
                      points: [world],
                      color,
                      strokeWidth,
                  }
                : {
                      id: crypto.randomUUID(),
                      type: tool,
                      start: world,
                      end: world,
                      color,
                      strokeWidth,
                      strokeStyle:
                          tool === "rectangle"
                              ? rectangleStrokeStyle
                              : undefined,
                      cornerRadius:
                          tool === "rectangle"
                              ? cornerRadius
                              : undefined,
                  }

        updateDraft(element)
        event.currentTarget.setPointerCapture(event.pointerId)
    }

    const handlePointerMove = (
        event: React.PointerEvent<HTMLCanvasElement>,
    ) => {
        const { screen, world } = eventPoints(event)
        setEraserCursor(screen)

        if (panGestureRef.current) {
            const previous = panGestureRef.current
            setPan((current) => ({
                x: current.x + screen.x - previous.x,
                y: current.y + screen.y - previous.y,
            }))
            panGestureRef.current = screen
            return
        }

        if (erasingRef.current) {
            eraseAt(world)
            return
        }

        const current = draftRef.current
        if (!current) return

        if (current.type === "path") {
            updateDraft({
                ...current,
                points: [...current.points, world],
            })
        } else if (current.type !== "text") {
            updateDraft({ ...current, end: world })
        }
    }

    const handlePointerUp = (
        event: React.PointerEvent<HTMLCanvasElement>,
    ) => {
        panGestureRef.current = null
        erasingRef.current = false

        const current = draftRef.current
        if (current) {
            const shouldKeep =
                current.type === "path"
                    ? current.points.length > 1
                    : current.type === "text" ||
                      current.start.x !== current.end.x ||
                      current.start.y !== current.end.y

            if (shouldKeep) {
                setElements((elements) => [...elements, current])
            }
            updateDraft(null)
        }

        if (event.currentTarget.hasPointerCapture(event.pointerId)) {
            event.currentTarget.releasePointerCapture(event.pointerId)
        }
    }

    const changeZoom = (
        requestedZoom: number,
        anchor = {
            x: viewport.width / 2,
            y: viewport.height / 2,
        },
    ) => {
        const nextZoom = clampZoom(requestedZoom)
        if (nextZoom === zoom) return

        setPan((current) =>
            panForZoom(current, anchor, zoom, nextZoom),
        )
        setZoom(nextZoom)
    }

    const handleWheel = (
        event: React.WheelEvent<HTMLCanvasElement>,
    ) => {
        event.preventDefault()

        if (event.ctrlKey || event.metaKey) {
            const rect = event.currentTarget.getBoundingClientRect()
            changeZoom(zoom - event.deltaY * 0.001, {
                x: event.clientX - rect.left,
                y: event.clientY - rect.top,
            })
            return
        }

        setPan((current) => ({
            x: current.x - event.deltaX,
            y: current.y - event.deltaY,
        }))
    }

    const cursor =
        tool === "hand"
            ? "cursor-grab active:cursor-grabbing"
            : tool === "text"
              ? "cursor-text"
              : tool === "eraser"
                ? "cursor-none"
                : "cursor-crosshair"
    const isEmpty =
        elements.length === 0 &&
        !backgroundImage &&
        !textEditor
    const commitText = () => {
        if (!textEditor) return

        const text = textEditor.text.trim()
        if (text) {
            setElements((current) => [
                ...current,
                {
                    id: crypto.randomUUID(),
                    type: "text",
                    position: textEditor.position,
                    text,
                    color,
                    font,
                    size: textSize,
                },
            ])
        }
        setTextEditor(null)
    }
    const textEditorScreen = textEditor
        ? {
              x: textEditor.position.x * zoom + pan.x,
              y: textEditor.position.y * zoom + pan.y,
          }
        : null

    return (
        <div
            ref={containerRef}
            className="
                relative h-[calc(100dvh-80px)] min-h-96 w-full overflow-hidden
                bg-background xl:h-full
            "
        >
            {isEmpty && (
                <h1 className="pointer-events-none absolute inset-0 z-0 grid place-items-center px-[64px] text-center text-[18px] font-medium text-text-secondary/60 sm:text-[22px]">
                    ¿Qué dibujaremos hoy?
                </h1>
            )}

            <canvas
                ref={canvasRef}
                aria-label="Lienzo de Whiteboard"
                onContextMenu={(event) => event.preventDefault()}
                onPointerEnter={(event) => {
                    const { screen } = eventPoints(event)
                    setEraserCursor(screen)
                }}
                onPointerLeave={() => setEraserCursor(null)}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
                onWheel={handleWheel}
                className={`relative z-10 h-full w-full touch-none ${cursor}`}
            />

            {textEditor && textEditorScreen && (
                <textarea
                    autoFocus
                    aria-label="Texto del lienzo"
                    placeholder="Escribe aquí…"
                    value={textEditor.text}
                    onChange={(event) =>
                        setTextEditor((current) =>
                            current
                                ? {
                                      ...current,
                                      text: event.target.value,
                                  }
                                : null,
                        )
                    }
                    onInput={(event) => {
                        event.currentTarget.style.height = "auto"
                        event.currentTarget.style.height = `${event.currentTarget.scrollHeight}px`
                    }}
                    onBlur={commitText}
                    onKeyDown={(event) => {
                        if (event.key === "Escape") {
                            setTextEditor(null)
                        } else if (
                            event.key === "Enter" &&
                            (event.ctrlKey || event.metaKey)
                        ) {
                            event.preventDefault()
                            event.currentTarget.blur()
                        }
                    }}
                    className="absolute z-30 min-h-[36px] resize-none overflow-hidden rounded-[7px] border border-primary/45 bg-surface/90 px-[8px] py-[5px] outline-none backdrop-blur"
                    style={{
                        left: textEditorScreen.x,
                        top: textEditorScreen.y - textSize * zoom,
                        width: Math.max(
                            96,
                            Math.min(
                                320,
                                viewport.width -
                                    textEditorScreen.x -
                                    16,
                            ),
                        ),
                        color,
                        fontFamily: fontFamilies[font],
                        fontSize: textSize * zoom,
                        fontWeight: 600,
                        lineHeight: 1.25,
                    }}
                />
            )}

            {tool === "eraser" && eraserCursor && (
                <span
                    aria-hidden="true"
                    className="pointer-events-none absolute z-20 rounded-full border border-primary/60 bg-primary/6 shadow-[0_0_0_1px_var(--surface)]"
                    style={{
                        left: eraserCursor.x,
                        top: eraserCursor.y,
                        width: eraserWidth,
                        height: eraserWidth,
                        transform: "translate(-50%, -50%)",
                    }}
                />
            )}

            {error && (
                <p
                    role="alert"
                    className="calm-feedback absolute top-[16px] left-1/2 z-30 -translate-x-1/2 bg-surface text-error"
                >
                    {error}
                </p>
            )}

            <div className="absolute right-2 bottom-22 left-2 z-20 flex justify-center xl:bottom-4">
                <ToolWhiteboardButton
                    tool={tool}
                    color={color}
                    strokeWidth={strokeWidth}
                    eraserWidth={eraserWidth}
                    textSize={textSize}
                    font={font}
                    rectangleStrokeStyle={
                        rectangleStrokeStyle
                    }
                    cornerRadius={cornerRadius}
                    zoom={zoom}
                    savedColors={savedColors}
                    onToolChange={setTool}
                    onColorChange={setColor}
                    onStrokeWidthChange={setStrokeWidth}
                    onEraserWidthChange={setEraserWidth}
                    onTextSizeChange={setTextSize}
                    onFontChange={setFont}
                    onRectangleStrokeStyleChange={
                        setRectangleStrokeStyle
                    }
                    onCornerRadiusChange={setCornerRadius}
                    onZoomChange={changeZoom}
                    onSavedColorsChange={setSavedColors}
                />
            </div>
        </div>
    )
}
