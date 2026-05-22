export type Priority = "low" | "medium" | "high"
export type Status = "backlog" | "todo" | "in-progress" | "review" | "done"

export interface TeamMember {
  id: string
  name: string
  avatar: string
  role: string
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
}

export interface Column {
  id: Status
  title: string
  color: string
}

export const columns: Column[] = [
  { id: "backlog", title: "Backlog", color: "bg-muted-foreground/20" },
  { id: "todo", title: "To Do", color: "bg-chart-1/20" },
  { id: "in-progress", title: "In Progress", color: "bg-warning/20" },
  { id: "review", title: "Review", color: "bg-chart-4/20" },
  { id: "done", title: "Done", color: "bg-success/20" },
]

export const teamMembers: TeamMember[] = [
  { id: "1", name: "Sarah Chen", avatar: "SC", role: "Product Manager" },
  { id: "2", name: "Alex Rivera", avatar: "AR", role: "Frontend Developer" },
  { id: "3", name: "Jordan Kim", avatar: "JK", role: "Designer" },
  { id: "4", name: "Taylor Swift", avatar: "TS", role: "Backend Developer" },
  { id: "5", name: "Morgan Lee", avatar: "ML", role: "QA Engineer" },
]

export const initialTasks: Task[] = [
  {
    id: "task-1",
    title: "Design new dashboard layout",
    description: "Create wireframes and mockups for the new analytics dashboard",
    status: "done",
    priority: "high",
    assignees: ["3"],
    dueDate: "2026-05-20",
    tags: ["design", "ui"],
    comments: 12,
    attachments: 4,
  },
  {
    id: "task-2",
    title: "Implement authentication flow",
    description: "Add OAuth2 login with Google and GitHub providers",
    status: "review",
    priority: "high",
    assignees: ["2", "4"],
    dueDate: "2026-05-25",
    tags: ["backend", "security"],
    comments: 8,
    attachments: 2,
  },
  {
    id: "task-3",
    title: "API rate limiting",
    description: "Implement rate limiting for public API endpoints",
    status: "in-progress",
    priority: "medium",
    assignees: ["4"],
    dueDate: "2026-05-28",
    tags: ["backend", "performance"],
    comments: 5,
    attachments: 1,
  },
  {
    id: "task-4",
    title: "User onboarding flow",
    description: "Design and implement new user onboarding experience",
    status: "in-progress",
    priority: "high",
    assignees: ["1", "3"],
    dueDate: "2026-05-30",
    tags: ["design", "frontend"],
    comments: 15,
    attachments: 6,
  },
  {
    id: "task-5",
    title: "Database optimization",
    description: "Optimize slow database queries for better performance",
    status: "todo",
    priority: "medium",
    assignees: ["4"],
    dueDate: "2026-06-01",
    tags: ["backend", "database"],
    comments: 3,
    attachments: 0,
  },
  {
    id: "task-6",
    title: "Mobile responsive fixes",
    description: "Fix layout issues on mobile devices",
    status: "todo",
    priority: "low",
    assignees: ["2"],
    dueDate: "2026-06-05",
    tags: ["frontend", "mobile"],
    comments: 2,
    attachments: 3,
  },
  {
    id: "task-7",
    title: "Write API documentation",
    description: "Document all public API endpoints",
    status: "backlog",
    priority: "low",
    assignees: ["1"],
    tags: ["documentation"],
    comments: 0,
    attachments: 0,
  },
  {
    id: "task-8",
    title: "Set up CI/CD pipeline",
    description: "Configure automated testing and deployment",
    status: "backlog",
    priority: "medium",
    assignees: ["4", "5"],
    tags: ["devops"],
    comments: 1,
    attachments: 0,
  },
  {
    id: "task-9",
    title: "Accessibility audit",
    description: "Perform full accessibility review and fixes",
    status: "backlog",
    priority: "medium",
    assignees: ["3", "5"],
    tags: ["accessibility", "qa"],
    comments: 0,
    attachments: 0,
  },
  {
    id: "task-10",
    title: "Unit test coverage",
    description: "Increase unit test coverage to 80%",
    status: "review",
    priority: "medium",
    assignees: ["5"],
    dueDate: "2026-05-26",
    tags: ["testing", "qa"],
    comments: 4,
    attachments: 0,
  },
]

export const analyticsData = {
  tasksCompleted: 24,
  tasksCompletedChange: 12,
  inProgress: 8,
  inProgressChange: -3,
  overdue: 2,
  overdueChange: 1,
  teamVelocity: 18,
  teamVelocityChange: 5,
}

export const weeklyProgress = [
  { day: "Mon", completed: 4, created: 6 },
  { day: "Tue", completed: 6, created: 3 },
  { day: "Wed", completed: 3, created: 5 },
  { day: "Thu", completed: 7, created: 4 },
  { day: "Fri", completed: 5, created: 2 },
  { day: "Sat", completed: 2, created: 1 },
  { day: "Sun", completed: 1, created: 0 },
]

export const tasksByPriority = [
  { priority: "High", count: 4, fill: "var(--color-chart-5)" },
  { priority: "Medium", count: 8, fill: "var(--color-warning)" },
  { priority: "Low", count: 6, fill: "var(--color-chart-2)" },
]
