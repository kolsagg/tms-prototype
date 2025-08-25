/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import { 
  RefreshCcw, 
  FileDown, 
  FileSpreadsheet, 
  Printer,
  Eye,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

// Mock data for work information
const mockWorkInfo = [
  {
    id: 1,
    startDate: "2.08.2025",
    project: "S4 Geçiş",
    title: "deneme",
    milestone: "deneme",
    priority: "Normal",
    status: "Devam Ediyor",
    completionDate: "23.08.2025",
    estimatedHours: 5,
    spentHours: 6,
    completionRate: 100,
    targetDate: "29.08.2025",
    targetHours: "29.08.2025",
    operations: ""
  }
];

interface WorkInfoTableProps {
  userId: string;
}

export function WorkInfoTable({ userId: _userId }: WorkInfoTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState("10");
  const [currentPage, setCurrentPage] = useState(1);

  // Filter work info based on search term
  const filteredWorkInfo = mockWorkInfo.filter(item =>
    item.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalItems = filteredWorkInfo.length;
  const itemsPerPage = parseInt(rowsPerPage);
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredWorkInfo.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="space-y-4">
      {/* Top Controls */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center p-4 bg-gray-50">
        <div className="flex items-center gap-3">
          <Select value={rowsPerPage} onValueChange={setRowsPerPage}>
            <SelectTrigger className="w-20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
          <span className="text-sm text-gray-600">kayıt göster</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600">Ara:</span>
          <div className="relative">
            <Input
              type="text"
              placeholder=""
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64"
            />
          </div>
          <div className="flex gap-1">
            <Button variant="outline" size="sm" className="p-2">
              <RefreshCcw className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" className="p-2">
              <FileSpreadsheet className="h-4 w-4 text-green-600" />
            </Button>
            <Button variant="outline" size="sm" className="p-2">
              <FileDown className="h-4 w-4 text-red-600" />
            </Button>
            <Button variant="outline" size="sm" className="p-2">
              <Printer className="h-4 w-4 text-blue-600" />
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
                  Başlık
                  <div className="flex flex-col">
                    <ChevronLeft className="h-3 w-3 rotate-90" />
                    <ChevronRight className="h-3 w-3 rotate-90" />
                  </div>
                </div>
              </TableHead>
              <TableHead className="font-semibold text-gray-700 py-3 px-4">
                <div className="flex items-center gap-2">
                  Proje
                  <div className="flex flex-col">
                    <ChevronLeft className="h-3 w-3 rotate-90" />
                    <ChevronRight className="h-3 w-3 rotate-90" />
                  </div>
                </div>
              </TableHead>
              <TableHead className="font-semibold text-gray-700 py-3 px-4">Milestone</TableHead>
              <TableHead className="font-semibold text-gray-700 py-3 px-4">Öncelik</TableHead>
              <TableHead className="font-semibold text-gray-700 py-3 px-4">Durum</TableHead>
              <TableHead className="font-semibold text-gray-700 py-3 px-4">Başlama</TableHead>
              <TableHead className="font-semibold text-gray-700 py-3 px-4">Bitiş</TableHead>
              <TableHead className="font-semibold text-gray-700 py-3 px-4">Tahmini Süre (h)</TableHead>
              <TableHead className="font-semibold text-gray-700 py-3 px-4">Harcanan Süre</TableHead>
              <TableHead className="font-semibold text-gray-700 py-3 px-4">Tamamlanma %</TableHead>
              <TableHead className="font-semibold text-gray-700 py-3 px-4">Hedef Süre</TableHead>
              <TableHead className="font-semibold text-gray-700 py-3 px-4">Hedef Tarih</TableHead>
              <TableHead className="font-semibold text-gray-700 py-3 px-4 text-center">İşlemler</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentItems.length === 0 ? (
              <TableRow>
                <TableCell colSpan={13} className="text-center py-8 text-gray-500">
                  Arama kriterlerinize uygun çalışma bilgisi bulunamadı.
                </TableCell>
              </TableRow>
            ) : (
              currentItems.map((item, index) => (
                <TableRow 
                  key={item.id} 
                  className={`hover:bg-gray-50 transition-colors ${
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                  }`}
                >
                  <TableCell className="py-3 px-4 font-medium">{item.title}</TableCell>
                  <TableCell className="py-3 px-4 text-gray-600">{item.project}</TableCell>
                  <TableCell className="py-3 px-4 text-gray-600">{item.milestone}</TableCell>
                  <TableCell className="py-3 px-4 text-gray-600">{item.priority}</TableCell>
                  <TableCell className="py-3 px-4 text-gray-600">{item.status}</TableCell>
                  <TableCell className="py-3 px-4 text-gray-600">{item.startDate}</TableCell>
                  <TableCell className="py-3 px-4 text-gray-600">{item.completionDate}</TableCell>
                  <TableCell className="py-3 px-4 text-gray-600">{item.estimatedHours}</TableCell>
                  <TableCell className="py-3 px-4 text-gray-600">{item.spentHours}</TableCell>
                  <TableCell className="py-3 px-4 text-gray-600">{item.completionRate}</TableCell>
                  <TableCell className="py-3 px-4 text-gray-600">{item.targetHours}</TableCell>
                  <TableCell className="py-3 px-4 text-gray-600">{item.targetDate}</TableCell>
                  <TableCell className="py-3 px-4">
                    <div className="flex items-center justify-center">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 hover:bg-blue-50"
                        title="Görüntüle"
                      >
                        <Eye className="h-4 w-4 text-gray-600" />
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
      <div className="flex flex-col sm:flex-row justify-between items-center p-4 bg-gray-50">
        <div className="text-sm text-gray-600 mb-2 sm:mb-0">
          {totalItems} kayıttan {startIndex + 1} - {Math.min(endIndex, totalItems)} arasındaki kayıtlar
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Önceki</span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="w-8 h-8 p-0"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <div className="flex gap-1">
            {Array.from({ length: Math.min(3, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 3) {
                pageNum = i + 1;
              } else if (currentPage <= 2) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 1) {
                pageNum = totalPages - 2 + i;
              } else {
                pageNum = currentPage - 1 + i;
              }
              
              return (
                <Button
                  key={pageNum}
                  variant={currentPage === pageNum ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePageChange(pageNum)}
                  className={`w-8 h-8 p-0 ${
                    currentPage === pageNum 
                      ? "bg-blue-600 text-white hover:bg-blue-700" 
                      : "hover:bg-gray-100"
                  }`}
                >
                  {pageNum}
                </Button>
              );
            })}
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="w-8 h-8 p-0"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <span className="text-sm text-gray-600">Sonraki</span>
        </div>
      </div>
    </div>
  );
}
