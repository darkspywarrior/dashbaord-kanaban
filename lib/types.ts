export type Priority = "low" | "medium" | "high"
export type Status = "backlog" | "todo" | "in-progress" | "review" | "done"
export type UserRole = "admin" | "member"

export interface User {
  id: string
  name: string
  email: string
  avatar: string
  role: UserRole
}

export interface TeamMember {
  id: string
  name: string
  email: string
  avatar: string
  role: string
  status: "online" | "offline" | "away"
  joinedAt: string
  userRole: UserRole
}

export interface Task {
  id: string
  title: string
  description: string
  status: Status
  priority: Priority
  assignees: string[]
  dueDate?: string
  tags: string[]
  comments: number
  attachments: number
  projectId: string
  createdAt: string
  updatedAt: string
}

export interface Project {
  id: string
  name: string
  description: string
  color: string
  progress: number
  status: "active" | "completed" | "on-hold"
  members: string[]
  tasksCount: number
  completedTasks: number
  createdAt: string
  dueDate?: string
}

export interface Column {
  id: Status
  title: string
  color: string
}

export interface Notification {
  id: string
  title: string
  description: string
  time: string
  read: boolean
  type: "task" | "project" | "team" | "system"
}

export interface ActivityItem {
  id: string
  user: string
  action: string
  target: string
  time: string
  type: "task" | "project" | "comment" | "member"
}
