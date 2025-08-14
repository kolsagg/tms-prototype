import { ManagementMainLayout } from "@/components/management/management-main-layout"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { PageHeader } from "@/components/ui/page-header"

export default function DashboardPage() {
  const breadcrumbItems = [{ label: "Anasayfa", href: "/management/dashboard" }, { label: "Kontrol Paneli" }]

  return (
    <ManagementMainLayout>
      <Breadcrumb items={breadcrumbItems} />

      <PageHeader title="Kontrol Paneli" subtitle="Genel bakış ve istatistikler" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Aktif Projeler</h3>
          <p className="text-3xl font-bold text-blue-600">12</p>
          <p className="text-sm text-gray-500 mt-2">Bu ay +3 artış</p>
        </div>

        <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Toplam Çalışma Saati</h3>
          <p className="text-3xl font-bold text-green-600">156</p>
          <p className="text-sm text-gray-500 mt-2">Bu hafta</p>
        </div>

        <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Tamamlanan Görevler</h3>
          <p className="text-3xl font-bold text-purple-600">8</p>
          <p className="text-sm text-gray-500 mt-2">Bu hafta</p>
        </div>
      </div>
    </ManagementMainLayout>
  )
}
