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
}

export default function PasswordField({
    id,
    name,
    label,
    placeholder,
    autoComplete,
}: PasswordFieldProps) {
    const [isVisible, setIsVisible] = useState(false)

    return (
        <div className="flex flex-col gap-1">
            <label
                htmlFor={id}
                className="text-[14px] text-text-primary"
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
                    placeholder={placeholder}
                    className="
                        w-full pl-3.75 pr-10 py-3.75 bg-card/70
                        border border-border rounded-sm
                        placeholder:text-text-secondary placeholder:text-base
                        text-base text-text-primary
                        sm:placeholder:text-[13px] sm:text-[13px]
                    "
                />
                <button
                    type="button"
                    aria-controls={id}
                    aria-label={isVisible ? "Ocultar contraseña" : "Mostrar contraseña"}
                    aria-pressed={isVisible}
                    onClick={() => setIsVisible((visible) => !visible)}
                    className="absolute inset-y-0 right-0 flex w-11 items-center justify-center"
                >
                    {isVisible ? <IconOccultPassword /> : <IconViewPassword />}
                </button>
            </div>
        </div>
    )
}
