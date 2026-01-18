"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { User, Lock, Bell, Palette, CreditCard, Settings } from "lucide-react"
import { cn } from "@/lib/utils"

const settingsNav = [
  { title: "Profile", href: "/settings", icon: User },
  { title: "Account", href: "/settings/account", icon: Settings },
  { title: "Security", href: "/settings/security", icon: Lock },
  { title: "Notifications", href: "/settings/notifications", icon: Bell },
  { title: "Appearance", href: "/settings/appearance", icon: Palette },
  { title: "Billing", href: "/settings/billing", icon: CreditCard },
]

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences</p>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
        {/* Sidebar Navigation */}
        <nav className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:w-48 shrink-0">
          {settingsNav.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors whitespace-nowrap",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted text-muted-foreground hover:text-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.title}
              </Link>
            )
          })}
        </nav>

        {/* Content */}
        <div className="flex-1 max-w-2xl">{children}</div>
      </div>
    </div>
  )
}
