// Core Types for FlowDesk

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: "admin" | "manager" | "member"
  status: "active" | "inactive"
  createdAt: Date
}

export interface Task {
  id: string
  title: string
  description: string
  status: "todo" | "in-progress" | "review" | "completed"
  priority: "low" | "medium" | "high" | "urgent"
  assignee?: User
  dueDate?: Date
  tags: string[]
  workflowId?: string
  createdAt: Date
  updatedAt: Date
}

export interface Workflow {
  id: string
  name: string
  description: string
  stages: WorkflowStage[]
  createdBy: User
  teamId: string
  status: "active" | "archived"
  createdAt: Date
}

export interface WorkflowStage {
  id: string
  name: string
  order: number
  color: string
}

export interface Team {
  id: string
  name: string
  description?: string
  members: TeamMember[]
  createdAt: Date
}

export interface TeamMember {
  user: User
  role: "owner" | "admin" | "member"
  joinedAt: Date
}

export interface Message {
  id: string
  content: string
  sender: User
  channelId: string
  createdAt: Date
  readBy: string[]
}

export interface Channel {
  id: string
  name: string
  type: "direct" | "group" | "team"
  members: User[]
  lastMessage?: Message
  unreadCount: number
}

export interface Notification {
  id: string
  title: string
  message: string
  type: "info" | "success" | "warning" | "error"
  read: boolean
  actionUrl?: string
  createdAt: Date
}

export interface CalendarEvent {
  id: string
  title: string
  description?: string
  start: Date
  end: Date
  type: "task" | "meeting" | "deadline" | "reminder"
  taskId?: string
}

export interface Analytics {
  tasksCompleted: number
  tasksInProgress: number
  productivityScore: number
  averageCompletionTime: number
}
