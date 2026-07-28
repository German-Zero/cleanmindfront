"use client"

import { useState } from "react"
import {
    addSavedColor,
    isHexColor,
} from "@/features/whiteboard/colors"
import type {
    WhiteboardFont,
    WhiteboardStrokeStyle,
    WhiteboardTool,
} from "@/features/whiteboard/types"
import IconArrow from "./icons/IconArrow"
import IconBorrar from "./icons/IconBorrar"
import IconCircle from "./icons/IconCircle"
import IconLetter from "./icons/IconLetter"
import IconLine from "./icons/IconLine"
import IconPalette from "./icons/IconPalette"
import IconPen from "./icons/IconPen"
import IconSquare from "./icons/IconSquare"

interface ToolWhiteboardButtonProps {
    tool: WhiteboardTool
    color: string
    strokeWidth: number
    eraserWidth: number
    textSize: number
    font: WhiteboardFont
    rectangleStrokeStyle: WhiteboardStrokeStyle
    cornerRadius: number
    zoom: number
    savedColors: string[]
    onToolChange: (tool: WhiteboardTool) => void
    onColorChange: (color: string) => void
    onStrokeWidthChange: (width: number) => void
    onEraserWidthChange: (width: number) => void
    onTextSizeChange: (size: number) => void
    onFontChange: (font: WhiteboardFont) => void
    onRectangleStrokeStyleChange: (
        style: WhiteboardStrokeStyle,
    ) => void
    onCornerRadiusChange: (radius: number) => void
    onZoomChange: (zoom: number) => void
    onSavedColorsChange: (colors: string[]) => void
}

const colors = [
    "#F8FAFC",
    "#94A3B8",
    "#1E293B",
    "#FB7185",
    "#F59E0B",
    "#FACC15",
    "#4ADE80",
    "#2DD4BF",
    "#38BDF8",
    "#60A5FA",
    "#818CF8",
    "#C084FC",
    "#F472B6",
    "#A78BFA",
]

function hexToRgb(color: string) {
    return {
        r: Number.parseInt(color.slice(1, 3), 16),
        g: Number.parseInt(color.slice(3, 5), 16),
        b: Number.parseInt(color.slice(5, 7), 16),
    }
}

function rgbToHex(rgb: { r: number; g: number; b: number }) {
    return `#${[rgb.r, rgb.g, rgb.b]
        .map((value) => value.toString(16).padStart(2, "0"))
        .join("")}`
}

const fonts: Array<{
    id: WhiteboardFont
    label: string
    family: string
}> = [
    {
        id: "subtle",
        label: "Sutil",
        family: '"Segoe Print", "Bradley Hand", cursive',
    },
    {
        id: "elegant",
        label: "Elegante",
        family: 'Georgia, "Times New Roman", serif',
    },
    {
        id: "sans",
        label: "Sans",
        family: "Sora, Arial, sans-serif",
    },
]

function HandIcon() {
    return (
        <svg
            aria-hidden="true"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M8 11V6.5a1.5 1.5 0 0 1 3 0V10" />
            <path d="M11 10V5.5a1.5 1.5 0 0 1 3 0V10" />
            <path d="M14 10V7a1.5 1.5 0 0 1 3 0v5" />
            <path d="M8 10.5 6.8 9.3a1.6 1.6 0 0 0-2.3 2.2l4.4 6A4 4 0 0 0 12.1 19H15a5 5 0 0 0 5-5v-3a1.5 1.5 0 0 0-3 0" />
        </svg>
    )
}

