"use client"

import { Component, type ErrorInfo, type ReactNode } from "react"

interface EffectErrorBoundaryProps {
    children: ReactNode
    fallback: ReactNode
    resetKey: string
}

interface EffectErrorBoundaryState {
    hasError: boolean
}

export default class EffectErrorBoundary extends Component<
    EffectErrorBoundaryProps,
    EffectErrorBoundaryState
> {
    state: EffectErrorBoundaryState = { hasError: false }

    static getDerivedStateFromError(): EffectErrorBoundaryState {
        return { hasError: true }
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        if (process.env.NODE_ENV !== "production") {
            console.error("No se pudo renderizar la decoración", error, errorInfo)
        }
    }

    componentDidUpdate(previousProps: EffectErrorBoundaryProps) {
        if (this.state.hasError && previousProps.resetKey !== this.props.resetKey) {
            this.setState({ hasError: false })
        }
    }

    render() {
        return this.state.hasError ? this.props.fallback : this.props.children
    }
}
