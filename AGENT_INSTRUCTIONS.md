# UI Development Agent Instructions

## Core Principles

This document provides comprehensive guidelines for building user interfaces in this project. Follow these instructions strictly to maintain consistency and best practices.

### Package Manager: pnpm

**CRITICAL**: Always use `pnpm` as the package manager. Do NOT use `npm` or `yarn`.

#### ✅ CORRECT
```bash
pnpm install
pnpm add package-name
pnpm dlx shadcn@latest add button
```

#### ❌ INCORRECT
```bash
npm install          # WRONG
npx shadcn add ...   # WRONG - Use pnpm dlx
yarn add ...         # WRONG
```

### Polished UI Design Philosophy

**CRITICAL**: Build polished, professional, and modern user interfaces. Every component should feel refined and production-ready.

#### Design Principles
- **Visual Hierarchy**: Use proper spacing, typography scales, and color contrast
- **Micro-interactions**: Add subtle hover states, transitions, and animations
- **Consistency**: Maintain uniform spacing, colors, and component patterns
- **Whitespace**: Don't overcrowd interfaces; let elements breathe
- **Attention to Detail**: Rounded corners, shadows, and borders should be consistent
- **Modern Aesthetics**: Follow current design trends while maintaining usability

#### Polished UI Checklist
- [ ] Proper padding and margins (use Tailwind spacing scale)
- [ ] Consistent border-radius across components
- [ ] Subtle shadows for depth (`shadow-sm`, `shadow-md`)
- [ ] Smooth transitions (`transition-all duration-200`)
- [ ] Hover and focus states on interactive elements
- [ ] Proper color contrast for accessibility
- [ ] Loading and empty states styled consistently

## Component Usage Rules



### 1. shadcn/ui Components ONLY

**CRITICAL**: Use ONLY shadcn/ui pre-built components for all UI elements. Do NOT create custom components using Radix UI primitives directly.

#### ✅ CORRECT Approach
```tsx
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

export function MyComponent() {
  return (
    <Card>
      <CardHeader>Title</CardHeader>
      <CardContent>
        <Button>Click me</Button>
      </CardContent>
    </Card>
  )
}
```

#### ❌ INCORRECT Approach
```tsx
// DO NOT DO THIS - No direct Radix imports
import * as Dialog from "@radix-ui/react-dialog"
import * as Select from "@radix-ui/react-select"
```

### 2. Available shadcn/ui Components

Always use these pre-installed shadcn components:

#### Layout & Structure
- `Card` - For content containers
- `Separator` - For dividing sections
- `Tabs` - For tabbed interfaces
- `Sheet` - For slide-out panels
- `Collapsible` - For expandable sections

#### Forms & Inputs
- `Button` - All button types
- `Input` - Text inputs
- `Textarea` - Multi-line text
- `Select` - Dropdowns
- `Checkbox` - Checkboxes
- `Radio Group` - Radio buttons
- `Switch` - Toggle switches
- `Slider` - Range inputs
- `Form` - Form wrapper with validation
- `Label` - Form labels

#### Data Display
- `Table` - Data tables
- `Badge` - Status badges
- `Avatar` - User avatars
- `Progress` - Progress bars
- `Skeleton` - Loading states

#### Feedback & Overlays
- `Dialog` - Modal dialogs
- `Alert Dialog` - Confirmation dialogs
- `Popover` - Floating content
- `Tooltip` - Hover tooltips
- `Alert` - Alert messages
- `Toast` (via Sonner) - Notifications
- `Dropdown Menu` - Context menus
- `Command` - Command palette
- `Drawer` - Mobile-friendly drawers

#### Navigation
- `Navigation Menu` - Navigation bars
- `Breadcrumb` - Breadcrumb trails
- `Pagination` - Page navigation
- `Scroll Area` - Custom scrollbars

### 3. Installing New shadcn Components

When you need a component that's not yet installed:

```bash
pnpm dlx shadcn@latest add [component-name]
```

Examples:
```bash
pnpm dlx shadcn@latest add button
pnpm dlx shadcn@latest add dialog
pnpm dlx shadcn@latest add form
pnpm dlx shadcn@latest add table
```

## Styling Guidelines

### 1. Tailwind CSS Usage

Use Tailwind CSS utility classes for ALL styling. Do NOT use custom CSS files or inline styles unless absolutely necessary.

#### ✅ CORRECT Styling
```tsx
<div className="flex items-center gap-4 p-6 rounded-lg border bg-card">
  <Button className="bg-primary hover:bg-primary/90">
    Submit
  </Button>
</div>
```

#### ❌ INCORRECT Styling
```tsx
// DO NOT use inline styles
<div style={{ display: 'flex', padding: '24px' }}>
  <button style={{ backgroundColor: '#000' }}>Submit</button>
</div>
```

