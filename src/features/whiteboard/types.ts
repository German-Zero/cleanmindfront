export interface WhiteboardPoint {
    x: number
    y: number
}

export type WhiteboardTool =
    | "hand"
    | "pen"
    | "eraser"
    | "text"
    | "rectangle"
    | "circle"
    | "arrow"
    | "line"

export type WhiteboardFont = "subtle" | "elegant" | "sans"
export type WhiteboardStrokeStyle =
    | "solid"
    | "dashed"
    | "dotted"

interface WhiteboardElementBase {
    id: string
    color: string
}

export interface WhiteboardPathElement
    extends WhiteboardElementBase {
    type: "path"
    points: WhiteboardPoint[]
    strokeWidth: number
}

export interface WhiteboardShapeElement
    extends WhiteboardElementBase {
    type: "rectangle" | "circle" | "arrow" | "line"
    start: WhiteboardPoint
    end: WhiteboardPoint
    strokeWidth: number
    strokeStyle?: WhiteboardStrokeStyle
    cornerRadius?: number
}

export interface WhiteboardTextElement
    extends WhiteboardElementBase {
    type: "text"
    position: WhiteboardPoint
    text: string
    font: WhiteboardFont
    size: number
}

export type WhiteboardElement =
    | WhiteboardPathElement
    | WhiteboardShapeElement
    | WhiteboardTextElement

export interface WhiteboardDocument {
    version: 3
    elements: WhiteboardElement[]
    backgroundImage: string | null
    savedColors: string[]
    updatedAt: string | null
}

export type SaveWhiteboardDocument = Omit<
    WhiteboardDocument,
    "updatedAt"
>
