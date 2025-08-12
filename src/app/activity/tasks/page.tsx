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
import { Filter, FileText, ChevronLeft, ChevronRight, RotateCcw, ChevronUp, ChevronDown, FileDown, FileSpreadsheet, Printer } from "lucide-react"
import Link from "next/link"
import { useMemo, useState } from "react"

type Task = {
  id: number
  title: string
  project: string
  priority: "low" | "medium" | "high"
  status: "pending" | "in-progress" | "completed"
  startDate: string
  endDate: string
  estimateHours: number
  completion: number
  assignedAt: string
}

const mockTasks: Task[] = [
  {
    id: 1,
    title: "ABAP kodlarının revizesi",
    project: "IATCO DESTEK / Destek Hizmetleri",
    priority: "high",
    status: "in-progress",
    startDate: "02.08.2025",
    endDate: "03.08.2025",
    estimateHours: 10,
    completion: 100,
    assignedAt: "02.08.2025 10:42",
  },
  {
    id: 2,
    title: "test",
    project: "IATCO DESTEK / Geliştirme2",
    priority: "medium",
    status: "in-progress",
    startDate: "02.08.2025",
    endDate: "06.08.2025",
    estimateHours: 10,
    completion: 100,
    assignedAt: "02.08.2025 11:13",
  },
]

function priorityBadge(priority: Task["priority"]) {
  if (priority === "high") return "bg-gradient-to-r from-orange-100 to-red-100 text-orange-700"
  if (priority === "medium") return "bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-700"
  return "bg-gradient-to-r from-green-100 to-emerald-100 text-green-700"
}

function priorityExclamations(priority: Task["priority"]) {
  if (priority === "high") return "!!!"
  if (priority === "medium") return "!!"
  return "!"
}

export default function TasksPage() {
  const [filterOpen, setFilterOpen] = useState(true)
  // Draft (UI) filter values
  const [draftProject, setDraftProject] = useState("all")
  const [draftFrom, setDraftFrom] = useState("") // YYYY-MM-DD
  const [draftTo, setDraftTo] = useState("") // YYYY-MM-DD
  // Applied filter values (used to filter the table)
  const [appliedProject, setAppliedProject] = useState("")
  const [appliedFrom, setAppliedFrom] = useState("")
  const [appliedTo, setAppliedTo] = useState("")

  const filteredTasks = useMemo(() => {
    const query = appliedProject.trim().toLowerCase()
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
    return mockTasks.filter((t) => {
      const matchesQuery = query.length === 0 || t.project.toLowerCase() === query
      const taskStart = parseDDMMYYYY(t.startDate)
      const taskEnd = parseDDMMYYYY(t.endDate)
      const matchesFrom = !from || taskStart >= from
      const matchesTo = !to || taskEnd <= to
      return matchesQuery && matchesFrom && matchesTo
    })
  }, [appliedProject, appliedFrom, appliedTo])

  const applyFilters = () => {
    setAppliedProject(draftProject === "all" ? "" : draftProject)
    setAppliedFrom(draftFrom)
    setAppliedTo(draftTo)
  }

  const resetFilters = () => {
    setDraftProject("all")
    setDraftFrom("")
    setDraftTo("")
    setAppliedProject("")
    setAppliedFrom("")
    setAppliedTo("")
  }

  const userProjects = useMemo(() => {
    const unique = Array.from(new Set(mockTasks.map((t) => t.project)))
    return unique
  }, [])
  const breadcrumbItems = [
    { label: "Anasayfa", href: "/" },
    { label: "İş Listesi" },
  ]

  return (
    <MainLayout contentClassName="max-w-none">
      <Breadcrumb items={breadcrumbItems} />
      <PageHeader title="Görev Listesi" />

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
                <Select value={draftProject} onValueChange={(v) => setDraftProject(v)}>
                  <SelectTrigger className="w-80 border-gray-200 bg-white">
                    <SelectValue placeholder="Proje seçin" />
                  </SelectTrigger>
                  <SelectContent className="bg-white/95 backdrop-blur-sm border border-gray-200 shadow-xl">
                    <SelectItem value="all">Tüm Projeler</SelectItem>
                    {userProjects.map((p) => (
                      <SelectItem key={p} value={p}>{p}</SelectItem>
                    ))}
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

      {/* Görev Listesi */}
      <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-md overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-slate-50 to-gray-50 border-b border-gray-100/50 pb-6">
          <div className="flex items-center justify-between gap-4">
            <CardTitle className="text-2xl font-bold text-gray-900">Görev Listesi</CardTitle>
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
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-100 bg-gradient-to-r from-gray-50/50 to-slate-50/50">
                  <TableHead className="font-bold text-gray-700 h-14">Başlık</TableHead>
                  <TableHead className="font-bold text-gray-700">Proje</TableHead>
                  <TableHead className="font-bold text-gray-700">Öncelik</TableHead>
                  <TableHead className="font-bold text-gray-700">Durum</TableHead>
                  <TableHead className="font-bold text-gray-700">Başlangıç–Bitiş</TableHead>
                  <TableHead className="font-bold text-gray-700">Tahmini Süre (h)</TableHead>
                  <TableHead className="font-bold text-gray-700">Tamamlanma %</TableHead>
                  <TableHead className="font-bold text-gray-700">Atanma Tarihi</TableHead>
                  <TableHead className="font-bold text-gray-700 text-right">İşlemler</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTasks.map((t) => (
                  <TableRow key={t.id} className="border-gray-50 hover:bg-gradient-to-r hover:from-blue-50/30 hover:to-indigo-50/30">
                    <TableCell className="font-bold py-6">{t.title}</TableCell>
                    <TableCell className="text-gray-600 font-medium">{t.project}</TableCell>
                    <TableCell>
                      <Badge className={`border-0 px-3 py-1 ${priorityBadge(t.priority)}`}>
                        <span className="mr-1">{priorityExclamations(t.priority)}</span>
                        {t.priority === "high" ? "Yüksek" : t.priority === "medium" ? "Orta" : "Düşük"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-600 font-medium">
                      {t.status === "in-progress" ? "Devam Ediyor" : t.status === "pending" ? "Bekliyor" : "Tamamlandı"}
                    </TableCell>
                    <TableCell className="text-gray-600 font-medium">{t.startDate} - {t.endDate}</TableCell>
                    <TableCell className="text-gray-600 font-medium">{t.estimateHours}</TableCell>
                    <TableCell className="text-gray-600 font-medium">{t.completion}</TableCell>
                    <TableCell className="text-gray-600 font-medium">{t.assignedAt}</TableCell>
                    <TableCell className="text-right">
                      <Link href={`/activity/tasks/${t.id}`}>
                        <Button variant="ghost" size="icon" className="h-9 w-9 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
                          <FileText className="h-4 w-4" />
                        </Button>
                      </Link>
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
    </MainLayout>
  )
}


