"use client";

import { ManagementMainLayout } from "@/components/management/management-main-layout";
import { useMemo, useState } from "react";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Filter,
  Printer,
  FileDown,
  RefreshCcw,
  Check,
  X,
  Edit,
  Plus,
} from "lucide-react";
import { mockLeaveRequests, type LeaveRequest } from "@/lib/mock-data";
import { LeaveFormDialog } from "./leave-form-dialog";

interface FilterState {
  leaveType: string;
  dateRange: string;
  search: string;
}

export default function LeaveManagementPage() {
  const [filters, setFilters] = useState<FilterState>({
    leaveType: "all",
    dateRange: "",
    search: "",
  });

  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Filtrelenmiş izin başvuruları
  const filteredLeaveRequests = useMemo(() => {
    let filtered = [...mockLeaveRequests];

    // Arama filtresi
    if (filters.search) {
      filtered = filtered.filter(
        (request) =>
          request.personName.toLowerCase().includes(filters.search.toLowerCase()) ||
          request.leaveType.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // İzin türü filtresi
    if (filters.leaveType && filters.leaveType !== "all") {
      filtered = filtered.filter((request) =>
        request.leaveType.toLowerCase().includes(filters.leaveType.toLowerCase())
      );
    }

    return filtered;
  }, [filters]);

  // Sayfalama
  const totalPages = Math.ceil(filteredLeaveRequests.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedRequests = filteredLeaveRequests.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setFilters({
      leaveType: "all",
      dateRange: "",
      search: "",
    });
    setCurrentPage(1);
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "Onaylandı":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case "Beklemede":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
      case "Reddedildi":
        return "bg-red-100 text-red-800 hover:bg-red-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  const handleApprove = (id: number) => {
    // Burada gerçek uygulamada API çağrısı yapılacak
    console.log(`İzin başvurusu ${id} onaylandı`);
  };

  const handleReject = (id: number) => {
    // Burada gerçek uygulamada API çağrısı yapılacak
    console.log(`İzin başvurusu ${id} reddedildi`);
  };

  const convertToFormData = (request: LeaveRequest) => {
    return {
      leaveType: request.leaveType.toLowerCase().replace(" ", "").replace("ı", "i"),
      employee: request.personName.toLowerCase().replace(" ", "-").replace("ç", "c").replace("ğ", "g").replace("ş", "s").replace("ı", "i").replace("ö", "o").replace("ü", "u"),
      status: request.status,
      startDate: request.startDate.split('.').reverse().join('-'),
      endDate: request.endDate.split('.').reverse().join('-'),
      description: `${request.leaveType} başvurusu`,
    };
  };

  return (
    <ManagementMainLayout contentClassName="max-w-none">
      <div className="space-y-6">
        <Breadcrumb
          items={[
            { label: "Ana Sayfa", href: "/" },
            { label: "Yönetim", href: "/management" },
            { label: "İzin/Rapor Yönetimi" },
          ]}
        />
        
        <PageHeader title="İzin/Rapor Yönetimi" />

        {/* Filtre Paneli */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filtrelenebilir Panel
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="filters" className="border-none">
                <AccordionTrigger className="hover:no-underline py-2">
                  <div className="flex items-center gap-2">
                    <span>İzin Türü</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        İzin Türü
                      </label>
                      <Select
                        value={filters.leaveType}
                        onValueChange={(value) =>
                          handleFilterChange("leaveType", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="-- Seçiniz --" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Tümü</SelectItem>
                          <SelectItem value="yıllık">Yıllık İzin</SelectItem>
                          <SelectItem value="sağlık">Sağlık Raporu</SelectItem>
                          <SelectItem value="ücretsiz">Ücretsiz İzin</SelectItem>
                          <SelectItem value="idari">İdari İzin</SelectItem>
                          <SelectItem value="babalık">Babalık İzni</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        İzin Tarih Aralığı
                      </label>
                      <Input
                        type="date"
                        value={filters.dateRange}
                        onChange={(e) =>
                          handleFilterChange("dateRange", e.target.value)
                        }
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Arama
                      </label>
                      <Input
                        placeholder="Personel adı ara..."
                        value={filters.search}
                        onChange={(e) => handleFilterChange("search", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button 
                      variant="default" 
                      size="sm"
                      className="bg-emerald-600 hover:bg-emerald-700 text-white"
                    >
                      Filtrele
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={resetFilters}
                    >
                      Filtreleme Yap
                    </Button>
                  </div>

                  <p className="text-sm text-muted-foreground mt-2">
                    Bu panelden filtreleme yapabilirsiniz.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        {/* İzin/Rapor Yönetimi Tablosu */}
        <Card className="bg-white">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>İzin/Rapor Yönetimi</CardTitle>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>Ara</span>
                  <Input
                    placeholder="Arama..."
                    value={filters.search}
                    onChange={(e) => handleFilterChange("search", e.target.value)}
                    className="w-32 h-8 text-sm"
                  />
                </div>
                <Button variant="outline" size="sm">
                  <Printer className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <FileDown className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <RefreshCcw className="h-4 w-4" />
                </Button>
                <LeaveFormDialog
                  trigger={
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="bg-emerald-600 hover:bg-emerald-700 text-white"
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Yeni Kayıt
                    </Button>
                  }
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Sayfa başına kayıt sayısı */}
              <div className="flex items-center gap-2 text-sm">
                <Select
                  value={itemsPerPage.toString()}
                  onValueChange={(value) => setItemsPerPage(Number(value))}
                >
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="25">25</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                  </SelectContent>
                </Select>
                <span>kayıt göster</span>
              </div>

              {/* Tablo */}
              <div className="rounded-md border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[120px]">Personel</TableHead>
                      <TableHead className="min-w-[120px]">İzin Türü</TableHead>
                      <TableHead className="min-w-[100px]">Başlangıç</TableHead>
                      <TableHead className="min-w-[80px]">Bitiş</TableHead>
                      <TableHead className="min-w-[100px]">Durum</TableHead>
                      <TableHead className="min-w-[120px]">Onaylayan</TableHead>
                      <TableHead className="min-w-[120px]">Oluşturulma</TableHead>
                      <TableHead className="min-w-[100px] text-center">İşlemler</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedRequests.map((request) => (
                      <TableRow key={request.id} className="hover:bg-gray-50">
                        <TableCell className="font-medium">{request.personName}</TableCell>
                        <TableCell>{request.leaveType}</TableCell>
                        <TableCell>{request.startDate}</TableCell>
                        <TableCell>{request.endDate}</TableCell>
                        <TableCell>
                          <Badge
                            variant="secondary"
                            className={`${getStatusBadgeColor(request.status)} text-xs`}
                          >
                            {request.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{request.approver || "-"}</TableCell>
                        <TableCell>{request.createdDate}</TableCell>
                        <TableCell>
                          <div className="flex items-center justify-center gap-1">
                            {request.status === "Beklemede" ? (
                              <>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0 hover:bg-green-100 text-green-600"
                                  onClick={() => handleApprove(request.id)}
                                  title="Kabul Et"
                                >
                                  <Check className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0 hover:bg-red-100 text-red-600"
                                  onClick={() => handleReject(request.id)}
                                  title="Reddet"
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </>
                            ) : (
                              <LeaveFormDialog
                                trigger={
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 w-8 p-0 hover:bg-gray-100"
                                    title="Düzenle"
                                  >
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                }
                                editData={convertToFormData(request)}
                                isEdit={true}
                              />
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Sayfalama */}
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  {filteredLeaveRequests.length > 0 ? (
                    <>
                      {startIndex + 1} kayıttan {Math.min(startIndex + itemsPerPage, filteredLeaveRequests.length)} - {filteredLeaveRequests.length} arasındaki kayıtlar
                    </>
                  ) : (
                    "Kayıt bulunamadı"
                  )}
                </div>
                
                {totalPages > 1 && (
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                    >
                      Önceki
                    </Button>
                    
                    <div className="flex gap-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <Button
                          key={page}
                          variant={currentPage === page ? "default" : "outline"}
                          size="sm"
                          className={`w-8 h-8 p-0 ${
                            currentPage === page 
                              ? "bg-blue-600 text-white" 
                              : "hover:bg-gray-100"
                          }`}
                          onClick={() => setCurrentPage(page)}
                        >
                          {page}
                        </Button>
                      ))}
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      disabled={currentPage === totalPages}
                    >
                      Sonraki
                    </Button>
                  </div>
                )}
              </div>

              {/* Alt bilgi */}
              <div className="flex items-center justify-between text-sm text-gray-500 pt-2 border-t">
                <span>
                  Windows&apos;u Etkinleştirin Denetim<br/>
                  Windows&apos;u etkinleştirmek için Ayarlar&apos;a gidin.
                </span>
                <div className="flex items-center gap-4">
                  <span>1</span>
                  <span>2</span>
                  <span>Sonraki</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ManagementMainLayout>
  );
}
