"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";

interface LeaveFormData {
    leaveType: string;
    employee: string;
    status: string;
    startDate: string;
    endDate: string;
    description: string;
}

interface LeaveFormDialogProps {
    trigger: React.ReactNode;
    editData?: LeaveFormData;
    isEdit?: boolean;
}

export function LeaveFormDialog({
    trigger,
    editData,
    isEdit = false,
}: LeaveFormDialogProps) {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState<LeaveFormData>({
        leaveType: "",
        employee: "",
        status: "Beklemede",
        startDate: "",
        endDate: "",
        description: "",
    });

    useEffect(() => {
        if (editData && isEdit) {
            setFormData(editData);
        }
    }, [editData, isEdit]);

    const handleInputChange = (field: keyof LeaveFormData, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Burada form verilerini submit edeceğiz
        console.log("Form verisi:", formData);
        setOpen(false);
        // Form verilerini temizle
        setFormData({
            leaveType: "",
            employee: "",
            status: "Beklemede",
            startDate: "",
            endDate: "",
            description: "",
        });
    };

    const handleCancel = () => {
        setOpen(false);
        // Form verilerini temizle
        setFormData({
            leaveType: "",
            employee: "",
            status: "Beklemede",
            startDate: "",
            endDate: "",
            description: "",
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent className="sm:max-w-[500px] bg-white">
                <DialogHeader>
                    <div className="flex items-center justify-between">
                        <DialogTitle>
                            {isEdit ? "İzin Kaydını Düzenle" : "Yeni Kayıt"}
                        </DialogTitle>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                            onClick={handleCancel}>
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* İzin Türü */}
                    <div className="space-y-2">
                        <span className="text-sm font-medium">İzin Türü</span>
                        <Select
                            value={formData.leaveType}
                            onValueChange={(value) =>
                                handleInputChange("leaveType", value)
                            }>
                            <SelectTrigger>
                                <SelectValue placeholder="-- Seçiniz --" />
                            </SelectTrigger>
                            <SelectContent className="bg-white">
                                <SelectItem value="yillik">
                                    Yıllık İzin
                                </SelectItem>
                                <SelectItem value="saglik">
                                    Sağlık Raporu
                                </SelectItem>
                                <SelectItem value="ucretsiz">
                                    Ücretsiz İzin
                                </SelectItem>
                                <SelectItem value="idari">
                                    İdari İzin
                                </SelectItem>
                                <SelectItem value="babalik">
                                    Babalık İzni
                                </SelectItem>
                                <SelectItem value="analik">
                                    Analık İzni
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Kullanıcı */}
                    <div className="space-y-2">
                        <span className="text-sm font-medium">Kullanıcı</span>
                        <Select
                            value={formData.employee}
                            onValueChange={(value) =>
                                handleInputChange("employee", value)
                            }>
                            <SelectTrigger>
                                <SelectValue placeholder="-- Seçiniz --" />
                            </SelectTrigger>
                            <SelectContent className="bg-white">
                                <SelectItem value="ali-yildirim">
                                    Ali Yıldırım
                                </SelectItem>
                                <SelectItem value="alper-atak">
                                    Alper Atak
                                </SelectItem>
                                <SelectItem value="ata-cetinkol">
                                    Ata Çetinkol
                                </SelectItem>
                                <SelectItem value="elif-zehra-alp">
                                    Elif Zehra Alp
                                </SelectItem>
                                <SelectItem value="emre-kolunsag">
                                    Emre Kolunsağ
                                </SelectItem>
                                <SelectItem value="fatih-taspin">
                                    Fatih Taşpın
                                </SelectItem>
                                <SelectItem value="fatih-yasak">
                                    Fatih Yasak
                                </SelectItem>
                                <SelectItem value="ibrahim-demir">
                                    İbrahim Demir
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Onay Durumu */}
                    <div className="space-y-2">
                        <span className="text-sm font-medium">Onay Durumu</span>
                        <div className="flex gap-4">
                            <label className="flex items-center space-x-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="status"
                                    value="Beklemede"
                                    checked={formData.status === "Beklemede"}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "status",
                                            e.target.value
                                        )
                                    }
                                    className="w-4 h-4 text-green-600 cursor-pointer"
                                />
                                <span>Beklemede</span>
                            </label>
                            <label className="flex items-center space-x-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="status"
                                    value="Onaylandı"
                                    checked={formData.status === "Onaylandı"}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "status",
                                            e.target.value
                                        )
                                    }
                                    className="w-4 h-4 text-green-600 cursor-pointer"
                                />
                                <span>Onaylandı</span>
                            </label>
                            <label className="flex items-center space-x-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="status"
                                    value="Reddedildi"
                                    checked={formData.status === "Reddedildi"}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "status",
                                            e.target.value
                                        )
                                    }
                                    className="w-4 h-4 text-green-600 cursor-pointer"
                                />
                                <span>Reddedildi</span>
                            </label>
                        </div>
                    </div>

                    {/* Başlangıç-Bitiş Tarihi */}
                    <div className="space-y-2">
                        <span className="text-sm font-medium">
                            Başlangıç-Bitiş Tarihi
                        </span>
                        <div className="flex gap-2">
                            <Input
                                type="date"
                                value={formData.startDate}
                                onChange={(e) =>
                                    handleInputChange(
                                        "startDate",
                                        e.target.value
                                    )
                                }
                                className="flex-1"
                            />
                            <Input
                                type="date"
                                value={formData.endDate}
                                onChange={(e) =>
                                    handleInputChange("endDate", e.target.value)
                                }
                                className="flex-1"
                            />
                        </div>
                    </div>

                    {/* Açıklama */}
                    <div className="space-y-2">
                        <span className="text-sm font-medium">Açıklama</span>
                        <textarea
                            id="description"
                            value={formData.description}
                            onChange={(e) =>
                                handleInputChange("description", e.target.value)
                            }
                            className="w-full min-h-[80px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                            placeholder="Açıklama giriniz..."
                        />
                    </div>

                    {/* Butonlar */}
                    <div className="flex justify-end gap-2 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleCancel}>
                            Vazgeç
                        </Button>
                        <Button
                            type="submit"
                            className="bg-green-600 hover:bg-green-700 text-white">
                            {isEdit ? "Güncelle" : "Oluştur"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
