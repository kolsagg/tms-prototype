"use client"

import { MainLayout } from "@/components/layout/main-layout"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { PageHeader } from "@/components/ui/page-header"
import { ProjectDetailsCard } from "@/components/time-tracking/project-details-card"
import { FileUploadCard } from "@/components/time-tracking/file-upload-card"
import { TimeEntryForm } from "@/components/time-tracking/time-entry-form"
import { TimeRecordsTable } from "@/components/time-tracking/time-records-table"
import { Download } from "lucide-react"
import type { Project, TimeRecord } from "@/types/project"

// Mock data
const mockProject: Project = {
  id: "1",
  name: "IATCO DESTEK",
  type: "Destek Hizmetleri",
  assignee: "Enre Kolunsağ",
  priority: "high",
  status: "in-progress",
  description: "CR maddelerinde müşteri tarafından talep edilen ABAP hatalarının düzeltilmesi ve optimizasyonu.",
  startDate: "02.08.2025",
  endDate: "03.08.2025",
  estimatedHours: 10,
  actualHours: 10,
  completionPercentage: 100,
}

const mockTimeRecords: TimeRecord[] = [
  {
    id: 1,
    date: "02.08.2025",
    startTime: "09:00",
    endTime: "15:00",
    duration: 6,
    description: "Genel çalışma ve kod incelemesi",
    billable: true,
  },
  {
    id: 2,
    date: "02.08.2025",
    startTime: "09:00",
    endTime: "13:00",
    duration: 4,
    description: "ABAP kodu revize edildi ve test edildi",
    billable: true,
  },
]

export default function TimeTrackingPage() {
  const breadcrumbItems = [
    { label: "Anasayfa", href: "/" },
    { label: "İş Listesi", href: "/tasks" },
    { label: "Zaman Takibi" },
  ]

  return (
    <MainLayout>
      <Breadcrumb items={breadcrumbItems} />

      <PageHeader
        title="Zaman Takibi"
        subtitle="ABAP kodlarının revizesi projesi"
        status="Aktif çalışma"
        actionButton={{
          label: "Geri Dön",
          icon: Download,
          onClick: () => console.log("Going back..."),
        }}
      />

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8 mb-8">
        <div className="xl:col-span-3">
          <ProjectDetailsCard project={mockProject} />
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
