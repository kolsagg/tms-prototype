import { ManagementMainLayout } from "@/components/management/management-main-layout"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { PageHeader } from "@/components/ui/page-header"
import { SupportTicketsChart } from "./support-tickets-chart"
import { CompletionProgressChart } from "./completion-progress-chart"
import { OngoingSupportTicketsTable } from "./ongoing-support-tickets-table"

export default function DashboardPage() {
  const breadcrumbItems = [{ label: "Anasayfa", href: "/management/dashboard" }, { label: "Kontrol Paneli" }]

  return (
    <ManagementMainLayout contentClassName="max-w-none">
      <Breadcrumb items={breadcrumbItems} />

      <PageHeader title="Kontrol Paneli" subtitle="Genel bakış ve istatistikler" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white/90 backdrop-blur-md rounded-lg shadow-md border border-gray-100 overflow-hidden">
          <div className="bg-blue-500 text-white p-3">
            <h3 className="text-base font-semibold">Gelen Talepler</h3>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-4 gap-3 text-center">
              <div>
                <p className="text-lg font-bold text-gray-900">24</p>
                <p className="text-xs text-gray-500">Bugün</p>
              </div>
              <div>
                <p className="text-lg font-bold text-gray-900">142</p>
                <p className="text-xs text-gray-500">Bu Hafta</p>
              </div>
              <div>
                <p className="text-lg font-bold text-gray-900">568</p>
                <p className="text-xs text-gray-500">Bu Ay</p>
              </div>
              <div>
                <p className="text-lg font-bold text-gray-900">6742</p>
                <p className="text-xs text-gray-500">Bu Yıl</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/90 backdrop-blur-md rounded-lg shadow-md border border-gray-100 overflow-hidden">
          <div className="bg-green-500 text-white p-3">
            <h3 className="text-base font-semibold">Çözülen Talepler</h3>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-4 gap-3 text-center">
              <div>
                <p className="text-lg font-bold text-gray-900">18</p>
                <p className="text-xs text-gray-500">Bugün</p>
              </div>
              <div>
                <p className="text-lg font-bold text-gray-900">128</p>
                <p className="text-xs text-gray-500">Bu Hafta</p>
              </div>
              <div>
                <p className="text-lg font-bold text-gray-900">531</p>
                <p className="text-xs text-gray-500">Bu Ay</p>
              </div>
              <div>
                <p className="text-lg font-bold text-gray-900">6308</p>
                <p className="text-xs text-gray-500">Bu Yıl</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/90 backdrop-blur-md rounded-lg shadow-md border border-gray-100 overflow-hidden">
          <div className="bg-purple-500 text-white p-3">
            <h3 className="text-base font-semibold">Aktivite Süresi</h3>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-4 gap-3 text-center">
              <div>
                <p className="text-lg font-bold text-gray-900">1.5</p>
                <p className="text-xs text-gray-500">Bugün</p>
                <p className="text-xs text-gray-400">saat</p>
              </div>
              <div>
                <p className="text-lg font-bold text-gray-900">2.3</p>
                <p className="text-xs text-gray-500">Bu Hafta</p>
                <p className="text-xs text-gray-400">saat</p>
              </div>
              <div>
                <p className="text-lg font-bold text-gray-900">2.7</p>
                <p className="text-xs text-gray-500">Bu Ay</p>
                <p className="text-xs text-gray-400">saat</p>
              </div>
              <div>
                <p className="text-lg font-bold text-gray-900">3.1</p>
                <p className="text-xs text-gray-500">Bu Yıl</p>
                <p className="text-xs text-gray-400">saat</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SupportTicketsChart />
        </div>
        <div className="lg:col-span-1">
          <CompletionProgressChart />
        </div>
      </div>

      <div className="mt-8">
        <OngoingSupportTicketsTable />
      </div>
    </ManagementMainLayout>
  )
}
