"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Invoice {
  id: number;
  title: string;
  taxOffice: string;
  taxNumber: string;
  address: string;
}

interface InvoiceFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (invoice: Omit<Invoice, "id">) => void;
  isEdit?: boolean;
  editingInvoice?: Invoice;
  onUpdate?: (invoice: Invoice) => void;
}

export function InvoiceFormDialog({
  open,
  onOpenChange,
  onSubmit,
  isEdit = false,
  editingInvoice,
  onUpdate,
}: InvoiceFormDialogProps) {
  const [formData, setFormData] = useState({
    title: "",
    taxOffice: "",
    taxNumber: "",
    address: "",
  });

  // Edit mode için form verilerini doldur
  useEffect(() => {
    if (isEdit && editingInvoice) {
      setFormData({
        title: editingInvoice.title || "",
        taxOffice: editingInvoice.taxOffice || "",
        taxNumber: editingInvoice.taxNumber || "",
        address: editingInvoice.address || "",
      });
    } else {
      setFormData({
        title: "",
        taxOffice: "",
        taxNumber: "",
        address: "",
      });
    }
  }, [isEdit, editingInvoice]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      alert("Başlık alanı zorunludur.");
      return;
    }

    if (!formData.taxOffice.trim()) {
      alert("Vergi Dairesi alanı zorunludur.");
      return;
    }

    if (!formData.taxNumber.trim()) {
      alert("Vergi Numarası alanı zorunludur.");
      return;
    }

    // Vergi numarası format kontrolü (basit)
    if (formData.taxNumber.length < 10) {
      alert("Vergi numarası en az 10 karakter olmalıdır.");
      return;
    }

    if (isEdit && editingInvoice && onUpdate) {
      // Edit mode - güncelleme
      onUpdate({
        ...editingInvoice,
        title: formData.title,
        taxOffice: formData.taxOffice,
        taxNumber: formData.taxNumber,
        address: formData.address,
      });
    } else {
      // Create mode - yeni kayıt
      onSubmit({
        title: formData.title,
        taxOffice: formData.taxOffice,
        taxNumber: formData.taxNumber,
        address: formData.address,
      });
    }

    // Reset form
    setFormData({
      title: "",
      taxOffice: "",
      taxNumber: "",
      address: "",
    });
    onOpenChange(false);
  };

  const handleCancel = () => {
    // Reset form
    setFormData({
      title: "",
      taxOffice: "",
      taxNumber: "",
      address: "",
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-white">
        <DialogHeader>
          <DialogTitle className="text-slate-700 font-semibold">
            {isEdit ? "Fatura Bilgisi Düzenle" : "Yeni Fatura Bilgisi"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Başlık */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">
                Başlık *
              </label>
              <Input
                required
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="Başlık"
                className="bg-white border-slate-200"
              />
            </div>

            {/* Vergi Dairesi */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">
                Vergi Dairesi *
              </label>
              <Input
                required
                value={formData.taxOffice}
                onChange={(e) =>
                  setFormData({ ...formData, taxOffice: e.target.value })
                }
                placeholder="Vergi Dairesi"
                className="bg-white border-slate-200"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Vergi Numarası */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">
                Vergi Numarası *
              </label>
              <Input
                required
                value={formData.taxNumber}
                onChange={(e) =>
                  setFormData({ ...formData, taxNumber: e.target.value })
                }
                placeholder="Vergi Numarası"
                className="bg-white border-slate-200"
              />
            </div>

            {/* Adres */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">
                Adres
              </label>
              <textarea
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                placeholder="Adres"
                rows={3}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md bg-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
              />
            </div>
          </div>

          <DialogFooter className="flex gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              className="flex-1 border-slate-200 hover:bg-slate-100"
            >
              Vazgeç
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              {isEdit ? "Güncelle" : "Oluştur"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
