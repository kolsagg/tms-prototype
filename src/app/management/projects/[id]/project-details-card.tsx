"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText } from "lucide-react"
import { Project } from "@/lib/mock-data"
import { PricingFormDialog } from "@/app/management/projects/[id]/pricing-form-dialog"
import { ProjectEditDialog } from "@/app/management/projects/[id]/project-edit-dialog"

interface ProjectDetailsCardProps {
  project: Project
}

export function ProjectDetailsCard({ project }: ProjectDetailsCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Aktif":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "Tamamlandı":
        return "bg-green-100 text-green-800 border-green-200"
      case "Pasif":
        return "bg-gray-100 text-gray-800 border-gray-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-md overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-slate-700 to-slate-800 text-white pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <FileText className="h-5 w-5 text-slate-200" />
            <h2 className="text-lg font-semibold">Proje Detayı</h2>
          </div>
          <ProjectEditDialog project={project} />
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Proje Durumu:
            </label>
            <div>
              <Badge className={`px-2 py-1 text-xs font-medium ${getStatusColor(project.status)}`}>
                {project.status}
              </Badge>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Proje Adı:
            </label>
            <p className="text-gray-800 font-medium text-sm">{project.name}</p>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Proje Numarası:
            </label>
            <p className="text-gray-800 font-medium text-sm">{project.projectNumber}</p>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Müşteri:
            </label>
            <p className="text-blue-600 font-medium text-sm">{project.customer}</p>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Faturalama Tipi:
            </label>
            <p className="text-gray-800 font-medium text-sm">{project.fabricationTime}</p>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Yönetici:
            </label>
            <p className="text-gray-800 font-medium text-sm">Alper Atak</p>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Proje Dönemi:
            </label>
            <p className="text-gray-800 font-medium text-sm">{project.duration}</p>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
              İşlem Tarihi:
            </label>
            <p className="text-gray-800 font-medium text-sm">02.08.2025</p>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Açıklama:
            </label>
            <p className="text-gray-800 font-medium text-sm">Geliştirmeler</p>
          </div>
        </div>

        {/* Billing Information Section */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="bg-blue-50 rounded-lg p-4 text-center">
            <div className="flex items-center justify-center space-x-3">
              <FileText className="h-8 w-8 text-blue-500" />
              <div>
                <h3 className="text-base font-semibold text-gray-800 mb-1">
                  Faturalama Sabitleri Oluşturun
                </h3>
                <PricingFormDialog projectCompany={project.customer} />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
