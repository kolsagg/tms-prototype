"use client";

import { useMemo, useState } from "react";
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
  TableCell,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Eye,
  FileDown,
  Printer,
  RefreshCcw,
  Search,
} from "lucide-react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

interface Project {
  id: number;
  name: string;
  projectNumber: string;
  customer: string;
  status: "completed" | "active" | "draft";
  type: string;
  duration: string;
}

// Mock data based on the image
const mockProjects: Project[] = [
  {
    id: 1,
    name: "Destek EBTR",
    projectNumber: "EBTR2025",
    customer: "EBTR",
    status: "completed",
    type: "Yazılım Projesi",
    duration: "01.07.2025 - 31.12.2027",
  },
  {
    id: 2,
    name: "EBTR DESTEK",
    projectNumber: "987425234",
    customer: "EBTR",
    status: "active",
    type: "Yazılım Projesi",
    duration: "02.07.2025",
  },
];

interface ProjectsTableProps {
  projects?: Project[];
}

export function ProjectsTable({ projects = mockProjects }: ProjectsTableProps) {
  const [globalFilter, setGlobalFilter] = useState("");

  const getStatusColor = (status: Project["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "draft":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: Project["status"]) => {
    switch (status) {
      case "active":
        return "Aktif";
      case "completed":
        return "Tamamlandı";
      case "draft":
        return "Taslak";
      default:
        return "Bilinmeyen";
    }
  };

  const columns = useMemo<ColumnDef<Project>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Proje Adı",
        cell: ({ getValue }) => (
          <span className="font-medium text-gray-900">
            {String(getValue())}
          </span>
        ),
      },
      {
        accessorKey: "projectNumber",
        header: "Proje No",
        cell: ({ getValue }) => (
          <span className="font-mono text-gray-600">
            {String(getValue())}
          </span>
        ),
      },
      {
        accessorKey: "customer",
        header: "Müşteri",
        cell: ({ getValue }) => (
          <span className="text-gray-700">
            {String(getValue())}
          </span>
        ),
      },
      {
        accessorKey: "status",
        header: "Durum",
        cell: ({ getValue }) => {
          const status = getValue() as Project["status"];
          return (
            <Badge className={`border-0 px-2 py-1 text-xs ${getStatusColor(status)}`}>
              {getStatusText(status)}
            </Badge>
          );
        },
      },
      {
        accessorKey: "type",
        header: "Proje Tipi",
        cell: ({ getValue }) => (
          <span className="text-gray-700">
            {String(getValue())}
          </span>
        ),
      },
      {
        accessorKey: "duration",
        header: "Dönemi",
        cell: ({ getValue }) => (
          <span className="text-gray-700 text-sm">
            {String(getValue())}
          </span>
        ),
      },
      {
        id: "actions",
        header: "",
        cell: () => (
          <div className="flex items-center gap-2 justify-end">
            <Button 
              variant="outline" 
              size="icon" 
              aria-label="Görüntüle"
              className="hover:bg-gray-100 h-8 w-8"
            >
              <Eye className="size-4" />
            </Button>
          </div>
        ),
        enableHiding: false,
        enableSorting: false,
      },
    ],
    []
  );

  const table = useReactTable({
    data: projects,
    columns,
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const handleChangePageSize = (value: string) => {
    const nextSize = Number(value);
    if (!nextSize) return;
    table.setPageSize(nextSize);
  };

  const handleSearch = (value: string) => {
    setGlobalFilter(value);
    table.setPageIndex(0);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <Select
            value={String(table.getState().pagination.pageSize)}
            onValueChange={handleChangePageSize}
          >
            <SelectTrigger aria-label="Sayfa boyutu seç" className="w-16">
              <SelectValue placeholder="10" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="10" className="hover:bg-gray-100">
                10
              </SelectItem>
              <SelectItem value="25" className="hover:bg-gray-100">
                25
              </SelectItem>
              <SelectItem value="50" className="hover:bg-gray-100">
                50
              </SelectItem>
              <SelectItem value="100" className="hover:bg-gray-100">
                100
              </SelectItem>
            </SelectContent>
          </Select>
          <span className="text-sm text-gray-600">
            kayıt göster
          </span>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
              <Input
                aria-label="Ara"
                placeholder="Ara"
                value={globalFilter}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-8 w-56 h-9"
              />
            </div>
          </div>
          <Separator orientation="vertical" className="h-6" />
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              aria-label="Dışa aktar"
              className="hover:bg-gray-100 h-9 w-9"
            >
              <FileDown className="size-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              aria-label="Yazdır"
              className="hover:bg-gray-100 h-9 w-9"
            >
              <Printer className="size-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              aria-label="Yenile"
              className="hover:bg-gray-100 h-9 w-9"
            >
              <RefreshCcw className="size-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="bg-gray-50 border-b border-gray-200">
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="text-gray-700 font-medium h-12 px-4"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} className="border-b border-gray-100 hover:bg-gray-50">
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className="px-4 py-3 text-sm"
                  >
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between gap-4 flex-wrap py-4">
        <p className="text-sm text-gray-600">
          {table.getFilteredRowModel().rows.length === 0
            ? "0 kayıttan 0 - 0 arası"
            : `${table.getFilteredRowModel().rows.length} kayıttan ${
                table.getState().pagination.pageIndex *
                  table.getState().pagination.pageSize +
                1
              } - ${Math.min(
                table.getFilteredRowModel().rows.length,
                (table.getState().pagination.pageIndex + 1) *
                  table.getState().pagination.pageSize
              )} arasındaki kayıtlar`}
        </p>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            aria-label="Önceki sayfa"
            size="sm"
          >
            Önceki
          </Button>
          <Button
            variant="outline"
            size="sm"
            aria-current="page"
            aria-label={`Sayfa ${
              table.getState().pagination.pageIndex + 1
            }`}
            disabled
            className="bg-blue-600 text-white hover:bg-blue-600"
          >
            <span className="text-sm">
              {table.getState().pagination.pageIndex + 1}
            </span>
          </Button>
          <Button
            variant="outline"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            aria-label="Sonraki sayfa"
            size="sm"
          >
            Sonraki
          </Button>
        </div>
      </div>
    </div>
  );
}
