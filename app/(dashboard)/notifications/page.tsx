"use client"

import * as React from "react"
import Link from "next/link"
import {
  Bell,
  BellOff,
  Check,
  CheckCheck,
  Filter,
  MoreHorizontal,
  Settings,
  Trash2,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  Calendar,
  Users,
  AtSign,
  GitMerge,
} from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { mockNotifications } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

const typeIcons: Record<string, React.ElementType> = {
  mention: AtSign,
  comment: MessageSquare,
  "task-assigned": CheckCircle2,
  "task-completed": CheckCircle2,
  "task-overdue": AlertCircle,
  "workflow-update": GitMerge,
  "team-invite": Users,
  "calendar-reminder": Calendar,
}

const typeColors: Record<string, string> = {
  mention: "bg-blue-500",
  comment: "bg-purple-500",
  "task-assigned": "bg-green-500",
  "task-completed": "bg-green-500",
  "task-overdue": "bg-red-500",
  "workflow-update": "bg-orange-500",
  "team-invite": "bg-indigo-500",
  "calendar-reminder": "bg-yellow-500",
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = React.useState(mockNotifications)
  const [selectedIds, setSelectedIds] = React.useState<string[]>([])
  const [filterTypes, setFilterTypes] = React.useState<string[]>([])
  const [clearDialogOpen, setClearDialogOpen] = React.useState(false)

  const unreadCount = notifications.filter((n) => !n.read).length
  const allSelected = selectedIds.length === notifications.length && notifications.length > 0

  const filteredNotifications = notifications.filter((n) =>
    filterTypes.length === 0 || filterTypes.includes(n.type)
  )

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedIds([])
    } else {
      setSelectedIds(notifications.map((n) => n.id))
    }
  }

  const markAsRead = (ids: string[]) => {
    setNotifications((prev) =>
      prev.map((n) => (ids.includes(n.id) ? { ...n, read: true } : n))
    )
    setSelectedIds([])
    toast.success(`${ids.length} notification${ids.length > 1 ? "s" : ""} marked as read`)
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
    toast.success("All notifications marked as read")
  }

  const deleteNotifications = (ids: string[]) => {
    setNotifications((prev) => prev.filter((n) => !ids.includes(n.id)))
    setSelectedIds([])
    toast.success(`${ids.length} notification${ids.length > 1 ? "s" : ""} deleted`)
  }

  const clearAllNotifications = () => {
    setNotifications([])
    setClearDialogOpen(false)
    toast.success("All notifications cleared")
  }

  const formatTime = (timestamp: Date | string) => {
    const date = typeof timestamp === 'string' ? new Date(timestamp) : timestamp
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(hours / 24)

    if (hours < 1) return "Just now"
    if (hours < 24) return `${hours}h ago`
    if (days < 7) return `${days}d ago`
    return date.toLocaleDateString()
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
          <p className="text-muted-foreground">
            {unreadCount > 0
              ? `You have ${unreadCount} unread notification${unreadCount > 1 ? "s" : ""}`
              : "You're all caught up!"}
          </p>
        </div>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filter
                {filterTypes.length > 0 && (
                  <Badge variant="secondary" className="ml-2 h-5 px-1.5">
                    {filterTypes.length}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuCheckboxItem
                checked={filterTypes.includes("mention")}
                onCheckedChange={(checked) =>
                  setFilterTypes((prev) =>
                    checked ? [...prev, "mention"] : prev.filter((t) => t !== "mention")
                  )
                }
              >
                Mentions
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={filterTypes.includes("comment")}
                onCheckedChange={(checked) =>
                  setFilterTypes((prev) =>
                    checked ? [...prev, "comment"] : prev.filter((t) => t !== "comment")
                  )
                }
              >
                Comments
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={filterTypes.includes("task-assigned")}
                onCheckedChange={(checked) =>
                  setFilterTypes((prev) =>
                    checked ? [...prev, "task-assigned"] : prev.filter((t) => t !== "task-assigned")
                  )
                }
              >
                Task Assigned
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={filterTypes.includes("task-overdue")}
                onCheckedChange={(checked) =>
                  setFilterTypes((prev) =>
                    checked ? [...prev, "task-overdue"] : prev.filter((t) => t !== "task-overdue")
                  )
                }
              >
                Task Overdue
              </DropdownMenuCheckboxItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setFilterTypes([])}>
                Clear Filters
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline" size="sm" asChild>
            <Link href="/settings/notifications">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Link>
          </Button>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedIds.length > 0 && (
        <Card>
          <CardContent className="flex items-center justify-between p-4">
            <div className="flex items-center gap-4">
              <Checkbox checked={allSelected} onCheckedChange={toggleSelectAll} />
              <span className="text-sm">
                {selectedIds.length} selected
              </span>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => markAsRead(selectedIds)}
              >
                <Check className="mr-2 h-4 w-4" />
                Mark as Read
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => deleteNotifications(selectedIds)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Notifications */}
      <Tabs defaultValue="all">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="unread">
              Unread
              {unreadCount > 0 && (
                <Badge variant="secondary" className="ml-2 h-5 px-1.5">
                  {unreadCount}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={markAllAsRead}>
              <CheckCheck className="mr-2 h-4 w-4" />
              Mark all read
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setClearDialogOpen(true)}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Clear all
            </Button>
          </div>
        </div>

        <TabsContent value="all" className="mt-4">
          <Card>
            <CardContent className="p-0">
              {filteredNotifications.length > 0 ? (
                <div className="divide-y">
                  {filteredNotifications.map((notification) => {
                    const Icon = typeIcons[notification.type] || Bell
                    return (
                      <div
                        key={notification.id}
                        className={cn(
                          "flex items-start gap-4 p-4 hover:bg-muted/50 transition-colors",
                          !notification.read && "bg-muted/30"
                        )}
                      >
                        <Checkbox
                          checked={selectedIds.includes(notification.id)}
                          onCheckedChange={() => toggleSelect(notification.id)}
                        />
                        <div
                          className={cn(
                            "flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white",
                            typeColors[notification.type] || "bg-gray-500"
                          )}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className={cn("text-sm", !notification.read && "font-medium")}>
                                {notification.title}
                              </p>
                              <p className="text-sm text-muted-foreground mt-0.5">
                                {notification.message}
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">
                                {formatTime(notification.createdAt)}
                              </p>
                            </div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                {!notification.read && (
                                  <DropdownMenuItem onClick={() => markAsRead([notification.id])}>
                                    <Check className="mr-2 h-4 w-4" />
                                    Mark as read
                                  </DropdownMenuItem>
                                )}
                                {notification.actionUrl && (
                                  <DropdownMenuItem asChild>
                                    <Link href={notification.actionUrl}>View details</Link>
                                  </DropdownMenuItem>
                                )}
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  onClick={() => deleteNotifications([notification.id])}
                                  className="text-destructive"
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                        {!notification.read && (
                          <div className="h-2 w-2 rounded-full bg-primary shrink-0 mt-2" />
                        )}
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                    <Bell className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="mt-4 font-semibold">No notifications</h3>
                  <p className="text-muted-foreground text-sm mt-1">
                    You're all caught up! Check back later.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="unread" className="mt-4">
          <Card>
            <CardContent className="p-0">
              {filteredNotifications.filter((n) => !n.read).length > 0 ? (
                <div className="divide-y">
                  {filteredNotifications
                    .filter((n) => !n.read)
                    .map((notification) => {
                      const Icon = typeIcons[notification.type] || Bell
                      return (
                        <div
                          key={notification.id}
                          className="flex items-start gap-4 p-4 hover:bg-muted/50 transition-colors bg-muted/30"
                        >
                          <Checkbox
                            checked={selectedIds.includes(notification.id)}
                            onCheckedChange={() => toggleSelect(notification.id)}
                          />
                          <div
                            className={cn(
                              "flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white",
                              typeColors[notification.type] || "bg-gray-500"
                            )}
                          >
                            <Icon className="h-5 w-5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <p className="text-sm font-medium">{notification.title}</p>
                                <p className="text-sm text-muted-foreground mt-0.5">
                                  {notification.message}
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">
                                  {formatTime(notification.createdAt)}
                                </p>
                              </div>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={() => markAsRead([notification.id])}>
                                    <Check className="mr-2 h-4 w-4" />
                                    Mark as read
                                  </DropdownMenuItem>
                                  {notification.actionUrl && (
                                    <DropdownMenuItem asChild>
                                      <Link href={notification.actionUrl}>View details</Link>
                                    </DropdownMenuItem>
                                  )}
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem
                                    onClick={() => deleteNotifications([notification.id])}
                                    className="text-destructive"
                                  >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                          <div className="h-2 w-2 rounded-full bg-primary shrink-0 mt-2" />
                        </div>
                      )
                    })}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                    <CheckCheck className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="mt-4 font-semibold">All caught up!</h3>
                  <p className="text-muted-foreground text-sm mt-1">
                    You have no unread notifications.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Clear Dialog */}
      <AlertDialog open={clearDialogOpen} onOpenChange={setClearDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Clear all notifications?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete all your notifications. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={clearAllNotifications} className="bg-destructive text-destructive-foreground">
              Clear All
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
