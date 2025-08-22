"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { FileText } from "lucide-react"

interface PricingFormDialogProps {
  projectCompany?: string
  trigger?: React.ReactNode
}

export function PricingFormDialog({ projectCompany = "ConcentIT Ltd. Şti.", trigger }: PricingFormDialogProps) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    invoiceCompany: projectCompany,
    invoiceType: "",
    currency: "",
    unitPrice: "",
    kdvRate: "",
    stopajRate: ""
  })

  const invoiceTypes = [
    { value: "faturalandirilmayacak", label: "Faturalandırılmayacak" },
    { value: "sabit-fiyat", label: "Sabit Fiyat" },
    { value: "adam-ay", label: "Adam/Ay" },
    { value: "adam-gun", label: "Adam/Gün" },
    { value: "adam-saat", label: "Adam/Saat" },
    { value: "milestone-asama", label: "Milestone/Aşama" }
  ]

  const currencies = [
    { value: "tl", label: "TL" },
    { value: "usd", label: "USD" },
    { value: "eur", label: "EUR" },
    { value: "gbp", label: "GBP" },
    { value: "diger", label: "Diğer" }
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Pricing data:", formData)
    setOpen(false)
  }

  const handleCancel = () => {
    setFormData({
      invoiceCompany: projectCompany,
      invoiceType: "",
      currency: "",
      unitPrice: "",
      kdvRate: "",
      stopajRate: ""
    })
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="bg-teal-500 hover:bg-teal-600 text-white text-sm px-4 py-2">
            Fiyatlandırma Ekle
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-lg mx-auto bg-white">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-teal-600" />
            <span>Fiyatlandırma Ekle</span>
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <Card className="bg-gray-50 border-gray-200">
            <CardContent className="p-4 space-y-4">
              {/* Fatura Edilecek Şirket */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  Fatura Edilecek Şirket
                </label>
                <Select 
                  value={formData.invoiceCompany} 
                  onValueChange={(value) => setFormData(prev => ({...prev, invoiceCompany: value}))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Şirket Seçiniz" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value={projectCompany}>{projectCompany}</SelectItem>
                    <SelectItem value="ConcentIT Ltd. Şti.">ConcentIT Ltd. Şti.</SelectItem>
                    <SelectItem value="ABC Yazılım A.Ş.">ABC Yazılım A.Ş.</SelectItem>
                    <SelectItem value="XYZ Teknoloji Ltd.">XYZ Teknoloji Ltd.</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Fatura Tipi */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  Fatura Tipi
                </label>
                <Select 
                  value={formData.invoiceType} 
                  onValueChange={(value) => setFormData(prev => ({...prev, invoiceType: value}))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Faturalandırılmayacak" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    {invoiceTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Para Birimi */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  Para Birimi
                </label>
                <Select 
                  value={formData.currency} 
                  onValueChange={(value) => setFormData(prev => ({...prev, currency: value}))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seçiniz" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    {currencies.map((currency) => (
                      <SelectItem key={currency.value} value={currency.value}>
                        {currency.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Fiyat / Birim Fiyat */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  Fiyat / Birim Fiyat
                </label>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="Fiyat / Birim Fiyat"
                  value={formData.unitPrice}
                  onChange={(e) => setFormData(prev => ({...prev, unitPrice: e.target.value}))}
                  className="bg-white"
                />
              </div>

              {/* KDV Oranı */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  KDV Oranı (%)
                </label>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="KDV Oranı (%)"
                  value={formData.kdvRate}
                  onChange={(e) => setFormData(prev => ({...prev, kdvRate: e.target.value}))}
                  className="bg-white"
                />
              </div>

              {/* Stopaj Oranı */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  Stopaj Oranı (%)
                </label>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="Stopaj Oranı (%)"
                  value={formData.stopajRate}
                  onChange={(e) => setFormData(prev => ({...prev, stopajRate: e.target.value}))}
                  className="bg-white"
                />
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleCancel}
              className="px-6"
            >
              İptal
            </Button>
            <Button 
              type="submit" 
              className="bg-teal-500 hover:bg-teal-600 text-white px-6"
            >
              Kaydet
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
