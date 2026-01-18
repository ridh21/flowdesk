"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Check, Monitor, Moon, Sun, Palette } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

const themes = [
  {
    name: "light",
    label: "Light",
    icon: Sun,
    description: "A clean, bright theme for daytime use",
  },
  {
    name: "dark",
    label: "Dark",
    icon: Moon,
    description: "A darker theme that's easier on the eyes",
  },
  {
    name: "system",
    label: "System",
    icon: Monitor,
    description: "Automatically match your system settings",
  },
]

const accentColors = [
  { name: "default", label: "Default", color: "#0f172a" },
  { name: "blue", label: "Blue", color: "#2563eb" },
  { name: "green", label: "Green", color: "#16a34a" },
  { name: "purple", label: "Purple", color: "#9333ea" },
  { name: "red", label: "Red", color: "#dc2626" },
  { name: "orange", label: "Orange", color: "#ea580c" },
  { name: "pink", label: "Pink", color: "#db2777" },
]

const fontSizes = [
  { value: "small", label: "Small" },
  { value: "default", label: "Default" },
  { value: "large", label: "Large" },
]

const densities = [
  { value: "compact", label: "Compact", description: "More content, less spacing" },
  { value: "default", label: "Default", description: "Balanced spacing" },
  { value: "comfortable", label: "Comfortable", description: "More spacing, easier reading" },
]

export default function AppearanceSettingsPage() {
  const { theme, setTheme } = useTheme()
  const [accentColor, setAccentColor] = React.useState("default")
  const [fontSize, setFontSize] = React.useState("default")
  const [density, setDensity] = React.useState("default")

  const handleAccentChange = (color: string) => {
    setAccentColor(color)
    toast.success("Accent color updated")
  }

  const handleFontSizeChange = (size: string) => {
    setFontSize(size)
    toast.success("Font size updated")
  }

  const handleDensityChange = (d: string) => {
    setDensity(d)
    toast.success("Display density updated")
  }

  return (
    <div className="space-y-6">
      {/* Theme */}
      <Card>
        <CardHeader>
          <CardTitle>Theme</CardTitle>
          <CardDescription>
            Select your preferred color scheme
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-3">
            {themes.map((t) => (
              <button
                key={t.name}
                onClick={() => setTheme(t.name)}
                className={cn(
                  "relative flex flex-col items-center gap-4 rounded-lg border-2 p-4 transition-colors",
                  theme === t.name
                    ? "border-primary bg-primary/5"
                    : "border-muted hover:border-primary/50"
                )}
              >
                {theme === t.name && (
                  <div className="absolute right-2 top-2">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                )}
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
                  <t.icon className="h-6 w-6" />
                </div>
                <div className="text-center">
                  <p className="font-medium">{t.label}</p>
                  <p className="text-xs text-muted-foreground mt-1">{t.description}</p>
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Accent Color */}
      <Card>
        <CardHeader>
          <CardTitle>Accent Color</CardTitle>
          <CardDescription>
            Choose the primary accent color for the interface
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            {accentColors.map((color) => (
              <button
                key={color.name}
                onClick={() => handleAccentChange(color.name)}
                className={cn(
                  "relative flex h-10 w-10 items-center justify-center rounded-full border-2 transition-transform hover:scale-110",
                  accentColor === color.name
                    ? "border-foreground"
                    : "border-transparent"
                )}
                style={{ backgroundColor: color.color }}
                title={color.label}
              >
                {accentColor === color.name && (
                  <Check className="h-5 w-5 text-white" />
                )}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Font Size */}
      <Card>
        <CardHeader>
          <CardTitle>Font Size</CardTitle>
          <CardDescription>
            Adjust the text size across the application
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={fontSize}
            onValueChange={handleFontSizeChange}
            className="flex gap-4"
          >
            {fontSizes.map((size) => (
              <div key={size.value} className="flex items-center space-x-2">
                <RadioGroupItem value={size.value} id={size.value} />
                <Label htmlFor={size.value}>{size.label}</Label>
              </div>
            ))}
          </RadioGroup>
          <div className="mt-4 p-4 border rounded-lg">
            <p
              className={cn(
                "text-muted-foreground",
                fontSize === "small" && "text-sm",
                fontSize === "large" && "text-lg"
              )}
            >
              Preview: This is how text will appear with the selected font size.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Display Density */}
      <Card>
        <CardHeader>
          <CardTitle>Display Density</CardTitle>
          <CardDescription>
            Control the spacing and padding of UI elements
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={density}
            onValueChange={handleDensityChange}
            className="space-y-3"
          >
            {densities.map((d) => (
              <div
                key={d.value}
                className={cn(
                  "flex items-center space-x-3 p-4 border rounded-lg cursor-pointer transition-colors",
                  density === d.value ? "border-primary bg-primary/5" : "hover:border-primary/50"
                )}
                onClick={() => handleDensityChange(d.value)}
              >
                <RadioGroupItem value={d.value} id={d.value} />
                <div>
                  <Label htmlFor={d.value} className="cursor-pointer">
                    {d.label}
                  </Label>
                  <p className="text-sm text-muted-foreground">{d.description}</p>
                </div>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Sidebar */}
      <Card>
        <CardHeader>
          <CardTitle>Sidebar</CardTitle>
          <CardDescription>
            Customize the sidebar appearance
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Sidebar Position</Label>
              <p className="text-sm text-muted-foreground">
                Choose which side the sidebar appears on
              </p>
            </div>
            <Select defaultValue="left">
              <SelectTrigger className="w-[120px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="left">Left</SelectItem>
                <SelectItem value="right">Right</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <Label>Default State</Label>
              <p className="text-sm text-muted-foreground">
                Sidebar state when you open the app
              </p>
            </div>
            <Select defaultValue="expanded">
              <SelectTrigger className="w-[120px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="expanded">Expanded</SelectItem>
                <SelectItem value="collapsed">Collapsed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
