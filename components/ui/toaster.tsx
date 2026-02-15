"use client"

import { useTheme } from "next-themes"
import { Toaster as SileoToaster } from "sileo"
import type { ComponentProps } from "react"

type ToasterProps = ComponentProps<typeof SileoToaster>

export function Toaster({ options, ...props }: ToasterProps) {
    const { resolvedTheme } = useTheme()
    const isDark = resolvedTheme === "dark"

    return (
        <SileoToaster
            {...props}
            options={{
                fill: isDark ? "#1E1E2E" : "#FFFFFF",
                styles: isDark
                    ? {
                        title: "text-white!",
                        description: "text-white/75!",
                    }
                    : undefined,
                ...options,
            }}
        />
    )
}
