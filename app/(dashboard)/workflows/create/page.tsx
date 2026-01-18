"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Loader2, Plus, GripVertical, X, Palette } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { mockTeams } from "@/lib/mock-data"

const stageColors = [
  "#6b7280", "#ef4444", "#f59e0b", "#eab308", "#22c55e",
  "#14b8a6", "#3b82f6", "#6366f1", "#8b5cf6", "#ec4899",
]

const workflowSchema = z.object({
  name: z.string().min(1, "Name is required").max(50, "Name is too long"),
  description: z.string().min(1, "Description is required"),
  teamId: z.string().min(1, "Team is required"),
  stages: z.array(
    z.object({
      id: z.string(),
      name: z.string().min(1, "Stage name is required"),
      color: z.string(),
    })
  ).min(2, "At least 2 stages are required"),
})

type WorkflowFormValues = z.infer<typeof workflowSchema>

export default function CreateWorkflowPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState(false)

  const form = useForm<WorkflowFormValues>({
    resolver: zodResolver(workflowSchema),
    defaultValues: {
      name: "",
      description: "",
      teamId: "",
      stages: [
        { id: "1", name: "To Do", color: "#6b7280" },
        { id: "2", name: "In Progress", color: "#3b82f6" },
        { id: "3", name: "Done", color: "#22c55e" },
      ],
    },
  })

  const stages = form.watch("stages")

  const handleAddStage = () => {
    const newStage = {
      id: Date.now().toString(),
      name: "",
      color: stageColors[stages.length % stageColors.length],
    }
    form.setValue("stages", [...stages, newStage])
  }

  const handleRemoveStage = (index: number) => {
    if (stages.length > 2) {
      const newStages = stages.filter((_, i) => i !== index)
      form.setValue("stages", newStages)
    } else {
      toast.error("Minimum 2 stages required")
    }
  }

  const handleStageChange = (index: number, field: "name" | "color", value: string) => {
    const newStages = [...stages]
    newStages[index] = { ...newStages[index], [field]: value }
    form.setValue("stages", newStages)
  }

  async function onSubmit(data: WorkflowFormValues) {
    setIsLoading(true)
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    
    toast.success("Workflow created successfully!", {
      description: `"${data.name}" is ready to use.`,
    })
    
    setIsLoading(false)
    router.push("/workflows")
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/workflows">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Create Workflow</h1>
          <p className="text-muted-foreground">Design a new workflow for your team</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Workflow Details</CardTitle>
              <CardDescription>Define the basic information for your workflow</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Workflow Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Product Development" disabled={isLoading} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe the purpose of this workflow..."
                            rows={3}
                            disabled={isLoading}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="teamId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Team</FormLabel>
                        <Select
                          disabled={isLoading}
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a team" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {mockTeams.map((team) => (
                              <SelectItem key={team.id} value={team.id}>
                                {team.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          The team that will use this workflow
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex gap-4">
                    <Button type="submit" disabled={isLoading}>
                      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Create Workflow
                    </Button>
                    <Button type="button" variant="outline" onClick={() => router.back()} disabled={isLoading}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* Workflow Stages */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Workflow Stages</CardTitle>
                <CardDescription>Define the stages tasks will go through</CardDescription>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAddStage}
                disabled={isLoading}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Stage
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {stages.map((stage, index) => (
                  <div
                    key={stage.id}
                    className="flex items-center gap-3 rounded-lg border p-3"
                  >
                    <GripVertical className="h-5 w-5 text-muted-foreground cursor-grab" />
                    
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground w-6">{index + 1}.</span>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <div
                              className="h-4 w-4 rounded"
                              style={{ backgroundColor: stage.color }}
                            />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-3" align="start">
                          <div className="grid grid-cols-5 gap-2">
                            {stageColors.map((color) => (
                              <button
                                key={color}
                                type="button"
                                className="h-6 w-6 rounded border-2 border-transparent hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary"
                                style={{ backgroundColor: color }}
                                onClick={() => handleStageChange(index, "color", color)}
                              />
                            ))}
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>

                    <Input
                      placeholder="Stage name"
                      value={stage.name}
                      onChange={(e) => handleStageChange(index, "name", e.target.value)}
                      className="flex-1"
                      disabled={isLoading}
                    />

                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                      onClick={() => handleRemoveStage(index)}
                      disabled={isLoading || stages.length <= 2}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              
              {form.formState.errors.stages && (
                <p className="text-sm text-destructive mt-2">
                  {form.formState.errors.stages.message}
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Preview */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="font-medium">{form.watch("name") || "Workflow Name"}</p>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {form.watch("description") || "Description..."}
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-medium text-muted-foreground">Stages Flow</p>
                  <div className="flex flex-wrap items-center gap-2">
                    {stages.map((stage, index) => (
                      <React.Fragment key={stage.id}>
                        {index > 0 && (
                          <div className="h-0.5 w-4 bg-muted" />
                        )}
                        <div
                          className="flex items-center gap-1.5 rounded-full border px-2 py-1 text-xs"
                        >
                          <div
                            className="h-2 w-2 rounded-full"
                            style={{ backgroundColor: stage.color }}
                          />
                          {stage.name || `Stage ${index + 1}`}
                        </div>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Tips</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>• Keep stage names short and clear</p>
              <p>• Use colors to differentiate stages</p>
              <p>• Start with simple workflows</p>
              <p>• Add stages as needed later</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
