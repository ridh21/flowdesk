# UI Development Agent Instructions

## Core Principles

This document provides comprehensive guidelines for building user interfaces in this project. Follow these instructions strictly to maintain consistency and best practices.

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
npx shadcn@latest add [component-name]
```

Examples:
```bash
npx shadcn@latest add button
npx shadcn@latest add dialog
npx shadcn@latest add form
npx shadcn@latest add table
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

## Summary

**Remember**: This project uses shadcn/ui as the ONLY UI component library. Every UI element must be built using shadcn components, styled with Tailwind CSS, and notifications must use Sonner. Do not deviate from these standards.

For any UI requirement:
1. Check if shadcn has a component for it
2. If not installed, run `npx shadcn add [component]`
3. Use the component with Tailwind CSS
4. For notifications, use Sonner
5. Follow the patterns in this guide

**When in doubt, always prefer shadcn components over building custom solutions.**

