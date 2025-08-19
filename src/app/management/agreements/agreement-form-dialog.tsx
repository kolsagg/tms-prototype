"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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
import { mockCustomers, type Agreement } from "@/lib/mock-data";

interface AgreementFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingAgreement?: Agreement;
  isEditMode?: boolean;
}

export function AgreementFormDialog({ 
  open, 
  onOpenChange,
  editingAgreement,
  isEditMode = false
}: AgreementFormDialogProps) {
  const [formData, setFormData] = useState({
    customerInfo: "",
    agreementNumber: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  // Update form data when editingAgreement changes
  useEffect(() => {
    if (editingAgreement && isEditMode) {
      // Convert DD.MM.YYYY to YYYY-MM-DD for date inputs
      const convertToInputDate = (dateStr: string) => {
        const [day, month, year] = dateStr.split('.');
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
      };

      setFormData({
        customerInfo: editingAgreement.customerInfo,
        agreementNumber: editingAgreement.agreementNumber,
        startDate: convertToInputDate(editingAgreement.startDate),
        endDate: convertToInputDate(editingAgreement.endDate),
        description: "",
      });
    } else if (!isEditMode) {
      setFormData({
        customerInfo: "",
        agreementNumber: "",
        startDate: "",
        endDate: "",
        description: "",
      });
    }
  }, [editingAgreement, isEditMode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Agreement form data:", formData);
    onOpenChange(false);
    // Reset form
    setFormData({
      customerInfo: "",
      agreementNumber: "",
      startDate: "",
      endDate: "",
      description: "",
    });
  };

  const handleCancel = () => {
    setFormData({
      customerInfo: "",
      agreementNumber: "",
      startDate: "",
      endDate: "",
      description: "",
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader className="p-4 -m-6 mb-6">
          <DialogTitle className="text-lg font-semibold">
            {isEditMode ? "Sözleşme Düzenleme" : "Sözleşme Kaydı"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 px-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="customerInfo" className="text-sm font-medium block">
                Müşteri Bilgisi
              </label>
              <Select
                value={formData.customerInfo}
                onValueChange={(value) =>
                  setFormData({ ...formData, customerInfo: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="-- Seçiniz --" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {mockCustomers.map((customer) => (
                    <SelectItem key={customer.id} value={customer.name}
                    className="hover:bg-gray-100">
                      {customer.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label htmlFor="agreementNumber" className="text-sm font-medium block">
                Sözleşme Numarası
              </label>
              <Input
                id="agreementNumber"
                value={formData.agreementNumber}
                onChange={(e) =>
                  setFormData({ ...formData, agreementNumber: e.target.value })
                }
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="startDate" className="text-sm font-medium block">
                Başlangıç Tarihi
              </label>
              <div className="relative">
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) =>
                    setFormData({ ...formData, startDate: e.target.value })
                  }
                  className="w-full"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="endDate" className="text-sm font-medium block">
                Bitiş Tarihi
              </label>
              <div className="relative">
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) =>
                    setFormData({ ...formData, endDate: e.target.value })
                  }
                  className="w-full"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium block">
              Açıklama
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full min-h-[100px] resize-none border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={4}
            />
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t">
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
              className="bg-green-600 hover:bg-green-700 text-white px-6"
            >
              {isEditMode ? "Güncelle" : "Oluştur"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
