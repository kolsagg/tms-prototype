"use client"

import { MainLayout } from "@/components/layout/main-layout"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { PageHeader } from "@/components/ui/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Filter,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  ChevronUp,
  ChevronDown,
  FileDown,
  FileSpreadsheet,
  Printer,
  Eye,
  Pencil,
  Plus,
  Trash,
} from "lucide-react"
import { useMemo, useState } from "react"
// no popover; using centered overlay modal for create/edit

type LeaveStatus = "pending" | "approved" | "rejected"
type LeaveType = "annual" | "sick" | "paternity" | "report" | "other"

type LeaveRequest = {
  id: number
  employeeName: string
  leaveType: LeaveType
  startDate: string // DD.MM.YYYY
  endDate: string // DD.MM.YYYY
  status: LeaveStatus
  approver: string
  createdAt: string // DD.MM.YYYY HH:mm
  description?: string
}

const mockLeaveRequests: LeaveRequest[] = [
  {
    id: 1,
    employeeName: "Emre Kolunsağ",
    leaveType: "sick",
    startDate: "01.08.2025",
    endDate: "08.08.2025",
    status: "approved",
    approver: "-",
    createdAt: "01.08.2025 10:32",
    description: "Grip nedeniyle",
  },
  {
    id: 2,
    employeeName: "Emre Kolunsağ",
    leaveType: "annual",
    startDate: "01.09.2025",
    endDate: "08.09.2025",
    status: "pending",
    approver: "-",
    createdAt: "01.08.2025 10:32",
    description: "Yıllık izin",
  },
  {
    id: 3,
    employeeName: "Emre Kolunsağ",
    leaveType: "paternity",
    startDate: "01.07.2025",
    endDate: "08.07.2025",
    status: "rejected",
    approver: "-",
    createdAt: "01.06.2025 10:32",
    description: "Babalık izni talebi",
  }
]

function statusBadgeClass(status: LeaveStatus) {
  if (status === "approved") return "bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700"
  if (status === "rejected") return "bg-gradient-to-r from-rose-100 to-red-100 text-rose-700"
  return "bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-700"
}

function formatLeaveType(type: LeaveType) {
  switch (type) {
    case "annual":
      return "Yıllık İzin"
    case "sick":
      return "Hastalık İzni"
    case "paternity":
      return "Babalık İzni"
    case "report":
      return "Rapor"
    default:
      return "Diğer"
  }
}

