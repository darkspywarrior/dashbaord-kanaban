"use client"

import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MessageSquare, Paperclip, MoreHorizontal, Calendar, GripVertical } from "lucide-react"
import { Task, teamMembers, Priority } from "@/lib/kanban-data"
import { cn } from "@/lib/utils"

interface KanbanCardProps {
  task: Task
  isDragging?: boolean
}

const priorityColors: Record<Priority, string> = {
  low: "bg-chart-2/20 text-chart-2 border-chart-2/30",
  medium: "bg-warning/20 text-warning border-warning/30",
  high: "bg-chart-5/20 text-chart-5 border-chart-5/30",
}

export function KanbanCard({ task, isDragging }: KanbanCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isSortableDragging,
  } = useSortable({ id: task.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const assignedMembers = teamMembers.filter((m) => task.assignees.includes(m.id))

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={cn(
        "cursor-grab bg-card border-border/50 hover:border-border transition-all",
        (isDragging || isSortableDragging) && "opacity-50 rotate-2 scale-105 shadow-xl cursor-grabbing"
      )}
    >
      <CardHeader className="p-3 pb-2">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <div
              {...attributes}
              {...listeners}
              className="cursor-grab opacity-0 group-hover:opacity-100 hover:opacity-100 text-muted-foreground hover:text-foreground transition-opacity"
            >
              <GripVertical className="h-4 w-4" />
            </div>
            <h3 className="font-medium text-sm text-foreground leading-tight">
              {task.title}
            </h3>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-muted-foreground hover:text-foreground shrink-0"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem>Duplicate</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="p-3 pt-0 space-y-3">
        <p className="text-xs text-muted-foreground line-clamp-2">
          {task.description}
        </p>

        <div className="flex flex-wrap gap-1.5">
          <Badge
            variant="outline"
            className={cn("text-[10px] px-1.5 py-0", priorityColors[task.priority])}
          >
            {task.priority}
          </Badge>
          {task.tags.slice(0, 2).map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="text-[10px] px-1.5 py-0 bg-muted/50 text-muted-foreground border-border/50"
            >
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between pt-1">
          <div className="flex -space-x-2">
            {assignedMembers.slice(0, 3).map((member) => (
              <Avatar
                key={member.id}
                className="h-6 w-6 border-2 border-card"
              >
                <AvatarFallback className="text-[10px] bg-primary/20 text-primary-foreground">
                  {member.avatar}
                </AvatarFallback>
              </Avatar>
            ))}
            {assignedMembers.length > 3 && (
              <div className="h-6 w-6 rounded-full bg-muted border-2 border-card flex items-center justify-center">
                <span className="text-[10px] text-muted-foreground">
                  +{assignedMembers.length - 3}
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 text-muted-foreground">
            {task.dueDate && (
              <div className="flex items-center gap-1 text-[10px]">
                <Calendar className="h-3 w-3" />
                {new Date(task.dueDate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </div>
            )}
            {task.comments > 0 && (
              <div className="flex items-center gap-1 text-[10px]">
                <MessageSquare className="h-3 w-3" />
                {task.comments}
              </div>
            )}
            {task.attachments > 0 && (
              <div className="flex items-center gap-1 text-[10px]">
                <Paperclip className="h-3 w-3" />
                {task.attachments}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
