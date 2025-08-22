"use client"

import { useMemo, useState } from "react"
import { useParams } from "next/navigation"
import { ManagementMainLayout } from "@/components/management/management-main-layout"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { PageHeader } from "@/components/ui/page-header"
import { ProjectDetailsCard } from "@/app/management/projects/[id]/project-details-card"
import { FileUploadCard } from "@/components/ui/file-upload-card"
import { ProjectMembersTable } from "@/app/management/projects/[id]/project-members-table"
import { ProjectMilestonesTable } from "@/app/management/projects/[id]/project-milestones-table"
import { ProjectTasksTable } from "@/app/management/projects/[id]/project-tasks-table"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Users, Target, CheckSquare } from "lucide-react"
import { 
  mockProjects, 
  mockProjectMembers, 
  mockProjectMilestones, 
  mockProjectTasks 
} from "@/lib/mock-data"

export default function ProjectDetailPage() {
  const params = useParams<{ id: string }>()
  const id = params.id
  const [activeTab, setActiveTab] = useState<"members" | "milestones" | "tasks">("members")

  const project = useMemo(() => 
    mockProjects.find((p) => p.id === id) ?? mockProjects[0], 
    [id]
  )

  const projectMembers = mockProjectMembers[id] || []
  const projectMilestones = mockProjectMilestones[id] || []
  const projectTasks = mockProjectTasks[id] || []

  function ProjectManagement() {
    return (
      <>
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8 mb-8">
          <div className="xl:col-span-3">
            <ProjectDetailsCard project={project} />
          </div>
          <div className="xl:col-span-1">
            <FileUploadCard />
          </div>
        </div>
        
        <div className="space-y-8">
          {/* Tabs Card */}
          <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-md overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-slate-50 to-gray-50 border-b border-gray-100/50 pb-6">
              <div className="flex space-x-6">
                <button
                  onClick={() => setActiveTab("members")}
                  className={`pb-3 px-2 border-b-2 font-semibold text-sm transition-colors ${
                    activeTab === "members"
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <Users className="h-4 w-4 inline mr-2" />
                  Proje Üyeleri
                </button>
                <button
                  onClick={() => setActiveTab("milestones")}
                  className={`pb-3 px-2 border-b-2 font-semibold text-sm transition-colors ${
                    activeTab === "milestones"
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <Target className="h-4 w-4 inline mr-2" />
                  Milestones
                </button>
                <button
                  onClick={() => setActiveTab("tasks")}
                  className={`pb-3 px-2 border-b-2 font-semibold text-sm transition-colors ${
                    activeTab === "tasks"
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <CheckSquare className="h-4 w-4 inline mr-2" />
                  Task/Ticket
                </button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {activeTab === "members" && <ProjectMembersTable members={projectMembers} />}
              {activeTab === "milestones" && <ProjectMilestonesTable milestones={projectMilestones} />}
              {activeTab === "tasks" && <ProjectTasksTable tasks={projectTasks} />}
            </CardContent>
          </Card>
        </div>
      </>
    )
  }

  const breadcrumbItems = [
    { label: "Anasayfa", href: "/" },
    { label: "Proje Listesi", href: "/management/projects" },
    { label: "Proje Detayı" },
  ]

  return (
    <ManagementMainLayout contentClassName="max-w-none">
      <Breadcrumb items={breadcrumbItems} />

      <PageHeader
        title="Proje Detayı"
        subtitle={`${project.name} - ${project.projectNumber}`}
      />

      <ProjectManagement />
    </ManagementMainLayout>
  )
}