export default function LeaveReportsPage() {
  const [filterOpen, setFilterOpen] = useState(true)
  const [requests, setRequests] = useState<LeaveRequest[]>(mockLeaveRequests)

  // UI draft filter state
  const [draftSearch, setDraftSearch] = useState("")
  const [draftType, setDraftType] = useState<LeaveType | "all">("all")
  const [draftStatus, setDraftStatus] = useState<LeaveStatus | "all">("all")
  const [draftFrom, setDraftFrom] = useState("") // YYYY-MM-DD
  const [draftTo, setDraftTo] = useState("") // YYYY-MM-DD

  // Applied filter state
  const [appliedSearch, setAppliedSearch] = useState("")
  const [appliedType, setAppliedType] = useState<LeaveType | "all">("all")
  const [appliedStatus, setAppliedStatus] = useState<LeaveStatus | "all">("all")
  const [appliedFrom, setAppliedFrom] = useState("")
  const [appliedTo, setAppliedTo] = useState("")

  // Create/Edit form state
  const [formOpen, setFormOpen] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formType, setFormType] = useState<LeaveType | "">("")
  const [formFrom, setFormFrom] = useState("") // YYYY-MM-DD
  const [formTo, setFormTo] = useState("") // YYYY-MM-DD
  const [formDesc, setFormDesc] = useState("")
  // View details modal state
  const [viewOpen, setViewOpen] = useState(false)
  const [viewEditing, setViewEditing] = useState(false)
  const [selected, setSelected] = useState<LeaveRequest | null>(null)

  const applyFilters = () => {
    setAppliedSearch(draftSearch)
    setAppliedType(draftType)
    setAppliedStatus(draftStatus)
    setAppliedFrom(draftFrom)
    setAppliedTo(draftTo)
  }

  const resetFilters = () => {
    setDraftSearch("")
    setDraftType("all")
    setDraftStatus("all")
    setDraftFrom("")
    setDraftTo("")
    setAppliedSearch("")
    setAppliedType("all")
    setAppliedStatus("all")
    setAppliedFrom("")
    setAppliedTo("")
  }

  const filtered = useMemo(() => {
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
    const query = appliedSearch.trim().toLowerCase()

    return requests.filter((r) => {
      const matchesText =
        query.length === 0 ||
        r.employeeName.toLowerCase().includes(query) ||
        formatLeaveType(r.leaveType).toLowerCase().includes(query)
      const matchesType = appliedType === "all" || r.leaveType === appliedType
      const matchesStatus = appliedStatus === "all" || r.status === appliedStatus
      const start = parseDDMMYYYY(r.startDate)
      const end = parseDDMMYYYY(r.endDate)
      const matchesFrom = !from || start >= from
      const matchesTo = !to || end <= to
      return matchesText && matchesType && matchesStatus && matchesFrom && matchesTo
    })
  }, [appliedFrom, appliedSearch, appliedStatus, appliedTo, appliedType, requests])

  function openCreateForm() {
    setEditingId(null)
    setFormType("")
    setFormFrom("")
    setFormTo("")
    setFormDesc("")
    setFormOpen(true)
  }

  function openEditForm(req: LeaveRequest) {
    if (req.status !== "pending") return
    setEditingId(req.id)
    setFormType(req.leaveType)
    // convert DD.MM.YYYY -> YYYY-MM-DD
    const toISO = (s: string) => {
      const [d, m, y] = s.split(".")
      return `${y}-${m}-${d}`
    }
    setFormFrom(toISO(req.startDate))
    setFormTo(toISO(req.endDate))
    setFormDesc(req.description ?? "")
    setFormOpen(true)
  }

  function openView(req: LeaveRequest) {
    setSelected(req)
    setViewOpen(true)
    setViewEditing(false)
    // prefill for potential edit
    const toISO = (s: string) => {
      const [d, m, y] = s.split(".")
      return `${y}-${m}-${d}`
    }
    setEditingId(req.id)
    setFormType(req.leaveType)
    setFormFrom(toISO(req.startDate))
    setFormTo(toISO(req.endDate))
    setFormDesc(req.description ?? "")
  }

  function saveForm() {
    if (!formType || !formFrom || !formTo) return
    // validate date order
    const fromDate = new Date(formFrom)
    const toDate = new Date(formTo)
    if (toDate < fromDate) return

    const toDDMMYYYY = (s: string) => {
      const [y, m, d] = s.split("-")
      return `${d}.${m}.${y}`
    }

    if (editingId === null) {
      const nextId = (requests.at(-1)?.id ?? 0) + 1
      const now = new Date()
      const pad = (n: number) => n.toString().padStart(2, "0")
      const createdAt = `${pad(now.getDate())}.${pad(now.getMonth() + 1)}.${now.getFullYear()} ${pad(now.getHours())}:${pad(now.getMinutes())}`
      const newReq: LeaveRequest = {
        id: nextId,
        employeeName: "Emre Kolunsağ",
        leaveType: formType as LeaveType,
        startDate: toDDMMYYYY(formFrom),
        endDate: toDDMMYYYY(formTo),
        status: "pending",
        approver: "-",
        createdAt,
        description: formDesc,
      }
      setRequests((prev) => [...prev, newReq])
    } else {
      setRequests((prev) =>
        prev.map((r) =>
          r.id === editingId
            ? {
                ...r,
                leaveType: formType as LeaveType,
                startDate: toDDMMYYYY(formFrom),
                endDate: toDDMMYYYY(formTo),
                description: formDesc,
              }
            : r,
        ),
      )
    }
    setFormOpen(false)
    if (viewEditing) setViewOpen(false)
  }

  const breadcrumbItems = [
    { label: "Anasayfa", href: "/" },
    { label: "İzin/Rapor Talebi" },
  ]

  return (
    <MainLayout contentClassName="max-w-none">
      <Breadcrumb items={breadcrumbItems} />
      <PageHeader
        title="İzin/Rapor Talebi"
        subtitle="Personel izin ve rapor taleplerini yönetin"
 //       status="Aktif liste"
      />
      <div className="mb-4 flex justify-end">
        <Button className="gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg" onClick={openCreateForm}>
          <Plus className="h-4 w-4" />
          Yeni Başvuru
        </Button>
      </div>
      {formOpen && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-white/80 backdrop-blur-sm p-4" onClick={() => setFormOpen(false)}>
          <div className="w-full max-w-[28rem]" onClick={(e) => e.stopPropagation()}>
            <Card className="border border-gray-100 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">{editingId ? "Başvuruyu Düzenle" : "Yeni İzin Başvurusu"}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-3">
                  <div>
                    <span className="text-sm text-gray-600">İzin Türü</span>
                    <Select value={formType || ""} onValueChange={(v) => setFormType(v as LeaveType)}>
                      <SelectTrigger className="w-full mt-1">
                        <SelectValue placeholder="Tür seçin" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border border-gray-200 shadow-2xl">
                        <SelectItem value="annual">Yıllık İzin</SelectItem>
                        <SelectItem value="sick">Hastalık İzni</SelectItem>
                        <SelectItem value="paternity">Babalık İzni</SelectItem>
                        <SelectItem value="report">Rapor</SelectItem>
                        <SelectItem value="other">Diğer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <span className="text-sm text-gray-600">Başlangıç</span>
                      <Input type="date" value={formFrom} onChange={(e) => setFormFrom(e.target.value)} className="mt-1" />
                    </div>
                    <div className="flex-1">
                      <span className="text-sm text-gray-600">Bitiş</span>
                      <Input type="date" value={formTo} onChange={(e) => setFormTo(e.target.value)} className="mt-1" />
                    </div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Açıklama</span>
                    <textarea
                      value={formDesc}
                      onChange={(e) => setFormDesc(e.target.value)}
                      rows={3}
                      className="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex w-full min-w-0 rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                      placeholder="Kısa açıklama"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <Button variant="ghost" onClick={() => setFormOpen(false)}>İptal</Button>
                  <Button onClick={saveForm} disabled={!formType || !formFrom || !formTo}>Kaydet</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {viewOpen && selected && (
        <div className="fixed inset-0 z-40 grid place-items-center bg-white/80 backdrop-blur-sm p-4" onClick={() => setViewOpen(false)}>
          <div className="w-full max-w-[36rem]" onClick={(e) => e.stopPropagation()}>
            <Card className="border border-gray-100 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">İzin Detayı</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {!viewEditing ? (
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between"><span className="text-gray-600">Personel</span><span className="font-medium">{selected.employeeName}</span></div>
                    <div className="flex items-center justify-between"><span className="text-gray-600">Tür</span><span className="font-medium">{formatLeaveType(selected.leaveType)}</span></div>
                    <div className="flex items-center justify-between"><span className="text-gray-600">Başlangıç</span><span className="font-medium">{selected.startDate}</span></div>
                    <div className="flex items-center justify-between"><span className="text-gray-600">Bitiş</span><span className="font-medium">{selected.endDate}</span></div>
                    <div className="flex items-center justify-between"><span className="text-gray-600">Durum</span><Badge className={`border-0 px-2 py-0.5 ${statusBadgeClass(selected.status)}`}>{selected.status === "approved" ? "Onaylandı" : selected.status === "rejected" ? "Reddedildi" : "Beklemede"}</Badge></div>
                    <div className="flex items-center justify-between"><span className="text-gray-600">Onaylayan</span><span className="font-medium">{selected.approver}</span></div>
                    <div><span className="text-gray-600">Açıklama</span><p className="mt-1 text-gray-800">{selected.description || "-"}</p></div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-3">
                    <div>
                      <span className="text-sm text-gray-600">İzin Türü</span>
                      <Select value={formType || ""} onValueChange={(v) => setFormType(v as LeaveType)}>
                        <SelectTrigger className="w-full mt-1">
                          <SelectValue placeholder="Tür seçin" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border border-gray-200 shadow-2xl">
                          <SelectItem value="annual">Yıllık İzin</SelectItem>
                          <SelectItem value="sick">Hastalık İzni</SelectItem>
                          <SelectItem value="paternity">Babalık İzni</SelectItem>
                          <SelectItem value="report">Rapor</SelectItem>
                          <SelectItem value="other">Diğer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex gap-3">
                      <div className="flex-1">
                        <span className="text-sm text-gray-600">Başlangıç</span>
                        <Input type="date" value={formFrom} onChange={(e) => setFormFrom(e.target.value)} className="mt-1" />
                      </div>
                      <div className="flex-1">
                        <span className="text-sm text-gray-600">Bitiş</span>
                        <Input type="date" value={formTo} onChange={(e) => setFormTo(e.target.value)} className="mt-1" />
                      </div>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Açıklama</span>
                      <textarea
                        value={formDesc}
                        onChange={(e) => setFormDesc(e.target.value)}
                        rows={3}
                        className="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex w-full min-w-0 rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                        placeholder="Kısa açıklama"
                      />
                    </div>
                  </div>
                )}
                <div className="flex justify-end gap-2 pt-2">
                  <Button variant="ghost" onClick={() => setViewOpen(false)}>Kapat</Button>
                  {selected.status === "pending" && !viewEditing && (
                    <Button onClick={() => setViewEditing(true)}>Düzenle</Button>
                  )}
                  {selected.status === "pending" && viewEditing && (
                    <Button onClick={saveForm} disabled={!formType || !formFrom || !formTo}>Kaydet</Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Filter Panel */}
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
            <div className="flex flex-col gap-4">
              <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
                <Input
                  value={draftSearch}
                  onChange={(e) => setDraftSearch(e.target.value)}
                  placeholder="Ara (izin türü)"
                  className="w-full lg:w-80 bg-white/80"
                />
                <Select value={draftType} onValueChange={(v) => setDraftType(v as LeaveType | "all") }>
                  <SelectTrigger className="w-56 border-gray-200 bg-white">
                    <SelectValue placeholder="İzin türü" />
                  </SelectTrigger>
                  <SelectContent className="bg-white/95 border border-gray-200 shadow-xl">
                    <SelectItem value="all">Tüm Türler</SelectItem>
                    <SelectItem value="annual">Yıllık İzin</SelectItem>
                    <SelectItem value="sick">Hastalık İzni</SelectItem>
                    <SelectItem value="paternity">Babalık İzni</SelectItem>
                    <SelectItem value="report">Rapor</SelectItem>
                    <SelectItem value="other">Diğer</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={draftStatus} onValueChange={(v) => setDraftStatus(v as LeaveStatus | "all") }>
                  <SelectTrigger className="w-56 border-gray-200 bg-white">
                    <SelectValue placeholder="Durum" />
                  </SelectTrigger>
                  <SelectContent className="bg-white/95 border border-gray-200 shadow-xl">
                    <SelectItem value="all">Tüm Durumlar</SelectItem>
                    <SelectItem value="pending">Beklemede</SelectItem>
                    <SelectItem value="approved">Onaylandı</SelectItem>
                    <SelectItem value="rejected">Reddedildi</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-2 bg-gray-50/80 rounded-xl p-2 border border-gray-200">
                  <span className="text-sm text-gray-600">Başlangıç</span>
                  <Input type="date" className="h-9 w-40" value={draftFrom} onChange={(e) => setDraftFrom(e.target.value)} />
                </div>
                <div className="flex items-center gap-2 bg-gray-50/80 rounded-xl p-2 border border-gray-200">
                  <span className="text-sm text-gray-600">Bitiş</span>
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

      {/* Leave Requests Table */}
      <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-md overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-slate-50 to-gray-50 border-b border-gray-100/50 pb-6">
          <div className="flex items-center justify-between gap-4">
            <CardTitle className="text-2xl font-bold text-gray-900">İzin/Rapor Talebi</CardTitle>
            <div className="flex items-center gap-2">
              <Input
                placeholder="Ara"
                className="w-56 bg-white/80"
                value={draftSearch}
                onChange={(e) => setDraftSearch(e.target.value)}
              />
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
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-gray-100 bg-gradient-to-r from-gray-50/50 to-slate-50/50">
                <TableHead className="font-bold text-gray-700 h-14">Personel</TableHead>
                <TableHead className="font-bold text-gray-700">İzin Türü</TableHead>
                <TableHead className="font-bold text-gray-700">Başlangıç</TableHead>
                <TableHead className="font-bold text-gray-700">Bitiş</TableHead>
                <TableHead className="font-bold text-gray-700">Durum</TableHead>
                <TableHead className="font-bold text-gray-700">Onaylayan</TableHead>
                <TableHead className="font-bold text-gray-700">Oluşturulma</TableHead>
                <TableHead className="font-bold text-gray-700 text-right">İşlemler</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((r) => (
                <TableRow
                  key={r.id}
                  onClick={() => openEditForm(r)}
                  className={`border-gray-50 hover:bg-gradient-to-r hover:from-blue-50/30 hover:to-indigo-50/30 ${r.status === "pending" ? "cursor-pointer" : ""}`}
                >
                  <TableCell className="font-semibold py-5">{r.employeeName}</TableCell>
                  <TableCell className="text-gray-600 font-medium">{formatLeaveType(r.leaveType)}</TableCell>
                  <TableCell className="text-gray-600 font-medium">{r.startDate}</TableCell>
                  <TableCell className="text-gray-600 font-medium">{r.endDate}</TableCell>
                  <TableCell>
                    <Badge className={`border-0 px-3 py-1 ${statusBadgeClass(r.status)}`}>
                      {r.status === "approved" ? "Onaylandı" : r.status === "rejected" ? "Reddedildi" : "Beklemede"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-600 font-medium">{r.approver}</TableCell>
                  <TableCell className="text-gray-600 font-medium">{r.createdAt}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-9 w-9 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg" onClick={(e) => { e.stopPropagation(); openView(r) }}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className={`h-9 w-9 rounded-lg ${r.status === "pending" ? "text-gray-400 hover:text-amber-600 hover:bg-amber-50" : "text-gray-300"}`} disabled={r.status !== "pending"} onClick={(e) => { e.stopPropagation(); if (r.status === "pending") openEditForm(r); }}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className={`h-9 w-9 rounded-lg ${r.status === "pending" ? "text-gray-400 hover:text-red-600 hover:bg-red-50" : "text-gray-300"}`} disabled={r.status !== "pending"} onClick={(e) => { e.stopPropagation(); if (r.status === "pending") { if (confirm("Kayıt silinsin mi?")) setRequests((prev) => prev.filter((x) => x.id !== r.id)) } }}>
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

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
    </MainLayout>
  )
}


