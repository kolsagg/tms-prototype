"use client"

import { useMemo, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Clock, Calendar } from "lucide-react"

type NewTimeRecord = {
  date: string
  startTime: string
  endTime: string
  description: string
  billable: boolean
}

interface TimeEntryFormProps {
  onAdd?: (record: NewTimeRecord) => void
  defaultDate?: string // YYYY-MM-DD
}

export function TimeEntryForm({ onAdd, defaultDate }: TimeEntryFormProps) {
  const todayYmd = useMemo(() => {
    const d = new Date()
    const y = d.getFullYear()
    const m = String(d.getMonth() + 1).padStart(2, "0")
    const day = String(d.getDate()).padStart(2, "0")
    return `${y}-${m}-${day}`
  }, [])

  const [description, setDescription] = useState("")
  const [startTime, setStartTime] = useState("09:00")
  const [endTime, setEndTime] = useState("18:00")
  const [date, setDate] = useState(defaultDate || todayYmd)
  const [billable, setBillable] = useState(true)

  const handleSubmit = () => {
    if (!startTime || !endTime || !date) return
    onAdd?.({ description, startTime, endTime, date, billable })
    setDescription("")
    setStartTime("09:00")
    setEndTime("18:00")
    setDate(defaultDate || todayYmd)
    setBillable(true)
  }

  return (
    <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-md overflow-hidden">
      <CardContent className="p-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
          <div className="flex items-center gap-4 min-w-0 flex-1">
            <div className="flex-1">
              <label className="text-sm font-semibold text-gray-700 block mb-2">Ne üzerinde çalışıyorsunuz?</label>
              <Input
                placeholder="Örn: ABAP kod optimizasyonu, hata düzeltmeleri..."
                className="border-gray-200 focus:border-blue-500 focus:ring-blue-500 bg-white/80 h-12 text-base"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-3 bg-gray-50/80 rounded-xl p-3">
              <Clock className="h-5 w-5 text-gray-500" />
              <Input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} className="w-24 border-gray-200 bg-white/80 h-10" />
              <span className="text-gray-400 font-medium">-</span>
              <Input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} className="w-24 border-gray-200 bg-white/80 h-10" />
            </div>
            <div className="flex items-center gap-3 bg-gray-50/80 rounded-xl p-3">
              <Calendar className="h-5 w-5 text-gray-500" />
              <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-40 border-gray-200 bg-white/80 h-10" />
            </div>
            <div className="flex items-center gap-3 bg-gray-50/80 rounded-xl p-3 border border-gray-200">
              <span className="text-sm font-semibold text-gray-700">Faturalandırma</span>
              <Switch
                checked={billable}
                onCheckedChange={(checked) => setBillable(checked)}
                className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-amber-500 data-[state=checked]:to-yellow-500 focus-visible:ring-2 focus-visible:ring-amber-300"
              />
            </div>
            <Button
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg h-12 px-6"
              type="button"
              onClick={handleSubmit}
            >
              <span>Kaydet</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
