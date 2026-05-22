"use client"

import { useDroppable } from "@dnd-kit/core"
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Plus } from "lucide-react"
import { Column, Task } from "@/lib/kanban-data"
import { KanbanCard } from "./kanban-card"
import { cn } from "@/lib/utils"

interface KanbanColumnProps {
  column: Column
  tasks: Task[]
  activeTaskId: string | null
}

export function KanbanColumn({ column, tasks, activeTaskId }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
  })

  return (
    <Card
      className={cn(
        "flex flex-col h-full min-w-[280px] w-[280px] bg-secondary/30 border-border/30 transition-colors",
        isOver && "bg-primary/5 border-primary/30"
      )}
    >
      <CardHeader className="p-3 pb-2 shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={cn("w-2 h-2 rounded-full", column.color.replace("/20", ""))} />
            <CardTitle className="text-sm font-medium text-foreground">
              {column.title}
            </CardTitle>
            <span className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
              {tasks.length}
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-muted-foreground hover:text-foreground"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-2 flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div
            ref={setNodeRef}
            className="space-y-2 min-h-[200px] p-1"
          >
            <SortableContext
              items={tasks.map((t) => t.id)}
              strategy={verticalListSortingStrategy}
            >
              {tasks.map((task) => (
                <div key={task.id} className="group">
                  <KanbanCard
                    task={task}
                    isDragging={activeTaskId === task.id}
                  />
                </div>
              ))}
            </SortableContext>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
