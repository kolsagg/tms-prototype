import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { RefreshCcw, FileSpreadsheet, FileDown, Printer } from "lucide-react";
import React from "react";

interface TimeEntriesTabProps {
  entriesPerPage: string;
  setEntriesPerPage: (v: string) => void;
  searchTerm: string;
  setSearchTerm: (v: string) => void;
}

export function TimeEntriesTab({ entriesPerPage, setEntriesPerPage, searchTerm, setSearchTerm }: TimeEntriesTabProps) {
  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Select value={entriesPerPage} onValueChange={setEntriesPerPage}>
            <SelectTrigger className="w-20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectContent>
          </Select>
          <span className="text-sm text-gray-600">kayıt göster</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Ara:</span>
          <Input
            placeholder="Arama yapın..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
          />
          <div className="flex gap-1">
            <Button variant="outline" size="sm">
              <RefreshCcw className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              <FileSpreadsheet className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              <FileDown className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Printer className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      {/* Table */}
      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="font-semibold text-gray-700">Kullanıcı Adı</TableHead>
              <TableHead className="font-semibold text-gray-700">Tarih</TableHead>
              <TableHead className="font-semibold text-gray-700">Başlangıç Saati</TableHead>
              <TableHead className="font-semibold text-gray-700">Bitiş Saati</TableHead>
              <TableHead className="font-semibold text-gray-700">Süre (saat)</TableHead>
              <TableHead className="font-semibold text-gray-700">Açıklama</TableHead>
              <TableHead className="font-semibold text-gray-700">Faturalandırma</TableHead>
              <TableHead className="font-semibold text-gray-700">İşlemler</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell colSpan={8} className="text-center text-gray-500 py-8">
                Tabloda herhangi bir veri mevcut değil
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      {/* Pagination */}
      <div className="flex items-center justify-between text-sm text-gray-600">
        <span>Kayıt yok</span>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>
            Önceki
          </Button>
          <Button variant="outline" size="sm" disabled>
            Sonraki
          </Button>
        </div>
      </div>
    </div>
  );
}
