"use client"

import * as React from "react"
import {
  TrendingUp,
  TrendingDown,
  CheckSquare,
  Clock,
  Target,
  Users,
  Calendar,
  BarChart3,
} from "lucide-react"
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  Pie,
  PieChart,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { mockAnalytics, mockUsers } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

const COLORS = ["#3b82f6", "#22c55e", "#f59e0b", "#ef4444"]

const chartConfig = {
  completed: {
    label: "Completed",
    color: "#22c55e",
  },
  created: {
    label: "Created",
    color: "#3b82f6",
  },
} satisfies ChartConfig

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
    icon: Target,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
  {
    title: "Avg. Completion Time",
    value: `${mockAnalytics.averageCompletionTime}d`,
    change: "-0.3d",
    trend: "down",
    icon: Calendar,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
  },
]

export default function AnalyticsPage() {
  const [period, setPeriod] = React.useState("month")

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">Track performance and productivity</p>
        </div>
        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className="w-[150px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
            <SelectItem value="quarter">This Quarter</SelectItem>
            <SelectItem value="year">This Year</SelectItem>
          </SelectContent>
        </Select>
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
                    <TrendingUp className="h-4 w-4" />
                  ) : (
                    <TrendingDown className="h-4 w-4" />
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

      <Tabs defaultValue="productivity">
        <TabsList>
          <TabsTrigger value="productivity">Productivity Overview</TabsTrigger>
          <TabsTrigger value="tasks">Task Performance</TabsTrigger>
          <TabsTrigger value="team">Team Performance</TabsTrigger>
        </TabsList>

        {/* Productivity Overview */}
        <TabsContent value="productivity" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Task Completion Trend */}
            <Card>
              <CardHeader>
                <CardTitle>Task Completion Trend</CardTitle>
                <CardDescription>Tasks completed vs created over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={mockAnalytics.monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="completed"
                        stroke="var(--color-completed)"
                        strokeWidth={2}
                      />
                      <Line
                        type="monotone"
                        dataKey="created"
                        stroke="var(--color-created)"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Weekly Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Weekly Activity</CardTitle>
                <CardDescription>Task completion by day</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={mockAnalytics.weeklyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Bar dataKey="completed" fill="var(--color-completed)" radius={4} />
                      <Bar dataKey="created" fill="var(--color-created)" radius={4} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          {/* Productivity Score */}
          <Card>
            <CardHeader>
              <CardTitle>Productivity Score Breakdown</CardTitle>
              <CardDescription>How your productivity score is calculated</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-center">
                <div className="relative">
                  <svg className="h-32 w-32 -rotate-90">
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="16"
                      className="text-muted"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="16"
                      strokeDasharray={`${(mockAnalytics.productivityScore / 100) * 352} 352`}
                      className="text-primary"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-bold">{mockAnalytics.productivityScore}%</span>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Task Completion Rate</span>
                    <span className="font-medium">92%</span>
                  </div>
                  <Progress value={92} />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>On-Time Delivery</span>
                    <span className="font-medium">88%</span>
                  </div>
                  <Progress value={88} />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Workload Balance</span>
                    <span className="font-medium">85%</span>
                  </div>
                  <Progress value={85} />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Collaboration Score</span>
                    <span className="font-medium">82%</span>
                  </div>
                  <Progress value={82} />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Task Performance */}
        <TabsContent value="tasks" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Tasks by Priority */}
            <Card>
              <CardHeader>
                <CardTitle>Tasks by Priority</CardTitle>
                <CardDescription>Distribution of tasks by priority level</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={mockAnalytics.tasksByPriority}
                        dataKey="count"
                        nameKey="priority"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        label={({ priority, count }) => `${priority}: ${count}`}
                      >
                        {mockAnalytics.tasksByPriority.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-center gap-4 mt-4">
                  {mockAnalytics.tasksByPriority.map((item, index) => (
                    <div key={item.priority} className="flex items-center gap-2">
                      <div
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      />
                      <span className="text-sm">{item.priority}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Task Status Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Task Status Summary</CardTitle>
                <CardDescription>Current task distribution by status</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-gray-400" />
                      <span className="text-sm">To Do</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{mockAnalytics.tasksTodo}</span>
                      <span className="text-xs text-muted-foreground">
                        ({Math.round((mockAnalytics.tasksTodo / (mockAnalytics.tasksCompleted + mockAnalytics.tasksInProgress + mockAnalytics.tasksTodo + mockAnalytics.tasksReview)) * 100)}%)
                      </span>
                    </div>
                  </div>
                  <Progress value={25} className="h-2" />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-blue-500" />
                      <span className="text-sm">In Progress</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{mockAnalytics.tasksInProgress}</span>
                      <span className="text-xs text-muted-foreground">
                        ({Math.round((mockAnalytics.tasksInProgress / (mockAnalytics.tasksCompleted + mockAnalytics.tasksInProgress + mockAnalytics.tasksTodo + mockAnalytics.tasksReview)) * 100)}%)
                      </span>
                    </div>
                  </div>
                  <Progress value={17} className="h-2" />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-yellow-500" />
                      <span className="text-sm">In Review</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{mockAnalytics.tasksReview}</span>
                      <span className="text-xs text-muted-foreground">
                        ({Math.round((mockAnalytics.tasksReview / (mockAnalytics.tasksCompleted + mockAnalytics.tasksInProgress + mockAnalytics.tasksTodo + mockAnalytics.tasksReview)) * 100)}%)
                      </span>
                    </div>
                  </div>
                  <Progress value={8} className="h-2" />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-green-500" />
                      <span className="text-sm">Completed</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{mockAnalytics.tasksCompleted}</span>
                      <span className="text-xs text-muted-foreground">
                        ({Math.round((mockAnalytics.tasksCompleted / (mockAnalytics.tasksCompleted + mockAnalytics.tasksInProgress + mockAnalytics.tasksTodo + mockAnalytics.tasksReview)) * 100)}%)
                      </span>
                    </div>
                  </div>
                  <Progress value={50} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Team Performance */}
        <TabsContent value="team" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Team Performance</CardTitle>
              <CardDescription>Individual productivity metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Member</TableHead>
                    <TableHead>Tasks Completed</TableHead>
                    <TableHead>Productivity Score</TableHead>
                    <TableHead>Progress</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockAnalytics.teamPerformance.map((member) => {
                    const user = mockUsers.find((u) => u.name === member.name)
                    return (
                      <TableRow key={member.name}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={user?.avatar} />
                              <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{member.name}</p>
                              <p className="text-xs text-muted-foreground">{user?.role}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">{member.completed} tasks</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{member.score}%</span>
                            {member.score >= 90 ? (
                              <TrendingUp className="h-4 w-4 text-green-500" />
                            ) : member.score >= 80 ? (
                              <span className="text-yellow-500">—</span>
                            ) : (
                              <TrendingDown className="h-4 w-4 text-red-500" />
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="w-[200px]">
                          <Progress value={member.score} />
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
