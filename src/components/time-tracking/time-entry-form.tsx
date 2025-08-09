import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Play, Clock, Calendar } from "lucide-react"

export function TimeEntryForm() {
  return (
    <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-md overflow-hidden">
      <CardContent className="p-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
          <div className="flex items-center gap-4 min-w-0 flex-1">
            <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center">
              <Play className="h-6 w-6 text-green-600" />
            </div>
            <div className="flex-1">
              <label className="text-sm font-semibold text-gray-700 block mb-2">Ne üzerinde çalışıyorsunuz?</label>
              <Input
                placeholder="Örn: ABAP kod optimizasyonu, hata düzeltmeleri..."
                className="border-gray-200 focus:border-blue-500 focus:ring-blue-500 bg-white/80 h-12 text-base"
              />
            </div>
          </div>
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-3 bg-gray-50/80 rounded-xl p-3">
              <Clock className="h-5 w-5 text-gray-500" />
              <Input placeholder="09:00" className="w-20 border-gray-200 bg-white/80 h-10" />
              <span className="text-gray-400 font-medium">-</span>
              <Input placeholder="17:00" className="w-20 border-gray-200 bg-white/80 h-10" />
            </div>
            <div className="flex items-center gap-3 bg-gray-50/80 rounded-xl p-3">
              <Calendar className="h-5 w-5 text-gray-500" />
              <Input placeholder="9.08.2025" className="w-32 border-gray-200 bg-white/80 h-10" />
            </div>
            <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 gap-2 shadow-lg h-12 px-6">
              <Play className="h-4 w-4" />
              <span>Başlat</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
