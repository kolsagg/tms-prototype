"use client"

import { useMemo, useState } from "react"
import { useParams } from "next/navigation"
import { ManagementMainLayout } from "@/components/management/management-main-layout"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { UserDetailsCard } from "@/app/management/users/[id]/user-details-card"
import { WorkInfoTable } from "@/app/management/users/[id]/work-info-table"
import { ProjectsTable } from "@/app/management/users/[id]/projects-table"
import { UserFormDialog } from "@/app/management/users/user-form-dialog"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Briefcase, FolderOpen } from "lucide-react"
import { mockUsers } from "@/lib/mock-data"

export default function UserDetailPage() {
  const params = useParams<{ id: string }>()
  const id = params.id
  const [activeTab, setActiveTab] = useState<"workinfo" | "projects">("workinfo")
  const [isUserFormOpen, setIsUserFormOpen] = useState(false)

  const user = useMemo(() => 
    mockUsers.find((u) => u.id === id) ?? mockUsers[0], 
    [id]
  )

  function UserManagement() {
    return (
      <>
        <div className="mb-8">
          <UserDetailsCard user={user} />
        </div>
        
        <div className="space-y-8">
          {/* Tabs Card */}
          <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-md overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-slate-50 to-gray-50 border-b border-gray-100/50 pb-6">
              <div className="flex space-x-6">
                <button
                  onClick={() => setActiveTab("workinfo")}
                  className={`pb-3 px-2 border-b-2 font-semibold text-sm transition-colors ${
                    activeTab === "workinfo"
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <Briefcase className="h-4 w-4 inline mr-2" />
                  Çalışma Bilgileri
                </button>
                <button
                  onClick={() => setActiveTab("projects")}
                  className={`pb-3 px-2 border-b-2 font-semibold text-sm transition-colors ${
                    activeTab === "projects"
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <FolderOpen className="h-4 w-4 inline mr-2" />
                  Projeler
                </button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {activeTab === "workinfo" && <WorkInfoTable userId={user.id} />}
              {activeTab === "projects" && <ProjectsTable userId={user.id} />}
            </CardContent>
          </Card>
        </div>
      </>
    )
  }

  const breadcrumbItems = [
    { label: "Anasayfa", href: "/management/dashboard" },
    { label: "Kullanıcı Listesi", href: "/management/users" },
    { label: "Kullanıcı Detayı" },
  ]

  return (
    <ManagementMainLayout contentClassName="max-w-none">
      <div className="space-y-6">
        <Breadcrumb items={breadcrumbItems} />

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Kullanıcı Detayı</h1>
          </div>
          <Button 
            className="bg-emerald-500 hover:bg-emerald-600 text-white"
            onClick={() => setIsUserFormOpen(true)}
          >
            Düzenle
          </Button>
        </div>

        <UserManagement />

        <UserFormDialog 
          open={isUserFormOpen} 
          onOpenChange={setIsUserFormOpen}
          editUser={user}
          mode="edit"
        />
      </div>
    </ManagementMainLayout>
  )
}
