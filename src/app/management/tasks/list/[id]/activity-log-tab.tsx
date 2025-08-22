import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { RefreshCcw, FileSpreadsheet, FileDown, Printer } from "lucide-react";
import React from "react";

interface ActivityLogTabProps {
  entriesPerPage: string;
  setEntriesPerPage: (v: string) => void;
  searchTerm: string;
  setSearchTerm: (v: string) => void;
  activityLog: Array<{ id: number; description: string; user: string; date: string; time: string }>;
}

export function ActivityLogTab({ entriesPerPage, setEntriesPerPage, searchTerm, setSearchTerm, activityLog }: ActivityLogTabProps) {
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
              <TableHead className="font-semibold text-gray-700">Açıklama</TableHead>
              <TableHead className="font-semibold text-gray-700">İşlem Yapan</TableHead>
              <TableHead className="font-semibold text-gray-700">İşlem Zamanı</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activityLog.map((activity) => (
              <TableRow key={activity.id} className="hover:bg-gray-50">
                <TableCell className="text-sm max-w-md break-words whitespace-normal">
                  {activity.description}
                </TableCell>
                <TableCell className="text-sm">{activity.user}</TableCell>
                <TableCell className="text-sm">
                  {activity.date}<br />
                  {activity.time}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {/* Pagination */}
      <div className="flex items-center justify-between text-sm text-gray-600">
        <span>{activityLog.length} kayıttan 1 - {activityLog.length} arasındaki kayıtlar</span>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>
            Önceki
          </Button>
          <Button variant="outline" size="sm" className="bg-teal-500 text-white hover:bg-teal-600">
            1
          </Button>
          <Button variant="outline" size="sm" disabled>
            Sonraki
          </Button>
        </div>
      </div>
    </div>
  );
}
