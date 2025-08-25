"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import { type User } from "@/lib/mock-data";

// Kullanıcı isminden baş harfleri çıkaran yardımcı fonksiyon
function getInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2); // Maksimum 2 harf
}

// Avatar rengi için hash fonksiyonu
function getAvatarColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  const colors = [
    'bg-blue-500',
    'bg-emerald-500', 
    'bg-purple-500',
    'bg-pink-500',
    'bg-orange-500',
    'bg-cyan-500',
    'bg-indigo-500',
    'bg-rose-500',
    'bg-teal-500',
    'bg-amber-500'
  ];
  
  return colors[Math.abs(hash) % colors.length];
}

interface FormData {
  firstName: string;
  lastName: string;
  username: string;
  contactInfo: {
    email: string;
    phone: string;
  };
  password: string;
  confirmPassword: string;
  title: string;
  department: string;
  isProjectManager: boolean;
  isActive: boolean;
  roles: string;
}

interface UserFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editUser?: User | null;
  mode?: 'create' | 'edit';
}

export function UserFormDialog({ open, onOpenChange, editUser, mode = 'create' }: UserFormDialogProps) {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    username: "",
    contactInfo: {
      email: "",
      phone: ""
    },
    password: "",
    confirmPassword: "",
    title: "",
    department: "",
    isProjectManager: false,
    isActive: true,
    roles: ""
  });

  // Load user data when editing
  useEffect(() => {
    if (mode === 'edit' && editUser && open) {
      const [firstName, ...lastNameParts] = editUser.name.split(' ');
      const lastName = lastNameParts.join(' ');
      
      setFormData({
        firstName: firstName || "",
        lastName: lastName || "",
        username: editUser.email.split('@')[0], // Extract username from email
        contactInfo: {
          email: editUser.email,
          phone: editUser.phone
        },
        password: "", // Don't pre-fill passwords for security
        confirmPassword: "",
        title: editUser.role || "",
        department: "",
        isProjectManager: editUser.role === 'Project Manager',
        isActive: editUser.status === 'Aktif',
        roles: editUser.role || ""
      });
    } else if (mode === 'create') {
      resetFormData();
    }
  }, [mode, editUser, open]);

  const handleInputChange = (field: string, value: string | boolean) => {
    if (field === 'contactInfo.email') {
      setFormData(prev => ({
        ...prev,
        contactInfo: {
          ...prev.contactInfo,
          email: value as string
        }
      }));
    } else if (field === 'contactInfo.phone') {
      setFormData(prev => ({
        ...prev,
        contactInfo: {
          ...prev.contactInfo,
          phone: value as string
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const resetFormData = () => {
    setFormData({
      firstName: "",
      lastName: "",
      username: "",
      contactInfo: {
        email: "",
        phone: ""
      },
      password: "",
      confirmPassword: "",
      title: "",
      department: "",
      isProjectManager: false,
      isActive: true,
      roles: ""
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic here
    console.log("Form data:", formData);
    onOpenChange(false);
  };

  const handleCancel = () => {
    resetFormData();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader className="bg-slate-600 text-white -m-6 mb-6 p-4 rounded-t-lg">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg font-semibold">
              {mode === 'edit' ? 'Kullanıcı Düzenle' : 'Kullanıcı Kayıt'}
            </DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onOpenChange(false)}
              className="text-white hover:bg-slate-500 p-1"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Avatar Preview */}
          <div className="flex justify-center mb-6">
            <Avatar className="w-20 h-20 shadow-lg">
              <AvatarFallback className={`${getAvatarColor(`${formData.firstName} ${formData.lastName}`)} text-white text-2xl font-bold`}>
                {getInitials(`${formData.firstName} ${formData.lastName}`)}
              </AvatarFallback>
            </Avatar>
          </div>

          {/* Ad-Soyad Row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ad-Soyad
              </label>
              <Input
                type="text"
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                className="w-full"
                placeholder="Ad"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                &nbsp;
              </label>
              <Input
                type="text"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                className="w-full"
                placeholder="Soyad"
              />
            </div>
          </div>

          {/* Kullanıcı Adı */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Kullanıcı Adı
            </label>
            <Input
              type="text"
              value={formData.username}
              onChange={(e) => handleInputChange('username', e.target.value)}
              className="w-full"
              placeholder="Kullanıcı Adı"
            />
          </div>

          {/* İletişim Bilgileri */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              İletişim Bilgileri
            </label>
            <div className="grid grid-cols-2 gap-4">
              <Input
                type="email"
                placeholder="E-Posta Adresi"
                value={formData.contactInfo.email}
                onChange={(e) => handleInputChange('contactInfo.email', e.target.value)}
                className="w-full"
              />
              <Input
                type="tel"
                placeholder="Telefon"
                value={formData.contactInfo.phone}
                onChange={(e) => handleInputChange('contactInfo.phone', e.target.value)}
                className="w-full"
              />
            </div>
          </div>

          {/* Şifre */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Şifre
            </label>
            <div className="grid grid-cols-2 gap-4">
              <Input
                type="password"
                placeholder="Şifre"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className="w-full"
              />
              <Input
                type="password"
                placeholder="Şifre Tekrar"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                className="w-full"
              />
            </div>
          </div>

          {/* İş Bilgileri */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              İş Bilgileri
            </label>
            <div className="grid grid-cols-2 gap-4">
              <Input
                type="text"
                placeholder="Unvan"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="w-full"
              />
              <Input
                type="text"
                placeholder="Departman"
                value={formData.department}
                onChange={(e) => handleInputChange('department', e.target.value)}
                className="w-full"
              />
            </div>
          </div>

          {/* Radio Buttons */}
          <div className="space-y-4">
            {/* Proje Yöneticisi mi? */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Proje Yöneticisi mi?
              </label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="isProjectManager"
                    checked={!formData.isProjectManager}
                    onChange={() => handleInputChange('isProjectManager', false)}
                    className="mr-2"
                  />
                  Evet
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="isProjectManager"
                    checked={formData.isProjectManager}
                    onChange={() => handleInputChange('isProjectManager', true)}
                    className="mr-2"
                  />
                  Hayır
                </label>
              </div>
            </div>

            {/* Aktif mi? */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Aktif mi?
              </label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={() => handleInputChange('isActive', true)}
                    className="mr-2"
                  />
                  Evet
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="isActive"
                    checked={!formData.isActive}
                    onChange={() => handleInputChange('isActive', false)}
                    className="mr-2"
                  />
                  Hayır
                </label>
              </div>
            </div>
          </div>

          {/* Roller */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Roller
            </label>
            <select 
              value={formData.roles}
              onChange={(e) => handleInputChange('roles', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Bir veya daha fazla seçenek seçin</option>
              <option value="admin">Yönetici</option>
              <option value="project_manager">Proje Yöneticisi</option>
              <option value="developer">Geliştirici</option>
              <option value="designer">Tasarımcı</option>
              <option value="tester">Test Uzmanı</option>
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
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
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-6"
            >
              {mode === 'edit' ? 'Güncelle' : 'Oluştur'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
