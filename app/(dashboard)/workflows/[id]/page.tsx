"use client"

import * as React from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Edit, MoreHorizontal, Plus, Trash2 } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
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
import { ScrollArea } from "@/components/ui/scroll-area"
import { mockWorkflows, mockTasks } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

const priorityColors = {
  low: "bg-gray-100 text-gray-700",
  medium: "bg-blue-100 text-blue-700",
  high: "bg-orange-100 text-orange-700",
  urgent: "bg-red-100 text-red-700",
}

export default function WorkflowDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false)

  const workflow = mockWorkflows.find((w) => w.id === params.id)
  const workflowTasks = mockTasks.filter((t) => t.workflowId === workflow?.id)

  if (!workflow) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] gap-4">
        <h1 className="text-2xl font-bold">Workflow not found</h1>
        <Button asChild>
          <Link href="/workflows">Back to Workflows</Link>
        </Button>
      </div>
    )
  }

  const handleDelete = () => {
    toast.success("Workflow deleted successfully")
    router.push("/workflows")
  }

  // Group tasks by status for kanban view
  const tasksByStage = workflow.stages.reduce((acc, stage) => {
    // Map stage to task status (simplified mapping)
    const statusMap: Record<string, string> = {
      "Backlog": "todo",
      "To Do": "todo",
      "In Progress": "in-progress",
      "Review": "review",
      "Done": "completed",
      "Reported": "todo",
      "Investigating": "in-progress",
      "Fixing": "in-progress",
      "Testing": "review",
      "Resolved": "completed",
      "Planning": "todo",
      "Content Creation": "in-progress",
      "Approval": "review",
      "Scheduled": "review",
      "Published": "completed",
    }
    
    const mappedStatus = statusMap[stage.name] || "todo"
    acc[stage.id] = workflowTasks.filter((t) => t.status === mappedStatus)
    return acc
  }, {} as Record<string, typeof workflowTasks>)

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/workflows">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">{workflow.name}</h1>
            <Badge variant={workflow.status === "active" ? "default" : "secondary"}>
              {workflow.status}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">{workflow.description}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link href={`/workflows/${workflow.id}/edit`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Link>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Duplicate Workflow</DropdownMenuItem>
              <DropdownMenuItem>Archive Workflow</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-destructive"
                onClick={() => setDeleteDialogOpen(true)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Workflow Info */}
      <div className="grid gap-6 lg:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Total Tasks</p>
            <p className="text-2xl font-bold">{workflowTasks.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Stages</p>
            <p className="text-2xl font-bold">{workflow.stages.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Created</p>
            <p className="text-2xl font-bold">
              {new Date(workflow.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={workflow.createdBy.avatar} />
              <AvatarFallback>{workflow.createdBy.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm text-muted-foreground">Created by</p>
              <p className="font-medium">{workflow.createdBy.name}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Stages Flow */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Workflow Stages</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {workflow.stages.map((stage, index) => (
              <React.Fragment key={stage.id}>
                {index > 0 && <div className="h-0.5 w-8 bg-muted flex-shrink-0" />}
                <div className="flex items-center gap-2 rounded-lg border px-4 py-2 flex-shrink-0">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: stage.color }}
                  />
                  <span className="font-medium">{stage.name}</span>
                  <Badge variant="secondary" className="ml-2">
                    {tasksByStage[stage.id]?.length || 0}
                  </Badge>
                </div>
              </React.Fragment>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Kanban Board */}
      <div className="grid gap-4 overflow-x-auto" style={{ gridTemplateColumns: `repeat(${workflow.stages.length}, minmax(280px, 1fr))` }}>
        {workflow.stages.map((stage) => (
          <Card key={stage.id} className="flex flex-col">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: stage.color }}
                  />
                  <CardTitle className="text-sm font-medium">{stage.name}</CardTitle>
                </div>
                <Badge variant="secondary">{tasksByStage[stage.id]?.length || 0}</Badge>
              </div>
            </CardHeader>
            <CardContent className="flex-1">
              <ScrollArea className="h-[400px]">
                <div className="space-y-3 pr-4">
                  {tasksByStage[stage.id]?.map((task) => (
                    <Link key={task.id} href={`/tasks/${task.id}`}>
                      <Card className="cursor-pointer transition-colors hover:bg-muted/50">
                        <CardContent className="p-3">
                          <p className="font-medium text-sm">{task.title}</p>
                          <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                            {task.description}
                          </p>
                          <div className="flex items-center justify-between mt-3">
                            <Badge variant="secondary" className={cn("text-xs", priorityColors[task.priority])}>
                              {task.priority}
                            </Badge>
                            {task.assignee && (
                              <Avatar className="h-6 w-6">
                                <AvatarImage src={task.assignee.avatar} />
                                <AvatarFallback>{task.assignee.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                  {(!tasksByStage[stage.id] || tasksByStage[stage.id].length === 0) && (
                    <div className="text-center py-8 text-muted-foreground text-sm">
                      No tasks in this stage
                    </div>
                  )}
                </div>
              </ScrollArea>
              <Button variant="ghost" className="w-full mt-3" size="sm" asChild>
                <Link href={`/tasks/create?workflowId=${workflow.id}`}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Task
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Delete Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Workflow</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete &quot;{workflow.name}&quot;? All tasks will be unlinked from this workflow.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
