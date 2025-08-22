"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, X } from "lucide-react"
import { ProjectMilestone } from "@/lib/mock-data"

interface MilestoneEditDialogProps {
  milestone?: ProjectMilestone
  open: boolean
  onClose: () => void
  onSave?: (milestone: ProjectMilestone) => void
}

export function MilestoneEditDialog({ milestone, open, onClose, onSave }: MilestoneEditDialogProps) {
  const [formData, setFormData] = useState({
    title: "",
    completionDate: "",
    stageType: "",
    billingType: "",
    amount: "",
    kdvRate: "",
    currency: "EUR"
  })

  // Load milestone data when dialog opens
  useEffect(() => {
    if (milestone && open) {
      setFormData({
        title: milestone.title || "",
        completionDate: milestone.completionDate || "",
        stageType: milestone.stageType || "",
        billingType: milestone.billingType || "",
        amount: milestone.amount?.toString() || "",
        kdvRate: milestone.kdvRate?.toString() || "",
        currency: "EUR" // Default currency, could be extended to save/load from milestone
      })
    }
  }, [milestone, open])

  const stageTypes = [
    { value: "Aşama / Milestone", label: "Aşama / Milestone" },
    { value: "Bakım / Servis", label: "Bakım / Servis" }
  ]

  const billingTypes = [
    { value: "Faturalandırılmayacak", label: "Faturalandırılmayacak" },
    { value: "Sabit Fiyat", label: "Sabit Fiyat" },
    { value: "Adam/Ay", label: "Adam/Ay" },
    { value: "Adam/Gün", label: "Adam/Gün" },
    { value: "Adam/Saat", label: "Adam/Saat" },
    { value: "Milestone/Aşama", label: "Milestone/Aşama" }
  ]

  const currencies = [
    { value: "EUR", label: "EUR" },
    { value: "TL", label: "TL" },
    { value: "USD", label: "USD" },
    { value: "GBP", label: "GBP" }
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const updatedMilestone: ProjectMilestone = {
      id: milestone?.id || Date.now(),
      title: formData.title,
      completionDate: formData.completionDate,
      stageType: formData.stageType,
      billingType: formData.billingType,
      amount: parseFloat(formData.amount) || 0,
      kdvRate: parseFloat(formData.kdvRate) || 0,
      creationDate: milestone?.creationDate || new Date().toLocaleDateString('tr-TR')
    }

    onSave?.(updatedMilestone)
    onClose()
  }

  const handleCancel = () => {
    // Reset form when canceling
    setFormData({
      title: "",
      completionDate: "",
      stageType: "",
      billingType: "",
      amount: "",
      kdvRate: "",
      currency: "EUR"
    })
    onClose()
  }

  // Format date for date input (convert DD.MM.YYYY to YYYY-MM-DD)
  const formatDateForInput = (dateStr: string) => {
    if (!dateStr) return ""
    const parts = dateStr.split(".")
    if (parts.length === 3) {
      return `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`
    }
    return dateStr
  }

  // Format date for display (convert YYYY-MM-DD to DD.MM.YYYY)
  const formatDateForDisplay = (dateStr: string) => {
    if (!dateStr) return ""
    const parts = dateStr.split("-")
    if (parts.length === 3) {
      return `${parts[2]}.${parts[1]}.${parts[0]}`
    }
    return dateStr
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl mx-auto bg-white">
        <DialogHeader className="flex flex-row items-center justify-between border-b border-gray-200 pb-4">
          <DialogTitle className="text-lg font-semibold text-gray-800">
            Bölüm Güncelle
          </DialogTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-6 w-6 p-0 hover:bg-gray-100"
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          <Card className="bg-gray-50 border-gray-200">
            <CardContent className="p-4 space-y-4">
              {/* Başlık */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  Başlık
                </label>
                <Input
                  type="text"
                  placeholder="geliştirmeler"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({...prev, title: e.target.value}))}
                  className="bg-white"
                  required
                />
              </div>

              {/* Bitiş Tarihi */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  Bitiş Tarihi
                </label>
                <div className="relative">
                  <Input
                    type="date"
                    value={formatDateForInput(formData.completionDate)}
                    onChange={(e) => setFormData(prev => ({...prev, completionDate: formatDateForDisplay(e.target.value)}))}
                    className="bg-white pr-10"
                  />
                  <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </div>

              {/* Aşama Türü */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  Aşama Türü
                </label>
                <Select 
                  value={formData.stageType} 
                  onValueChange={(value) => setFormData(prev => ({...prev, stageType: value}))}
                >
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Aşama / Milestone" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    {stageTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Faturalama Tipi */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  Faturalama Tipi
                </label>
                <Select 
                  value={formData.billingType} 
                  onValueChange={(value) => setFormData(prev => ({...prev, billingType: value}))}
                >
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Adam/Gün" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    {billingTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Birim Fiyat */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  Birim Fiyat
                </label>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="100"
                  value={formData.amount}
                  onChange={(e) => setFormData(prev => ({...prev, amount: e.target.value}))}
                  className="bg-white"
                />
              </div>

              {/* KDV Oranı */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  KDV Oranı
                </label>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="20"
                  value={formData.kdvRate}
                  onChange={(e) => setFormData(prev => ({...prev, kdvRate: e.target.value}))}
                  className="bg-white"
                />
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
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Euro" />
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
              Vazgeç
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
