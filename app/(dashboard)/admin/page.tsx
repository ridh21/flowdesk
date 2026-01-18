"use client"

import * as React from "react"
import Link from "next/link"
import {
  Users,
  CheckCircle2,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  TrendingUp,
  Clock,
  Shield,
} from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { mockUsers, mockTasks } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

const stats = [
  {
    title: "Total Users",
    value: "156",
    change: "+12",
    changeType: "positive" as const,
    icon: Users,
  },
  {
    title: "Active Users",
    value: "142",
    change: "+5",
    changeType: "positive" as const,
    icon: Activity,
  },
  {
    title: "Tasks Completed",
    value: "1,284",
    change: "+18%",
    changeType: "positive" as const,
    icon: CheckCircle2,
  },
  {
    title: "System Health",
    value: "99.9%",
    change: "-0.1%",
    changeType: "neutral" as const,
    icon: Shield,
  },
]

const recentActivity = [
  { user: mockUsers[0], action: "logged in", time: "2 minutes ago" },
  { user: mockUsers[1], action: "created a new task", time: "15 minutes ago" },
  { user: mockUsers[2], action: "updated their profile", time: "1 hour ago" },
  { user: mockUsers[0], action: "completed a workflow", time: "2 hours ago" },
  { user: mockUsers[1], action: "invited a team member", time: "3 hours ago" },
]

const systemStatus = [
  { name: "API Server", status: "operational", uptime: "99.99%" },
  { name: "Database", status: "operational", uptime: "99.95%" },
  { name: "Storage", status: "operational", uptime: "100%" },
  { name: "Email Service", status: "degraded", uptime: "98.50%" },
]

export default function AdminPage() {
  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                {stat.changeType === "positive" ? (
                  <ArrowUpRight className="h-4 w-4 text-green-500" />
                ) : stat.changeType === "negative" ? (
                  <ArrowDownRight className="h-4 w-4 text-red-500" />
                ) : (
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                )}
                <span
                  className={cn(
                    "text-sm",
                    stat.changeType === "positive" && "text-green-500",
                    stat.changeType === "negative" && "text-red-500",
                    stat.changeType === "neutral" && "text-muted-foreground"
                  )}
                >
                  {stat.change}
                </span>
                <span className="text-sm text-muted-foreground">from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest user actions in the system</CardDescription>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href="/admin/logs">View All</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center gap-4">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={activity.user.avatar} />
                    <AvatarFallback>{activity.user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm">
                      <span className="font-medium">{activity.user.name}</span>{" "}
                      <span className="text-muted-foreground">{activity.action}</span>
                    </p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Status */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>System Status</CardTitle>
                <CardDescription>Current status of all services</CardDescription>
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                All Systems Operational
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {systemStatus.map((service) => (
                <div key={service.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "h-2 w-2 rounded-full",
                        service.status === "operational" && "bg-green-500",
                        service.status === "degraded" && "bg-yellow-500",
                        service.status === "down" && "bg-red-500"
                      )}
                    />
                    <span className="font-medium">{service.name}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">{service.uptime} uptime</span>
                    <Badge
                      variant="secondary"
                      className={cn(
                        service.status === "operational" && "bg-green-100 text-green-700",
                        service.status === "degraded" && "bg-yellow-100 text-yellow-700",
                        service.status === "down" && "bg-red-100 text-red-700"
                      )}
                    >
                      {service.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Storage & Limits */}
      <Card>
        <CardHeader>
          <CardTitle>Resource Usage</CardTitle>
          <CardDescription>Current usage of system resources and limits</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Storage</span>
              <span>42 GB / 100 GB</span>
            </div>
            <Progress value={42} />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Users</span>
              <span>156 / 200</span>
            </div>
            <Progress value={78} />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>API Requests (Monthly)</span>
              <span>85,420 / 100,000</span>
            </div>
            <Progress value={85} className="[&>div]:bg-yellow-500" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Workflows</span>
              <span>24 / Unlimited</span>
            </div>
            <Progress value={10} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