### 2. Design Tokens

Use shadcn's CSS variables for theming:

```tsx
// Colors
className="bg-background text-foreground"
className="bg-primary text-primary-foreground"
className="bg-secondary text-secondary-foreground"
className="bg-muted text-muted-foreground"
className="bg-card text-card-foreground"
className="border-border"

// State colors
className="bg-destructive text-destructive-foreground"
className="text-accent-foreground bg-accent"

// Semantic colors
className="ring-ring"
className="border-input"
```

### 3. Responsive Design

Use Tailwind's responsive prefixes:

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <Card className="p-4 sm:p-6 lg:p-8">
    {/* Content */}
  </Card>
</div>
```

## Notification System

### Using Sonner for Toasts

**CRITICAL**: Use Sonner (via shadcn toast) for ALL notifications and toast messages.

#### Setup
```tsx
// In app/layout.tsx or root layout
import { Toaster } from "@/components/ui/sonner"

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
```

#### Usage Examples
```tsx
import { toast } from "sonner"

// Success notification
toast.success("Changes saved successfully!")

// Error notification
toast.error("Failed to save changes")

// Info notification
toast.info("Processing your request...")

// Warning notification
toast.warning("Please review before continuing")

// Loading state
toast.loading("Saving changes...")

// Promise-based
toast.promise(saveData(), {
  loading: 'Saving...',
  success: 'Saved successfully!',
  error: 'Failed to save'
})

// Custom toast
toast("Event Created", {
  description: "Your event has been scheduled",
  action: {
    label: "Undo",
    onClick: () => console.log("Undo")
  }
})
```

#### Toast Best Practices
- Use `toast.success()` for successful operations
- Use `toast.error()` for errors and failures
- Use `toast.loading()` for async operations
- Keep messages concise and actionable
- Include actions when user can take next steps

## MCP Integration

### Using shadcn MCP

This project uses Model Context Protocol (MCP) for enhanced development capabilities with shadcn components.

#### Configuration
The MCP configuration is located at `.vscode/mcp.json`

#### Benefits
- Automated component installation
- Smart component suggestions
- Type-safe component usage
- Best practice enforcement

#### Usage
- Let MCP suggest appropriate components for your use case
- Use MCP to install missing components automatically
- Follow MCP suggestions for component composition

## Form Handling

### React Hook Form + Zod

Use `shadcn/ui Form` component with React Hook Form and Zod validation:

```tsx
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"

const formSchema = z.object({
  username: z.string().min(2).max(50),
  email: z.string().email(),
})

export function ProfileForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    toast.success("Profile updated successfully!")
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="johndoe" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
```

## Common Patterns

### 1. Data Tables

```tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export function DataTable({ data }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.name}</TableCell>
            <TableCell>
              <Badge>{item.status}</Badge>
            </TableCell>
            <TableCell>
              <Button variant="ghost" size="sm">Edit</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
```

### 2. Dialogs with Forms

```tsx
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

export function CreateDialog() {
  const handleSubmit = () => {
    toast.success("Item created successfully!")
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create New</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Item</DialogTitle>
          <DialogDescription>
            Add a new item to your collection.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Enter name" />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline">Cancel</Button>
          <Button onClick={handleSubmit}>Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
```

### 3. Loading States

```tsx
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function LoadingCard() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-4 w-[250px]" />
      </CardHeader>
      <CardContent className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[200px]" />
      </CardContent>
    </Card>
  )
}
```

### 4. Command Palette

```tsx
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

export function CommandMenu() {
  return (
    <Command className="rounded-lg border shadow-md">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>Calendar</CommandItem>
          <CommandItem>Search Emoji</CommandItem>
          <CommandItem>Calculator</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  )
}
```

## File Organization

```
app/
  components/
    ui/              # shadcn components (auto-generated)
    forms/           # Complex form components
    layouts/         # Layout components
    features/        # Feature-specific components
  lib/
    utils.ts         # Utility functions (cn helper, etc.)
    validations/     # Zod schemas
  hooks/             # Custom React hooks
  app/               # Next.js app routes
