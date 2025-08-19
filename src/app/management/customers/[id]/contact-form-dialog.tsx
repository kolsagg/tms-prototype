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

interface Contact {
  id: number;
  fullName: string;
  title: string;
  phone: string;
  email: string;
}

interface ContactFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (contact: Omit<Contact, "id">) => void;
  isEdit?: boolean;
  editingContact?: Contact;
  onUpdate?: (contact: Contact) => void;
}

export function ContactFormDialog({
  open,
  onOpenChange,
  onSubmit,
  isEdit = false,
  editingContact,
  onUpdate,
}: ContactFormDialogProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    title: "",
    phone: "",
    email: "",
  });

  // Edit mode için form verilerini doldur
  useEffect(() => {
    if (isEdit && editingContact) {
      setFormData({
        fullName: editingContact.fullName || "",
        title: editingContact.title || "",
        phone: editingContact.phone || "",
        email: editingContact.email || "",
      });
    } else {
      setFormData({
        fullName: "",
        title: "",
        phone: "",
        email: "",
      });
    }
  }, [isEdit, editingContact]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName.trim()) {
      alert("Ad Soyad alanı zorunludur.");
      return;
    }

    if (!formData.email.trim()) {
      alert("E-Mail alanı zorunludur.");
      return;
    }

    // E-mail format kontrolü
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("Geçerli bir e-mail adresi giriniz.");
      return;
    }

    if (isEdit && editingContact && onUpdate) {
      // Edit mode - güncelleme
      onUpdate({
        ...editingContact,
        fullName: formData.fullName,
        title: formData.title,
        phone: formData.phone,
        email: formData.email,
      });
    } else {
      // Create mode - yeni kayıt
      onSubmit({
        fullName: formData.fullName,
        title: formData.title,
        phone: formData.phone,
        email: formData.email,
      });
    }

    // Reset form
    setFormData({
      fullName: "",
      title: "",
      phone: "",
      email: "",
    });
    onOpenChange(false);
  };

  const handleCancel = () => {
    // Reset form
    setFormData({
      fullName: "",
      title: "",
      phone: "",
      email: "",
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-white">
        <DialogHeader>
          <DialogTitle className="text-slate-700 font-semibold">
            {isEdit ? "İletişim Bilgisi Düzenle" : "Yeni İletişim Bilgisi"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Adı Soyadı */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">
                Adı Soyadı *
              </label>
              <Input
                required
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                placeholder="Adı Soyadı"
                className="bg-white border-slate-200"
              />
            </div>

            {/* Unvan */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">
                Unvan
              </label>
              <Input
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="Unvan"
                className="bg-white border-slate-200"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

            {/* E-Mail */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">
                E-Mail *
              </label>
              <Input
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="E-Mail"
                className="bg-white border-slate-200"
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
