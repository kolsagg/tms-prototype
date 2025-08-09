"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Clock, Search, Filter, FileText, Trash2, ChevronLeft, ChevronRight } from "lucide-react"

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
}

export function TimeRecordsTable({ records }: TimeRecordsTableProps) {
  const [selectedRows, setSelectedRows] = useState<number[]>([])

  const toggleRowSelection = (id: number) => {
    setSelectedRows((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]))
  }

  const getDurationBadgeColor = (duration: number) => {
    if (duration >= 6) return "bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700"
    if (duration >= 4) return "bg-gradient-to-r from-green-100 to-emerald-100 text-green-700"
    return "bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-700"
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
              <Input placeholder="Kayıtlarda ara..." className="w-48 border-0 bg-transparent focus:ring-0 h-8" />
            </div>
            <Button variant="outline" size="icon" className="border-gray-200 bg-white/80 hover:bg-gray-50 h-10 w-10">
              <Filter className="h-4 w-4" />
            </Button>
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
              {records.map((record) => (
                <TableRow
                  key={record.id}
                  className="border-gray-50 hover:bg-gradient-to-r hover:from-blue-50/30 hover:to-indigo-50/30 transition-all duration-200"
                >
                  <TableCell className="font-bold py-6">{record.date}</TableCell>
                  <TableCell className="text-gray-600 font-medium">{record.startTime}</TableCell>
                  <TableCell className="text-gray-600 font-medium">{record.endTime}</TableCell>
                  <TableCell>
                    <Badge className={`border-0 px-3 py-1 ${getDurationBadgeColor(record.duration)}`}>
                      {record.duration} saat
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-600 font-medium">{record.description}</TableCell>
                  <TableCell>
                    <Switch
                      checked={selectedRows.includes(record.id)}
                      onCheckedChange={() => toggleRowSelection(record.id)}
                      className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-blue-600 data-[state=checked]:to-indigo-600"
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                      >
                        <FileText className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                      >
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
    </Card>
  )
}
