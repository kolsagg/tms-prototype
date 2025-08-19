"use client"

import { ManagementMainLayout } from "@/components/management/management-main-layout"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { PageHeader } from "@/components/ui/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Filter, Eye, ChevronLeft, ChevronRight, RotateCcw, ChevronUp, ChevronDown, FileDown, FileSpreadsheet, Printer, Pencil, Trash2, Plus } from "lucide-react"
import { useMemo, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { mockAgreements, type Agreement } from "@/lib/mock-data"
import { AgreementFormDialog } from "./agreement-form-dialog"

export default function AgreementsPage() {
  const router = useRouter()
  const [filterOpen, setFilterOpen] = useState(true)
  // Draft (UI) filter values
  const [draftCustomer, setDraftCustomer] = useState("all")
  const [draftFrom, setDraftFrom] = useState("") // YYYY-MM-DD
  const [draftTo, setDraftTo] = useState("") // YYYY-MM-DD
  // Applied filter values (used to filter the table)
  const [appliedCustomer, setAppliedCustomer] = useState("")
  const [appliedFrom, setAppliedFrom] = useState("")
  const [appliedTo, setAppliedTo] = useState("")
  
  // Dialog states
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingAgreement, setEditingAgreement] = useState<Agreement | undefined>()
  const [isEditMode, setIsEditMode] = useState(false)

  const filteredAgreements = useMemo(() => {
    const query = appliedCustomer.trim().toLowerCase()
    const parseDDMMYYYY = (s: string) => {
      const [d, m, y] = s.split(".")
      return new Date(Number(y), Number(m) - 1, Number(d))
    }
    const parseYYYYMMDD = (s: string) => {
      const [y, m, d] = s.split("-")
      return new Date(Number(y), Number(m) - 1, Number(d))
    }
    const from = appliedFrom ? parseYYYYMMDD(appliedFrom) : undefined
    const to = appliedTo ? parseYYYYMMDD(appliedTo) : undefined
    return mockAgreements.filter((a) => {
      const matchesQuery = query.length === 0 || a.customerInfo.toLowerCase().includes(query)
      const agreementEnd = parseDDMMYYYY(a.endDate)
      const matchesFrom = !from || agreementEnd >= from
      const matchesTo = !to || agreementEnd <= to
      return matchesQuery && matchesFrom && matchesTo
    })
  }, [appliedCustomer, appliedFrom, appliedTo])

  const applyFilters = () => {
    setAppliedCustomer(draftCustomer === "all" ? "" : draftCustomer)
    setAppliedFrom(draftFrom)
    setAppliedTo(draftTo)
  }

  const resetFilters = () => {
    setDraftCustomer("all")
    setDraftFrom("")
    setDraftTo("")
    setAppliedCustomer("")
    setAppliedFrom("")
    setAppliedTo("")
  }

  const uniqueCustomers = useMemo(() => {
    const unique = Array.from(new Set(mockAgreements.map((a) => a.customerInfo)))
    return unique
  }, [])

  const handleNewAgreement = useCallback(() => {
    setEditingAgreement(undefined)
    setIsEditMode(false)
    setIsDialogOpen(true)
  }, [])

  const handleEditAgreement = useCallback((agreement: Agreement) => {
    setEditingAgreement(agreement)
    setIsEditMode(true)
    setIsDialogOpen(true)
  }, [])

  const getStatusBadgeClass = (status: Agreement["status"]) => {
    if (status === "active") return "bg-gradient-to-r from-green-100 to-emerald-100 text-green-700"
    if (status === "expired") return "bg-gradient-to-r from-orange-100 to-red-100 text-orange-700"
    return "bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-700"
  }

  const getStatusText = (status: Agreement["status"]) => {
    if (status === "active") return "Devam Ediyor"
    if (status === "expired") return "Süresi Doldu"
    return "Taslak"
  }

  const breadcrumbItems = [
    { label: "Anasayfa", href: "/" },
    { label: "Sözleşme Listesi" },
  ]

  return (
    <ManagementMainLayout contentClassName="max-w-none">
      <Breadcrumb items={breadcrumbItems} />
      <PageHeader title="Sözleşme Listesi"
       subtitle="Sözleşmelerinizi filtreleyin, arayın ve yönetin"
      />

      {/* Filtrelenebilir Panel */}
      <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-md overflow-hidden mb-8">
        <CardHeader className="bg-gradient-to-r from-slate-50 to-gray-50 border-b border-gray-100/50 pb-6">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold text-gray-900">Filtrelenebilir Panel</CardTitle>
            <Button variant="ghost" size="sm" onClick={() => setFilterOpen((v) => !v)} className="gap-2">
              {filterOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              {filterOpen ? "Gizle" : "Göster"}
            </Button>
          </div>
        </CardHeader>
        {filterOpen && (
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
              <div className="flex items-center gap-3">
                <Select value={draftCustomer} onValueChange={(v) => setDraftCustomer(v)}>
                  <SelectTrigger className="w-80 border-gray-200 bg-white">
                    <SelectValue placeholder="Müşteri seçin" />
                  </SelectTrigger>
                  <SelectContent className="bg-white/95 backdrop-blur-sm border border-gray-200 shadow-xl">
                    <SelectItem value="all">Tüm Müşteriler</SelectItem>
                    {uniqueCustomers.map((customer) => (
                      <SelectItem key={customer} value={customer}>{customer}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-2 bg-gray-50/80 rounded-xl p-2 border border-gray-200">
                  <span className="text-sm text-gray-600">Bitiş Başlangıç</span>
                  <Input type="date" className="h-9 w-40" value={draftFrom} onChange={(e) => setDraftFrom(e.target.value)} />
                </div>
                <div className="flex items-center gap-2 bg-gray-50/80 rounded-xl p-2 border border-gray-200">
                  <span className="text-sm text-gray-600">Bitiş Son</span>
                  <Input type="date" className="h-9 w-40" value={draftTo} onChange={(e) => setDraftTo(e.target.value)} />
                </div>
                <Button variant="outline" className="border-gray-200 bg-white/80 gap-2" onClick={applyFilters}>
                  <Filter className="h-4 w-4" />
                  Uygula
                </Button>
                <Button variant="ghost" className="gap-2" onClick={resetFilters}>
                  <RotateCcw className="h-4 w-4" />
                  Temizle
                </Button>
              </div>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Sözleşme Listesi */}
      <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-md overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-slate-50 to-gray-50 border-b border-gray-100/50 pb-6">
          <div className="flex items-center justify-between gap-4">
            <CardTitle className="text-2xl font-bold text-gray-900">Sözleşme Listesi</CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="border-gray-200 bg-white/80 gap-2" onClick={() => console.log("export-pdf") }>
                <FileDown className="h-4 w-4" />
                PDF
              </Button>
              <Button variant="outline" size="sm" className="border-gray-200 bg-white/80 gap-2" onClick={() => console.log("export-excel") }>
                <FileSpreadsheet className="h-4 w-4" />
                Excel
              </Button>
              <Button variant="outline" size="sm" className="border-gray-200 bg-white/80 gap-2" onClick={() => window.print()}>
                <Printer className="h-4 w-4" />
                Yazdır
              </Button>
              <Button 
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg gap-2" 
                onClick={handleNewAgreement}
              >
                <Plus className="h-4 w-4" />
                Yeni Kayıt
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-100 bg-gradient-to-r from-gray-50/50 to-slate-50/50">
                  <TableHead className="font-bold text-gray-700 h-14">Müşteri Bilgisi</TableHead>
                  <TableHead className="font-bold text-gray-700">Sözleşme Numarası</TableHead>
                  <TableHead className="font-bold text-gray-700">Başlangıç Tarihi</TableHead>
                  <TableHead className="font-bold text-gray-700">Bitiş Tarihi</TableHead>
                  <TableHead className="font-bold text-gray-700">Sözleşme Durumu</TableHead>
                  <TableHead className="font-bold text-gray-700 text-right">İşlemler</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAgreements.map((agreement) => (
                  <TableRow key={agreement.id} className="border-gray-50 hover:bg-gradient-to-r hover:from-blue-50/30 hover:to-indigo-50/30">
                    <TableCell className="font-bold py-6">{agreement.customerInfo}</TableCell>
                    <TableCell className="text-gray-600 font-mono font-medium">{agreement.agreementNumber}</TableCell>
                    <TableCell className="text-gray-600 font-medium">{agreement.startDate}</TableCell>
                    <TableCell className="text-gray-600 font-medium">{agreement.endDate}</TableCell>
                    <TableCell>
                      <Badge className={`border-0 px-3 py-1 ${getStatusBadgeClass(agreement.status)}`}>
                        {getStatusText(agreement.status)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-2 justify-end">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-9 w-9 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                          onClick={() => router.push(`/management/agreements/${agreement.id}`)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-9 w-9 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg"
                          onClick={() => handleEditAgreement(agreement)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-9 w-9 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between p-6 border-t border-gray-100 bg-gradient-to-r from-gray-50/50 to-slate-50/50 gap-4">
            <div className="flex items-center gap-3">
              <Select defaultValue="10">
                <SelectTrigger className="w-20 border-gray-200 bg-white/80">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="25">25</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
              <span className="text-sm text-gray-600 font-medium">kayıt gösteriliyor</span>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="border-gray-200 bg-white/80 hover:bg-gray-50 gap-2">
                <ChevronLeft className="h-4 w-4" />
                <span>Önceki</span>
              </Button>
              <Button size="sm" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg">1</Button>
              <Button variant="outline" size="sm" className="border-gray-200 bg-white/80 hover:bg-gray-50 gap-2">
                <span>Sonraki</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <AgreementFormDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        editingAgreement={editingAgreement}
        isEditMode={isEditMode}
      />
    </ManagementMainLayout>
  )
}
