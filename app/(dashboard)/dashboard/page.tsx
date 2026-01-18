"use client"

import Link from "next/link"
import {
  CheckSquare,
  Clock,
  TrendingUp,
  Users,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  MoreHorizontal,
} from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { mockTasks, mockAnalytics, mockNotifications, mockCalendarEvents, currentUser } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

const stats = [
  {
    title: "Tasks Completed",
    value: mockAnalytics.tasksCompleted,
    change: "+12%",
    trend: "up",
    icon: CheckSquare,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  {
    title: "In Progress",
    value: mockAnalytics.tasksInProgress,
    change: "+4%",
    trend: "up",
    icon: Clock,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    title: "Productivity Score",
    value: `${mockAnalytics.productivityScore}%`,
    change: "+5%",
    trend: "up",
    icon: TrendingUp,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
  {
    title: "Team Members",
    value: 12,
    change: "+2",
    trend: "up",
    icon: Users,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
  },
]

const priorityColors = {
  low: "bg-gray-100 text-gray-700",
  medium: "bg-blue-100 text-blue-700",
  high: "bg-orange-100 text-orange-700",
  urgent: "bg-red-100 text-red-700",
}

const statusColors = {
  todo: "bg-gray-100 text-gray-700",
  "in-progress": "bg-blue-100 text-blue-700",
  review: "bg-yellow-100 text-yellow-700",
  completed: "bg-green-100 text-green-700",
}

export default function DashboardPage() {
  const upcomingDeadlines = mockTasks
    .filter((task) => task.dueDate && task.status !== "completed")
    .sort((a, b) => new Date(a.dueDate!).getTime() - new Date(b.dueDate!).getTime())
    .slice(0, 5)

  const recentTasks = mockTasks.slice(0, 5)

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome back, {currentUser.name.split(" ")[0]}!
        </h1>
        <p className="text-muted-foreground">
          Here&apos;s what&apos;s happening with your projects today.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className={cn("rounded-lg p-2", stat.bgColor)}>
                  <stat.icon className={cn("h-5 w-5", stat.color)} />
                </div>
                <div
                  className={cn(
                    "flex items-center gap-1 text-sm",
                    stat.trend === "up" ? "text-green-600" : "text-red-600"
                  )}
                >
                  {stat.change}
                  {stat.trend === "up" ? (
                    <ArrowUpRight className="h-4 w-4" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4" />
                  )}
                </div>
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-7">
        {/* Recent Tasks */}
        <Card className="lg:col-span-4">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Tasks</CardTitle>
              <CardDescription>Your latest task updates</CardDescription>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/tasks">View all</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Task</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Assignee</TableHead>
                  <TableHead className="w-10"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentTasks.map((task) => (
                  <TableRow key={task.id}>
                    <TableCell>
                      <Link
                        href={`/tasks/${task.id}`}
                        className="font-medium hover:underline"
                      >
                        {task.title}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={statusColors[task.status]}>
                        {task.status.replace("-", " ")}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={priorityColors[task.priority]}>
                        {task.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {task.assignee && (
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={task.assignee.avatar} />
                            <AvatarFallback>
                              {task.assignee.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm">{task.assignee.name}</span>
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/tasks/${task.id}`}>View details</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/tasks/${task.id}/edit`}>Edit</Link>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Right Column */}
        <div className="flex flex-col gap-6 lg:col-span-3">
          {/* Upcoming Deadlines */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Upcoming Deadlines</CardTitle>
                <CardDescription>Tasks due soon</CardDescription>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href="/calendar">
                  <Calendar className="mr-2 h-4 w-4" />
                  Calendar
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[200px]">
                <div className="space-y-4">
                  {upcomingDeadlines.map((task) => {
                    const daysLeft = Math.ceil(
                      (new Date(task.dueDate!).getTime() - new Date().getTime()) /
                        (1000 * 60 * 60 * 24)
                    )
                    const isOverdue = daysLeft < 0
                    const isUrgent = daysLeft <= 2 && daysLeft >= 0

                    return (
                      <div
                        key={task.id}
                        className="flex items-center gap-4 rounded-lg border p-3"
                      >
                        <div
                          className={cn(
                            "flex h-10 w-10 items-center justify-center rounded-lg",
                            isOverdue
                              ? "bg-red-100"
                              : isUrgent
                              ? "bg-orange-100"
                              : "bg-muted"
                          )}
                        >
                          {isOverdue ? (
                            <AlertTriangle className="h-5 w-5 text-red-500" />
                          ) : (
                            <Clock
                              className={cn(
                                "h-5 w-5",
                                isUrgent ? "text-orange-500" : "text-muted-foreground"
                              )}
                            />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <Link
                            href={`/tasks/${task.id}`}
                            className="font-medium hover:underline truncate block"
                          >
                            {task.title}
                          </Link>
                          <p
                            className={cn(
                              "text-sm",
                              isOverdue
                                ? "text-red-500"
                                : isUrgent
                                ? "text-orange-500"
                                : "text-muted-foreground"
                            )}
                          >
                            {isOverdue
                              ? `${Math.abs(daysLeft)} days overdue`
                              : daysLeft === 0
                              ? "Due today"
                              : daysLeft === 1
                              ? "Due tomorrow"
                              : `${daysLeft} days left`}
                          </p>
                        </div>
                        <Badge variant="secondary" className={priorityColors[task.priority]}>
                          {task.priority}
                        </Badge>
                      </div>
                    )
                  })}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest notifications</CardDescription>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href="/notifications">View all</Link>
              </Button>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[200px]">
                <div className="space-y-4">
                  {mockNotifications.slice(0, 5).map((notification, index) => (
                    <div key={notification.id}>
                      <Link
                        href={notification.actionUrl || "/notifications"}
                        className="flex gap-3 rounded-lg p-2 transition-colors hover:bg-muted"
                      >
                        <div
                          className={cn(
                            "mt-1 h-2 w-2 rounded-full flex-shrink-0",
                            notification.type === "success" && "bg-green-500",
                            notification.type === "error" && "bg-red-500",
                            notification.type === "warning" && "bg-orange-500",
                            notification.type === "info" && "bg-blue-500"
                          )}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium">{notification.title}</p>
                          <p className="text-xs text-muted-foreground line-clamp-1">
                            {notification.message}
                          </p>
                        </div>
                      </Link>
                      {index < 4 && <Separator className="my-2" />}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Weekly Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly Progress</CardTitle>
          <CardDescription>Task completion rate this week</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockAnalytics.weeklyData.map((day) => {
              const total = day.completed + day.created
              const percentage = total > 0 ? Math.round((day.completed / total) * 100) : 0
              return (
                <div key={day.day} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="w-10 font-medium">{day.day}</span>
                    <span className="text-muted-foreground">
                      {day.completed} completed / {day.created} created
                    </span>
                    <span className="w-12 text-right font-medium">{percentage}%</span>
                  </div>
                  <Progress value={percentage} className="h-2" />
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
