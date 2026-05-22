"use client"

import { useState } from "react"
import { AppHeader } from "@/components/layout"
import { ProjectCard, CreateProjectModal } from "@/components/projects"
import { projects } from "@/lib/mock-data"
import { useAuth } from "@/contexts/auth-context"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function ProjectsPage() {
  const { isAdmin } = useAuth()
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [statusFilter, setStatusFilter] = useState<string>("all")

  const filteredProjects = projects.filter((project) => {
    if (statusFilter === "all") return true
    return project.status === statusFilter
  })

  return (
    <div className="flex flex-col">
      <AppHeader
        title="Projects"
        description="Manage and track your team projects"
        action={
          isAdmin
            ? {
                label: "New Project",
                onClick: () => setCreateModalOpen(true),
                adminOnly: true,
              }
            : undefined
        }
      />
      <div className="flex-1 space-y-6 p-4 lg:p-6">
        {/* Filters */}
        <div className="flex items-center gap-4">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Projects</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="on-hold">On Hold</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Projects Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="flex h-64 flex-col items-center justify-center rounded-lg border border-dashed border-border text-center">
            <p className="text-muted-foreground">No projects found</p>
            {isAdmin && (
              <p className="text-sm text-muted-foreground">
                Create your first project to get started
              </p>
            )}
          </div>
        )}
      </div>

      <CreateProjectModal
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
      />
    </div>
  )
}
