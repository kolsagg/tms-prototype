"use client";

import { ManagementMainLayout } from "@/components/management/management-main-layout";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
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
  Search,
  Eye,
  Edit,
  Printer,
  FileDown,
  RefreshCcw,
  Plus,
} from "lucide-react";
import { mockTasks, computeTaskCompletionPercentage } from "@/lib/mock-data";
import { TaskFormDialog } from "./task-form-dialog";

interface FilterState {
  customerInfo: string;
  registrationDate: string;
  status: string;
  search: string;
}

export default function TasksListPage() {
  const router = useRouter();
  
  const [filters, setFilters] = useState<FilterState>({
    customerInfo: "all",
    registrationDate: "",
    status: "all",
    search: "",
  });

  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Filtrelenmiş görevler
  const filteredTasks = useMemo(() => {
    let filtered = [...mockTasks];

    // Arama filtresi
    if (filters.search) {
      filtered = filtered.filter(
        (task) =>
          task.title.toLowerCase().includes(filters.search.toLowerCase()) ||
          task.project.toLowerCase().includes(filters.search.toLowerCase()) ||
          task.assignee?.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Müşteri bilgisi filtresi
    if (filters.customerInfo && filters.customerInfo !== "all") {
      filtered = filtered.filter((task) =>
        task.project.toLowerCase().includes(filters.customerInfo.toLowerCase())
      );
    }

    // Durum filtresi (priority'ye göre)
    if (filters.status && filters.status !== "all") {
      filtered = filtered.filter((task) => task.priority === filters.status);
    }

    return filtered;
  }, [filters]);

  // Sayfalama
  const totalPages = Math.ceil(filteredTasks.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTasks = filteredTasks.slice(
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
      customerInfo: "all",
      registrationDate: "",
      status: "all",
      search: "",
    });
    setCurrentPage(1);
  };

  const getPriorityBadgeColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 hover:bg-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
      case "low":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case "high":
        return "Yüksek";
      case "medium":
        return "Orta";
      case "low":
        return "Düşük";
      default:
        return "Normal";
    }
  };

  return (
    <ManagementMainLayout contentClassName="max-w-none">
      <div className="space-y-6">
        <Breadcrumb
          items={[
            { label: "Ana Sayfa", href: "/" },
            { label: "Yönetim", href: "/management" },
            { label: "Görevler", href: "/management/tasks" },
            { label: "Liste" },
          ]}
        />
        
        <PageHeader title="Görev Listesi" />

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
                    <span>Filtreler</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 py-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Müşteri Bilgisi
                      </label>
                      <Select
                        value={filters.customerInfo}
                        onValueChange={(value) =>
                          handleFilterChange("customerInfo", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="-- Seçiniz --" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Tümü</SelectItem>
                          <SelectItem value="concentit">ConcentIT</SelectItem>
                          <SelectItem value="nttdata">NTT DATA</SelectItem>
                          <SelectItem value="inervo">Inervo</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Kayıt Tarihi
                      </label>
                      <Input
                        type="date"
                        value={filters.registrationDate}
                        onChange={(e) =>
                          handleFilterChange("registrationDate", e.target.value)
                        }
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Durum
                      </label>
                      <Select
                        value={filters.status}
                        onValueChange={(value) => handleFilterChange("status", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="-- Seçiniz --" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Tümü</SelectItem>
                          <SelectItem value="high">Yüksek</SelectItem>
                          <SelectItem value="medium">Orta</SelectItem>
                          <SelectItem value="low">Düşük</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Arama
                      </label>
                      <Input
                        placeholder="Görev, proje veya kişi ara..."
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

        {/* Görev Listesi Tablosu */}
        <Card className="bg-white">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <span>Görev Listesi</span>
              </CardTitle>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Görevlerde ara..."
                    value={filters.search}
                    onChange={(e) => handleFilterChange("search", e.target.value)}
                    className="pl-8 w-64 bg-white"
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
                <TaskFormDialog
                  trigger={
                    <Button variant="outline" size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white">
                      <Plus className="h-4 w-4 mr-1" />
                      <span>Yeni Görev</span>
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
                  <TableHeader className="bg-white">
                    <TableRow>
                      <TableHead className="text-gray-700 min-w-[150px]">Başlık</TableHead>
                      <TableHead className="text-gray-700 min-w-[120px]">Proje</TableHead>
                      <TableHead className="text-gray-700 min-w-[100px]">Atanan Kişi</TableHead>
                      <TableHead className="text-gray-700 min-w-[80px]">Öncelik</TableHead>
                      <TableHead className="text-gray-700 min-w-[100px]">Durum</TableHead>
                      <TableHead className="text-gray-700 min-w-[80px]">Başlangıç</TableHead>
                      <TableHead className="text-gray-700 min-w-[80px]">Bitiş</TableHead>
                      <TableHead className="text-gray-700 min-w-[70px]">Tahmini (h)</TableHead>
                      <TableHead className="text-gray-700 min-w-[70px]">Gerçek (h)</TableHead>
                      <TableHead className="text-gray-700 min-w-[70px]">Tamamlanma %</TableHead>
                      <TableHead className="text-gray-700 min-w-[90px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedTasks.map((task) => {
                      const completionPercentage = computeTaskCompletionPercentage(
                        task.id,
                        task.estimateHours
                      );
                      
                      return (
                        <TableRow key={task.id} className="hover:bg-gray-200">
                          <TableCell className="font-medium">{task.title}</TableCell>
                          <TableCell className="text-sm">{task.project}</TableCell>
                          <TableCell className="text-sm">{task.assignee || "-"}</TableCell>
                          <TableCell>
                            <Badge
                              variant="secondary"
                              className={`${getPriorityBadgeColor(task.priority)} text-xs`}
                            >
                              {getPriorityText(task.priority)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {completionPercentage === 100 ? (
                              <Badge className="bg-green-100 text-green-800 hover:bg-green-200 text-xs">
                                Tamamlandı
                              </Badge>
                            ) : completionPercentage > 0 ? (
                              <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 text-xs">
                                Devam Ediyor
                              </Badge>
                            ) : (
                              <Badge className="bg-gray-200 text-gray-800 hover:bg-gray-300 text-xs">
                                Başlamadı
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell className="text-sm">{task.startDate}</TableCell>
                          <TableCell className="text-sm">{task.endDate}</TableCell>
                          <TableCell className="text-center">{task.estimateHours}</TableCell>
                          <TableCell className="text-center">
                            {Math.round(
                              (task.estimateHours * completionPercentage) / 100
                            )}
                          </TableCell>
                          <TableCell className="text-center">{completionPercentage}%</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-8 w-8 p-0 hover:bg-gray-100"
                                onClick={() => router.push(`/management/tasks/list/${task.id}`)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <TaskFormDialog
                                editTask={task}
                                trigger={
                                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-gray-100">
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                }
                              />
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>

              {/* Sayfalama */}
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div>
                  {Math.min(startIndex + 1, filteredTasks.length)} kaydtan 1 - {Math.min(startIndex + itemsPerPage, filteredTasks.length)} arasındaki kayıtlar
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                  >
                    Önceki
                  </Button>
                  <span className="bg-emerald-600 text-white px-3 py-1 rounded text-sm">
                    {currentPage}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                  >
                    {currentPage + 1}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 2))}
                    disabled={currentPage >= totalPages - 1}
                  >
                    {currentPage + 2}
                  </Button>
                  <span>...</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(totalPages)}
                    disabled={currentPage === totalPages}
                  >
                    Sonraki
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ManagementMainLayout>
  );
}
