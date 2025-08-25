"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ManagementMainLayout } from "@/components/management/management-main-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import {
    RefreshCcw,
    FileDown,
    FileSpreadsheet,
    Printer,
    Eye,
    Edit,
    ChevronLeft,
    ChevronRight,
    Plus,
} from "lucide-react";
import { mockUsers, type User } from "@/lib/mock-data";
import { PageHeader } from "@/components/ui/page-header";
import { UserFormDialog } from "./user-form-dialog";

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

export default function UserList() {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("");
    const [rowsPerPage, setRowsPerPage] = useState("10");
    const [currentPage, setCurrentPage] = useState(1);
    const [isUserFormOpen, setIsUserFormOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [dialogMode, setDialogMode] = useState<'create' | 'edit'>('create');

    // Filter users based on search term
    const filteredUsers = mockUsers.filter(
        (user) =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.phone.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Pagination logic
    const totalItems = filteredUsers.length;
    const itemsPerPage = parseInt(rowsPerPage);
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentUsers = filteredUsers.slice(startIndex, endIndex);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const getStatusBadge = (status: User["status"]) => {
        return status === "Aktif" ? (
            <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white">
                Aktif
            </Badge>
        ) : (
            <Badge className="bg-red-500 hover:bg-red-600 text-white">
                Pasif
            </Badge>
        );
    };

    const breadcrumbItems = [
        { label: "Anasayfa", href: "/management/dashboard" },
        { label: "Kullanıcı Listesi" },
    ];

    const handleCreateUser = () => {
        setDialogMode('create');
        setEditingUser(null);
        setIsUserFormOpen(true);
    };

    const handleEditUser = (user: User) => {
        setDialogMode('edit');
        setEditingUser(user);
        setIsUserFormOpen(true);
    };

    return (
        <ManagementMainLayout>
            <div className="space-y-6">
                <Breadcrumb items={breadcrumbItems} />
                <PageHeader
                    title="Kullanıcı Listesi"
                    subtitle="Kullanıcılarınızı filtreleyin, arayın ve yönetin"
                />
                <Card className="bg-white shadow-sm">
                    <CardHeader className="bg-slate-600 text-white rounded-t-lg">
                        <CardTitle className="text-lg font-semibold">
                            Kullanıcı Listesi
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        {/* Top Controls */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center p-4 border-b bg-gray-50">
                            <div className="flex items-center gap-3">
                                <Select
                                    value={rowsPerPage}
                                    onValueChange={setRowsPerPage}>
                                    <SelectTrigger className="w-20">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="10">10</SelectItem>
                                        <SelectItem value="25">25</SelectItem>
                                        <SelectItem value="50">50</SelectItem>
                                    </SelectContent>
                                </Select>
                                <span className="text-sm text-gray-600">
                                    kayıt göster
                                </span>
                            </div>

                            <div className="flex items-center gap-3">
                                <span className="text-sm text-gray-600">
                                    Ara:
                                </span>
                                <div className="relative">
                                    <Input
                                        type="text"
                                        placeholder=""
                                        value={searchTerm}
                                        onChange={(e) =>
                                            setSearchTerm(e.target.value)
                                        }
                                        className="w-64"
                                    />
                                </div>
                                <div className="flex gap-1">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="p-2">
                                        <RefreshCcw className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="p-2">
                                        <FileSpreadsheet className="h-4 w-4 text-green-600" />
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="p-2">
                                        <FileDown className="h-4 w-4 text-red-600" />
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="p-2">
                                        <Printer className="h-4 w-4 text-blue-600" />
                                    </Button>
                                    <Button 
                                        className="bg-emerald-500 hover:bg-emerald-600 text-white ml-2 px-3 py-2 text-sm"
                                        onClick={handleCreateUser}
                                    >
                                        <Plus className="h-4 w-4 mr-1" />
                                        Yeni Kullanıcı
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Data Table */}
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-gray-50 border-b">
                                        <TableHead className="font-semibold text-gray-700 py-3 px-4">
                                            <div className="flex items-center gap-2">
                                                Ad Soyad
                                                <div className="flex flex-col">
                                                    <ChevronLeft className="h-3 w-3 rotate-90" />
                                                    <ChevronRight className="h-3 w-3 rotate-90" />
                                                </div>
                                            </div>
                                        </TableHead>
                                        <TableHead className="font-semibold text-gray-700 py-3 px-4">
                                            <div className="flex items-center gap-2">
                                                E-Posta
                                                <div className="flex flex-col">
                                                    <ChevronLeft className="h-3 w-3 rotate-90" />
                                                    <ChevronRight className="h-3 w-3 rotate-90" />
                                                </div>
                                            </div>
                                        </TableHead>
                                        <TableHead className="font-semibold text-gray-700 py-3 px-4">
                                            Telefon
                                        </TableHead>
                                        <TableHead className="font-semibold text-gray-700 py-3 px-4">
                                            <div className="flex items-center gap-2">
                                                Son Giriş
                                                <div className="flex flex-col">
                                                    <ChevronLeft className="h-3 w-3 rotate-90" />
                                                    <ChevronRight className="h-3 w-3 rotate-90" />
                                                </div>
                                            </div>
                                        </TableHead>
                                        <TableHead className="font-semibold text-gray-700 py-3 px-4">
                                            <div className="flex items-center gap-2">
                                                Aktif mi?
                                                <div className="flex flex-col">
                                                    <ChevronLeft className="h-3 w-3 rotate-90" />
                                                    <ChevronRight className="h-3 w-3 rotate-90" />
                                                </div>
                                            </div>
                                        </TableHead>
                                        <TableHead className="font-semibold text-gray-700 py-3 px-4 text-center">
                                            İşlemler
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {currentUsers.length === 0 ? (
                                        <TableRow>
                                            <TableCell
                                                colSpan={6}
                                                className="text-center py-8 text-gray-500">
                                                Arama kriterlerinize uygun
                                                kullanıcı bulunamadı.
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        currentUsers.map((user, index) => (
                                            <TableRow
                                                key={user.id}
                                                className={`hover:bg-gray-50 transition-colors ${
                                                    index % 2 === 0
                                                        ? "bg-white"
                                                        : "bg-gray-50/50"
                                                }`}>
                                                <TableCell className="py-3 px-4">
                                                    <div className="flex items-center gap-3">
                                                        <Avatar className="w-8 h-8 shadow-sm">
                                                            <AvatarFallback className={`${getAvatarColor(user.name)} text-white text-xs font-bold`}>
                                                                {getInitials(user.name)}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <div className="font-medium text-gray-900">
                                                            {user.name}
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="py-3 px-4 text-gray-600">
                                                    {user.email}
                                                </TableCell>
                                                <TableCell className="py-3 px-4 text-gray-600">
                                                    {user.phone}
                                                </TableCell>
                                                <TableCell className="py-3 px-4 text-gray-600">
                                                    {user.lastLogin}
                                                </TableCell>
                                                <TableCell className="py-3 px-4">
                                                    {getStatusBadge(
                                                        user.status
                                                    )}
                                                </TableCell>
                                                <TableCell className="py-3 px-4">
                                                    <div className="flex items-center justify-center gap-2">
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            className="h-8 w-8 p-0 hover:bg-blue-50"
                                                            title="Görüntüle"
                                                            onClick={() => router.push(`/management/users/${user.id}`)}
                                                        >
                                                            <Eye className="h-4 w-4 text-gray-600" />
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            className="h-8 w-8 p-0 hover:bg-yellow-50"
                                                            title="Düzenle"
                                                            onClick={() => handleEditUser(user)}
                                                        >
                                                            <Edit className="h-4 w-4 text-gray-600" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </div>

                        {/* Pagination */}
                        <div className="flex flex-col sm:flex-row justify-between items-center p-4 border-t bg-gray-50">
                            <div className="text-sm text-gray-600 mb-2 sm:mb-0">
                                {totalItems} kayıttan {startIndex + 1} -{" "}
                                {Math.min(endIndex, totalItems)} arasındaki
                                kayıtlar
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-600">
                                    Önceki
                                </span>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() =>
                                        handlePageChange(currentPage - 1)
                                    }
                                    disabled={currentPage === 1}
                                    className="w-8 h-8 p-0">
                                    <ChevronLeft className="h-4 w-4" />
                                </Button>

                                <div className="flex gap-1">
                                    {Array.from(
                                        { length: Math.min(3, totalPages) },
                                        (_, i) => {
                                            let pageNum;
                                            if (totalPages <= 3) {
                                                pageNum = i + 1;
                                            } else if (currentPage <= 2) {
                                                pageNum = i + 1;
                                            } else if (
                                                currentPage >=
                                                totalPages - 1
                                            ) {
                                                pageNum = totalPages - 2 + i;
                                            } else {
                                                pageNum = currentPage - 1 + i;
                                            }

                                            return (
                                                <Button
                                                    key={pageNum}
                                                    variant={
                                                        currentPage === pageNum
                                                            ? "default"
                                                            : "outline"
                                                    }
                                                    size="sm"
                                                    onClick={() =>
                                                        handlePageChange(
                                                            pageNum
                                                        )
                                                    }
                                                    className={`w-8 h-8 p-0 ${
                                                        currentPage === pageNum
                                                            ? "bg-blue-600 text-white hover:bg-blue-700"
                                                            : "hover:bg-gray-100"
                                                    }`}>
                                                    {pageNum}
                                                </Button>
                                            );
                                        }
                                    )}
                                </div>

                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() =>
                                        handlePageChange(currentPage + 1)
                                    }
                                    disabled={currentPage === totalPages}
                                    className="w-8 h-8 p-0">
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                                <span className="text-sm text-gray-600">
                                    Sonraki
                                </span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
            
            <UserFormDialog 
                open={isUserFormOpen} 
                onOpenChange={setIsUserFormOpen}
                editUser={editingUser}
                mode={dialogMode}
            />
        </ManagementMainLayout>
    );
}
