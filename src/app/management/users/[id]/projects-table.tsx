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
  ChevronLeft,
  ChevronRight
} from "lucide-react";

// Mock data for projects - empty initially as shown in the image
interface Project {
  id: string;
  name: string;
  projectNumber: string;
  status: string;
  type: string;
  period: string;
}

const mockProjects: Project[] = [];

interface ProjectsTableProps {
  userId: string;
}

/**
 * Renders a client-side projects table UI with search and pagination controls.
 *
 * The component maintains local state for `searchTerm` and `rowsPerPage` and filters the
 * internal `mockProjects` array by `name`, `projectNumber`, or `status` (case-insensitive).
 * Currently `mockProjects` is empty, so the table displays a "no data" placeholder.
 *
 * The `userId` prop is accepted but unused in the current implementation.
 *
 * @returns A React element containing the projects table, top controls, and pagination UI.
 */
export function ProjectsTable({ userId: _userId }: ProjectsTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState("10");

  // Filter projects based on search term
  const filteredProjects = mockProjects.filter(project =>
    project.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.projectNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.status?.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                  Proje Adı
                  <div className="flex flex-col">
                    <ChevronLeft className="h-3 w-3 rotate-90" />
                    <ChevronRight className="h-3 w-3 rotate-90" />
                  </div>
                </div>
              </TableHead>
              <TableHead className="font-semibold text-gray-700 py-3 px-4">
                <div className="flex items-center gap-2">
                  Proje No
                  <div className="flex flex-col">
                    <ChevronLeft className="h-3 w-3 rotate-90" />
                    <ChevronRight className="h-3 w-3 rotate-90" />
                  </div>
                </div>
              </TableHead>
              <TableHead className="font-semibold text-gray-700 py-3 px-4"></TableHead>
              <TableHead className="font-semibold text-gray-700 py-3 px-4">Durum</TableHead>
              <TableHead className="font-semibold text-gray-700 py-3 px-4">
                <div className="flex items-center gap-2">
                  Proje Tipi
                  <div className="flex flex-col">
                    <ChevronLeft className="h-3 w-3 rotate-90" />
                    <ChevronRight className="h-3 w-3 rotate-90" />
                  </div>
                </div>
              </TableHead>
              <TableHead className="font-semibold text-gray-700 py-3 px-4">
                <div className="flex items-center gap-2">
                  Dönemi
                  <div className="flex flex-col">
                    <ChevronLeft className="h-3 w-3 rotate-90" />
                    <ChevronRight className="h-3 w-3 rotate-90" />
                  </div>
                </div>
              </TableHead>
              <TableHead className="font-semibold text-gray-700 py-3 px-4 text-center">İşlemler</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                Tabloda herhangi bir veri mevcut değil
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row justify-between items-center p-4 bg-gray-50">
        <div className="text-sm text-gray-600 mb-2 sm:mb-0">
          Kayıt yok
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Önceki</span>
          <Button
            variant="outline"
            size="sm"
            disabled={true}
            className="w-8 h-8 p-0"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <div className="flex gap-1">
            <Button
              variant="default"
              size="sm"
              className="w-8 h-8 p-0 bg-blue-600 text-white hover:bg-blue-700"
            >
              1
            </Button>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            disabled={true}
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