function ZoomControls({
    zoom,
    onZoomChange,
    floating = false,
}: {
    zoom: number
    onZoomChange: (zoom: number) => void
    floating?: boolean
}) {
    return (
        <div
            className={`flex shrink-0 items-center p-1 ${
                floating
                    ? "rounded-xl border border-border/70 bg-surface/95 shadow-lg backdrop-blur"
                    : ""
            }`}
        >
            <button
                type="button"
                aria-label="Alejar"
                disabled={zoom <= 0.1}
                onClick={() => onZoomChange(zoom - 0.1)}
                className="grid size-8 place-items-center rounded-lg text-lg text-text-secondary hover:bg-card-hover disabled:opacity-35"
            >
                −
            </button>
            <button
                type="button"
                title="Restablecer a 100%"
                onClick={() => onZoomChange(1)}
                className="min-w-12 rounded-lg px-1 py-2 text-[10px] font-semibold text-text-secondary hover:bg-card-hover"
            >
                {Math.round(zoom * 100)}%
            </button>
            <button
                type="button"
                aria-label="Acercar"
                disabled={zoom >= 1.5}
                onClick={() => onZoomChange(zoom + 0.1)}
                className="grid size-8 place-items-center rounded-lg text-lg text-text-secondary hover:bg-card-hover disabled:opacity-35"
            >
                +
            </button>
        </div>
    )
}

