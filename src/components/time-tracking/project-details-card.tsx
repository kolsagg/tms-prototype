import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

interface ProjectDetailsCardProps {
  project: {
    name: string
    type: string
    assignee: string
    priority: "low" | "medium" | "high"
    status: "pending" | "in-progress" | "completed"
    description: string
    startDate: string
    endDate: string
    estimatedHours: number
    actualHours: number
    completionPercentage: number
  }
}

export function ProjectDetailsCard({ project }: ProjectDetailsCardProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-gradient-to-r from-orange-100 to-red-100 text-orange-700"
      case "medium":
        return "bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-700"
      case "low":
        return "bg-gradient-to-r from-green-100 to-emerald-100 text-green-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getPriorityExclamations = (priority: string) => {
    switch (priority) {
      case "high":
        return "!!!"
      case "medium":
        return "!!"
      case "low":
        return "!"
      default:
        return "!"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-gradient-to-r from-green-100 to-emerald-100 text-green-700"
      case "in-progress":
        return "bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700"
      case "pending":
        return "bg-gradient-to-r from-gray-100 to-slate-100 text-gray-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-md overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-slate-50 to-gray-50 border-b border-gray-100/50 pb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <CardTitle className="text-2xl font-bold text-gray-900">Proje Detayları</CardTitle>
          <div className="flex gap-3">
            <Badge className={`border-0 px-4 py-2 text-sm font-medium ${getPriorityColor(project.priority)}`}>
              {getPriorityExclamations(project.priority)} {project.priority === "high" ? "Yüksek" : project.priority === "medium" ? "Orta" : "Düşük"} Öncelik
            </Badge>
            <Badge className={`border-0 px-4 py-2 text-sm font-medium ${getStatusColor(project.status)}`}>
              ⚡{" "}
              {project.status === "completed"
                ? "Tamamlandı"
                : project.status === "in-progress"
                  ? "Devam Ediyor"
                  : "Bekliyor"}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="flex justify-between items-center py-4 group">
              <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Proje Adı</span>
              <span className="text-sm text-gray-900 font-bold bg-gray-50 px-3 py-1 rounded-lg">{project.name}</span>
            </div>
            <Separator className="bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
            <div className="flex justify-between items-center py-4">
              <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">İş Türü</span>
              <span className="text-sm text-gray-900 font-medium">{project.type}</span>
            </div>
            <Separator className="bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
            <div className="flex justify-between items-center py-4">
              <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Atanan Kişi</span>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">{project.assignee.charAt(0)}</span>
                </div>
                <span className="text-sm text-gray-900 font-medium">{project.assignee}</span>
              </div>
            </div>
            <Separator className="bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
            <div className="py-4 space-y-3">
              <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide block">Açıklama</span>
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-100">
                <p className="text-sm text-gray-700 leading-relaxed">{project.description}</p>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="flex justify-between items-center py-4">
              <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Başlangıç</span>
              <span className="text-sm text-gray-900 font-medium bg-blue-50 px-3 py-1 rounded-lg">
                {project.startDate}
              </span>
            </div>
            <Separator className="bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
            <div className="flex justify-between items-center py-4">
              <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Bitiş</span>
              <span className="text-sm text-gray-900 font-medium bg-green-50 px-3 py-1 rounded-lg">
                {project.endDate}
              </span>
            </div>
            <Separator className="bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
            <div className="flex justify-between items-center py-4">
              <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Tahmini Süre</span>
              <span className="text-sm text-gray-900 font-medium">⏱️ {project.estimatedHours} saat</span>
            </div>
            <Separator className="bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
            <div className="flex justify-between items-center py-4">
              <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Gerçekleşen Süre</span>
              <span className="text-sm text-gray-900 font-medium">✅ {project.actualHours} saat</span>
            </div>
            <Separator className="bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
            <div className="flex justify-between items-center py-4">
              <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Tamamlanma</span>
              <div className="flex items-center gap-3">
                <div className="w-20 h-3 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                  <div
                    className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full shadow-sm transition-all duration-500"
                    style={{ width: `${project.completionPercentage}%` }}
                  ></div>
                </div>
                <span className="text-sm text-green-600 font-bold">{project.completionPercentage}%</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
