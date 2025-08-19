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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Customer {
  id: number;
  name: string;
  relatedCustomer?: string;
  phone?: string;
  email?: string;
  address?: string;
}

interface CustomerFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  existingCustomers: Customer[];
  onSubmit: (customer: Omit<Customer, "id">) => void;
  isEdit?: boolean;
  editingCustomer?: Customer;
  onUpdate?: (customer: Customer) => void;
}

export function CustomerFormDialog({
  open,
  onOpenChange,
  existingCustomers,
  onSubmit,
  isEdit = false,
  editingCustomer,
  onUpdate,
}: CustomerFormDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    relatedCustomer: "",
    phone: "",
    email: "",
    address: "",
    description: "",
  });

  // Edit mode için form verilerini doldur
  useEffect(() => {
    if (isEdit && editingCustomer) {
      setFormData({
        name: editingCustomer.name || "",
        relatedCustomer: editingCustomer.relatedCustomer || "",
        phone: editingCustomer.phone || "",
        email: editingCustomer.email || "",
        address: editingCustomer.address || "",
        description: "",
      });
    } else {
      setFormData({
        name: "",
        relatedCustomer: "",
        phone: "",
        email: "",
        address: "",
        description: "",
      });
    }
  }, [isEdit, editingCustomer]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      alert("Müşteri adı zorunludur.");
      return;
    }

    if (isEdit && editingCustomer && onUpdate) {
      // Edit mode - güncelleme
      onUpdate({
        ...editingCustomer,
        name: formData.name,
        relatedCustomer: formData.relatedCustomer || undefined,
        phone: formData.phone || undefined,
        email: formData.email || undefined,
        address: formData.address || undefined,
      });
    } else {
      // Create mode - yeni kayıt
      onSubmit({
        name: formData.name,
        relatedCustomer: formData.relatedCustomer || undefined,
        phone: formData.phone || undefined,
        email: formData.email || undefined,
        address: formData.address || undefined,
      });
    }

    // Reset form
    setFormData({
      name: "",
      relatedCustomer: "",
      phone: "",
      email: "",
      address: "",
      description: "",
    });
    onOpenChange(false);
  };

  const handleCancel = () => {
    // Reset form
    setFormData({
      name: "",
      relatedCustomer: "",
      phone: "",
      email: "",
      address: "",
      description: "",
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-white">
        <DialogHeader>
          <DialogTitle className="text-slate-700 font-semibold">
            {isEdit ? "Müşteri Düzenle" : "Müşteri Kayıt"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Müşteri Adı */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">
                Müşteri Adı *
              </label>
              <Input
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Müşteri adı"
                className="bg-white border-slate-200"
              />
            </div>

            {/* İlişkili Müşteri */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">
                İlişkili Müşteri
              </label>
              <Select
                value={formData.relatedCustomer}
                onValueChange={(value) =>
                  setFormData({ ...formData, relatedCustomer: value })
                }
              >
                <SelectTrigger className="bg-white border-slate-200">
                  <SelectValue placeholder="-- Seçiniz --" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {existingCustomers.map((customer) => (
                    <SelectItem
                      key={customer.id}
                      value={customer.name}
                      className="hover:bg-slate-100"
                    >
                      {customer.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* E-Posta Adresi */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">
                E-Posta Adresi
              </label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="E-Posta Adresi"
                className="bg-white border-slate-200"
              />
            </div>

            {/* Telefon */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">
                Telefon
              </label>
              <Input
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                placeholder="Telefon"
                className="bg-white border-slate-200"
              />
            </div>
          </div>

          {/* Adres */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Adres</label>
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

          {/* Açıklama */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
              Açıklama
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Açıklama"
              rows={3}
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md bg-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
            />
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