```

## Best Practices Checklist

### Component Development
- [ ] Use only shadcn/ui components
- [ ] No direct Radix UI imports
- [ ] Install missing components with `npx shadcn add`
- [ ] Use TypeScript for type safety
- [ ] Follow component composition patterns

### Styling
- [ ] Use Tailwind CSS classes exclusively
- [ ] Use design tokens (bg-background, text-foreground, etc.)
- [ ] Implement responsive design with Tailwind breakpoints
- [ ] Use `cn()` utility for conditional classes

### User Feedback
- [ ] Use Sonner for all notifications
- [ ] Show loading states with Skeleton or toast.loading()
- [ ] Provide clear error messages
- [ ] Confirm destructive actions with AlertDialog

### Forms
- [ ] Use shadcn Form component
- [ ] Implement Zod validation schemas
- [ ] Show inline field errors with FormMessage
- [ ] Provide helpful FormDescription text

### Accessibility
- [ ] Use semantic HTML through shadcn components
- [ ] Ensure keyboard navigation works
- [ ] Include proper ARIA labels
- [ ] Test with screen readers

### Performance
- [ ] Lazy load heavy components
- [ ] Use React Server Components when possible
- [ ] Implement proper loading states
- [ ] Optimize images and assets

## Quick Reference

### Component Import Pattern
```tsx
import { ComponentName } from "@/components/ui/component-name"
```

### Styling Pattern
```tsx
<Component className="flex items-center gap-4 p-6 bg-background">
```

### Toast Pattern
```tsx
import { toast } from "sonner"
toast.success("Success message")
```

### Form Pattern
```tsx
import { useForm } from "react-hook-form"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
```

## Prohibited Practices

### ❌ NEVER DO THIS

1. **Direct Radix UI Usage**
   ```tsx
   import * as Dialog from "@radix-ui/react-dialog" // WRONG
   ```

2. **Custom CSS Files**
   ```tsx
   import "./custom.css" // WRONG - Use Tailwind
   ```

3. **Inline Styles**
   ```tsx
   <div style={{ color: 'red' }}> // WRONG - Use Tailwind
   ```

4. **Third-party UI Libraries**
   ```tsx
   import { Button } from "react-bootstrap" // WRONG
   import { Button } from "@mui/material" // WRONG
   ```

5. **Custom Toast Libraries**
   ```tsx
   import toast from "react-hot-toast" // WRONG - Use Sonner
   ```

## Typography & Fonts

### Modern Font Combinations

**CRITICAL**: Use modern, professional font combinations for a polished look.

#### Recommended Primary Fonts
- **DM Sans** - Clean, geometric sans-serif (recommended for headings and body)
- **Public Sans** - Modern, neutral sans-serif
- **Inter** - Highly legible, versatile sans-serif
- **Plus Jakarta Sans** - Contemporary, friendly sans-serif
- **Outfit** - Modern geometric sans-serif

#### Font Setup in Next.js
```tsx
// In app/layout.tsx
import { DM_Sans } from "next/font/google"

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
})

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={dmSans.variable}>
      <body className="font-sans">{children}</body>
    </html>
  )
}
```

#### Tailwind Configuration for Fonts
```ts
// In tailwind.config.ts
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
      },
    },
  },
}
```

#### Typography Scale Usage
```tsx
// Headings
<h1 className="text-4xl font-bold tracking-tight">Main Heading</h1>
<h2 className="text-2xl font-semibold">Section Heading</h2>
<h3 className="text-xl font-medium">Subsection</h3>

// Body text
<p className="text-base text-muted-foreground">Body text</p>
<p className="text-sm text-muted-foreground">Secondary text</p>

// Labels and small text
<span className="text-xs font-medium uppercase tracking-wide">Label</span>
```

## Global CSS & Theming

### shadcn Theme Setup

**CRITICAL**: Use shadcn's theming system for consistent colors across the application.

#### Creating a New Theme with shadcn

To set up a modern color theme with shadcn, use the `create` command with a preset:

```bash
pnpm dlx shadcn@latest create --preset "https://ui.shadcn.com/init?base=radix&style=mira&baseColor=neutral&theme=red&iconLibrary=hugeicons&font=public-sans&menuAccent=subtle&menuColor=default&radius=medium&template=next" --template next
```

#### Preset URL Parameters Explained
- `base=radix` - Use Radix UI primitives
- `style=mira` - Modern mira style variant
- `baseColor=neutral` - Neutral gray palette
- `theme=red` - Accent color theme (options: red, orange, amber, yellow, lime, green, emerald, teal, cyan, sky, blue, indigo, violet, purple, fuchsia, pink, rose)
- `iconLibrary=hugeicons` - Icon library choice
- `font=public-sans` - Font family
- `menuAccent=subtle` - Subtle menu accent styling
- `menuColor=default` - Default menu colors
- `radius=medium` - Border radius scale
- `template=next` - Next.js template

#### Global CSS Structure (globals.css)

The `globals.css` file should follow this structure for modern, polished theming:

```css
@import "tailwindcss";

@custom-variant dark (&:is(.dark *));

