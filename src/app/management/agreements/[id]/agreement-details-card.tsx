import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import type { Agreement } from "@/lib/mock-data"

interface AgreementDetailsCardProps {
  agreement: Agreement
}

export function AgreementDetailsCard({ agreement }: AgreementDetailsCardProps) {
  const getStatusColor = (status: Agreement["status"]) => {
    switch (status) {
      case "active":
        return "bg-gradient-to-r from-green-100 to-emerald-100 text-green-700"
      case "expired":
        return "bg-gradient-to-r from-orange-100 to-red-100 text-orange-700"
      case "draft":
        return "bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getStatusText = (status: Agreement["status"]) => {
    switch (status) {
      case "active":
        return "Devam Ediyor"
      case "expired":
        return "Süresi Doldu"
      case "draft":
        return "Taslak"
      default:
        return "Bilinmeyen"
    }
  }

  const getStatusIcon = (status: Agreement["status"]) => {
    switch (status) {
      case "active":
        return "✅"
      case "expired":
        return "⚠️"
      case "draft":
        return "📝"
      default:
        return "❓"
    }
  }

  // Calculate duration in days
  const calculateDuration = () => {
    const parseDate = (dateStr: string) => {
      const [day, month, year] = dateStr.split('.');
      return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    };
    
    const startDate = parseDate(agreement.startDate);
    const endDate = parseDate(agreement.endDate);
    const diffTime = endDate.getTime() - startDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Calculate remaining or expired days
  const calculateRemainingDays = () => {
    const parseDate = (dateStr: string) => {
      const [day, month, year] = dateStr.split('.');
      return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    };
    
    const endDate = parseDate(agreement.endDate);
    const today = new Date();
    const diffTime = endDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const remainingDays = calculateRemainingDays();
  const totalDuration = calculateDuration();

  return (
    <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-md overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-slate-50 to-gray-50 border-b border-gray-100/50 pb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <CardTitle className="text-2xl font-bold text-gray-900">Sözleşme Detayları</CardTitle>
          <div className="flex gap-3">
            <Badge className={`border-0 px-4 py-2 text-sm font-medium ${getStatusColor(agreement.status)}`}>
              {getStatusIcon(agreement.status)} {getStatusText(agreement.status)}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="flex justify-between items-center py-4 group">
              <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Müşteri Bilgisi</span>
              <span className="text-sm text-gray-900 font-bold bg-gray-50 px-3 py-1 rounded-lg">{agreement.customerInfo}</span>
            </div>
            <Separator className="bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
            <div className="flex justify-between items-center py-4">
              <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Sözleşme Numarası</span>
              <span className="text-sm text-gray-900 font-mono font-medium bg-blue-50 px-3 py-1 rounded-lg">{agreement.agreementNumber}</span>
            </div>
            <Separator className="bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
            <div className="flex justify-between items-center py-4">
              <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Sözleşme Süresi</span>
              <span className="text-sm text-gray-900 font-medium">📅 {totalDuration} gün</span>
            </div>
            <Separator className="bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
            <div className="py-4 space-y-3">
              <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide block">Açıklama</span>
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-100">
                <p className="text-sm text-gray-700 leading-relaxed">
                  {agreement.customerInfo} ile yapılan sözleşme detayları ve koşulları bu bölümde yer almaktadır.
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="flex justify-between items-center py-4">
              <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Başlangıç</span>
              <span className="text-sm text-gray-900 font-medium bg-blue-50 px-3 py-1 rounded-lg">
                {agreement.startDate}
              </span>
            </div>
            <Separator className="bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
            <div className="flex justify-between items-center py-4">
              <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Bitiş</span>
              <span className="text-sm text-gray-900 font-medium bg-green-50 px-3 py-1 rounded-lg">
                {agreement.endDate}
              </span>
            </div>
            <Separator className="bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
            <div className="flex justify-between items-center py-4">
              <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">İşlem Tarihi</span>
              <span className="text-sm text-gray-900 font-medium">📝 13.08.2025 10:24</span>
            </div>
            <Separator className="bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
            <div className="flex justify-between items-center py-4">
              <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Güncelleme Tarihi</span>
              <span className="text-sm text-gray-900 font-medium">🔄 13.08.2025 10:26</span>
            </div>
            <Separator className="bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
            <div className="flex justify-between items-center py-4">
              <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                {remainingDays >= 0 ? "Kalan Süre" : "Süre Aşımı"}
              </span>
              <div className="flex items-center gap-3">
                <span className={`text-sm font-bold ${remainingDays >= 0 ? "text-green-600" : "text-red-600"}`}>
                  {remainingDays >= 0 ? `${remainingDays} gün kaldı` : `${Math.abs(remainingDays)} gün geçti`}
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
