import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"

export function FileUploadCard() {
  return (
    <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-md overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-slate-50 to-gray-50 border-b border-gray-100/50">
        <CardTitle className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <Upload className="h-5 w-5 text-blue-600" />
          Dosya Ekleri
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="border-2 border-dashed border-blue-200 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 rounded-2xl p-8 text-center hover:border-blue-300 hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 cursor-pointer group">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
            <Upload className="h-8 w-8 text-blue-600" />
          </div>
          <p className="text-sm text-gray-600 mb-2 font-medium">Dosyaları sürükleyin</p>
          <p className="text-xs text-gray-500 mb-4">veya</p>
          <Button
            variant="outline"
            size="sm"
            className="border-blue-200 bg-white/80 hover:bg-blue-50 hover:border-blue-300 transition-all"
          >
            📁 Dosya Seçin
          </Button>
        </div>
        <div className="mt-4 text-xs text-gray-500 text-center">
          <p>Maksimum 10MB</p>
          <p>PDF, DOC, XLS, PNG, JPG</p>
        </div>
      </CardContent>
    </Card>
  )
}
