"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { X } from "lucide-react";
import { mockJobTypes, mockUsers } from "@/lib/mock-data";
import { useEffect } from "react";

interface TaskFormDialogProps {
  trigger: React.ReactNode;
  editTask?: {
    id: number;
    project: string;
    title: string;
    assignee?: string;
    priority: "low" | "medium" | "high";
    startDate: string;
    endDate: string;
    estimateHours: number;
    description?: string;
  };
}

export function TaskFormDialog({ trigger, editTask }: TaskFormDialogProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    jobType: editTask ? "1" : "", // Mock job type ID
    assignee: editTask?.assignee ? "1" : "", // Mock assignee ID
    title: editTask?.title || "",
    description: editTask?.description || "",
    priority: editTask?.priority || "",
    tags: "",
    startDate: editTask?.startDate ? convertDateFormat(editTask.startDate) : "",
    endDate: editTask?.endDate ? convertDateFormat(editTask.endDate) : "",
    deliveryDate: "",
    targetDate: "",
    estimatedHours: editTask?.estimateHours?.toString() || "",
    targetHours: "",
  });

  // DD.MM.YYYY formatını YYYY-MM-DD formatına çevirir
  function convertDateFormat(dateString: string): string {
    const [day, month, year] = dateString.split('.');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  }

  // EditTask değiştiğinde formu güncelle
  useEffect(() => {
    if (editTask) {
      setFormData({
        jobType: "1", // Mock job type ID
        assignee: editTask.assignee ? "1" : "", // Mock assignee ID
        title: editTask.title,
        description: editTask.description || "",
        priority: editTask.priority,
        tags: "",
        startDate: convertDateFormat(editTask.startDate),
        endDate: convertDateFormat(editTask.endDate),
        deliveryDate: "",
        targetDate: "",
        estimatedHours: editTask.estimateHours.toString(),
        targetHours: "",
      });
    } else {
      setFormData({
        jobType: "",
        assignee: "",
        title: "",
        description: "",
        priority: "",
        tags: "",
        startDate: "",
        endDate: "",
        deliveryDate: "",
        targetDate: "",
        estimatedHours: "",
        targetHours: "",
      });
    }
  }, [editTask]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    // Form gönderme işlemi burada yapılacak
    console.log("Form data:", formData);
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
    // Form verilerini sıfırla
    setFormData({
      jobType: "",
      assignee: "",
      title: "",
      description: "",
      priority: "",
      tags: "",
      startDate: "",
      endDate: "",
      deliveryDate: "",
      targetDate: "",
      estimatedHours: "",
      targetHours: "",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-lg font-semibold">
            {editTask ? "Görev Düzenle" : "Yeni Görev"}
          </DialogTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCancel}
            className="h-6 w-6 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <div className="space-y-4">
          {/* İş Türü ve Atanan Kişi */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                İş Türü
              </label>
              <Select
                value={formData.jobType}
                onValueChange={(value) => handleInputChange("jobType", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="-- Seçiniz --" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {mockJobTypes.map((jobType) => (
                    <SelectItem key={jobType.id} value={jobType.id}>
                      {jobType.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Atanan Kişi (Assignee)
              </label>
              <Select
                value={formData.assignee}
                onValueChange={(value) => handleInputChange("assignee", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="-- Seçiniz --" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {mockUsers.map((user) => (
                    <SelectItem key={user.id} value={user.id}>
                      {user.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Başlık */}
          <div>
            <label className="text-sm font-medium mb-2 block">
              Başlık
            </label>
            <Input
              placeholder="Görev başlığını girin"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
            />
          </div>

          {/* Açıklama */}
          <div>
            <label className="text-sm font-medium mb-2 block">
              Açıklama
            </label>
            <textarea
              className="w-full min-h-[100px] px-3 py-2 border border-input bg-background rounded-md text-sm resize-vertical focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              placeholder="Görev açıklamasını girin"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
            />
          </div>

          {/* Öncelik */}
          <div>
            <label className="text-sm font-medium mb-2 block">
              Öncelik
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="priority"
                  value="low"
                  checked={formData.priority === "low"}
                  onChange={(e) => handleInputChange("priority", e.target.value)}
                  className="text-emerald-600 focus:ring-emerald-500"
                />
                <span className="text-sm">Düşük</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="priority"
                  value="medium"
                  checked={formData.priority === "medium"}
                  onChange={(e) => handleInputChange("priority", e.target.value)}
                  className="text-emerald-600 focus:ring-emerald-500"
                />
                <span className="text-sm">Normal</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="priority"
                  value="high"
                  checked={formData.priority === "high"}
                  onChange={(e) => handleInputChange("priority", e.target.value)}
                  className="text-emerald-600 focus:ring-emerald-500"
                />
                <span className="text-sm">Yüksek</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="priority"
                  value="critical"
                  checked={formData.priority === "critical"}
                  onChange={(e) => handleInputChange("priority", e.target.value)}
                  className="text-emerald-600 focus:ring-emerald-500"
                />
                <span className="text-sm">Kritik</span>
              </label>
            </div>
          </div>

          {/* Etiketler */}
          <div>
            <label className="text-sm font-medium mb-2 block">
              Etiketler (Virgülle ayırınız)
            </label>
            <Input
              placeholder="frontend, react, ui"
              value={formData.tags}
              onChange={(e) => handleInputChange("tags", e.target.value)}
            />
          </div>

          {/* Tarih Alanları */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Başlangıç Tarihi
              </label>
              <Input
                type="date"
                value={formData.startDate}
                onChange={(e) => handleInputChange("startDate", e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Bitiş Tarihi
              </label>
              <Input
                type="date"
                value={formData.endDate}
                onChange={(e) => handleInputChange("endDate", e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Teslim Tarihi
              </label>
              <Input
                type="date"
                value={formData.deliveryDate}
                onChange={(e) => handleInputChange("deliveryDate", e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Hedef Tarih
              </label>
              <Input
                type="date"
                value={formData.targetDate}
                onChange={(e) => handleInputChange("targetDate", e.target.value)}
              />
            </div>
          </div>

          {/* Saat Alanları */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Tahmini Süre (saat)
              </label>
              <Input
                type="number"
                placeholder="0"
                value={formData.estimatedHours}
                onChange={(e) => handleInputChange("estimatedHours", e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Hedef Süre (saat)
              </label>
              <Input
                type="number"
                placeholder="0"
                value={formData.targetHours}
                onChange={(e) => handleInputChange("targetHours", e.target.value)}
              />
            </div>
          </div>

          {/* Butonlar */}
          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button
              variant="outline"
              onClick={handleCancel}
            >
              Vazgeç
            </Button>
            <Button
              onClick={handleSubmit}
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              {editTask ? "Güncelle" : "Oluştur"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
