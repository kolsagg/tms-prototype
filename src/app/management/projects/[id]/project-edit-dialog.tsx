"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Edit2 } from "lucide-react"
import { Project } from "@/lib/mock-data"

interface ProjectEditDialogProps {
  project: Project
  trigger?: React.ReactNode
}

export function ProjectEditDialog({ project, trigger }: ProjectEditDialogProps) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    customer: project.customer || "",
    agreement: "-- Seçiniz --",
    projectName: project.name || "",
    projectNumber: project.projectNumber || "",
    projectColor: project.id || "",
    projectManager: "Alper Atak",
    billingType: project.fabricationTime || "",
    startDate: "01.08.2025",
    endDate: "01.08.2026",
    description: "Geliştirmeler",
    status: project.status || "Aktif"
  })

  const customers = [
    "Ismail Ali Abudawood Trading Company Limited",
    "ConcentIT Ltd. Şti.",
    "ABC Yazılım A.Ş.",
    "XYZ Teknoloji Ltd."
  ]

  const projectManagers = [
    "Alper Atak",
    "Mehmet Kaya",
    "Ayşe Demir",
    "Fatma Yılmaz"
  ]

  const billingTypes = [
    "Task/Milestone Bazlı",
    "Faturalandırılmayacak",
    "Sabit Fiyat",
    "Adam/Ay",
    "Adam/Gün",
    "Adam/Saat"
  ]

  const statuses = [
    "Taslak",
    "Aktif", 
    "Tamamlandı",
    "İptal Edildi"
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Project update data:", formData)
    setOpen(false)
  }

  const handleCancel = () => {
    // Reset form data to original project data
    setFormData({
      customer: project.customer || "",
      agreement: "-- Seçiniz --",
      projectName: project.name || "",
      projectNumber: project.projectNumber || "",
      projectColor: project.id || "",
      projectManager: "Alper Atak",
      billingType: project.fabricationTime || "",
      startDate: "01.08.2025",
      endDate: "01.08.2026",
      description: "Geliştirmeler",
      status: project.status || "Aktif"
    })
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="secondary" size="sm" className="border text-s hover:bg-gray-300">
            <Edit2 className="h-3 w-3 mr-1" />
            Düzenle
          </Button>
        )}
      </DialogTrigger>
      <DialogContent 
        className="max-w-5xl w-[90vw] h-[90vh] mx-auto bg-white overflow-y-auto !max-w-none"
        style={{ maxWidth: '1200px', width: '90vw', maxHeight: '90vh' }}
      >
        <DialogHeader className="bg-slate-700 text-white p-4 -mx-6 -mt-6 mb-6">
          <DialogTitle className="text-lg font-semibold">
            Proje Düzenle
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 px-2">
          {/* First Row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            {/* Müşteri */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Müşteri (Şirket)
              </label>
              <Select 
                value={formData.customer} 
                onValueChange={(value) => setFormData(prev => ({...prev, customer: value}))}
              >
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Müşteri seçiniz" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {customers.map((customer) => (
                    <SelectItem key={customer} value={customer} className="bg-white hover:bg-gray-50">
                      {customer}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Sözleşme */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Sözleşme
              </label>
              <Select 
                value={formData.agreement} 
                onValueChange={(value) => setFormData(prev => ({...prev, agreement: value}))}
              >
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="-- Seçiniz --" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="-- Seçiniz --" className="bg-white hover:bg-gray-50">-- Seçiniz --</SelectItem>
                  <SelectItem value="Sözleşme 1" className="bg-white hover:bg-gray-50">Sözleşme 1</SelectItem>
                  <SelectItem value="Sözleşme 2" className="bg-white hover:bg-gray-50">Sözleşme 2</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Proje Adı */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Proje Adı
              </label>
              <Input
                value={formData.projectName}
                onChange={(e) => setFormData(prev => ({...prev, projectName: e.target.value}))}
                className="bg-white"
                placeholder="Proje adını giriniz"
              />
            </div>
          </div>

          {/* Second Row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            {/* Proje Numarası */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Proje Numarası
              </label>
              <Input
                value={formData.projectNumber}
                onChange={(e) => setFormData(prev => ({...prev, projectNumber: e.target.value}))}
                className="bg-white"
                placeholder="Proje numarası"
              />
            </div>

            {/* Proje Rengi */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Proje Rengi
              </label>
              <Input
                value={formData.projectColor}
                onChange={(e) => setFormData(prev => ({...prev, projectColor: e.target.value}))}
                className="bg-white"
                placeholder="#020160"
              />
            </div>

            {/* Proje Yöneticisi */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Proje Yöneticisi
              </label>
              <Select 
                value={formData.projectManager} 
                onValueChange={(value) => setFormData(prev => ({...prev, projectManager: value}))}
              >
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Yönetici seçiniz" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {projectManagers.map((manager) => (
                    <SelectItem key={manager} value={manager} className="bg-white hover:bg-gray-50">
                      {manager}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Third Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Satış/Faturalama Tipi */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Satış/Faturalama Tipi
              </label>
              <Select 
                value={formData.billingType} 
                onValueChange={(value) => setFormData(prev => ({...prev, billingType: value}))}
              >
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Faturalama tipi seçiniz" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {billingTypes.map((type) => (
                    <SelectItem key={type} value={type} className="bg-white hover:bg-gray-50">
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Proje Durumu */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Proje Durumu
              </label>
              <div className="flex space-x-4">
                {statuses.map((status) => (
                  <label key={status} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="status"
                      value={status}
                      checked={formData.status === status}
                      onChange={(e) => setFormData(prev => ({...prev, status: e.target.value as "Aktif" | "Tamamlandı" | "Pasif"}))}
                      className="text-blue-600"
                    />
                    <span className="text-sm text-gray-700">{status}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Fourth Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Başlangıç Tarihi */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Başlangıç Tarihi
              </label>
              <Input
                type="date"
                value="2025-08-01"
                onChange={(e) => setFormData(prev => ({...prev, startDate: e.target.value}))}
                className="bg-white"
              />
            </div>

            {/* Bitiş Tarihi */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Bitiş Tarihi
              </label>
              <Input
                type="date"
                value="2026-08-01"
                onChange={(e) => setFormData(prev => ({...prev, endDate: e.target.value}))}
                className="bg-white"
              />
            </div>

            {/* Empty column for spacing */}
            <div></div>
          </div>

          {/* Açıklama */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">
              Açıklama
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({...prev, description: e.target.value}))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              rows={4}
              placeholder="Proje açıklaması..."
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleCancel}
              className="px-6 bg-white"
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
