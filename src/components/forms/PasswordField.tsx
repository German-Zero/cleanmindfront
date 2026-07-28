'use client'

import { useState } from "react"
import IconOccultPassword from "../ui/icons/IconOccultPassword"
import IconViewPassword from "../ui/icons/IconViewPassword"

type PasswordFieldProps = {
    id: string
    name: string
    label: string
    placeholder: string
    autoComplete: "current-password" | "new-password"
    minLength?: number
    disabled?: boolean
}

export default function PasswordField({
    id,
    name,
    label,
    placeholder,
    autoComplete,
    minLength,
    disabled = false,
}: PasswordFieldProps) {
    const [isVisible, setIsVisible] = useState(false)

    return (
        <div className="flex flex-col gap-[6px]">
            <label
                htmlFor={id}
                className="text-[13px] font-medium text-text-primary"
            >
                {label}
            </label>
            <div className="relative w-full">
                <input
                    required
                    id={id}
                    name={name}
                    type={isVisible ? "text" : "password"}
                    autoComplete={autoComplete}
                    minLength={minLength}
                    disabled={disabled}
                    placeholder={placeholder}
                    className="h-[48px] w-full rounded-[10px] border border-border bg-card/45 px-[14px] pr-[44px] text-[13px] text-text-primary outline-none transition-[border-color,background-color,box-shadow] duration-150 placeholder:text-[13px] placeholder:text-text-secondary hover:bg-card/60 focus:border-primary focus:ring-[3px] focus:ring-primary/10 disabled:cursor-not-allowed disabled:opacity-50"
                />
                <button
                    type="button"
                    aria-controls={id}
                    aria-label={isVisible ? "Ocultar contraseña" : "Mostrar contraseña"}
                    aria-pressed={isVisible}
                    disabled={disabled}
                    onClick={() => setIsVisible((visible) => !visible)}
                    className="absolute inset-y-0 right-0 flex w-[44px] items-center justify-center disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {isVisible ? <IconOccultPassword /> : <IconViewPassword />}
                </button>
            </div>
        </div>
    )
}
