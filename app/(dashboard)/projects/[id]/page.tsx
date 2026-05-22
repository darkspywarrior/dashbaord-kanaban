"use client"

import { use, useState } from "react"
import { notFound } from "next/navigation"
import { ArrowLeft, Calendar, CheckCircle2, Users } from "lucide-react"
import Link from "next/link"
import { AppHeader } from "@/components/layout"
import { KanbanBoard } from "@/components/kanban/kanban-board"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { projects, tasks, teamMembers } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import type { Task } from "@/lib/types"

const statusStyles = {
  active: "bg-success/10 text-success border-success/20",
  completed: "bg-chart-2/10 text-chart-2 border-chart-2/20",
  "on-hold": "bg-warning/10 text-warning border-warning/20",
}

export default function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const project = projects.find((p) => p.id === id)

  if (!project) {
    notFound()
  }

  const projectTasks = tasks.filter((t) => t.projectId === id)
  const projectMembers = teamMembers.filter((m) =>
    project.members.includes(m.id)
  )

  return (
    <div className="flex flex-col">
      <AppHeader
        title={project.name}
        description={project.description}
      />
      <div className="flex-1 space-y-6 p-4 lg:p-6">
        {/* Back Button */}
        <Link href="/projects">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Projects
          </Button>
        </Link>

        {/* Project Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Badge
                variant="outline"
                className={cn(
                  "capitalize",
                  statusStyles[project.status]
                )}
              >
                {project.status.replace("-", " ")}
              </Badge>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Progress value={project.progress} className="h-2 flex-1" />
                <span className="text-sm font-medium">{project.progress}%</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <CheckCircle2 className="h-4 w-4" />
                Tasks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">
                {project.completedTasks}/{project.tasksCount}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Calendar className="h-4 w-4" />
                Due Date
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-medium">
                {project.dueDate
                  ? new Date(project.dueDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  : "No deadline"}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Team Members */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Users className="h-4 w-4" />
              Team Members ({projectMembers.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              {projectMembers.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center gap-3 rounded-lg border border-border p-3"
                >
                  <Avatar>
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {member.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{member.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {member.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="board" className="space-y-4">
          <TabsList>
            <TabsTrigger value="board">Kanban Board</TabsTrigger>
            <TabsTrigger value="list">Task List</TabsTrigger>
          </TabsList>
          <TabsContent value="board">
            <KanbanBoard initialTasks={projectTasks} />
          </TabsContent>
          <TabsContent value="list">
            <Card>
              <CardContent className="p-0">
                <div className="divide-y divide-border">
                  {projectTasks.map((task) => (
                    <TaskListItem key={task.id} task={task} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function TaskListItem({ task }: { task: Task }) {
  const assignees = teamMembers.filter((m) => task.assignees.includes(m.id))

  const priorityColors = {
    high: "bg-destructive/10 text-destructive border-destructive/20",
    medium: "bg-warning/10 text-warning border-warning/20",
    low: "bg-chart-2/10 text-chart-2 border-chart-2/20",
  }

  return (
    <div className="flex items-center gap-4 px-6 py-4">
      <div className="flex-1 space-y-1">
        <p className="font-medium">{task.title}</p>
        <p className="text-sm text-muted-foreground">{task.description}</p>
      </div>
      <Badge
        variant="outline"
        className={cn("capitalize", priorityColors[task.priority])}
      >
        {task.priority}
      </Badge>
      <div className="flex -space-x-2">
        {assignees.map((member) => (
          <Avatar key={member.id} className="h-7 w-7 border-2 border-card">
            <AvatarFallback className="bg-primary/10 text-primary text-[10px]">
              {member.avatar}
            </AvatarFallback>
          </Avatar>
        ))}
      </div>
      {task.dueDate && (
        <span className="text-sm text-muted-foreground">
          {new Date(task.dueDate).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })}
        </span>
      )}
    </div>
  )
}
