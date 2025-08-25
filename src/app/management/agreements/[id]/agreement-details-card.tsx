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
        return "bg-green-100 text-green-800"
      case "expired":
        return "bg-red-100 text-red-800"
      case "draft":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
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

  return (
    <Card className="bg-white border border-gray-200 rounded-lg shadow-sm">
      <CardHeader className="border-b border-gray-200 px-6 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <CardTitle className="text-lg font-semibold text-gray-900">{agreement.customerInfo}</CardTitle>
          <div className="flex gap-3">
            <Badge className={`border-0 px-3 py-1 text-sm font-medium ${getStatusColor(agreement.status)}`}>
              {getStatusText(agreement.status)}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sol Kolon - Müşteri Bilgileri */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-600 mb-4">Müşteri Adı:</h3>
            <div className="text-base font-semibold text-green-600 mb-6">
              {agreement.customerInfo}
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-600">Adres:</label>
                <div className="text-sm text-gray-900 mt-1">
                  Küçükbakkalköy Mah. Vedat Günyol Cad, Defne Sk No:1 Kat:24<br />
                  No: 2401-2402 Ataşehir/İstanbul
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">E-Posta:</label>
                <div className="text-sm text-gray-900 mt-1">
                  contact@concentit.com
                </div>
              </div>
            </div>
          </div>

          {/* Orta Kolon - İletişim Bilgileri */}
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-600">Telefon:</label>
              <div className="text-sm text-gray-900 mt-1">
                0 545 842 0511
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600">Açıklama:</label>
              <div className="text-sm text-gray-900 mt-1">
                IT Danışmanlık
              </div>
            </div>
          </div>

          {/* Sağ Kolon - Tarih Bilgileri */}
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-600">İşlem Tarihi:</label>
              <div className="text-sm text-gray-900 mt-1">
                15.01.2024 09:30
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600">Güncelleme Tarihi:</label>
              <div className="text-sm text-gray-900 mt-1">
                20.05.2024 14:15
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-6 bg-gray-200" />
        
        {/* Alt Bölüm - Sözleşme Detayları */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <label className="text-sm font-medium text-gray-600">Sözleşme Numarası:</label>
            <div className="text-sm font-mono text-gray-900 mt-1">
              {agreement.agreementNumber}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">Başlangıç Tarihi:</label>
            <div className="text-sm text-gray-900 mt-1">
              {agreement.startDate}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">Bitiş Tarihi:</label>
            <div className="text-sm text-gray-900 mt-1">
              {agreement.endDate}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">Kalan Süre:</label>
            <div className={`text-sm font-medium mt-1 ${remainingDays >= 0 ? "text-green-600" : "text-red-600"}`}>
              {remainingDays >= 0 ? `${remainingDays} gün kaldı` : `${Math.abs(remainingDays)} gün geçti`}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
