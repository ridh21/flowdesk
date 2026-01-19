"use client"

import * as React from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import {
  ArrowLeft,
  Mail,
  Phone,
  Calendar,
  MapPin,
  MoreHorizontal,
  CheckCircle2,
  Clock,
  AlertCircle,
  Edit,
} from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { mockUsers, mockTasks, mockTeams } from "@/lib/mock-data"

const roleColors = {
  owner: "bg-purple-100 text-purple-700",
  admin: "bg-blue-100 text-blue-700",
  member: "bg-gray-100 text-gray-700",
}

const statusColors = {
  todo: "bg-gray-100 text-gray-700",
  "in-progress": "bg-blue-100 text-blue-700",
  review: "bg-yellow-100 text-yellow-700",
  completed: "bg-green-100 text-green-700",
}

const priorityColors = {
  low: "bg-gray-100 text-gray-700",
  medium: "bg-yellow-100 text-yellow-700",
  high: "bg-orange-100 text-orange-700",
  urgent: "bg-red-100 text-red-700",
}

export default function TeamMemberPage() {
  const params = useParams()
  const router = useRouter()
  const [role, setRole] = React.useState("")

  const user = mockUsers.find((u) => u.id === params.id)
  const userTasks = mockTasks.filter((t) => t.assignee?.id === params.id)
  const userTeams = mockTeams.filter((t) => t.members.some((m) => m.user.id === params.id))

  React.useEffect(() => {
    if (user) {
      setRole(user.role)
    }
  }, [user])

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <h2 className="text-xl font-semibold">Member not found</h2>
        <Button asChild>
          <Link href="/team">Back to Team</Link>
        </Button>
      </div>
    )
  }

  const handleRoleChange = (newRole: string) => {
    setRole(newRole)
    toast.success(`Role updated to ${newRole}`)
  }

  const stats = {
    totalTasks: userTasks.length,
    completedTasks: userTasks.filter((t) => t.status === "completed").length,
    inProgressTasks: userTasks.filter((t) => t.status === "in-progress").length,
    overdueTasksCount: userTasks.filter(
      (t) => t.dueDate && new Date(t.dueDate) < new Date() && t.status !== "completed"
    ).length,
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight">Member Profile</h1>
          <p className="text-muted-foreground">View and manage team member details</p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Edit className="mr-2 h-4 w-4" />
              Edit Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Mail className="mr-2 h-4 w-4" />
              Send Message
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">Remove Member</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile Card */}
        <Card className="lg:col-span-1">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <Avatar className="h-24 w-24">
                <AvatarImage src={user.avatar} />
                <AvatarFallback className="text-2xl">{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <h2 className="mt-4 text-xl font-semibold">{user.name}</h2>
              <Badge
                variant="secondary"
                className={`mt-2 ${roleColors[user.role as keyof typeof roleColors] || roleColors.member}`}
              >
                {user.role}
              </Badge>
              <Badge
                variant="secondary"
                className={`mt-2 ${user.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}`}
              >
                {user.status}
              </Badge>
            </div>

            <Separator className="my-6" />

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{user.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  Joined {new Date(user.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>

            <Separator className="my-6" />

            <div className="space-y-3">
              <label className="text-sm font-medium">Role</label>
              <Select value={role} onValueChange={handleRoleChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="member">Member</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Stats */}
          <div className="grid gap-4 sm:grid-cols-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stats.totalTasks}</p>
                    <p className="text-xs text-muted-foreground">Total Tasks</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stats.completedTasks}</p>
                    <p className="text-xs text-muted-foreground">Completed</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                    <Clock className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stats.inProgressTasks}</p>
                    <p className="text-xs text-muted-foreground">In Progress</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/10">
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stats.overdueTasksCount}</p>
                    <p className="text-xs text-muted-foreground">Overdue</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="tasks">
            <TabsList>
              <TabsTrigger value="tasks">Tasks</TabsTrigger>
              <TabsTrigger value="teams">Teams</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
            </TabsList>

            {/* Tasks Tab */}
            <TabsContent value="tasks">
              <Card>
                <CardHeader>
                  <CardTitle>Assigned Tasks</CardTitle>
                  <CardDescription>Tasks currently assigned to this member</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  {userTasks.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Task</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Priority</TableHead>
                          <TableHead>Due Date</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {userTasks.map((task) => (
                          <TableRow key={task.id}>
                            <TableCell>
                              <Link href={`/tasks/${task.id}`} className="font-medium hover:underline">
                                {task.title}
                              </Link>
                            </TableCell>
                            <TableCell>
                              <Badge variant="secondary" className={statusColors[task.status]}>
                                {task.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge variant="secondary" className={priorityColors[task.priority]}>
                                {task.priority}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-muted-foreground">
                              {task.dueDate
                                ? new Date(task.dueDate).toLocaleDateString()
                                : "No due date"}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12">
                      <p className="text-muted-foreground">No tasks assigned</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Teams Tab */}
            <TabsContent value="teams">
              <Card>
                <CardHeader>
                  <CardTitle>Team Memberships</CardTitle>
                  <CardDescription>Teams this member belongs to</CardDescription>
                </CardHeader>
                <CardContent>
                  {userTeams.length > 0 ? (
                    <div className="space-y-4">
                      {userTeams.map((team) => {
                        const membership = team.members.find((m) => m.user.id === params.id)
                        return (
                          <div key={team.id} className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex items-center gap-3">
                              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                                <span className="font-semibold text-primary">
                                  {team.name.charAt(0)}
                                </span>
                              </div>
                              <div>
                                <h4 className="font-medium">{team.name}</h4>
                                <p className="text-sm text-muted-foreground">
                                  {team.members.length} members
                                </p>
                              </div>
                            </div>
                            <Badge variant="secondary">
                              {membership?.role || "member"}
                            </Badge>
                          </div>
                        )
                      })}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12">
                      <p className="text-muted-foreground">Not a member of any team</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Activity Tab */}
            <TabsContent value="activity">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest actions by this member</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { action: "Completed task", target: "Update API documentation", time: "2 hours ago" },
                      { action: "Commented on", target: "Implement auth flow", time: "5 hours ago" },
                      { action: "Created task", target: "Fix navigation bug", time: "1 day ago" },
                      { action: "Changed status of", target: "Database migration", time: "2 days ago" },
                      { action: "Joined team", target: "Frontend Team", time: "1 week ago" },
                    ].map((activity, index) => (
                      <div key={index} className="flex items-start gap-4 pb-4 border-b last:border-0 last:pb-0">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user.avatar} />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="text-sm">
                            <span className="font-medium">{user.name}</span>{" "}
                            <span className="text-muted-foreground">{activity.action}</span>{" "}
                            <span className="font-medium">{activity.target}</span>
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
