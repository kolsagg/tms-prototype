"use client"

import { useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Clock, Search, Trash2, ChevronLeft, ChevronRight } from "lucide-react"

interface TimeRecord {
  id: number
  date: string
  startTime: string
  endTime: string
  duration: number
  description: string
  billable: boolean
}

interface TimeRecordsTableProps {
  records: TimeRecord[]
  onDelete?: (id: number) => void
  onUpdate?: (record: TimeRecord) => void
  completionPercentage?: number
}

export function TimeRecordsTable({ records, onDelete, onUpdate }: TimeRecordsTableProps) {
  const [query, setQuery] = useState("")
  const [confirmOpen, setConfirmOpen] = useState<null | number>(null)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editDraft, setEditDraft] = useState<Partial<TimeRecord>>({})
  const [showDeleted, setShowDeleted] = useState(false)

  const getDurationBadgeColor = (duration: number) => {
    if (duration >= 6) return "bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700"
    if (duration >= 4) return "bg-gradient-to-r from-green-100 to-emerald-100 text-green-700"
    return "bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-700"
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return records
    return records.filter((r) =>
      [r.description, r.date, r.startTime, r.endTime].some((v) => v.toLowerCase().includes(q))
    )
  }, [records, query])

  const startEdit = (r: TimeRecord) => {
    setEditingId(r.id)
    setEditDraft({ ...r })
  }

  const commitEdit = () => {
    if (editingId == null) return
    const draft = editDraft as TimeRecord
    onUpdate?.(draft)
    setEditingId(null)
    setEditDraft({})
  }

  return (
    <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-md overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-slate-50 to-gray-50 border-b border-gray-100/50 pb-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center">
              <Clock className="h-4 w-4 text-blue-600" />
            </div>
            Zaman Kayıtları
          </CardTitle>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-white/80 rounded-xl p-2 border border-gray-200">
              <Search className="h-4 w-4 text-gray-400" />
              <Input
                placeholder="Kayıtlarda ara..."
                className="w-56 border-0 bg-transparent focus:ring-0 h-8"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-gray-100 bg-gradient-to-r from-gray-50/50 to-slate-50/50">
                <TableHead className="font-bold text-gray-700 h-14">📅 Tarih</TableHead>
                <TableHead className="font-bold text-gray-700">🕐 Başlangıç</TableHead>
                <TableHead className="font-bold text-gray-700">🕕 Bitiş</TableHead>
                <TableHead className="font-bold text-gray-700">⏱️ Süre</TableHead>
                <TableHead className="font-bold text-gray-700">📝 Açıklama</TableHead>
                <TableHead className="font-bold text-gray-700">💰 Faturalandırma</TableHead>
                <TableHead className="font-bold text-gray-700 text-right">⚙️ İşlemler</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((record) => (
                <TableRow
                  key={record.id}
                  className="border-gray-50 hover:bg-gradient-to-r hover:from-blue-50/30 hover:to-indigo-50/30 transition-all duration-200 cursor-pointer"
                  onClick={() => {
                    if (editingId !== record.id) startEdit(record)
                  }}
                >
                  {editingId === record.id ? (
                    <>
                      <TableCell className="py-4">
                        <Input type="date" value={String(editDraft.date || record.date)} onChange={(e) => setEditDraft((d) => ({ ...d, date: e.target.value }))} className="h-9 w-40" />
                      </TableCell>
                      <TableCell className="py-4">
                        <Input type="time" value={String(editDraft.startTime || record.startTime)} onChange={(e) => setEditDraft((d) => ({ ...d, startTime: e.target.value }))} className="h-9 w-28" />
                      </TableCell>
                      <TableCell className="py-4">
                        <Input type="time" value={String(editDraft.endTime || record.endTime)} onChange={(e) => setEditDraft((d) => ({ ...d, endTime: e.target.value }))} className="h-9 w-28" />
                      </TableCell>
                  <TableCell>
                        <Badge className={`border-0 px-3 py-1 ${getDurationBadgeColor(record.duration)}`}>{record.duration} saat</Badge>
                      </TableCell>
                      <TableCell className="py-4">
                        <Input value={String(editDraft.description || record.description)} onChange={(e) => setEditDraft((d) => ({ ...d, description: e.target.value }))} className="h-9" />
                  </TableCell>
                      <TableCell className="py-4">
                        <Switch
                          checked={(editDraft.billable as boolean | undefined) ?? record.billable}
                          onCheckedChange={(checked) => setEditDraft((d) => ({ ...d, billable: checked }))}
                          onClick={(e) => e.stopPropagation()}
                          className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-amber-500 data-[state=checked]:to-yellow-500 focus-visible:ring-2 focus-visible:ring-amber-300"
                        />
                      </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                          <Button size="sm" className="h-9 px-3" onClick={(e) => { e.stopPropagation(); commitEdit() }}>Kaydet</Button>
                          <Button variant="outline" size="sm" className="h-9 px-3" onClick={(e) => { e.stopPropagation(); setEditingId(null); setEditDraft({}) }}>Vazgeç</Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                            onClick={(e) => { e.stopPropagation(); setConfirmOpen(record.id) }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell className="font-bold py-6">{record.date}</TableCell>
                      <TableCell className="text-gray-600 font-medium">{record.startTime}</TableCell>
                      <TableCell className="text-gray-600 font-medium">{record.endTime}</TableCell>
                      <TableCell>
                        <Badge className={`border-0 px-3 py-1 ${getDurationBadgeColor(record.duration)}`}>{record.duration} saat</Badge>
                      </TableCell>
                      <TableCell className="text-gray-600 font-medium">{record.description}</TableCell>
                      <TableCell>
                        <div className="flex items-center justify-start">
                          <Switch
                            checked={record.billable}
                            onCheckedChange={(checked) => { onUpdate?.({ ...record, billable: checked }) }}
                            className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-amber-500 data-[state=checked]:to-yellow-500 focus-visible:ring-2 focus-visible:ring-amber-300"
                          />
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                            onClick={(e) => { e.stopPropagation(); setConfirmOpen(record.id) }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                    </div>
                  </TableCell>
                    </>
                  )}
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
            <Button
              size="sm"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg"
            >
              1
            </Button>
            <Button variant="outline" size="sm" className="border-gray-200 bg-white/80 hover:bg-gray-50 gap-2">
              <span>Sonraki</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
      {confirmOpen != null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" onClick={() => setConfirmOpen(null)} />
          <div className="relative z-10 w-full max-w-md mx-4">
            <div className="rounded-2xl bg-white shadow-2xl border border-gray-200">
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2 text-center">Emin misiniz?</h3>
                <p className="text-sm text-gray-600 text-center mb-6">Bu aktivite kaydını silmek istediğinize emin misiniz? Bu işlem geri alınamaz.</p>
                <div className="flex justify-end gap-3">
                  <Button variant="outline" onClick={() => setConfirmOpen(null)}>Vazgeç</Button>
                  <Button
                    className="bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700"
                    onClick={() => {
                      if (confirmOpen != null) onDelete?.(confirmOpen)
                      setConfirmOpen(null)
                      setShowDeleted(true)
                      setTimeout(() => setShowDeleted(false), 2000)
                    }}
                  >
                    Sil
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showDeleted && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px]" onClick={() => setShowDeleted(false)} />
          <div className="relative z-10 w-full max-w-sm mx-4">
            <div className="px-4 py-3 rounded-xl shadow-2xl bg-emerald-600 text-white text-sm font-medium text-center">
              Silme işlemi tamamlandı
            </div>
          </div>
        </div>
      )}
    </Card>
  )
}
