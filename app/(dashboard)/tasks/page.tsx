"use client"

import { useState } from "react"
import { AppHeader } from "@/components/layout"
import { KanbanBoard } from "@/components/kanban/kanban-board"
import { CreateTaskModal } from "@/components/tasks"
import { useAuth } from "@/contexts/auth-context"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { tasks, teamMembers, projects } from "@/lib/mock-data"

export default function TasksPage() {
  const { user, isAdmin } = useAuth()
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [assigneeFilter, setAssigneeFilter] = useState<string>("all")
  const [projectFilter, setProjectFilter] = useState<string>("all")

  // Filter tasks based on user
  let filteredTasks = isAdmin
    ? tasks
    : tasks.filter((t) => t.assignees.includes(user?.id || ""))

  // Apply filters
  if (assigneeFilter !== "all") {
    filteredTasks = filteredTasks.filter((t) =>
      t.assignees.includes(assigneeFilter)
    )
  }

  if (projectFilter !== "all") {
    filteredTasks = filteredTasks.filter((t) => t.projectId === projectFilter)
  }

  return (
    <div className="flex flex-col h-screen">
      <AppHeader
        title="My Tasks"
        description={
          isAdmin ? "All team tasks" : "Tasks assigned to you"
        }
        action={{
          label: "New Task",
          onClick: () => setCreateModalOpen(true),
        }}
      />
      <div className="flex-1 space-y-4 p-4 lg:p-6 overflow-hidden">
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4">
          {isAdmin && (
            <Select value={assigneeFilter} onValueChange={setAssigneeFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter by assignee" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Assignees</SelectItem>
                {teamMembers.map((member) => (
                  <SelectItem key={member.id} value={member.id}>
                    {member.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          <Select value={projectFilter} onValueChange={setProjectFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by project" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Projects</SelectItem>
              {projects.map((project) => (
                <SelectItem key={project.id} value={project.id}>
                  {project.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Kanban Board */}
        <div className="flex-1 overflow-hidden">
          <KanbanBoard initialTasks={filteredTasks} />
        </div>
      </div>

      <CreateTaskModal
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
      />
    </div>
  )
}