:root {
  /* Modern Color Palette - Light Mode */
  --background: 0 0% 100%;
  --foreground: 0 0% 3.9%;
  
  --card: 0 0% 100%;
  --card-foreground: 0 0% 3.9%;
  
  --popover: 0 0% 100%;
  --popover-foreground: 0 0% 3.9%;
  
  --primary: 0 72.2% 50.6%;        /* Accent color */
  --primary-foreground: 0 85.7% 97.3%;
  
  --secondary: 0 0% 96.1%;
  --secondary-foreground: 0 0% 9%;
  
  --muted: 0 0% 96.1%;
  --muted-foreground: 0 0% 45.1%;
  
  --accent: 0 0% 96.1%;
  --accent-foreground: 0 0% 9%;
  
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 0 0% 98%;
  
  --border: 0 0% 89.8%;
  --input: 0 0% 89.8%;
  --ring: 0 72.2% 50.6%;
  
  --radius: 0.5rem;
  
  /* Chart colors */
  --chart-1: 12 76% 61%;
  --chart-2: 173 58% 39%;
  --chart-3: 197 37% 24%;
  --chart-4: 43 74% 66%;
  --chart-5: 27 87% 67%;
  
  /* Sidebar */
  --sidebar: 0 0% 98%;
  --sidebar-foreground: 0 0% 3.9%;
  --sidebar-primary: 0 72.2% 50.6%;
  --sidebar-primary-foreground: 0 0% 98%;
  --sidebar-accent: 0 0% 96.1%;
  --sidebar-accent-foreground: 0 0% 9%;
  --sidebar-border: 0 0% 89.8%;
  --sidebar-ring: 0 72.2% 50.6%;
}

.dark {
  /* Modern Color Palette - Dark Mode */
  --background: 0 0% 3.9%;
  --foreground: 0 0% 98%;
  
  --card: 0 0% 3.9%;
  --card-foreground: 0 0% 98%;
  
  --popover: 0 0% 3.9%;
  --popover-foreground: 0 0% 98%;
  
  --primary: 0 72.2% 50.6%;
  --primary-foreground: 0 85.7% 97.3%;
  
  --secondary: 0 0% 14.9%;
  --secondary-foreground: 0 0% 98%;
  
  --muted: 0 0% 14.9%;
  --muted-foreground: 0 0% 63.9%;
  
  --accent: 0 0% 14.9%;
  --accent-foreground: 0 0% 98%;
  
  --destructive: 0 62.8% 30.6%;
  --destructive-foreground: 0 0% 98%;
  
  --border: 0 0% 14.9%;
  --input: 0 0% 14.9%;
  --ring: 0 72.2% 50.6%;
  
  /* Chart colors - Dark */
  --chart-1: 220 70% 50%;
  --chart-2: 160 60% 45%;
  --chart-3: 30 80% 55%;
  --chart-4: 280 65% 60%;
  --chart-5: 340 75% 55%;
  
  /* Sidebar - Dark */
  --sidebar: 0 0% 3.9%;
  --sidebar-foreground: 0 0% 98%;
  --sidebar-primary: 0 72.2% 50.6%;
  --sidebar-primary-foreground: 0 0% 98%;
  --sidebar-accent: 0 0% 14.9%;
  --sidebar-accent-foreground: 0 0% 98%;
  --sidebar-border: 0 0% 14.9%;
  --sidebar-ring: 0 72.2% 50.6%;
}

/* Base Styles */
@layer base {
  * {
    @apply border-border;
  }
  
  body {
    @apply bg-background text-foreground antialiased;
    font-feature-settings: "rlig" 1, "calt" 1;
  }
  
  /* Smooth scrolling */
  html {
    scroll-behavior: smooth;
  }
  
  /* Focus visible styles */
  :focus-visible {
    @apply outline-none ring-2 ring-ring ring-offset-2 ring-offset-background;
  }
}
```

#### Color Theme Options

When creating themes, choose from these modern color palettes:

| Theme | Use Case |
|-------|----------|
| `neutral` | Professional, corporate apps |
| `slate` | Modern, tech-focused |
| `zinc` | Clean, minimal |
| `red` | Bold, attention-grabbing |
| `orange` | Warm, energetic |
| `green` | Growth, success-focused |
| `blue` | Trust, reliability |
| `violet` | Creative, premium |
| `rose` | Soft, approachable |

## Summary

**Remember**: This project uses shadcn/ui as the ONLY UI component library. Every UI element must be built using shadcn components, styled with Tailwind CSS, and notifications must use Sonner. Do not deviate from these standards.

**Always use `pnpm`** - Never use npm or yarn.

**Build polished UIs** - Every interface should feel refined and professional.

For any UI requirement:
1. Check if shadcn has a component for it
2. If not installed, run `pnpm dlx shadcn@latest add [component]`
3. Use the component with Tailwind CSS
4. For notifications, use Sonner
5. Follow the patterns in this guide
6. Use modern fonts like DM Sans or Public Sans
7. Ensure proper theming via globals.css

**When in doubt, always prefer shadcn components over building custom solutions.**