export default function ToolWhiteboardButton({
    tool,
    color,
    strokeWidth,
    eraserWidth,
    textSize,
    font,
    rectangleStrokeStyle,
    cornerRadius,
    zoom,
    savedColors,
    onToolChange,
    onColorChange,
    onStrokeWidthChange,
    onEraserWidthChange,
    onTextSizeChange,
    onFontChange,
    onRectangleStrokeStyleChange,
    onCornerRadiusChange,
    onZoomChange,
    onSavedColorsChange,
}: ToolWhiteboardButtonProps) {
    const [isSettingsOpen, setIsSettingsOpen] = useState(false)
    const [hexInput, setHexInput] = useState(color.toUpperCase())
    const toolClass = (value: WhiteboardTool) => `
        grid size-9 shrink-0 place-items-center rounded-lg transition-colors
        ${
            tool === value
                ? "bg-primary/15 text-primary"
                : "text-text-secondary hover:bg-card-hover hover:text-text-primary"
        }
    `
    const range =
        tool === "eraser"
            ? {
                  label: "Tamaño del borrador",
                  value: eraserWidth,
                  min: 8,
                  max: 80,
                  onChange: onEraserWidthChange,
              }
            : tool === "text"
              ? {
                    label: "Tamaño del texto",
                    value: textSize,
                    min: 12,
                    max: 72,
                    onChange: onTextSizeChange,
                }
              : tool === "hand"
                ? null
                : {
                      label: "Grosor del trazo",
                      value: strokeWidth,
                      min: 1,
                      max: 20,
                      onChange: onStrokeWidthChange,
                  }
    const rgb = hexToRgb(color)
    const applyColor = (nextColor: string) => {
        const normalized = nextColor.toUpperCase()
        onColorChange(normalized)
        setHexInput(normalized)
    }
    const updateRgb = (
        channel: keyof typeof rgb,
        value: number,
    ) => applyColor(rgbToHex({ ...rgb, [channel]: value }))
    const saveCurrentColor = () => {
        onSavedColorsChange(addSavedColor(savedColors, color))
    }

    return (
        <div className="relative min-w-0 max-w-full">
            {!isSettingsOpen && (
                <div
                    className="absolute left-0 sm:hidden"
                    style={{
                        bottom: `calc(100% + ${
                            tool === "rectangle"
                                ? 150
                                : tool === "text"
                                  ? 104
                                  : range
                                    ? 72
                                    : 12
                        }px)`,
                    }}
                >
                    <ZoomControls
                        zoom={zoom}
                        onZoomChange={onZoomChange}
                        floating
                    />
                </div>
            )}

            {isSettingsOpen && (
                <div className="absolute bottom-[calc(100%+12px)] left-1/2 max-h-[calc(100dvh-128px)] w-[min(304px,calc(100dvw-16px))] -translate-x-1/2 overflow-y-auto rounded-2xl border border-border/70 bg-surface/95 p-4 shadow-xl backdrop-blur">
                    <div className="mb-3 flex items-center justify-between">
                        <span className="text-xs font-semibold text-text-primary">
                            Apariencia
                        </span>
                        <span
                            className="rounded-md px-2 py-1 font-mono text-[10px] text-text-secondary"
                            style={{
                                backgroundColor: `${color}20`,
                            }}
                        >
                            {color.toUpperCase()}
                        </span>
                    </div>

                    <div
                        className="grid grid-cols-7 gap-2"
                        aria-label="Paleta de colores"
                    >
                        {colors.map((preset) => (
                            <button
                                key={preset}
                                type="button"
                                aria-label={`Usar color ${preset}`}
                                aria-pressed={
                                    color.toUpperCase() === preset
                                }
                                onClick={() => applyColor(preset)}
                                className="
                                    aspect-square rounded-full border border-white/15
                                    transition-transform hover:scale-110
                                    aria-pressed:ring-2 aria-pressed:ring-accent
                                    aria-pressed:ring-offset-2 aria-pressed:ring-offset-surface
                                "
                                style={{ backgroundColor: preset }}
                            />
                        ))}
                    </div>

                    <div className="mt-3 rounded-xl border border-border/70 bg-card/55 p-3">
                        <div className="mb-3 flex items-center gap-3">
                            <span
                                className="size-8 rounded-lg border border-white/15 shadow-inner"
                                style={{ backgroundColor: color }}
                            />
                            <span className="min-w-0 flex-1">
                                <span className="block text-[11px] font-semibold text-text-primary">
                                    Color personalizado
                                </span>
                                <span className="font-mono text-[9px] text-text-secondary">
                                    {color.toUpperCase()}
                                </span>
                            </span>
                        </div>

                        <div className="space-y-2.5">
                            {(["r", "g", "b"] as const).map(
                                (channel) => (
                                    <label
                                        key={channel}
                                        className="grid grid-cols-[12px_1fr_32px] items-center gap-2"
                                    >
                                        <span className="text-[9px] font-semibold uppercase text-text-secondary">
                                            {channel}
                                        </span>
                                        <input
                                            type="range"
                                            aria-label={`Canal ${channel.toUpperCase()}`}
                                            min={0}
                                            max={255}
                                            value={rgb[channel]}
                                            onInput={(event) =>
                                                updateRgb(
                                                    channel,
                                                    Number(
                                                        event
                                                            .currentTarget
                                                            .value,
                                                    ),
                                                )
                                            }
                                            className="h-1.5 w-full cursor-pointer appearance-none rounded-full [&::-moz-range-thumb]:size-3 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-surface [&::-moz-range-thumb]:bg-white [&::-webkit-slider-thumb]:size-3 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-surface [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-sm"
                                            style={{
                                                background: `linear-gradient(to right, rgb(${
                                                    channel ===
                                                    "r"
                                                        ? 0
                                                        : rgb.r
                                                }, ${
                                                    channel ===
                                                    "g"
                                                        ? 0
                                                        : rgb.g
                                                }, ${
                                                    channel ===
                                                    "b"
                                                        ? 0
                                                        : rgb.b
                                                }), rgb(${
                                                    channel ===
                                                    "r"
                                                        ? 255
                                                        : rgb.r
                                                }, ${
                                                    channel ===
                                                    "g"
                                                        ? 255
                                                        : rgb.g
                                                }, ${
                                                    channel ===
                                                    "b"
                                                        ? 255
                                                        : rgb.b
                                                }))`,
                                            }}
                                        />
                                        <span className="rounded-md bg-surface px-1 py-0.5 text-center font-mono text-[9px] text-text-primary">
                                            {rgb[channel]}
                                        </span>
                                    </label>
                                ),
                            )}
                        </div>

                        <div className="mt-3 flex gap-2">
                            <input
                                type="text"
                                aria-label="Color hexadecimal"
                                value={hexInput}
                                maxLength={7}
                                spellCheck={false}
                                onChange={(event) => {
                                    const value =
                                        event.target.value
                                    setHexInput(value)
                                    if (isHexColor(value)) {
                                        onColorChange(
                                            value.toUpperCase(),
                                        )
                                    }
                                }}
                                onBlur={() =>
                                    setHexInput(
                                        color.toUpperCase(),
                                    )
                                }
                                onKeyDown={(event) => {
                                    if (event.key === "Enter") {
                                        event.currentTarget.blur()
                                    }
                                }}
                                className="min-w-0 flex-1 rounded-lg border border-border bg-surface px-2.5 py-2 font-mono text-[10px] uppercase text-text-primary outline-none focus:border-primary"
                                placeholder="#A78BFA"
                            />
                            <button
                                type="button"
                                onClick={saveCurrentColor}
                                className="rounded-lg bg-primary/15 px-3 text-[10px] font-semibold text-primary transition-colors hover:bg-primary/25"
                            >
                                Guardar
                            </button>
                        </div>

                        {savedColors.length > 0 && (
                            <div
                                className="mt-3 flex items-center gap-2"
                                aria-label="Colores guardados"
                            >
                                <span className="mr-auto text-[9px] text-text-secondary">
                                    Guardados
                                </span>
                                {savedColors.map((saved) => (
                                    <button
                                        key={saved}
                                        type="button"
                                        aria-label={`Usar color guardado ${saved}`}
                                        onClick={() =>
                                            applyColor(saved)
                                        }
                                        className="size-6 rounded-md border border-white/15 transition-transform hover:scale-110"
                                        style={{
                                            backgroundColor: saved,
                                        }}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {range && !isSettingsOpen && (
                <div className="absolute bottom-[calc(100%+10.4px)] left-1/2 w-[min(384px,calc(100dvw-16px))] -translate-x-1/2 space-y-2 rounded-xl border border-border/70 bg-surface/95 px-3 py-2 shadow-lg backdrop-blur">
                    <label className="flex items-center gap-3">
                        <span className="min-w-20 text-[10px] font-medium text-text-secondary">
                            {range.label}
                        </span>
                        <input
                            type="range"
                            aria-label={range.label}
                            min={range.min}
                            max={range.max}
                            value={range.value}
                            onInput={(event) =>
                                range.onChange(
                                    Number(
                                        event.currentTarget.value,
                                    ),
                                )
                            }
                            className="h-1.5 min-w-0 flex-1 cursor-pointer accent-primary"
                        />
                        <span className="min-w-8 text-right font-mono text-[10px] font-semibold text-text-primary">
                            {range.value}px
                        </span>
                    </label>

                    {tool === "text" && (
                        <div className="grid grid-cols-3 gap-1 rounded-lg bg-card p-1">
                            {fonts.map((option) => (
                                <button
                                    key={option.id}
                                    type="button"
                                    aria-pressed={
                                        font === option.id
                                    }
                                    onClick={() =>
                                        onFontChange(option.id)
                                    }
                                    className="rounded-md px-2 py-1.5 text-[10px] text-text-secondary transition-colors hover:text-text-primary aria-pressed:bg-primary/15 aria-pressed:text-primary"
                                    style={{
                                        fontFamily: option.family,
                                    }}
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>
                    )}

                    {tool === "rectangle" && (
                        <>
                            <div className="flex items-center gap-3">
                                <span className="min-w-20 text-[10px] font-medium text-text-secondary">
                                    Tipo de trazo
                                </span>
                                <div className="grid flex-1 grid-cols-3 gap-1 rounded-lg bg-card p-1">
                                    {(
                                        [
                                            ["solid", "Continuo"],
                                            ["dashed", "Guiones"],
                                            ["dotted", "Puntos"],
                                        ] as const
                                    ).map(([style, label]) => (
                                        <button
                                            key={style}
                                            type="button"
                                            aria-pressed={
                                                rectangleStrokeStyle ===
                                                style
                                            }
                                            onClick={() =>
                                                onRectangleStrokeStyleChange(
                                                    style,
                                                )
                                            }
                                            className="rounded-md px-1 py-1.5 text-[9px] text-text-secondary transition-colors aria-pressed:bg-primary/15 aria-pressed:text-primary"
                                        >
                                            {label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <label className="flex items-center gap-3">
                                <span className="min-w-20 text-[10px] font-medium text-text-secondary">
                                    Esquinas
                                </span>
                                <input
                                    type="range"
                                    aria-label="Redondeo de esquinas"
                                    min={0}
                                    max={48}
                                    value={cornerRadius}
                                    onInput={(event) =>
                                        onCornerRadiusChange(
                                            Number(
                                                event.currentTarget
                                                    .value,
                                            ),
                                        )
                                    }
                                    className="h-1.5 min-w-0 flex-1 cursor-pointer accent-primary"
                                />
                                <span className="min-w-8 text-right font-mono text-[10px] font-semibold text-text-primary">
                                    {cornerRadius}px
                                </span>
                            </label>
                        </>
                    )}
                </div>
            )}

            <div className="no-scrollbar flex max-w-full items-center gap-0.5 overflow-x-auto rounded-xl border border-border/70 bg-surface/95 p-1 shadow-lg backdrop-blur">
                <button
                    type="button"
                    aria-label="Mover lienzo"
                    aria-pressed={tool === "hand"}
                    onClick={() => onToolChange("hand")}
                    className={toolClass("hand")}
                >
                    <HandIcon />
                </button>
                <button
                    type="button"
                    aria-label="Lápiz"
                    aria-pressed={tool === "pen"}
                    onClick={() => onToolChange("pen")}
                    className={toolClass("pen")}
                >
                    <IconPen />
                </button>
                <button
                    type="button"
                    aria-label="Borrador"
                    aria-pressed={tool === "eraser"}
                    onClick={() => onToolChange("eraser")}
                    className={toolClass("eraser")}
                >
                    <IconBorrar />
                </button>
                <button
                    type="button"
                    aria-label="Texto"
                    aria-pressed={tool === "text"}
                    onClick={() => onToolChange("text")}
                    className={toolClass("text")}
                >
                    <IconLetter />
                </button>

                <button
                    type="button"
                    aria-label="Rectángulo"
                    aria-pressed={tool === "rectangle"}
                    onClick={() => onToolChange("rectangle")}
                    className={toolClass("rectangle")}
                >
                    <IconSquare />
                </button>
                <button
                    type="button"
                    aria-label="Círculo"
                    aria-pressed={tool === "circle"}
                    onClick={() => onToolChange("circle")}
                    className={toolClass("circle")}
                >
                    <IconCircle />
                </button>
                <button
                    type="button"
                    aria-label="Flecha"
                    aria-pressed={tool === "arrow"}
                    onClick={() => onToolChange("arrow")}
                    className={toolClass("arrow")}
                >
                    <IconArrow />
                </button>
                <button
                    type="button"
                    aria-label="Línea"
                    aria-pressed={tool === "line"}
                    onClick={() => onToolChange("line")}
                    className={toolClass("line")}
                >
                    <IconLine />
                </button>

                <button
                    type="button"
                    aria-label="Color y estilo"
                    aria-expanded={isSettingsOpen}
                    onClick={() =>
                        setIsSettingsOpen((open) => !open)
                    }
                    className="
                        relative grid size-9 shrink-0 place-items-center
                        rounded-lg text-text-secondary hover:bg-card-hover
                    "
                >
                    <IconPalette />
                    <span
                        className="absolute right-1 bottom-1 size-2.5 rounded-full border border-surface"
                        style={{ backgroundColor: color }}
                    />
                </button>

                <div className="hidden sm:block">
                    <ZoomControls
                        zoom={zoom}
                        onZoomChange={onZoomChange}
                    />
                </div>
            </div>
        </div>
    )
}
