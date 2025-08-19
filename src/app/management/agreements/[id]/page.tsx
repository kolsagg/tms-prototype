"use client"

import { useMemo, useState } from "react"
import { useParams } from "next/navigation"
import { ManagementMainLayout } from "@/components/management/management-main-layout"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { PageHeader } from "@/components/ui/page-header"
import { AgreementDetailsCard } from "@/app/management/agreements/[id]/agreement-details-card"
import { FileUploadCard } from "@/components/ui/file-upload-card"
import { ContactsTable } from "@/app/management/agreements/[id]/contacts-table"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { FileText, Users } from "lucide-react"
import { mockAgreements } from "@/lib/mock-data"

// Mock contact data for agreement details
const mockContacts = [
  { id: 1, name: "Adem Göğebakan", title: "test", customer: "A", phone: "0 505 618 8221", email: "aaa@gmail.com" },
  { id: 2, name: "Adem Göğebakan-B", title: "test", customer: "B", phone: "0 505 618 8221", email: "abc@gmail.com" }
]


export default function AgreementDetailPage() {
  const params = useParams<{ id: string }>()
  const id = Number(params.id)
  const [activeTab, setActiveTab] = useState<"contacts" | "invoices" | "projects">("contacts")

  const agreement = useMemo(() => 
    mockAgreements.find((a) => a.id === id) ?? mockAgreements[0], 
    [id]
  )

  function AgreementManagement({ contacts }: { contacts: typeof mockContacts }) {
    return (
      <>
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8 mb-8">
          <div className="xl:col-span-3">
            <AgreementDetailsCard agreement={agreement} />
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
                  onClick={() => setActiveTab("contacts")}
                  className={`pb-3 px-2 border-b-2 font-semibold text-sm transition-colors ${
                    activeTab === "contacts"
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <Users className="h-4 w-4 inline mr-2" />
                  İletişim Bilgileri
                </button>
                <button
                  onClick={() => setActiveTab("projects")}
                  className={`pb-3 px-2 border-b-2 font-semibold text-sm transition-colors ${
                    activeTab === "projects"
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <FileText className="h-4 w-4 inline mr-2" />
                  Projeler
                </button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {activeTab === "contacts" && <ContactsTable contacts={contacts} />}
              {activeTab === "projects" && (
                <div className="p-12">
                  <div className="text-center">
                    <FileText className="h-16 w-16 mx-auto text-gray-400 mb-6" />
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">Projeler</h3>
                    <p className="text-gray-500">Bu sözleşmeye ait proje bilgisi bulunmamaktadır.</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </>
    )
  }

  const breadcrumbItems = [
    { label: "Anasayfa", href: "/" },
    { label: "Sözleşme Listesi", href: "/management/agreements" },
    { label: "Sözleşme Detayı" },
  ]

  return (
    <ManagementMainLayout contentClassName="max-w-none">
      <Breadcrumb items={breadcrumbItems} />

      <PageHeader
        title="Sözleşme Yönetimi"
        subtitle={`${agreement.customerInfo} - ${agreement.agreementNumber}`}
      />

      <AgreementManagement contacts={mockContacts} />
    </ManagementMainLayout>
  )
}
