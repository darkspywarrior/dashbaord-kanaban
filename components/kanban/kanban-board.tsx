"use client"

import { useState, useCallback } from "react"
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
  DragOverEvent,
} from "@dnd-kit/core"
import { sortableKeyboardCoordinates, arrayMove } from "@dnd-kit/sortable"
import { columns, initialTasks, Status, Task } from "@/lib/kanban-data"
import { KanbanColumn } from "./kanban-column"
import { KanbanCard } from "./kanban-card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

export function KanbanBoard() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [activeTask, setActiveTask] = useState<Task | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const getTasksByStatus = useCallback(
    (status: Status) => tasks.filter((task) => task.status === status),
    [tasks]
  )

  const handleDragStart = (event: DragStartEvent) => {
    const task = tasks.find((t) => t.id === event.active.id)
    if (task) {
      setActiveTask(task)
    }
  }

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event
    if (!over) return

    const activeId = active.id as string
    const overId = over.id as string

    const activeTask = tasks.find((t) => t.id === activeId)
    if (!activeTask) return

    // Check if we're over a column
    const isOverColumn = columns.some((col) => col.id === overId)
    if (isOverColumn) {
      const newStatus = overId as Status
      if (activeTask.status !== newStatus) {
        setTasks((prev) =>
          prev.map((t) =>
            t.id === activeId ? { ...t, status: newStatus } : t
          )
        )
      }
      return
    }

    // Check if we're over another task
    const overTask = tasks.find((t) => t.id === overId)
    if (overTask && activeTask.status !== overTask.status) {
      setTasks((prev) =>
        prev.map((t) =>
          t.id === activeId ? { ...t, status: overTask.status } : t
        )
      )
    }
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (!over) {
      setActiveTask(null)
      return
    }

    const activeId = active.id as string
    const overId = over.id as string

    if (activeId === overId) {
      setActiveTask(null)
      return
    }

    const activeTask = tasks.find((t) => t.id === activeId)
    const overTask = tasks.find((t) => t.id === overId)

    if (activeTask && overTask && activeTask.status === overTask.status) {
      const columnTasks = tasks.filter((t) => t.status === activeTask.status)
      const oldIndex = columnTasks.findIndex((t) => t.id === activeId)
      const newIndex = columnTasks.findIndex((t) => t.id === overId)

      const reorderedColumnTasks = arrayMove(columnTasks, oldIndex, newIndex)
      
      setTasks((prev) => {
        const otherTasks = prev.filter((t) => t.status !== activeTask.status)
        return [...otherTasks, ...reorderedColumnTasks]
      })
    }

    setActiveTask(null)
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <ScrollArea className="w-full h-full">
        <div className="flex gap-4 p-4 h-full min-h-[calc(100vh-12rem)]">
          {columns.map((column) => (
            <KanbanColumn
              key={column.id}
              column={column}
              tasks={getTasksByStatus(column.id)}
              activeTaskId={activeTask?.id ?? null}
            />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <DragOverlay>
        {activeTask ? (
          <div className="rotate-3 scale-105">
            <KanbanCard task={activeTask} isDragging />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}
