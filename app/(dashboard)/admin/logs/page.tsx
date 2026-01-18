"use client"

import * as React from "react"
import {
  Search,
  Filter,
  Download,
  Calendar,
  User,
  Activity,
  Shield,
  FileText,
  Settings,
  LogIn,
  LogOut,
  UserPlus,
  Trash2,
  Pencil,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { mockUsers } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

const actionIcons: Record<string, React.ElementType> = {
  login: LogIn,
  logout: LogOut,
  create: UserPlus,
  delete: Trash2,
  update: Pencil,
  settings: Settings,
  admin: Shield,
}

const actionColors: Record<string, string> = {
  login: "bg-green-100 text-green-700",
  logout: "bg-gray-100 text-gray-700",
  create: "bg-blue-100 text-blue-700",
  delete: "bg-red-100 text-red-700",
  update: "bg-yellow-100 text-yellow-700",
  settings: "bg-purple-100 text-purple-700",
  admin: "bg-orange-100 text-orange-700",
}

const auditLogs = [
  {
    id: "1",
    user: mockUsers[0],
    action: "login",
    description: "User logged in successfully",
    resource: "Authentication",
    ip: "192.168.1.100",
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
  },
  {
    id: "2",
    user: mockUsers[1],
    action: "create",
    description: "Created new task 'Update documentation'",
    resource: "Tasks",
    ip: "192.168.1.101",
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
  {
    id: "3",
    user: mockUsers[0],
    action: "update",
    description: "Updated workflow 'Sprint Planning'",
    resource: "Workflows",
    ip: "192.168.1.100",
    timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
  },
  {
    id: "4",
    user: mockUsers[2],
    action: "settings",
    description: "Changed notification preferences",
    resource: "Settings",
    ip: "192.168.1.102",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    id: "5",
    user: mockUsers[0],
    action: "admin",
    description: "Added new user to admin role",
    resource: "Admin",
    ip: "192.168.1.100",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
  },
  {
    id: "6",
    user: mockUsers[1],
    action: "delete",
    description: "Deleted task 'Old project cleanup'",
    resource: "Tasks",
    ip: "192.168.1.101",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
  },
  {
    id: "7",
    user: mockUsers[2],
    action: "logout",
    description: "User logged out",
    resource: "Authentication",
    ip: "192.168.1.102",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
  },
  {
    id: "8",
    user: mockUsers[0],
    action: "create",
    description: "Created new workflow 'Bug Triage'",
    resource: "Workflows",
    ip: "192.168.1.100",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
]

export default function AdminLogsPage() {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [actionFilter, setActionFilter] = React.useState("all")
  const [resourceFilter, setResourceFilter] = React.useState("all")
  const [date, setDate] = React.useState<Date | undefined>(undefined)

  const filteredLogs = auditLogs.filter((log) => {
    const matchesSearch =
      log.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.user.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesAction = actionFilter === "all" || log.action === actionFilter
    const matchesResource = resourceFilter === "all" || log.resource === resourceFilter
    return matchesSearch && matchesAction && matchesResource
  })

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))

    if (hours < 1) {
      const minutes = Math.floor(diff / (1000 * 60))
      return `${minutes}m ago`
    }
    if (hours < 24) {
      return `${hours}h ago`
    }
    return date.toLocaleDateString() + " " + date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold">Audit Logs</h2>
          <p className="text-sm text-muted-foreground">
            Track all user actions and system events
          </p>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export Logs
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search logs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={actionFilter} onValueChange={setActionFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Action" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Actions</SelectItem>
                <SelectItem value="login">Login</SelectItem>
                <SelectItem value="logout">Logout</SelectItem>
                <SelectItem value="create">Create</SelectItem>
                <SelectItem value="update">Update</SelectItem>
                <SelectItem value="delete">Delete</SelectItem>
                <SelectItem value="settings">Settings</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
            <Select value={resourceFilter} onValueChange={setResourceFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Resource" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Resources</SelectItem>
                <SelectItem value="Authentication">Authentication</SelectItem>
                <SelectItem value="Tasks">Tasks</SelectItem>
                <SelectItem value="Workflows">Workflows</SelectItem>
                <SelectItem value="Settings">Settings</SelectItem>
                <SelectItem value="Admin">Admin</SelectItem>
              </SelectContent>
            </Select>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-[150px] justify-start">
                  <Calendar className="mr-2 h-4 w-4" />
                  {date ? date.toLocaleDateString() : "Pick date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <CalendarComponent
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </CardContent>
      </Card>

      {/* Logs Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Resource</TableHead>
                <TableHead>IP Address</TableHead>
                <TableHead>Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.map((log) => {
                const Icon = actionIcons[log.action] || Activity
                return (
                  <TableRow key={log.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={log.user.avatar} />
                          <AvatarFallback>{log.user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">{log.user.name}</p>
                          <p className="text-xs text-muted-foreground">{log.user.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={cn("gap-1", actionColors[log.action])}
                      >
                        <Icon className="h-3 w-3" />
                        {log.action}
                      </Badge>
                    </TableCell>
                    <TableCell className="max-w-[300px]">
                      <p className="truncate text-sm">{log.description}</p>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{log.resource}</Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm font-mono">
                      {log.ip}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {formatTimestamp(log.timestamp)}
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {filteredLogs.length} of {auditLogs.length} logs
        </p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
