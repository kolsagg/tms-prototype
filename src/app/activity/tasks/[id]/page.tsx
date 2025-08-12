"use client"

import { useMemo } from "react"
import { useRouter, useParams } from "next/navigation"
import { MainLayout } from "@/components/layout/main-layout"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { PageHeader } from "@/components/ui/page-header"
import { ProjectDetailsCard } from "@/components/time-tracking/project-details-card"
import { FileUploadCard } from "@/components/time-tracking/file-upload-card"
import { TimeEntryForm } from "@/components/time-tracking/time-entry-form"
import { TimeRecordsTable } from "@/components/time-tracking/time-records-table"
import type { Project, TimeRecord } from "@/types/project"
import { ArrowLeft } from "lucide-react"

type Task = {
  id: number
  title: string
  project: string
  priority: "low" | "medium" | "high"
  status: "pending" | "in-progress" | "completed"
  startDate: string
  endDate: string
  estimateHours: number
  completion: number
  assignedAt: string
  assignee: string
  description: string
}

const mockTasks: Task[] = [
  {
    id: 1,
    title: "ABAP kodlarının revizesi",
    project: "IATCO DESTEK / Destek Hizmetleri",
    priority: "high",
    status: "in-progress",
    startDate: "02.08.2025",
    endDate: "03.08.2025",
    estimateHours: 10,
    completion: 100,
    assignedAt: "02.08.2025 10:42",
    assignee: "Emre Kolunsağ",
    description:
      "CR maddelerinde müşteri tarafından talep edilen ABAP hatalarının düzeltilmesi ve optimizasyonu.",
  },
  {
    id: 2,
    title: "test",
    project: "IATCO DESTEK / Geliştirme2",
    priority: "medium",
    status: "in-progress",
    startDate: "02.08.2025",
    endDate: "06.08.2025",
    estimateHours: 10,
    completion: 100,
    assignedAt: "02.08.2025 11:13",
    assignee: "Emre Kolunsağ",
    description: "Modül üzerinde genel geliştirmeler ve testler.",
  },
]

export default function TaskDetailPage() {
  const router = useRouter()
  const params = useParams<{ id: string }>()
  const id = Number(params.id)

  const task = useMemo(() => mockTasks.find((t) => t.id === id) ?? mockTasks[0], [id])

  const project: Project = {
    id: String(task.id),
    name: task.title,
    type: task.project,
    assignee: task.assignee,
    priority: task.priority,
    status: task.status,
    description: task.description,
    startDate: task.startDate,
    endDate: task.endDate,
    estimatedHours: task.estimateHours,
    actualHours: task.estimateHours,
    completionPercentage: task.completion,
  }

  const mockTimeRecords: TimeRecord[] = [
    {
      id: 1,
      date: task.startDate,
      startTime: "09:00",
      endTime: "15:00",
      duration: 6,
      description: "Genel çalışma ve kod incelemesi",
      billable: true,
    },
    {
      id: 2,
      date: task.startDate,
      startTime: "09:00",
      endTime: "13:00",
      duration: 4,
      description: "Kod revizyonu ve test",
      billable: true,
    },
  ]

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
        status="Aktif çalışma"
        actionButton={{ label: "Geri Dön", icon: ArrowLeft, onClick: () => router.push("/activity/tasks") }}
      />

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8 mb-8">
        <div className="xl:col-span-3">
          <ProjectDetailsCard project={project} />
        </div>
        <div className="xl:col-span-1">
          <FileUploadCard />
        </div>
      </div>

      <div className="space-y-8">
        <TimeEntryForm />
        <TimeRecordsTable records={mockTimeRecords} />
      </div>
    </MainLayout>
  )
}


