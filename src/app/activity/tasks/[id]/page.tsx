"use client"

import { useMemo, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { MainLayout } from "@/components/layout/main-layout"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { PageHeader } from "@/components/ui/page-header"
import { ProjectDetailsCard } from "@/app/activity/tasks/[id]/project-details-card"
import { FileUploadCard } from "@/components/ui/file-upload-card"
import { TimeEntryForm } from "@/app/activity/tasks/[id]/time-entry-form"
import { TimeRecordsTable } from "@/app/activity/tasks/[id]/time-records-table"
import type { Project, TimeRecord } from "@/types/project"
import { mockTasks, timeRecordsByTaskId } from "@/lib/mock-data"
import { ArrowLeft } from "lucide-react"


// Görev verileri paylaşılan mock kaynaktan

export default function TaskDetailPage() {
  const router = useRouter()
  const params = useParams<{ id: string }>()
  const id = Number(params.id)

  const task = useMemo(() => mockTasks.find((t) => t.id === id) ?? mockTasks[0], [id])

  const project: Project = {
    id: String(task.id),
    name: task.project,
    type: task.title,
    assignee: task.assignee ?? "",
    priority: task.priority,
    status: (() => {
      const [sd, sm, sy] = task.startDate.split(".")
      const [ed, em, ey] = task.endDate.split(".")
      const start = new Date(Number(sy), Number(sm) - 1, Number(sd))
      const end = new Date(Number(ey), Number(em) - 1, Number(ed))
      const now = new Date()
      if (now > end) return "completed"
      if (now >= start && now <= end) return "in-progress"
      return "pending"
    })(),
    description: task.description ?? "",
    startDate: task.startDate,
    endDate: task.endDate,
    estimatedHours: task.estimateHours,
    actualHours: 0,
    completionPercentage: 0,
  }

  const mockTimeRecords: TimeRecord[] = timeRecordsByTaskId[id] ?? []

  function computeDurationHours(start: string, end: string): number {
    const [sh, sm] = start.split(":").map(Number)
    const [eh, em] = end.split(":").map(Number)
    const startMinutes = sh * 60 + sm
    const endMinutes = eh * 60 + em
    const diff = Math.max(0, endMinutes - startMinutes)
    return Math.round((diff / 60) * 100) / 100
  }

  function TaskTimeTracking({ initialRecords, baseProject }: { initialRecords: TimeRecord[]; baseProject: Project }) {
    const [records, setRecords] = useState<TimeRecord[]>(initialRecords)

    const addRecord = (r: { date: string; startTime: string; endTime: string; description: string; billable: boolean }) => {
      const nextId = (records.at(-1)?.id ?? 0) + 1
      const duration = computeDurationHours(r.startTime, r.endTime)
      const newRecord: TimeRecord = { id: nextId, duration, ...r }
      setRecords((prev) => [newRecord, ...prev])
    }

    const updateRecord = (updated: TimeRecord) => {
      setRecords((prev) =>
        prev.map((r) => (r.id === updated.id ? { ...updated, duration: computeDurationHours(updated.startTime, updated.endTime) } : r))
      )
    }

    const deleteRecord = (id: number) => {
      setRecords((prev) => prev.filter((r) => r.id !== id))
    }

    const actualHours = useMemo(() => records.reduce((sum, r) => sum + r.duration, 0), [records])
    const completionPercentage = useMemo(() => {
      const est = baseProject.estimatedHours || 0
      if (est <= 0) return 0
      return Math.round((actualHours / est) * 100)
    }, [actualHours, baseProject.estimatedHours])

    const enrichedProject: Project = { ...baseProject, actualHours, completionPercentage }

    return (
      <>
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8 mb-8">
          <div className="xl:col-span-3">
            <ProjectDetailsCard project={enrichedProject} />
          </div>
          <div className="xl:col-span-1">
            <FileUploadCard />
          </div>
        </div>
        <div className="space-y-8">
          <TimeEntryForm onAdd={addRecord} />
          <TimeRecordsTable
            records={records}
            onDelete={deleteRecord}
            onUpdate={updateRecord}
            completionPercentage={enrichedProject.completionPercentage}
          />
        </div>
      </>
    )
  }

  const breadcrumbItems = [
    { label: "Anasayfa", href: "/" },
    { label: "İş Listesi", href: "/activity/tasks" },
    { label: "Görev Detayı" },
  ]

  return (
    <MainLayout contentClassName="max-w-none">
      <Breadcrumb items={breadcrumbItems} />

      <PageHeader
        title="Zaman Takibi"
        subtitle={task.title}
        actionButton={{ label: "Geri Dön", icon: ArrowLeft, onClick: () => router.push("/activity/tasks") }}
      />

      <TaskTimeTracking initialRecords={mockTimeRecords} baseProject={project} />
    </MainLayout>
  )
}


