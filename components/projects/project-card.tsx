"use client"

import Link from "next/link"
import { Calendar, CheckCircle2, MoreHorizontal } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { Project } from "@/lib/types"
import { teamMembers } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

interface ProjectCardProps {
  project: Project
}

const statusStyles = {
  active: "bg-success/10 text-success border-success/20",
  completed: "bg-chart-2/10 text-chart-2 border-chart-2/20",
  "on-hold": "bg-warning/10 text-warning border-warning/20",
}

export function ProjectCard({ project }: ProjectCardProps) {
  const projectMembers = teamMembers.filter((m) =>
    project.members.includes(m.id)
  )

  return (
    <Link href={`/projects/${project.id}`}>
      <Card className="group h-full transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-3">
              <div className={cn("h-3 w-3 rounded-full", project.color)} />
              <h3 className="font-semibold leading-tight">{project.name}</h3>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 opacity-0 group-hover:opacity-100"
                  onClick={(e) => e.preventDefault()}
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Edit Project</DropdownMenuItem>
                <DropdownMenuItem>Archive Project</DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">
                  Delete Project
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {project.description}
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Badge
              variant="outline"
              className={cn("text-xs capitalize", statusStyles[project.status])}
            >
              {project.status.replace("-", " ")}
            </Badge>
            {project.dueDate && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" />
                {new Date(project.dueDate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-1 text-muted-foreground">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>
                  {project.completedTasks}/{project.tasksCount} tasks
                </span>
              </div>
              <span className="font-medium">{project.progress}%</span>
            </div>
            <Progress value={project.progress} className="h-1.5" />
          </div>

          <div className="flex items-center justify-between pt-1">
            <div className="flex -space-x-2">
              {projectMembers.slice(0, 4).map((member) => (
                <Avatar
                  key={member.id}
                  className="h-7 w-7 border-2 border-card"
                >
                  <AvatarFallback className="bg-primary/10 text-primary text-[10px]">
                    {member.avatar}
                  </AvatarFallback>
                </Avatar>
              ))}
              {projectMembers.length > 4 && (
                <Avatar className="h-7 w-7 border-2 border-card">
                  <AvatarFallback className="bg-muted text-[10px]">
                    +{projectMembers.length - 4}
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
